"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { cn, trackEvent } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Config réseau — même convention que ContactForm.tsx (fallback en dur car le
// build statique ne reçoit pas de variables d'env au runtime).
// ---------------------------------------------------------------------------
const CHAT_API_URL =
  process.env.NEXT_PUBLIC_CHAT_API_URL || "https://api2.nana-intelligence.fr";

const SESSION_STORAGE_KEY = "nana_chat_session";
const MESSAGES_STORAGE_KEY = "nana_chat_messages";
const SS_PROACTIVE_SHOWN_KEY = "nana_chat_proactive_shown";
const SS_EXIT_SHOWN_KEY = "nana_chat_exit_shown";
const SS_OPENED_KEY = "nana_chat_opened";

const POLL_INTERVAL_MS = 2000;
// Deux vitesses côté backend (charles_bridge.py) : demandes simples ~1-2s (Groq direct),
// demandes complexes via Hermes/NIM jusqu'à ~115-120s (plafond backend = agent.timeout 90s
// + marge worker 30s). Le timeout de polling doit couvrir ce plafond pour ne pas afficher
// un faux timeout sur une réponse complexe qui arrive juste avant la limite backend.
const POLL_TIMEOUT_MS = 125000;
const HOOK_DELAY_MS = 5000;
const INACTIVITY_DELAY_MS = 20000;

const ERROR_MESSAGE =
  "Une erreur est survenue. Réessaie ou écris-nous à contact@nana-intelligence.fr";
const TIMEOUT_MESSAGE =
  "Charles met plus de temps que prévu, réessaie ou écris-nous à contact@nana-intelligence.fr";
const INACTIVITY_MESSAGE =
  "Toujours là ? Je suis Charles, je peux répondre à tes questions si besoin.";
const EXIT_INTENT_MESSAGE =
  "Avant de partir : une question, un besoin ? Je suis là pour y répondre.";
const DEFAULT_HOOK_MESSAGE =
  "Bonjour, je suis Charles 👋 Pose-moi une question sur Nana Intelligence.";

// Accroches contextuelles par page (préécrites en dur, zéro appel réseau).
const HOOK_MESSAGES: Record<string, string> = {
  "/": "Salut, je suis Charles 👋 Une question sur la génération de leads B2B ?",
  "/contact": "Une question avant de remplir le formulaire ?",
  "/services": "Je peux t'aider à choisir le service le plus adapté à ton besoin.",
  "/agence-lead-generation":
    "Tu veux en savoir plus sur notre méthode de prospection B2B ? Je réponds à tes questions.",
  "/about": "Une question sur l'équipe ou notre façon de travailler ?",
  "/blog": "Une question sur cet article ou sur nos services ?",
};

function getHookMessage(pathname: string): string {
  if (HOOK_MESSAGES[pathname]) return HOOK_MESSAGES[pathname];
  const matchedKey = Object.keys(HOOK_MESSAGES)
    .filter((key) => key !== "/" && pathname.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];
  return matchedKey ? HOOK_MESSAGES[matchedKey] : DEFAULT_HOOK_MESSAGE;
}

type ChatRole = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  ts: number;
}

interface ChatMessageResponse {
  task_id?: string;
}

interface ChatPollResponse {
  status?: "pending" | "done" | "failed" | string;
  reply?: string;
}

function safeUuid(): string {
  try {
    if (typeof window !== "undefined" && window.crypto?.randomUUID) {
      return window.crypto.randomUUID();
    }
  } catch {
    // ignore
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ChatWidget() {
  const pathname = usePathname() || "/";

  const [isOpen, setIsOpen] = useState(false);
  const [storageLoaded, setStorageLoaded] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isWaitingReply, setIsWaitingReply] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const [leadOpen, setLeadOpen] = useState(false);
  const [leadStatus, setLeadStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const isOpenRef = useRef(false);
  const hasSentFirstMessageRef = useRef(false);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const pushAssistantMessage = useCallback((text: string) => {
    setMessages((prev) => [...prev, { id: safeUuid(), role: "assistant", text, ts: Date.now() }]);
  }, []);

  // -- Chargement session_id + historique depuis localStorage (client only) --
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      let sid = window.localStorage.getItem(SESSION_STORAGE_KEY);
      if (!sid) {
        sid = safeUuid();
        window.localStorage.setItem(SESSION_STORAGE_KEY, sid);
      }
      setSessionId(sid);
    } catch {
      setSessionId(safeUuid());
    }

    try {
      const raw = window.localStorage.getItem(MESSAGES_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ChatMessage[];
        if (Array.isArray(parsed)) {
          setMessages(parsed);
          hasSentFirstMessageRef.current = parsed.some((m) => m.role === "user");
        }
      }
    } catch {
      // localStorage indisponible ou corrompu : on repart d'un historique vide.
    }

    setStorageLoaded(true);
  }, []);

  // -- Persistance de l'historique (uniquement une fois le chargement fait) --
  useEffect(() => {
    if (!storageLoaded || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // stockage plein/indisponible : on dégrade silencieusement.
    }
  }, [messages, storageLoaded]);

  // -- Auto-scroll vers le dernier message --
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isWaitingReply, leadOpen]);

  // -- Nettoyage du polling au démontage --
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, []);

  // -- Proactivité scriptée : accroche contextuelle + relance inactivité --
  // ZÉRO appel réseau ici : uniquement des messages pré-écrits injectés en local.
  useEffect(() => {
    if (typeof window === "undefined" || !storageLoaded) return;

    const hookTimer = setTimeout(() => {
      try {
        if (isOpenRef.current) return;
        if (window.sessionStorage.getItem(SS_PROACTIVE_SHOWN_KEY)) return;
        pushAssistantMessage(getHookMessage(pathname));
        window.sessionStorage.setItem(SS_PROACTIVE_SHOWN_KEY, "1");
        setHasUnread(true);
      } catch {
        // sessionStorage indisponible : on n'affiche simplement pas l'accroche.
      }
    }, HOOK_DELAY_MS);

    const inactivityTimer = setTimeout(() => {
      try {
        if (isOpenRef.current) return;
        if (window.sessionStorage.getItem(SS_OPENED_KEY)) return;
        if (window.sessionStorage.getItem(SS_PROACTIVE_SHOWN_KEY)) return;
        pushAssistantMessage(INACTIVITY_MESSAGE);
        window.sessionStorage.setItem(SS_PROACTIVE_SHOWN_KEY, "1");
        setHasUnread(true);
      } catch {
        // idem
      }
    }, INACTIVITY_DELAY_MS);

    return () => {
      clearTimeout(hookTimer);
      clearTimeout(inactivityTimer);
    };
    // pushAssistantMessage est stable (useCallback []) : dépendances volontairement
    // limitées à pathname/storageLoaded pour ne pas relancer les timers à chaque frappe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, storageLoaded]);

  // -- Exit-intent desktop : dernière accroche avant un départ probable --
  useEffect(() => {
    if (typeof window === "undefined" || !storageLoaded) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 0) return;
      try {
        if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
        if (isOpenRef.current) return;
        if (window.sessionStorage.getItem(SS_EXIT_SHOWN_KEY)) return;
        window.sessionStorage.setItem(SS_EXIT_SHOWN_KEY, "1");
        pushAssistantMessage(EXIT_INTENT_MESSAGE);
        setHasUnread(true);
      } catch {
        // ignore
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageLoaded]);

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        trackEvent("chat_widget_open");
        setHasUnread(false);
        try {
          window.sessionStorage.setItem(SS_OPENED_KEY, "1");
        } catch {
          // ignore
        }
      }
      return next;
    });
  };

  const clearPolling = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  };

  const pollForReply = (taskId: string, sid: string) => {
    clearPolling();
    const startedAt = Date.now();

    const poll = async () => {
      try {
        const res = await fetch(
          `${CHAT_API_URL}/chat/poll?task_id=${encodeURIComponent(taskId)}&session_id=${encodeURIComponent(sid)}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as ChatPollResponse;

        if (data.status === "done") {
          clearPolling();
          setIsWaitingReply(false);
          pushAssistantMessage(typeof data.reply === "string" && data.reply ? data.reply : ERROR_MESSAGE);
          if (!isOpenRef.current) setHasUnread(true);
          return;
        }

        if (data.status === "failed") {
          clearPolling();
          setIsWaitingReply(false);
          pushAssistantMessage(ERROR_MESSAGE);
          return;
        }

        // status "pending" (ou inconnu) : on continue à poller sauf timeout.
        if (Date.now() - startedAt > POLL_TIMEOUT_MS) {
          clearPolling();
          setIsWaitingReply(false);
          pushAssistantMessage(TIMEOUT_MESSAGE);
        }
      } catch (err) {
        if (Date.now() - startedAt > POLL_TIMEOUT_MS) {
          clearPolling();
          setIsWaitingReply(false);
          trackEvent("chat_error", { message: String(err) });
          pushAssistantMessage(ERROR_MESSAGE);
        }
        // sinon : erreur transitoire, on retente au prochain tick jusqu'au timeout.
      }
    };

    pollIntervalRef.current = setInterval(poll, POLL_INTERVAL_MS);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || !sessionId || isWaitingReply) return;

    setInput("");
    setMessages((prev) => [...prev, { id: safeUuid(), role: "user", text, ts: Date.now() }]);

    if (!hasSentFirstMessageRef.current) {
      hasSentFirstMessageRef.current = true;
      trackEvent("chat_message_sent");
    }

    setIsWaitingReply(true);
    try {
      const res = await fetch(`${CHAT_API_URL}/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, text, page: pathname }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as ChatMessageResponse;
      if (!data.task_id) throw new Error("Réponse invalide du serveur");
      pollForReply(data.task_id, sessionId);
    } catch (err) {
      trackEvent("chat_error", { message: String(err) });
      setIsWaitingReply(false);
      pushAssistantMessage(ERROR_MESSAGE);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sessionId) return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setLeadStatus("sending");
    try {
      const res = await fetch(`${CHAT_API_URL}/chat/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          email: data.email,
          name: data.name,
          company: data.company,
          page: pathname,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      trackEvent("generate_lead");
      setLeadStatus("success");
      form.reset();
    } catch (err) {
      trackEvent("chat_error", { message: String(err) });
      setLeadStatus("error");
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat avec Charles"}
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-ink bg-orange text-ink shadow-lg transition-transform hover:scale-105"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && hasUnread && (
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-[1.5px] border-cream bg-error animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat avec Charles, assistant Nana Intelligence"
          className="fixed bottom-24 right-6 z-[60] flex h-[70vh] max-h-[560px] w-[380px] max-w-[calc(100vw-2rem)] flex-col border-[1.5px] border-ink bg-cream rounded-none shadow-xl"
        >
          <div className="flex items-center justify-between border-b-[1.5px] border-ink px-4 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
              Charles · Nana Intelligence
            </span>
            <button
              type="button"
              onClick={() => setLeadOpen((v) => !v)}
              className="font-mono text-[11px] uppercase tracking-[0.15em] text-orange hover:underline"
            >
              {leadOpen ? "Retour" : "Mes coordonnées"}
            </button>
          </div>

          {leadOpen ? (
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <p className="mb-4 font-mono text-[12px] leading-relaxed text-ink-2">
                Laisse-nous ton email et on revient vers toi rapidement.
              </p>
              <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                <Field label="Prénom (optionnel)" name="name" placeholder="ex: Jean" />
                <Field
                  label="Email professionnel"
                  name="email"
                  type="email"
                  required
                  placeholder="jean@entreprise.fr"
                />
                <Field label="Entreprise (optionnel)" name="company" placeholder="Nom de votre société" />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  loading={leadStatus === "sending"}
                  icon={<ArrowRight size={16} />}
                >
                  Envoyer mes coordonnées
                </Button>
                {leadStatus === "success" && (
                  <p className="font-mono text-[11px] uppercase text-center text-orange font-bold leading-relaxed">
                    Merci ✓ On revient vers vous sous 24h.
                  </p>
                )}
                {leadStatus === "error" && (
                  <p className="font-mono text-[11px] uppercase text-center text-error font-bold leading-relaxed">
                    Une erreur est survenue. Écrivez-nous à contact@nana-intelligence.fr
                  </p>
                )}
              </form>
            </div>
          ) : (
            <>
              <div
                aria-live="polite"
                className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
              >
                {messages.length === 0 && (
                  <p className="font-mono text-[12px] text-ink-3">
                    Pose ta question, Charles te répond.
                  </p>
                )}
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "max-w-[85%] border-[1.5px] px-3 py-2 text-[13px] leading-relaxed",
                      m.role === "user"
                        ? "self-end bg-ink text-cream border-ink"
                        : "self-start bg-cream-2 text-ink border-ink"
                    )}
                  >
                    {m.text}
                  </div>
                ))}
                {isWaitingReply && (
                  <div className="self-start flex items-center gap-2 border-[1.5px] border-ink bg-cream-2 px-3 py-2 text-[13px] text-ink-2">
                    <Loader2 size={14} className="animate-spin" />
                    <span>Charles écrit…</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleSend();
                }}
                className="flex items-center gap-2 border-t-[1.5px] border-ink p-3"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isWaitingReply}
                  placeholder="Écris ton message…"
                  aria-label="Ton message pour Charles"
                  className="flex-1 border-[1.5px] border-ink bg-cream-2 px-3 py-2 font-mono text-[13px] text-ink placeholder:text-ink-4 focus:border-orange focus:outline-none disabled:opacity-50"
                />
                <Button
                  type="submit"
                  variant="ink"
                  size="sm"
                  icon={<Send size={16} />}
                  loading={isWaitingReply}
                  disabled={!input.trim()}
                  aria-label="Envoyer le message"
                />
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
