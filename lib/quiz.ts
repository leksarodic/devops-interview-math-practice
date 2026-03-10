import { QUESTIONS, QUESTION_MAP } from '@/data/questions';
import { Question, TopicKey } from '@/lib/types';

export const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const getQuestionsByTopics = (topics: TopicKey[]): Question[] => {
  if (topics.length === 0) {
    return QUESTIONS;
  }
  const wanted = new Set(topics);
  return QUESTIONS.filter((q) => wanted.has(q.topic));
};

export const buildSessionQuestions = (
  topics: TopicKey[],
  questionCount: number,
  mistakesOnlyIds?: string[]
): Question[] => {
  const base = mistakesOnlyIds?.length
    ? mistakesOnlyIds.map((id) => QUESTION_MAP.get(id)).filter((q): q is Question => Boolean(q))
    : getQuestionsByTopics(topics);

  const shuffled = shuffle(base);
  return shuffled.slice(0, Math.max(1, Math.min(questionCount, shuffled.length)));
};

export const normalizeNumericInput = (input: string): number | null => {
  const parsed = Number(input.trim().replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
};

export const isCorrectAnswer = (question: Question, submitted: string): boolean => {
  if (question.answerType === 'multiple_choice') {
    return submitted.trim() === String(question.correctAnswer);
  }

  const parsed = normalizeNumericInput(submitted);
  if (parsed === null) {
    return false;
  }

  const expected = Number(question.correctAnswer);
  const tolerance = question.tolerance ?? 0;
  return Math.abs(parsed - expected) <= tolerance;
};

export const withShuffledOptions = (question: Question): Question => {
  if (question.answerType !== 'multiple_choice' || !question.options) {
    return question;
  }

  return {
    ...question,
    options: shuffle(question.options)
  };
};
