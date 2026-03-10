import { MistakeRecord, SessionResult, TopicKey } from '@/lib/types';

const MISTAKES_KEY = 'math_practice_mistakes';
const HISTORY_KEY = 'math_practice_history';
const LAST_RESULT_KEY = 'math_practice_last_result';

const parseJSON = <T,>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const getMistakes = (): MistakeRecord[] => {
  if (typeof window === 'undefined') return [];
  return parseJSON<MistakeRecord[]>(window.localStorage.getItem(MISTAKES_KEY), []);
};

export const addMistake = (entry: MistakeRecord): void => {
  if (typeof window === 'undefined') return;
  const mistakes = getMistakes();
  mistakes.push(entry);
  window.localStorage.setItem(MISTAKES_KEY, JSON.stringify(mistakes));
};

export const clearMistakes = (): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(MISTAKES_KEY);
};

export const getMistakeQuestionIds = (): string[] => {
  const mistakes = getMistakes();
  const set = new Set(mistakes.map((m) => m.questionId));
  return [...set];
};

export const removeResolvedMistake = (questionId: string): void => {
  if (typeof window === 'undefined') return;
  const mistakes = getMistakes().filter((m) => m.questionId !== questionId);
  window.localStorage.setItem(MISTAKES_KEY, JSON.stringify(mistakes));
};

export const pushHistory = (result: SessionResult): void => {
  if (typeof window === 'undefined') return;
  const history = parseJSON<SessionResult[]>(window.localStorage.getItem(HISTORY_KEY), []);
  history.unshift(result);
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
};

export const getHistory = (): SessionResult[] => {
  if (typeof window === 'undefined') return [];
  return parseJSON<SessionResult[]>(window.localStorage.getItem(HISTORY_KEY), []);
};

export const clearHistory = (): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(HISTORY_KEY);
  window.localStorage.removeItem(LAST_RESULT_KEY);
};

export const setLastResult = (result: SessionResult): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(result));
};

export const getLastResult = (): SessionResult | null => {
  if (typeof window === 'undefined') return null;
  return parseJSON<SessionResult | null>(window.localStorage.getItem(LAST_RESULT_KEY), null);
};

export const initTopicStats = (topics: TopicKey[]): Record<TopicKey, { correct: number; total: number }> => {
  const base = {
    basic_arithmetic: { correct: 0, total: 0 },
    percentages: { correct: 0, total: 0 },
    ratios_proportions: { correct: 0, total: 0 },
    linear_equations: { correct: 0, total: 0 },
    number_sequences: { correct: 0, total: 0 },
    combinatorics: { correct: 0, total: 0 },
    probability: { correct: 0, total: 0 },
    statistics: { correct: 0, total: 0 },
    exponents: { correct: 0, total: 0 },
    logarithms: { correct: 0, total: 0 },
    binary_numbers: { correct: 0, total: 0 },
    data_size_units: { correct: 0, total: 0 },
    data_transfer_speeds: { correct: 0, total: 0 },
    time_rate: { correct: 0, total: 0 },
    capacity_scaling: { correct: 0, total: 0 },
    graph_interpretation: { correct: 0, total: 0 }
  } as Record<TopicKey, { correct: number; total: number }>;

  for (const topic of topics) {
    base[topic] = { correct: 0, total: 0 };
  }

  return base;
};
