/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Si vous déployez sur une sous-page (ex: jimmyjoe13.github.io/Nana-intelligence/)
  // décommentez les lignes ci-dessous. Mais pour un domaine custom, pas besoin.
  // basePath: '/Nana-intelligence',
  // assetPrefix: '/Nana-intelligence',
};

export default nextConfig;
