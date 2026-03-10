import Link from 'next/link';

export default function TermsOfUsePage() {
  return (
    <main className="grid" style={{ gap: '16px' }}>
      <section className="panel">
        <h1 className="page-title">Terms of Use</h1>
        <p className="subtitle">Last updated: March 10, 2026</p>
      </section>

      <section className="panel grid" style={{ gap: '12px' }}>
        <p>
          This app is provided for interview practice and educational use.
        </p>
        <p>
          Content is provided as-is, without warranties of accuracy, availability, or fitness for a specific purpose.
        </p>
        <p>
          You are responsible for how you use any practice results and for verifying critical calculations in real environments.
        </p>
        <p>
          You may modify and deploy this project for internal or personal use.
        </p>
        <p>
          The maintainers are not liable for direct or indirect damages arising from use of this application.
        </p>
      </section>

      <section className="actions">
        <Link href="/" className="btn btn-primary">Back home</Link>
      </section>
    </main>
  );
}
