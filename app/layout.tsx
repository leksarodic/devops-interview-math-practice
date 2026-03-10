import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteNav } from '@/components/site-nav';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'DevOps Interview Math Practice',
    template: '%s | DevOps Interview Math Practice'
  },
  description: 'Math practice for infrastructure, AWS, and operations interview prep.',
  keywords: ['aws interview', 'sre interview', 'operations math', 'infrastructure practice', 'mental math'],
  applicationName: 'DevOps Interview Math Practice',
  icons: {
    icon: '/icon.svg'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <SiteNav />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
