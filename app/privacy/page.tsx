import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main className="grid" style={{ gap: '16px' }}>
      <section className="panel">
        <h1 className="page-title">Privacy Policy</h1>
        <p className="subtitle">Last updated: March 10, 2026</p>
      </section>

      <section className="panel grid" style={{ gap: '12px' }}>
        <p>
          This app is designed for local self-practice. We do not require account creation and we do not intentionally collect personal data.
        </p>
        <p>
          Quiz history, mistakes, and session results are stored only in your browser localStorage on your device.
        </p>
        <p>
          If you clear browser storage, your local progress data will be removed.
        </p>
        <p>
          This project does not use external analytics, advertising trackers, or third-party APIs by default.
        </p>
        <p>
          If you deploy this app yourself, you are responsible for your hosting setup, logs, and any additional services you enable.
        </p>
      </section>

      <section className="actions">
        <Link href="/" className="btn btn-primary">Back home</Link>
      </section>
    </main>
  );
}
