import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { alternates: { canonical: "/merci/" }, title: "Merci ! Audit reçu | Nana", description: "Demande d'audit bien reçue. Réponse sous 24h.", robots: { index: false, follow: false } };
export default function Merci() {
  return (<main style={{padding:"80px 24px",textAlign:"center"}}><h1>Merci, demande bien reçue.</h1><p>On revient vers vous sous 24h.</p><Link href="/">Retour accueil</Link></main>);
}
