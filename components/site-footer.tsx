import Link from 'next/link';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="site-footer-inner">
        <p className="site-footer-copy">© {year} DevOps Interview Math Practice</p>
        <div className="site-footer-links-wrap">
          <nav className="site-footer-links" aria-label="Legal links">
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
