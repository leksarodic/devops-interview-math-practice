import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isUserPage = repositoryName.endsWith('.github.io');
const basePath = isGitHubPages && repositoryName && !isUserPage ? `/${repositoryName}` : '';

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  }
];

const nextConfig: NextConfig = {
  output: isGitHubPages ? 'export' : 'standalone',
  poweredByHeader: false,
  trailingSlash: isGitHubPages,
  images: {
    unoptimized: isGitHubPages
  },
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  ...(isGitHubPages
    ? {}
    : {
        async headers() {
          return [
            {
              source: '/:path*',
              headers: securityHeaders
            }
          ];
        }
      })
};

export default nextConfig;
