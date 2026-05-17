/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // GitHub Pages n'est pas à la racine du domaine jimmyjoe13.github.io
  // donc on ajoute le nom du repo sauf si le CNAME est actif.
  // Comme tu as un CNAME (nana-intelligence.fr), PAS de basePath.
};

export default nextConfig;
