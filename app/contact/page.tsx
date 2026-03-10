import Link from 'next/link';

export const metadata = {
  title: 'Contact',
  description: 'Contact page for DevOps Interview Math Practice.'
};

export default function ContactPage() {
  return (
    <main className="grid" style={{ gap: '16px' }}>
      <section className="panel">
        <h1 className="page-title">Contact</h1>
        <p className="subtitle">Questions, feedback, corrections, or partnership inquiries.</p>
      </section>

      <section className="panel grid" style={{ gap: '12px' }}>
        <p>
          For this deployment, contact the site owner using the public channel listed in your project or repository profile.
        </p>
        <p>
          If you found a problem in a question or explanation, include the question ID (for example, <strong>q064</strong>) so it can be fixed quickly.
        </p>
        <p>
          For content discussions on specific questions, you can also use the comments section on each question page.
        </p>
      </section>

      <section className="actions">
        <Link href="/questions" className="btn btn-secondary">Browse questions</Link>
        <Link href="/" className="btn btn-primary">Back home</Link>
      </section>
    </main>
  );
}
