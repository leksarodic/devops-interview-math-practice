export type Difficulty = 'easy' | 'medium';

export type AnswerType = 'multiple_choice' | 'numeric';

export type TopicKey =
  | 'basic_arithmetic'
  | 'percentages'
  | 'ratios_proportions'
  | 'linear_equations'
  | 'number_sequences'
  | 'combinatorics'
  | 'probability'
  | 'statistics'
  | 'exponents'
  | 'logarithms'
  | 'binary_numbers'
  | 'data_size_units'
  | 'data_transfer_speeds'
  | 'time_rate'
  | 'capacity_scaling'
  | 'graph_interpretation';

export interface Question {
  id: string;
  topic: TopicKey;
  difficulty: Difficulty;
  question: string;
  answerType: AnswerType;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  tolerance?: number;
}

export interface QuizConfig {
  topics: TopicKey[];
  questionCount: number;
  mode: 'normal' | 'mistakes';
}

export interface MistakeRecord {
  questionId: string;
  selectedAnswer: string;
  timestamp: string;
}

export interface SessionResult {
  total: number;
  correct: number;
  wrong: number;
  percentage: number;
  durationSeconds: number;
  topicStats: Record<TopicKey, { correct: number; total: number }>;
  finishedAt: string;
}
