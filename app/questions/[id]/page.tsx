import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { QUESTIONS, QUESTION_MAP } from '@/data/questions';
import { TOPIC_LABELS } from '@/lib/topics';
import { QuestionComments } from '@/components/question-comments';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export function generateStaticParams() {
  return QUESTIONS.map((q) => ({ id: q.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const question = QUESTION_MAP.get(id);
  if (!question) {
    return { title: 'Question Not Found' };
  }

  return {
    title: `${question.question.slice(0, 70)}${question.question.length > 70 ? '...' : ''}`,
    description: `Topic: ${TOPIC_LABELS[question.topic]}. Practice question with answer and explanation.`,
    alternates: {
      canonical: `${siteUrl}/questions/${question.id}`
    },
    openGraph: {
      title: `Math Interview Question ${question.id.toUpperCase()}`,
      description: question.question,
      url: `${siteUrl}/questions/${question.id}`,
      type: 'article'
    }
  };
}

export default async function QuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const question = QUESTION_MAP.get(id);

  if (!question) {
    notFound();
  }

  const questionSchema = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: question.question,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${String(question.correctAnswer)}. ${question.explanation}`
      }
    }
  };

  return (
    <main className="grid" style={{ gap: '16px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(questionSchema) }} />

      <section className="panel">
        <div className="actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="badge">{TOPIC_LABELS[question.topic]}</span>
          <span className="badge">{question.difficulty}</span>
        </div>
        <h1 className="page-title" style={{ marginTop: '10px' }}>Question {question.id.toUpperCase()}</h1>
        <p
          style={{
            fontSize: '1.35rem',
            fontWeight: 700,
            lineHeight: 1.45,
            marginBottom: 0,
            marginTop: '10px',
            padding: '12px 14px',
            borderRadius: '12px',
            background: 'var(--chip)'
          }}
        >
          {question.question}
        </p>
      </section>

      <section className="panel">
        <h2 style={{ marginTop: 0 }}>Answer</h2>
        {question.answerType === 'multiple_choice' && question.options ? (
          <ol style={{ listStyle: 'none', padding: 0, margin: '0 0 14px 0', display: 'grid', gap: '8px' }}>
            {question.options.map((opt, idx) => {
              const isCorrectOption = opt === String(question.correctAnswer);
              return (
                <li
                  key={opt}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: `1px solid ${isCorrectOption ? 'var(--accent)' : 'var(--line)'}`,
                    background: isCorrectOption ? 'color-mix(in srgb, var(--accent) 18%, transparent)' : 'var(--panel)',
                    fontWeight: isCorrectOption ? 700 : 500
                  }}
                >
                  {idx + 1}. {opt} {isCorrectOption ? '✓' : ''}
                </li>
              );
            })}
          </ol>
        ) : null}
        <p><strong>Correct answer:</strong> {String(question.correctAnswer)}</p>
        <p className="subtitle" style={{ marginBottom: 0 }}>{question.explanation}</p>
      </section>

      <section className="actions">
        <Link href="/questions" className="btn btn-secondary">Back to all questions</Link>
        <Link href="/practice" className="btn btn-primary">Practice now</Link>
      </section>

      <QuestionComments questionId={question.id} />
    </main>
  );
}
