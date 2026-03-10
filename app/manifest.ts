import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

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
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml'
      }
    ]
  };
}
