'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Question, TopicKey } from '@/lib/types';
import { TOPIC_KEYS, TOPIC_LABELS } from '@/lib/topics';
import { buildSessionQuestions, isCorrectAnswer, withShuffledOptions } from '@/lib/quiz';
import { addMistake, initTopicStats, pushHistory, removeResolvedMistake, setLastResult } from '@/lib/storage';

interface SubmissionState {
  selectedAnswer: string;
  correct: boolean;
}

const parseTopics = (raw: string | null): TopicKey[] => {
  if (!raw) return [...TOPIC_KEYS];
  const candidates = raw.split(',').filter(Boolean);
  const valid = candidates.filter((topic): topic is TopicKey => TOPIC_KEYS.includes(topic as TopicKey));
  return valid.length > 0 ? valid : [...TOPIC_KEYS];
};

export default function QuizPage() {
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submission, setSubmission] = useState<SubmissionState | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [startedAt, setStartedAt] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [topicStats, setTopicStats] = useState(() => initTopicStats([...TOPIC_KEYS]));
  const [topics, setTopics] = useState<TopicKey[]>([...TOPIC_KEYS]);
  const [mode, setMode] = useState<'normal' | 'mistakes'>('normal');
  const [requestedCount, setRequestedCount] = useState(20);
  const [sessionKey, setSessionKey] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const parsedTopics = parseTopics(params.get('topics'));
    const parsedMode = params.get('mode') === 'mistakes' ? 'mistakes' : 'normal';
    const parsedCount = Number(params.get('count') ?? 20);

    setTopics(parsedTopics);
    setMode(parsedMode);
    setRequestedCount(Number.isFinite(parsedCount) ? parsedCount : 20);
  }, []);

  useEffect(() => {
    const storedMistakesRaw = window.localStorage.getItem('math_practice_mistakes');
    const storedMistakes = storedMistakesRaw ? (JSON.parse(storedMistakesRaw) as Array<{ questionId: string }>) : [];

    const mistakesOnlyIds =
      mode === 'mistakes'
        ? [...new Set(storedMistakes.map((m) => m.questionId))]
        : undefined;

    const sessionQuestions = buildSessionQuestions(topics, requestedCount, mistakesOnlyIds).map(withShuffledOptions);

    setQuestions(sessionQuestions);
    setIndex(0);
    setAnswer('');
    setSubmission(null);
    setCorrectCount(0);
    setStartedAt(Date.now());
    setTopicStats(initTopicStats([...TOPIC_KEYS]));
    setElapsedSeconds(0);
  }, [topics, requestedCount, mode, sessionKey]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [startedAt]);

  const currentQuestion = questions[index];
  const progress = questions.length ? (index / questions.length) * 100 : 0;

  const submitAnswer = useCallback(() => {
    if (!currentQuestion || !answer.trim() || submission) return;

    const correct = isCorrectAnswer(currentQuestion, answer);
    const selectedAnswer = answer.trim();

    setSubmission({ selectedAnswer, correct });

    setTopicStats((prev) => ({
      ...prev,
      [currentQuestion.topic]: {
        total: prev[currentQuestion.topic].total + 1,
        correct: prev[currentQuestion.topic].correct + (correct ? 1 : 0)
      }
    }));

    if (correct) {
      setCorrectCount((prev) => prev + 1);
      removeResolvedMistake(currentQuestion.id);
    } else {
      addMistake({
        questionId: currentQuestion.id,
        selectedAnswer,
        timestamp: new Date().toISOString()
      });
    }
  }, [currentQuestion, answer, submission]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!currentQuestion || submission) return;

      if (currentQuestion.answerType === 'multiple_choice' && currentQuestion.options) {
        const idx = Number(event.key) - 1;
        if (idx >= 0 && idx < currentQuestion.options.length) {
          setAnswer(currentQuestion.options[idx]);
        }
      }

      if (event.key === 'Enter' && answer.trim()) {
        event.preventDefault();
        submitAnswer();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentQuestion, submission, answer, submitAnswer]);

  const nextQuestion = () => {
    if (!submission) return;

    if (index + 1 < questions.length) {
      setIndex((prev) => prev + 1);
      setAnswer('');
      setSubmission(null);
      return;
    }

    const total = questions.length;
    const correct = correctCount;
    const wrong = total - correct;
    const percentage = total === 0 ? 0 : Number(((correct / total) * 100).toFixed(1));

    const result = {
      total,
      correct,
      wrong,
      percentage,
      durationSeconds: elapsedSeconds,
      topicStats,
      finishedAt: new Date().toISOString()
    };

    setLastResult(result);
    pushHistory(result);

    const params = new URLSearchParams();
    params.set('fromMode', mode);
    params.set('topics', topics.join(','));
    params.set('count', String(total));
    router.push(`/results?${params.toString()}`);
  };

  const restart = () => {
    setSessionKey((prev) => prev + 1);
  };

  if (!currentQuestion) {
    return (
      <main className="grid" style={{ gap: '16px' }}>
        <section className="panel">
          <h1 className="page-title">No questions available</h1>
          <p className="subtitle">Try changing topic filters or add more questions.</p>
          <div className="actions" style={{ marginTop: '14px' }}>
            <Link href="/practice" className="btn btn-primary">Back to setup</Link>
            <button type="button" className="btn btn-secondary" onClick={restart}>Try reload</button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="grid" style={{ gap: '16px' }}>
      <section className="panel">
        <div className="actions" style={{ justifyContent: 'space-between' }}>
          <span className="badge">{mode === 'mistakes' ? 'Review mistakes mode' : 'Practice mode'}</span>
          <span className="badge">Time: {elapsedSeconds}s</span>
        </div>
        <p className="subtitle" style={{ marginTop: '10px' }}>
          Question {index + 1} of {questions.length} · Topic: {TOPIC_LABELS[currentQuestion.topic]}
        </p>
        <div className="progress-wrap" aria-label="Quiz progress" style={{ marginTop: '10px' }}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </section>

      <section className="panel">
        <p style={{ fontSize: '1.1rem', marginTop: 0 }}>{currentQuestion.question}</p>

        {currentQuestion.answerType === 'multiple_choice' ? (
          <div>
            {currentQuestion.options?.map((option, idx) => (
              <button
                key={option}
                type="button"
                className={`btn btn-secondary answer-option ${answer === option ? 'selected' : ''}`}
                onClick={() => setAnswer(option)}
                aria-label={`Option ${idx + 1}: ${option}`}
              >
                {idx + 1}. {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="field">
            <label htmlFor="numericAnswer">Numeric answer</label>
            <input
              id="numericAnswer"
              type="text"
              inputMode="decimal"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Type a number"
            />
          </div>
        )}

        {!submission ? (
          <button type="button" className="btn btn-primary" onClick={submitAnswer} disabled={!answer.trim()}>
            Submit answer
          </button>
        ) : (
          <div className="grid" style={{ gap: '10px' }}>
            <p className={submission.correct ? 'result-ok' : 'result-bad'}>{submission.correct ? 'Correct.' : 'Incorrect.'}</p>
            <p style={{ margin: 0 }}>
              Correct answer: <strong>{String(currentQuestion.correctAnswer)}</strong>
            </p>
            <p className="subtitle" style={{ margin: 0 }}>{currentQuestion.explanation}</p>
            <button type="button" className="btn btn-primary" onClick={nextQuestion}>
              {index + 1 < questions.length ? 'Next question' : 'Finish quiz'}
            </button>
          </div>
        )}
      </section>

      <section className="actions">
        <button type="button" className="btn btn-secondary" onClick={restart}>Restart this quiz</button>
        <Link href="/practice" className="btn btn-secondary">Back to setup</Link>
      </section>
    </main>
  );
}
