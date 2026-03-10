import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isUserPage = repositoryName.endsWith('.github.io');
const basePath = isGitHubPages && repositoryName && !isUserPage ? `/${repositoryName}` : '';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DevOps Interview Math Practice',
    short_name: 'DevOpsMath',
    description: 'Math practice platform for infrastructure, AWS, and operations interviews.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f3f5f9',
    theme_color: '#0f766e',
    icons: [
      {
        src: `${basePath}/icon.svg`,
        sizes: 'any',
        type: 'image/svg+xml'
      }
    ]
  };
}
