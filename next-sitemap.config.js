/** @type {import('next-sitemap').IConfig} */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// --- lastmod réel ---------------------------------------------------------
// Google ignore un lastmod identique sur toutes les URL. On utilise :
//  - la date de publication pour les articles (src/mocks/blog.ts) ;
//  - la date du dernier commit des fichiers sources pour les autres pages.
const MONTHS = {
  janvier: '01', fevrier: '02', mars: '03', avril: '04', mai: '05', juin: '06',
  juillet: '07', aout: '08', septembre: '09', octobre: '10', novembre: '11', decembre: '12',
};

function frToIso(d) {
  const m = d.trim().match(/^(\d{1,2})\s+(\S+)\s+(\d{4})$/);
  if (!m) return undefined;
  const month = MONTHS[m[2].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()];
  return month ? `${m[3]}-${month}-${m[1].padStart(2, '0')}` : undefined;
}

function blogDates() {
  const src = fs.readFileSync(path.join(__dirname, 'src/mocks/blog.ts'), 'utf8');
  const dates = {};
  const re = /\n\s{4}id: (\d+),\s*\n(?:\s{4}slug: "([^"]+)",\s*\n)?[\s\S]*?\n\s{4}date: "([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const iso = frToIso(m[3]);
    if (iso && m[2]) dates[`/blog/${m[2]}`] = iso;
  }
  return dates;
}

function gitDate(files) {
  try {
    const out = execSync(`git log -1 --format=%cI -- ${files.map((f) => `"${f}"`).join(' ')}`, {
      cwd: __dirname,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return out || undefined;
  } catch {
    return undefined;
  }
}

const BLOG_DATES = blogDates();
const LATEST_POST = Object.values(BLOG_DATES).sort().pop();

const SOURCES = [
  [/^\/$/, ['src/app/page.tsx', 'src/mocks/home.ts']],
  [/^\/about$/, ['src/app/about', 'src/mocks/about.ts']],
  [/^\/contact$/, ['src/app/contact']],
  [/^\/services$/, ['src/app/services/page.tsx', 'src/mocks/services.ts']],
  [/^\/services\/.+/, ['src/app/services/[slug]', 'src/mocks/serviceDetails.ts']],
  [/^\/agence-lead-generation$/, ['src/app/agence-lead-generation/page.tsx']],
  [/^\/agence-lead-generation\/.+/, ['src/app/agence-lead-generation/[slug]', 'src/mocks/agencies.ts']],
];

function lastmodFor(loc) {
  const p = loc.replace(/\/$/, '') || '/';
  if (BLOG_DATES[p]) return BLOG_DATES[p];
  if (p === '/blog') return LATEST_POST;
  const hit = SOURCES.find(([re]) => re.test(p));
  return hit ? gitDate(hit[1]) : undefined;
}

module.exports = {
  siteUrl: 'https://nana-intelligence.fr',
  generateRobotsTxt: true,
  outDir: 'out',
  autoLastmod: false,
  exclude: ['/merci', '/design-system', '/icon.png', '/404', '/rdv-audit-seo', '/dummy'],
  transform: async (config, path) => {
    // Ne pas inclure les anciens identifiants numériques dans le sitemap XML
    if (/^\/blog\/\d+\/?$/.test(path)) {
      return null;
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: lastmodFor(path),
    };
  },
};
