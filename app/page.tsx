import Link from 'next/link';
import { QUESTIONS } from '@/data/questions';
import { TOPIC_KEYS } from '@/lib/topics';

export default function HomePage() {
  return (
    <main className="grid" style={{ gap: '18px' }}>
      <section className="panel" style={{ padding: '24px' }}>
        <span className="badge">Infrastructure Interview Prep</span>
        <h1 className="page-title" style={{ marginTop: '10px' }}>
          DevOps Interview Math Practice Platform
        </h1>
        <p className="subtitle">
          Practice quick math for AWS, operations, and SRE interviews. No login. No backend. Everything runs locally in your browser.
        </p>
        <div className="actions" style={{ marginTop: '18px' }}>
          <Link href="/practice" className="btn btn-primary">
            Start Practice
          </Link>
          <Link href="/questions" className="btn btn-secondary">
            Browse Question Pages
          </Link>
          <Link href="/study" className="btn btn-secondary">
            Study All Questions
          </Link>
          <Link href="/review" className="btn btn-secondary">
            Review Mistakes
          </Link>
        </div>
      </section>

      <section className="grid grid-2">
        <article className="panel">
          <h2>Question bank</h2>
          <p className="subtitle">{QUESTIONS.length} questions across {TOPIC_KEYS.length} topics.</p>
        </article>
        <article className="panel">
          <h2>Question types</h2>
          <p className="subtitle">Multiple choice and numeric answer with tolerance support.</p>
        </article>
        <article className="panel">
          <h2>Progress tracking</h2>
          <p className="subtitle">Score history, mistakes, and last result are stored in localStorage.</p>
        </article>
        <article className="panel">
          <h2>Study mode</h2>
          <p className="subtitle">Browse every question with answer and explanation before timed practice.</p>
        </article>
      </section>
    </main>
  );
}
