import Link from "next/link";

// Table de redirection des anciennes URLs (soft redirect sur GitHub Pages)
// GitHub Pages ne supporte pas _redirects (format Cloudflare) : les anciennes
// URLs indexées doivent soit renvoyer 404 (après suppression des fichiers
// statiques shadow), soit être redirigées via cette page.
const REDIRECTS: Record<string, string> = {
  "/agence-lead-generation-marseille": "/agence-lead-generation/marseille/",
  "/agence-lead-generation-marseille/": "/agence-lead-generation/marseille/",
  "/agence-lead-generation-aix": "/agence-lead-generation/aix-en-provence/",
  "/agence-lead-generation-aix/": "/agence-lead-generation/aix-en-provence/",
  "/agence-lead-generation-toulon": "/agence-lead-generation/toulon/",
  "/agence-lead-generation-toulon/": "/agence-lead-generation/toulon/",
  "/agence-lead-generation/aix": "/agence-lead-generation/aix-en-provence/",
  "/agence-lead-generation/aix/": "/agence-lead-generation/aix-en-provence/",
  "/blog/scraping-b2b-nouvelle-prospection.html": "/blog/3/",
  "/blog/agence-prospection-b2b-marseille.html": "/agence-lead-generation/marseille/",
  "/scraper-b2b": "/services/",
  "/index.html": "/",
  "/about.html": "/about/",
  "/services.html": "/services/",
  "/contact.html": "/contact/",
  "/agence-lead-generation.html": "/agence-lead-generation/",
};

function normalizePath(p: string): string {
  // trailing slash insensitive pour le matching, on garde l'original
  let path = p;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path;
}

export default function NotFound() {
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    const target = REDIRECTS[path] ?? REDIRECTS[normalizePath(path)];
    if (target) {
      window.location.replace(target + window.location.search + window.location.hash);
      return null;
    }
  }

  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "4rem 1rem", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ fontSize: "4rem", fontWeight: 700, marginBottom: "1rem" }}>404</div>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Oups ! Cette page n&apos;existe pas.</h1>
      <p style={{ color: "#666", marginBottom: "2rem", maxWidth: "480px" }}>
        Le lien que vous avez suivi est peut-être cassé ou la page a été déplacée.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" style={{ padding: "0.75rem 1.5rem", background: "#f97316", color: "#fff", textDecoration: "none", borderRadius: "6px", fontWeight: 600 }}>
          Retour à l&apos;accueil
        </Link>
        <Link href="/agence-lead-generation/" style={{ padding: "0.75rem 1.5rem", border: "1px solid #333", color: "#333", textDecoration: "none", borderRadius: "6px", fontWeight: 600 }}>
          Voir nos services
        </Link>
      </div>
    </div>
  );
}
