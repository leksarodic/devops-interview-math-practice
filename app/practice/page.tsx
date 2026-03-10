'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS } from '@/data/questions';
import { TOPIC_KEYS, TOPIC_LABELS } from '@/lib/topics';
import { TopicKey } from '@/lib/types';
import { getHistory, getMistakeQuestionIds } from '@/lib/storage';

export default function PracticePage() {
  const router = useRouter();
  const [selectedTopics, setSelectedTopics] = useState<TopicKey[]>([...TOPIC_KEYS]);
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);

  useEffect(() => {
    setMistakesCount(getMistakeQuestionIds().length);
    setHistoryCount(getHistory().length);
  }, []);

  const availableCount = useMemo(() => {
    if (selectedTopics.length === 0) return 0;
    const set = new Set(selectedTopics);
    return QUESTIONS.filter((q) => set.has(q.topic)).length;
  }, [selectedTopics]);

  const toggleTopic = (topic: TopicKey) => {
    setSelectedTopics((current) => {
      if (current.includes(topic)) {
        return current.filter((t) => t !== topic);
      }
      return [...current, topic];
    });
  };

  const selectAll = () => setSelectedTopics([...TOPIC_KEYS]);

  const startQuiz = () => {
    if (selectedTopics.length === 0) return;
    const params = new URLSearchParams();
    params.set('topics', selectedTopics.join(','));
    params.set('count', String(Math.max(1, Math.min(questionCount, availableCount))));
    params.set('mode', 'normal');
    router.push(`/quiz?${params.toString()}`);
  };

  return (
    <main className="grid" style={{ gap: '16px' }}>
      <section className="panel">
        <h1 className="page-title">Build a practice session</h1>
        <p className="subtitle">Choose topics and how many questions to include.</p>
      </section>

      <section className="panel">
        <div className="actions" style={{ marginBottom: '12px' }}>
          <button type="button" className="btn btn-secondary" onClick={selectAll}>
            Select all topics
          </button>
        </div>

        <div className="topics-grid">
          {TOPIC_KEYS.map((topic) => (
            <label key={topic} className="topic-pill">
              <input
                type="checkbox"
                checked={selectedTopics.includes(topic)}
                onChange={() => toggleTopic(topic)}
                aria-label={TOPIC_LABELS[topic]}
              />
              <span>{TOPIC_LABELS[topic]}</span>
            </label>
          ))}
        </div>

        <div className="field" style={{ marginTop: '16px' }}>
          <label htmlFor="questionCount">Questions per session</label>
          <input
            id="questionCount"
            type="number"
            min={1}
            max={Math.max(1, availableCount)}
            value={questionCount}
            onChange={(event) => setQuestionCount(Number(event.target.value) || 1)}
          />
          <small className="subtitle">Available from selected topics: {availableCount}</small>
        </div>

        <div className="actions">
          <button type="button" className="btn btn-primary" onClick={startQuiz} disabled={selectedTopics.length === 0 || availableCount === 0}>
            Start quiz
          </button>
          <Link href="/study" className="btn btn-secondary">
            Study mode
          </Link>
        </div>
      </section>

      <section className="grid grid-2">
        <article className="panel">
          <h2>Review mistakes</h2>
          <p className="subtitle">Saved mistakes: {mistakesCount}</p>
          <Link href="/review" className="btn btn-secondary">
            Open mistakes
          </Link>
        </article>
        <article className="panel">
          <h2>Result history</h2>
          <p className="subtitle">Saved sessions: {historyCount}</p>
          <Link href="/results" className="btn btn-secondary">
            View last result
          </Link>
        </article>
      </section>
    </main>
  );
}
