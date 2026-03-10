'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { QUESTION_MAP } from '@/data/questions';
import { TOPIC_LABELS } from '@/lib/topics';
import { Question } from '@/lib/types';
import { clearMistakes, getMistakeQuestionIds } from '@/lib/storage';

const PAGE_SIZE = 10;

export default function ReviewPage() {
  const [mistakeQuestions, setMistakeQuestions] = useState<Question[]>([]);
  const [page, setPage] = useState(1);

  const loadMistakes = () => {
    const ids = getMistakeQuestionIds();
    const questions = ids
      .map((id) => QUESTION_MAP.get(id))
      .filter((q): q is Question => Boolean(q));
    setMistakeQuestions(questions);
    setPage(1);
  };

  useEffect(() => {
    loadMistakes();
  }, []);

  const clearAll = () => {
    clearMistakes();
    loadMistakes();
  };

  const totalPages = Math.max(1, Math.ceil(mistakeQuestions.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pagedQuestions = mistakeQuestions.slice(startIndex, startIndex + PAGE_SIZE);

  const changePage = (nextPage: number) => {
    const bounded = Math.max(1, Math.min(totalPages, nextPage));
    setPage(bounded);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="grid" style={{ gap: '16px' }}>
      <section className="panel">
        <h1 className="page-title">Review mistakes</h1>
        <p className="subtitle">Questions you previously answered incorrectly.</p>
        <p className="subtitle">
          Showing {pagedQuestions.length} of {mistakeQuestions.length} · Page {currentPage} of {totalPages}
        </p>
        <div className="actions" style={{ marginTop: '10px' }}>
          <Link href={`/quiz?mode=mistakes&topics=basic_arithmetic&count=${Math.max(mistakeQuestions.length, 1)}`} className="btn btn-primary">
            Quiz mistakes
          </Link>
          <button type="button" className="btn btn-secondary" onClick={clearAll}>Clear mistakes</button>
        </div>
      </section>

      {mistakeQuestions.length === 0 ? (
        <section className="panel">
          <p className="subtitle">No mistakes saved yet.</p>
          <Link href="/practice" className="btn btn-primary">Start practicing</Link>
        </section>
      ) : (
        pagedQuestions.map((q) => (
          <article key={q.id} className="panel">
            <span className="badge">{TOPIC_LABELS[q.topic]}</span>
            <p style={{ fontWeight: 600 }}>{q.question}</p>
            <p style={{ marginBottom: 4 }}><strong>Correct answer:</strong> {String(q.correctAnswer)}</p>
            <p className="subtitle" style={{ margin: 0 }}>{q.explanation}</p>
          </article>
        ))
      )}

      {mistakeQuestions.length > 0 ? (
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
      ) : null}

      <section className="actions">
        <Link href="/practice" className="btn btn-secondary">Back to setup</Link>
        <Link href="/study" className="btn btn-secondary">Study mode</Link>
      </section>
    </main>
  );
}
