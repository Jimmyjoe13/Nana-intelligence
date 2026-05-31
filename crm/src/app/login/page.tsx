"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Box } from "@/components/ui/Box";
import { Field } from "@/components/ui/Field";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-cream overflow-hidden">
      {/* Left side: Editorial */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-20 border-r-[1.5px] border-ink">       
        <div className="flex flex-col gap-2">
          <span className="font-display text-[24px] font-medium text-ink">N. Intelligence</span>
          <div className="h-[1.5px] w-12 bg-orange" />
        </div>

        <div className="flex flex-col gap-8">
          <h1 className="font-display text-[64px] leading-[0.95] tracking-tight text-ink">
            La prospection est une <em className="italic text-orange font-normal">science</em>, pas un art.     
          </h1>
          <p className="font-sans text-xl text-ink-2 max-w-md leading-relaxed">
            Optimisez chaque étape de votre tunnel de vente avec une précision chirurgicale.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-hand text-[24px] text-orange transform -rotate-2">
            &quot;Nana a doublé notre volume de RDV en 3 mois.&quot;
          </p>
          <span className="font-mono text-[11px] text-ink-3 uppercase tracking-widest">
            — Marc, CEO @ Agence Flux
          </span>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-10 bg-cream-2">
        <Box className="w-full max-w-md p-12 flex flex-col gap-10 bg-cream shadow-none">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-[32px] font-medium leading-none">Connexion</h2>
            <p className="text-ink-3 text-sm">Entrez vos accès pour accéder au CRM.</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <Field 
              label="Email professionnel" 
              type="email" 
              placeholder="nom@entreprise.ai" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="flex flex-col gap-2">
               <Field 
                label="Mot de passe" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
               />
               <Link href="#" className="font-mono text-[10px] text-ink-3 hover:text-orange text-right uppercase tracking-wider">Mot de passe oublié ?</Link>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 p-3 text-red-600 text-xs font-mono">
                {error}
              </div>
            )}

            <Button 
              type="submit"
              variant="primary" 
              className="w-full" 
              disabled={loading}
              icon={loading ? <Loader2 className="animate-spin" size={18} /> : <ArrowRight size={18} />}
            >
              {loading ? "Connexion..." : "Accéder au Dashboard"}
            </Button>
          </form>

          <div className="pt-10 border-t border-cream-3 flex flex-col gap-4 items-center">
            <span className="text-xs text-ink-4">Pas encore client ?</span>
            <Button variant="ghost" size="sm" className="w-full">Demander un audit gratuit</Button>
          </div>
        </Box>
      </div>
    </div>
  );
}
