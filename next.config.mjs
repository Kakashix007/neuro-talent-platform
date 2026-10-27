const isGithubPages = process.env.GITHUB_PAGES === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isGithubPages ? 'export' : undefined,
  basePath: isGithubPages ? '/neuro-talent-platform' : '',
  assetPrefix: isGithubPages ? '/neuro-talent-platform/' : undefined,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
