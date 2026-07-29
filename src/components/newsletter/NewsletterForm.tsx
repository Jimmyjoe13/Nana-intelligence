"use client";

import React, { useState, useCallback } from "react";
import { Box } from "@/components/ui/Box";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

const WEBHOOK_URL =
  "https://n8n.nana-intelligence.fr/webhook/0182624b-bac0-4b3b-a258-8b62f851b5df";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const trimmed = email.trim();

      if (!trimmed || !EMAIL_REGEX.test(trimmed)) {
        setStatus("error");
        setErrorMessage("Veuillez entrer une adresse email valide.");
        return;
      }

      setStatus("loading");
      setErrorMessage("");

      try {
        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source: "newsletter", email: trimmed }),
        });

        if (!res.ok) {
          throw new Error(`Erreur serveur (${res.status})`);
        }

        setStatus("success");
        setEmail("");

        trackEvent("newsletter_subscribe", {
          event_category: "newsletter",
          event_label: "blog_page",
        });
      } catch {
        setStatus("error");
        setErrorMessage(
          "Une erreur est survenue. Veuillez réessayer."
        );
      }
    },
    [email]
  );

  if (status === "success") {
    return (
      <Box className="p-10 flex flex-col gap-6 bg-cream border-ink items-center text-center">
        <span className="font-mono text-[11px] text-orange uppercase tracking-[0.2em] font-bold">
          ✓ Confirmé
        </span>
        <p className="font-sans text-lg text-ink-2">
          Bienvenue dans le cercle. Vous recevrez notre prochaine analyse
          directement dans votre boîte.
        </p>
      </Box>
    );
  }

  return (
    <Box className="p-10 flex flex-col gap-6 bg-cream border-ink">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[11px] font-bold uppercase text-ink">
            Email Professionnel
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") {
                setStatus("idle");
                setErrorMessage("");
              }
            }}
            placeholder="VOTRE@ENTREPRISE.AI"
            className="w-full bg-cream-2 border-[1.5px] border-ink px-4 py-4 font-mono text-[12px] focus:outline-none focus:border-orange transition-colors"
            required
            aria-invalid={status === "error" ? "true" : undefined}
          />
          {status === "error" && errorMessage && (
            <p className="font-mono text-[11px] text-red-600 uppercase tracking-wide">
              {errorMessage}
            </p>
          )}
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full text-ink"
          loading={status === "loading"}
        >
          M&apos;abonner à l&apos;ingénierie
        </Button>
        <p className="text-[10px] text-ink-4 font-mono uppercase text-center">
          ZÉRO SPAM. DÉSINSCRIPTION EN 1 CLIC.
        </p>
      </form>
    </Box>
  );
}
