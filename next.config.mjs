/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // On ne met PAS de basePath pour que nana-intelligence.fr fonctionne à la racine.
  // L'aspect "sans style" sur jimmyjoe13.github.io/Nana-intelligence/ est normal 
  // car GitHub cherche le CSS à la racine du domaine .github.io.
  // Une fois le domaine custom actif, tout sera parfait.
};

export default nextConfig;
