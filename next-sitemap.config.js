/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nana-intelligence.fr',
  generateRobotsTxt: true,
  outDir: 'out',
  exclude: ['/design-system', '/icon.png', '/404', '/rdv-audit-seo', '/dummy'],
  transform: async (config, path) => {
    // Ne pas inclure les anciens identifiants numériques dans le sitemap XML
    if (/^\/blog\/\d+\/?$/.test(path)) {
      return null;
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
