import Link from 'next/link';
import { QUESTIONS } from '@/data/questions';
import { TOPIC_KEYS, TOPIC_LABELS } from '@/lib/topics';

export const metadata = {
  title: 'Math Questions Library',
  description: 'Browse all infrastructure interview math questions by topic with detailed answers and explanations.'
};

export default function QuestionsPage() {
  return (
    <main className="grid" style={{ gap: '16px' }}>
      <section className="panel">
        <h1 className="page-title">Question Library</h1>
        <p className="subtitle">{QUESTIONS.length} indexed question pages grouped by topic.</p>
      </section>

      {TOPIC_KEYS.map((topic) => {
        const topicQuestions = QUESTIONS.filter((q) => q.topic === topic);
        return (
          <section key={topic} className="panel">
            <div className="actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: 0,
                  display: 'inline-block',
                  padding: '6px 10px',
                  borderRadius: '999px',
                  background: 'var(--chip)'
                }}
              >
                {TOPIC_LABELS[topic]}
              </h2>
              <span className="badge">{topicQuestions.length} questions</span>
            </div>
            <ol style={{ marginTop: '12px', paddingLeft: '22px', listStyle: 'decimal' }}>
              {topicQuestions.map((q) => (
                <li key={q.id} style={{ marginBottom: '8px' }}>
                  <Link href={`/questions/${q.id}`} style={{ fontWeight: 600 }}>
                    {q.question}
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </main>
  );
}
