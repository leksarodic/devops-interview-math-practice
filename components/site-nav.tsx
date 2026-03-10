'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/practice', label: 'Practice' },
  { href: '/questions', label: 'Questions' },
  { href: '/study', label: 'Study' },
  { href: '/review', label: 'Mistakes' },
  { href: '/results', label: 'Results' }
];

export function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-nav-wrap ${isScrolled ? 'scrolled' : ''}`} aria-label="Top navigation">
      <nav className="site-nav">
        <div className="site-nav-top">
          <Link href="/" className="site-brand">DevOps Interview Math Practice</Link>
          <button
            type="button"
            className="site-nav-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-nav-links"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div id="primary-nav-links" className={`site-nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`site-nav-link ${active ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
