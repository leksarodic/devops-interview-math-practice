'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { QUESTIONS } from '@/data/questions';
import { TOPIC_KEYS, TOPIC_LABELS } from '@/lib/topics';
import { TopicKey } from '@/lib/types';

const PAGE_SIZE = 12;

export default function StudyPage() {
  const [topic, setTopic] = useState<'all' | TopicKey>('all');
  const [page, setPage] = useState(1);

  const visible = useMemo(
    () => (topic === 'all' ? QUESTIONS : QUESTIONS.filter((q) => q.topic === topic)),
    [topic]
  );

  useEffect(() => {
    setPage(1);
  }, [topic]);

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pagedQuestions = visible.slice(startIndex, startIndex + PAGE_SIZE);
  const changePage = (nextPage: number) => {
    const boundedPage = Math.max(1, Math.min(totalPages, nextPage));
    setPage(boundedPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="grid" style={{ gap: '16px' }}>
      <section className="panel">
        <h1 className="page-title">Study mode</h1>
        <p className="subtitle">Browse questions with answers and explanations.</p>
        <div className="field" style={{ maxWidth: '320px' }}>
          <label htmlFor="topic">Filter by topic</label>
          <select id="topic" value={topic} onChange={(event) => setTopic(event.target.value as 'all' | TopicKey)}>
            <option value="all">All topics</option>
            {TOPIC_KEYS.map((key) => (
              <option key={key} value={key}>{TOPIC_LABELS[key]}</option>
            ))}
          </select>
        </div>
        <p className="subtitle">
          Showing {pagedQuestions.length} of {visible.length} questions · Page {currentPage} of {totalPages}
        </p>
      </section>

      {pagedQuestions.map((q) => (
        <article key={q.id} className="panel">
          <div className="actions" style={{ justifyContent: 'space-between' }}>
            <span className="badge">{TOPIC_LABELS[q.topic]}</span>
            <span className="badge">{q.difficulty}</span>
          </div>
          <p style={{ fontWeight: 600 }}>
            <Link href={`/questions/${q.id}`}>{q.question}</Link>
          </p>
          {q.answerType === 'multiple_choice' && q.options ? (
            <ul>
              {q.options.map((opt) => (
                <li key={opt}>{opt}</li>
              ))}
            </ul>
          ) : null}
          <p style={{ marginBottom: 4 }}><strong>Answer:</strong> {String(q.correctAnswer)}</p>
          <p className="subtitle" style={{ margin: 0 }}>{q.explanation}</p>
        </article>
      ))}

      <section className="panel">
        <div className="actions pagination-actions" style={{ justifyContent: 'space-between' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous page
          </button>
          <span className="badge pagination-badge">Page {currentPage} / {totalPages}</span>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next page
          </button>
        </div>
      </section>

      <section className="actions">
        <Link href="/practice" className="btn btn-primary">Start quiz</Link>
        <Link href="/" className="btn btn-secondary">Home</Link>
      </section>
    </main>
  );
}
