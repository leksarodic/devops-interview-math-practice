import { TopicKey } from './types';

export const TOPIC_LABELS: Record<TopicKey, string> = {
  basic_arithmetic: 'Basic arithmetic',
  percentages: 'Percentages',
  ratios_proportions: 'Ratios and proportions',
  linear_equations: 'Simple linear equations',
  number_sequences: 'Number sequences and patterns',
  combinatorics: 'Basic combinatorics',
  probability: 'Basic probability',
  statistics: 'Basic statistics',
  exponents: 'Exponents and powers',
  logarithms: 'Logarithms',
  binary_numbers: 'Binary numbers',
  data_size_units: 'Data size units',
  data_transfer_speeds: 'Data transfer speeds',
  time_rate: 'Time and rate calculations',
  capacity_scaling: 'Capacity and system scaling',
  graph_interpretation: 'Basic graph interpretation'
};

export const TOPIC_KEYS = Object.keys(TOPIC_LABELS) as TopicKey[];
