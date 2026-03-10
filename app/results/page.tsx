'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { clearHistory, getHistory, getLastResult } from '@/lib/storage';
import { TOPIC_KEYS, TOPIC_LABELS } from '@/lib/topics';
import { SessionResult } from '@/lib/types';

const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
};

const formatDate = (iso: string): string => {
  const date = new Date(iso);
  return date.toLocaleString();
};

const getWeakTopics = (result: SessionResult): Array<{ topic: (typeof TOPIC_KEYS)[number]; pct: number }> => {
  return TOPIC_KEYS
    .map((topic) => {
      const stat = result.topicStats[topic];
      if (!stat || stat.total === 0) return null;
      const pct = (stat.correct / stat.total) * 100;
      return { topic, pct };
    })
    .filter((item): item is { topic: (typeof TOPIC_KEYS)[number]; pct: number } => Boolean(item))
    .filter((item) => item.pct < 70)
    .sort((a, b) => a.pct - b.pct);
};

export default function ResultsPage() {
  const [history, setHistory] = useState<SessionResult[]>([]);
  const [fromMode, setFromMode] = useState('normal');
  const [topics, setTopics] = useState('');
  const [count, setCount] = useState('20');

  useEffect(() => {
    const storedHistory = getHistory();
    const latest = getLastResult();

    if (storedHistory.length > 0) {
      setHistory(storedHistory);
    } else if (latest) {
      setHistory([latest]);
    }

    const params = new URLSearchParams(window.location.search);
    setFromMode(params.get('fromMode') ?? 'normal');
    setTopics(params.get('topics') ?? '');
    setCount(params.get('count') ?? '20');
  }, []);

  const latestResult = history[0] ?? null;

  const latestWeakTopics = useMemo(() => {
    if (!latestResult) return [];
    return getWeakTopics(latestResult);
  }, [latestResult]);

  const clearAllHistory = () => {
    clearHistory();
    setHistory([]);
  };

  if (!latestResult) {
    return (
      <main className="grid" style={{ gap: '16px' }}>
        <section className="panel">
          <h1 className="page-title">No result yet</h1>
          <p className="subtitle">Run a quiz to generate your first result summary.</p>
          <Link href="/practice" className="btn btn-primary">Start practice</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="grid" style={{ gap: '16px' }}>
      <section className="panel">
        <span className="badge">Latest Session</span>
        <h1 className="page-title" style={{ marginTop: '10px' }}>Results history</h1>
        <p className="subtitle">
          Most recent test: {formatDate(latestResult.finishedAt)} · Finished in {formatDuration(latestResult.durationSeconds)}
        </p>
      </section>

      <section className="grid grid-2">
        <article className="panel"><h3>Total questions</h3><p>{latestResult.total}</p></article>
        <article className="panel"><h3>Correct answers</h3><p className="result-ok">{latestResult.correct}</p></article>
        <article className="panel"><h3>Wrong answers</h3><p className="result-bad">{latestResult.wrong}</p></article>
        <article className="panel"><h3>Score</h3><p><strong>{latestResult.percentage}%</strong></p></article>
      </section>

      <section className="panel">
        <h2>Weak topics (latest session)</h2>
        {latestWeakTopics.length === 0 ? (
          <p className="subtitle">No weak topics detected in the latest session.</p>
        ) : (
          <ul>
            {latestWeakTopics.map((item) => (
              <li key={item.topic}>{TOPIC_LABELS[item.topic]}: {item.pct.toFixed(0)}% correct</li>
            ))}
          </ul>
        )}
      </section>

      <section className="panel">
        <div className="actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>All test attempts ({history.length})</h2>
          <button type="button" className="btn btn-secondary" onClick={clearAllHistory}>Clear history</button>
        </div>

        <div className="table-scroll">
          <table className="table" aria-label="Quiz result history">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Score</th>
                <th>Correct</th>
                <th>Wrong</th>
                <th>Total</th>
                <th>Duration</th>
                <th>Weak topics</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, idx) => {
                const weak = getWeakTopics(entry).slice(0, 2);
                return (
                  <tr key={`${entry.finishedAt}-${idx}`}>
                    <td>{history.length - idx}</td>
                    <td>{formatDate(entry.finishedAt)}</td>
                    <td><strong>{entry.percentage}%</strong></td>
                    <td className="result-ok">{entry.correct}</td>
                    <td className="result-bad">{entry.wrong}</td>
                    <td>{entry.total}</td>
                    <td>{formatDuration(entry.durationSeconds)}</td>
                    <td>
                      {weak.length === 0
                        ? 'None'
                        : weak.map((item) => `${TOPIC_LABELS[item.topic]} (${item.pct.toFixed(0)}%)`).join(', ')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="actions">
        <Link href={`/quiz?topics=${topics}&count=${count}&mode=${fromMode}`} className="btn btn-primary">Retry same setup</Link>
        <Link href="/practice" className="btn btn-secondary">New setup</Link>
        <Link href="/review" className="btn btn-secondary">Review mistakes</Link>
      </section>
    </main>
  );
}
