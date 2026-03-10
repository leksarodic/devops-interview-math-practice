import { Question } from '@/lib/types';

const mc = (
  id: string,
  topic: Question['topic'],
  difficulty: Question['difficulty'],
  question: string,
  options: string[],
  correctAnswer: string,
  explanation: string
): Question => ({
  id,
  topic,
  difficulty,
  question,
  answerType: 'multiple_choice',
  options,
  correctAnswer,
  explanation
});

const num = (
  id: string,
  topic: Question['topic'],
  difficulty: Question['difficulty'],
  question: string,
  correctAnswer: number,
  explanation: string,
  tolerance = 0
): Question => ({
  id,
  topic,
  difficulty,
  question,
  answerType: 'numeric',
  correctAnswer,
  explanation,
  tolerance
});

export const QUESTIONS: Question[] = [
  // 1) Basic arithmetic
  num('q001', 'basic_arithmetic', 'easy', 'A server handled 48 requests in minute 1 and 37 in minute 2. Total requests?', 85, '48 + 37 = 85.'),
  num('q002', 'basic_arithmetic', 'easy', 'A queue has 120 jobs. 47 finish. How many remain?', 73, '120 - 47 = 73.'),
  num('q003', 'basic_arithmetic', 'easy', 'Each node serves 18 requests per second. 6 nodes serve how many in total?', 108, '18 x 6 = 108.'),
  num('q004', 'basic_arithmetic', 'easy', 'A 96 GB snapshot is split equally across 8 files. Size per file (GB)?', 12, '96 / 8 = 12.'),
  num('q005', 'basic_arithmetic', 'medium', 'What is 3/4 of 200?', 150, '200 x 3/4 = 150.'),
  num('q006', 'basic_arithmetic', 'medium', 'Convert 5/8 to a percentage.', 62.5, '5 / 8 = 0.625 = 62.5%.', 0.01),
  num('q007', 'basic_arithmetic', 'medium', 'Add the decimals: 2.75 + 0.48 + 1.2', 4.43, '2.75 + 0.48 + 1.2 = 4.43.', 0.01),

  // 2) Percentages
  num('q008', 'percentages', 'easy', 'What is 15% of 200?', 30, '0.15 x 200 = 30.'),
  num('q009', 'percentages', 'easy', 'A CPU load rises from 40% to 55%. Increase in percentage points?', 15, '55 - 40 = 15 percentage points.'),
  num('q010', 'percentages', 'medium', 'Storage usage increases from 400 GB to 500 GB. Percentage increase?', 25, '(100/400) x 100 = 25%.'),
  num('q011', 'percentages', 'medium', 'Latency drops from 80 ms to 60 ms. Percentage decrease?', 25, '(20/80) x 100 = 25% decrease.'),
  num('q012', 'percentages', 'medium', 'A service gets +20% traffic then -10%. Net change (%)?', 8, '1.2 x 0.9 = 1.08, so +8%.'),
  mc('q013', 'percentages', 'easy', 'Which is equal to 0.75?', ['7.5%', '75%', '0.075%', '750%'], '75%', '0.75 = 75/100 = 75%.'),
  num('q014', 'percentages', 'medium', 'Error rate goes from 2% to 1.5%. Relative decrease (%)?', 25, '(0.5/2) x 100 = 25% decrease.'),

  // 3) Ratios and proportions
  mc('q015', 'ratios_proportions', 'easy', 'If server A:B capacity ratio is 2:3 and A=200 rps, B is:', ['250 rps', '300 rps', '350 rps', '400 rps'], '300 rps', '1 ratio unit is 100, so B = 3 x 100.'),
  num('q016', 'ratios_proportions', 'easy', 'A recipe uses 4 GB logs for 2 days. For 5 days at same rate, GB needed?', 10, 'Direct proportion: 4/2 = 2 GB/day, for 5 days -> 10 GB.'),
  num('q017', 'ratios_proportions', 'medium', '6 servers process a batch in 10 min. With same efficiency, 12 servers take how many minutes?', 5, 'Inverse proportion: doubling servers halves time.'),
  num('q018', 'ratios_proportions', 'medium', 'If requests to API:DB are 5:2 and API got 900 calls, DB got how many?', 360, '900/5 = 180 per ratio unit; 2 x 180 = 360.'),
  mc('q019', 'ratios_proportions', 'easy', 'Scale factor from 200 users to 500 users is:', ['1.5', '2.0', '2.5', '3.0'], '2.5', '500 / 200 = 2.5.'),
  num('q020', 'ratios_proportions', 'medium', 'A 3:4 ratio sums to 140. Smaller part is?', 60, 'Total parts=7, one part=20, smaller=3 x 20=60.'),
  num('q021', 'ratios_proportions', 'medium', 'Bandwidth split is 1:3 between two services with total 800 Mbps. Larger share?', 600, 'Total parts 4, each 200, larger 3 x 200 = 600 Mbps.'),

  // 4) Linear equations
  num('q022', 'linear_equations', 'easy', 'Solve: 3x + 6 = 21. x = ?', 5, '3x = 15 so x = 5.'),
  num('q023', 'linear_equations', 'easy', 'Solve: 7x = 56. x = ?', 8, 'x = 56/7 = 8.'),
  num('q024', 'linear_equations', 'medium', 'Solve: 5x + 10 = 3x + 26. x = ?', 8, '2x = 16 so x = 8.'),
  num('q025', 'linear_equations', 'medium', 'If 12 + x = 3x, x = ?', 6, '12 = 2x so x = 6.'),
  num('q026', 'linear_equations', 'medium', 'A node has base 40 rps plus 15rps per worker. Total is 115 rps. Workers?', 5, '40 + 15w = 115 => 15w = 75 => w = 5.'),
  num('q027', 'linear_equations', 'easy', 'Solve: 2x - 4 = 10. x = ?', 7, '2x = 14 so x = 7.'),
  num('q028', 'linear_equations', 'medium', 'Solve: 9 + 2x = x + 20. x = ?', 11, 'x = 20 - 9 = 11.'),

  // 5) Number sequences
  num('q029', 'number_sequences', 'easy', 'Find next: 5, 10, 15, 20, ?', 25, 'Arithmetic sequence with +5.'),
  num('q030', 'number_sequences', 'easy', 'Find next: 3, 6, 12, 24, ?', 48, 'Geometric sequence with x2.'),
  num('q031', 'number_sequences', 'medium', 'Missing number: 2, 5, 11, 23, ?, 95', 47, 'Pattern x2 +1 each step.'),
  num('q032', 'number_sequences', 'medium', 'Find next: 100, 90, 81, 73, ?', 66, 'Differences -10, -9, -8, then -7.'),
  num('q033', 'number_sequences', 'easy', 'Find next: 1, 4, 9, 16, ?', 25, 'Squares: 1^2,2^2,3^2,4^2,5^2.'),
  num('q034', 'number_sequences', 'medium', 'Missing number: 8, 12, 18, 27, ?, 60.75', 40.5, 'Multiply by 1.5 each step.', 0.01),
  mc('q035', 'number_sequences', 'medium', 'Which fits: 7, 14, 28, 56, ?', ['64', '98', '112', '84'], '112', 'Sequence doubles each time.'),

  // 6) Combinatorics
  num('q036', 'combinatorics', 'easy', 'You have 3 regions and 4 instance types. How many region/type pairs?', 12, '3 x 4 = 12 combinations.'),
  num('q037', 'combinatorics', 'medium', 'How many ways to order 3 alerts (A,B,C)?', 6, '3! = 6.'),
  num('q038', 'combinatorics', 'easy', 'Choose 2 backup windows from 5. Number of choices?', 10, '5C2 = 10.'),
  num('q039', 'combinatorics', 'medium', 'How many 2-letter codes can be made from A,B,C,D without repetition?', 12, '4P2 = 4 x 3 = 12.'),
  num('q040', 'combinatorics', 'easy', 'A password uses 1 uppercase and 1 digit: 26 choices and 10 choices. Total?', 260, '26 x 10 = 260.'),
  num('q041', 'combinatorics', 'medium', 'From 6 servers, choose 3 for a test cluster. Ways?', 20, '6C3 = 20.'),
  mc('q042', 'combinatorics', 'medium', 'How many ways to arrange 4 distinct tasks?', ['16', '24', '32', '12'], '24', '4! = 24.'),

  // 7) Probability
  num('q043', 'probability', 'easy', 'Probability of rolling a 5 on a fair die?', 0.1667, 'One favorable outcome out of 6.', 0.005),
  num('q044', 'probability', 'easy', 'A monitoring check fails 1 out of 20 times. Fail probability?', 0.05, '1/20 = 0.05.', 0.001),
  num('q045', 'probability', 'medium', 'Two independent events have probabilities 0.8 and 0.9. Both happen?', 0.72, 'Multiply independent probabilities: 0.8 x 0.9.', 0.001),
  num('q046', 'probability', 'medium', 'If success probability is 0.97, failure probability is?', 0.03, 'Complement is 1 - 0.97.', 0.001),
  mc('q047', 'probability', 'medium', 'If event A has P(A)=0.4, what is P(not A)?', ['0.4', '0.6', '1.4', '0.04'], '0.6', 'Complement probability: 1 - 0.4 = 0.6.'),
  num('q048', 'probability', 'easy', 'A card is picked from 10 cards, 3 are red. Probability of red?', 0.3, '3/10 = 0.3.', 0.001),
  num('q049', 'probability', 'medium', 'Independent packet success rates are 0.99 and 0.98. Both success probability?', 0.9702, '0.99 x 0.98 = 0.9702.', 0.0005),

  // 8) Statistics
  num('q050', 'statistics', 'easy', 'Find mean of 10, 20, 30, 40.', 25, '(10+20+30+40)/4 = 25.'),
  num('q051', 'statistics', 'easy', 'Median of 3, 8, 12, 15, 21?', 12, 'Middle value in ordered set is 12.'),
  mc('q052', 'statistics', 'easy', 'Mode of 2, 4, 4, 5, 7 is:', ['2', '4', '5', 'No mode'], '4', 'Mode is most frequent value.'),
  num('q053', 'statistics', 'easy', 'Range of 18, 25, 11, 30 is?', 19, '30 - 11 = 19.'),
  num('q054', 'statistics', 'medium', 'Average latency for 40, 60, 80 ms?', 60, '(40+60+80)/3 = 60.'),
  num('q055', 'statistics', 'medium', 'Median of 5, 7, 9, 20 is?', 8, 'For even count, median is average of middle two: (7+9)/2.'),
  num('q056', 'statistics', 'medium', 'Mode of 1,1,2,2,2,3,3 is?', 2, '2 appears most often.'),

  // 9) Exponents and powers
  num('q057', 'exponents', 'easy', 'What is 2^5?', 32, '2 x 2 x 2 x 2 x 2 = 32.'),
  num('q058', 'exponents', 'easy', 'What is 2^8?', 256, '2 raised to 8 is 256.'),
  num('q059', 'exponents', 'easy', 'What is 2^10?', 1024, '2^10 = 1024.'),
  mc('q060', 'exponents', 'medium', '10^6 equals:', ['100,000', '1,000,000', '10,000,000', '100,000,000'], '1,000,000', '10^6 is one million.'),
  num('q061', 'exponents', 'medium', 'Simplify 2^3 x 2^4.', 128, 'Add exponents: 2^(3+4)=2^7=128.'),
  num('q062', 'exponents', 'medium', 'Simplify 10^3 / 10^1.', 100, 'Subtract exponents: 10^(3-1)=10^2=100.'),
  num('q063', 'exponents', 'easy', 'What is 2^7?', 128, '2^7 = 128.'),

  // 10) Logarithms
  num('q064', 'logarithms', 'easy', 'log10(1000) = ?', 3, '10^3 = 1000.'),
  num('q065', 'logarithms', 'easy', 'log2(8) = ?', 3, '2^3 = 8.'),
  num('q066', 'logarithms', 'medium', 'log2(1024) = ?', 10, '2^10 = 1024.'),
  num('q067', 'logarithms', 'medium', 'If log10(x)=4, x = ?', 10000, 'x = 10^4.'),
  mc('q068', 'logarithms', 'medium', 'log10(10^7) equals:', ['7', '10', '70', '1,000,000'], '7', 'log10 and 10^ cancel.'),
  num('q069', 'logarithms', 'medium', 'log2(2^6) = ?', 6, 'Inverse operations: result is exponent 6.'),
  num('q070', 'logarithms', 'easy', 'log10(1) = ?', 0, '10^0 = 1.'),

  // 11) Binary numbers
  num('q071', 'binary_numbers', 'easy', 'Binary 1010 in decimal is?', 10, '1x8 + 0x4 +1x2 +0x1 = 10.'),
  mc('q072', 'binary_numbers', 'easy', 'Decimal 13 in binary is:', ['1100', '1101', '1011', '1110'], '1101', '13 = 8 + 4 + 1.'),
  num('q073', 'binary_numbers', 'medium', 'Binary 11111111 in decimal is?', 255, 'Sum of powers from 2^0 to 2^7 = 255.'),
  mc('q074', 'binary_numbers', 'medium', 'Decimal 32 in binary is:', ['100000', '10000', '1000000', '110000'], '100000', '32 = 2^5.'),
  num('q075', 'binary_numbers', 'easy', 'Binary 1001 in decimal is?', 9, '8 + 1 = 9.'),
  num('q076', 'binary_numbers', 'medium', 'Decimal 45 in binary is?', 101101, '45 = 32 + 8 + 4 + 1, so 101101.'),
  num('q077', 'binary_numbers', 'easy', 'Binary 10000000 in decimal is?', 128, '1 in 2^7 place equals 128.'),

  // 12) Data size units
  mc('q078', 'data_size_units', 'easy', '1 byte equals:', ['4 bits', '8 bits', '16 bits', '10 bits'], '8 bits', 'By definition, 1 byte = 8 bits.'),
  num('q079', 'data_size_units', 'easy', 'How many MB in 2 GB (using 1024 MB = 1 GB)?', 2048, '2 x 1024 = 2048 MB.'),
  num('q080', 'data_size_units', 'medium', 'How many GB in 3072 MB (1024 MB = 1 GB)?', 3, '3072 / 1024 = 3 GB.'),
  num('q081', 'data_size_units', 'easy', 'How many KB in 5 MB (1024 KB = 1 MB)?', 5120, '5 x 1024 = 5120 KB.'),
  num('q082', 'data_size_units', 'medium', 'A file is 0.5 GB. Size in MB?', 512, '0.5 x 1024 = 512 MB.'),
  num('q083', 'data_size_units', 'medium', 'How many TB in 4096 GB (1024 GB = 1 TB)?', 4, '4096 / 1024 = 4 TB.'),
  mc('q084', 'data_size_units', 'easy', 'Which is larger?', ['900 MB', '1 GB', 'Equal', 'Cannot compare'], '1 GB', '1 GB = 1024 MB, which is larger than 900 MB.'),

  // 13) Data transfer speeds
  num('q085', 'data_transfer_speeds', 'easy', 'Convert 80 Mbps to MB/s.', 10, 'Divide by 8: 80/8 = 10 MB/s.'),
  num('q086', 'data_transfer_speeds', 'easy', 'Convert 12 MB/s to Mbps.', 96, 'Multiply by 8: 12 x 8 = 96 Mbps.'),
  num('q087', 'data_transfer_speeds', 'medium', 'A 1600 MB file on a 40 MB/s link takes how many seconds?', 40, 'time = size/rate = 1600/40.'),
  num('q088', 'data_transfer_speeds', 'medium', 'A 1 GB file (1024 MB) on 128 Mbps takes about how many seconds?', 64, '128 Mbps = 16 MB/s; 1024/16 = 64 s.'),
  mc('q089', 'data_transfer_speeds', 'easy', '25 MB/s equals:', ['100 Mbps', '200 Mbps', '25 Mbps', '12.5 Mbps'], '200 Mbps', '25 x 8 = 200 Mbps.'),
  num('q090', 'data_transfer_speeds', 'medium', 'At 400 Mbps, how many MB transfer in 10 seconds?', 500, '400 Mbps = 50 MB/s; 50 x 10 = 500 MB.'),
  num('q091', 'data_transfer_speeds', 'medium', 'At 64 Mbps, transfer volume in 2 minutes (MB)?', 960, '64 Mbps = 8 MB/s; 8 x 120 = 960 MB.'),

  // 14) Time and rate calculations
  num('q092', 'time_rate', 'easy', 'A worker processes 30 jobs/min. How many in 2 hours?', 3600, '2 hours = 120 min; 120 x 30.'),
  num('q093', 'time_rate', 'easy', 'A cron runs every 15 seconds. How many runs in 5 minutes?', 20, '5 min = 300 sec; 300/15 = 20.'),
  num('q094', 'time_rate', 'medium', 'System handles 1200 requests in 4 minutes. Requests per second?', 5, '4 min = 240 sec; 1200/240 = 5 rps.'),
  num('q095', 'time_rate', 'medium', 'At 75 ops/s, operations in 8 seconds?', 600, '75 x 8 = 600.'),
  num('q096', 'time_rate', 'easy', 'How many seconds are in 3.5 hours?', 12600, '3.5 x 3600 = 12600.'),
  num('q097', 'time_rate', 'medium', 'A queue drains at 240 items/min. Time for 1800 items (minutes)?', 7.5, '1800/240 = 7.5 minutes.', 0.01),
  mc('q098', 'time_rate', 'easy', 'If something runs once per hour, how many times per day?', ['12', '24', '48', '60'], '24', '24 hours in a day.'),

  // 15) Capacity and system scaling
  num('q099', 'capacity_scaling', 'easy', 'One server handles 250 rps. 4 identical servers handle?', 1000, '4 x 250 = 1000 rps.'),
  num('q100', 'capacity_scaling', 'medium', 'Cluster has 8 nodes at 120 rps each. If 2 fail, remaining capacity?', 720, '6 x 120 = 720 rps.'),
  num('q101', 'capacity_scaling', 'medium', 'Traffic is 1800 rps. Each server handles 300 rps. Minimum servers needed?', 6, '1800/300 = 6.'),
  num('q102', 'capacity_scaling', 'medium', 'If each added server gives 80 rps and base is 200 rps, total with 5 added servers?', 600, '200 + 5 x 80 = 600.'),
  num('q103', 'capacity_scaling', 'easy', 'A load balancer splits equally to 5 servers for 1500 rps total. Per server?', 300, '1500/5 = 300 rps.'),
  num('q104', 'capacity_scaling', 'medium', 'Need 20% headroom on 1000 rps demand. Required capacity?', 1200, '1000 x 1.2 = 1200 rps.'),
  mc('q105', 'capacity_scaling', 'medium', 'Scaling from 6 to 9 identical nodes changes capacity by:', ['+25%', '+33.3%', '+50%', '+66.7%'], '+50%', 'Increase is 3 on base 6 => 3/6 = 50%.'),

  // 16) Basic graph interpretation (text description based)
  mc('q106', 'graph_interpretation', 'easy', 'A chart shows CPU usage: 40%, 55%, 70%, 65% over four hours. Peak is:', ['40%', '55%', '65%', '70%'], '70%', 'Highest value is 70%.'),
  num('q107', 'graph_interpretation', 'easy', 'Requests per minute are 100, 130, 160, 190. Increase from first to last?', 90, '190 - 100 = 90.'),
  mc('q108', 'graph_interpretation', 'medium', 'A line trend goes 500, 450, 400, 350 errors/day. Best description:', ['Increasing quickly', 'Stable', 'Decreasing linearly', 'Random'], 'Decreasing linearly', 'Drops by 50 each step.'),
  num('q109', 'graph_interpretation', 'medium', 'Two services have latency (ms): A=40,50,60 and B=30,45,70. At third point, B-A = ?', 10, '70 - 60 = 10 ms.'),
  num('q110', 'graph_interpretation', 'easy', 'Disk usage values are 60, 62, 64, 66 (%). Average usage?', 63, '(60+62+64+66)/4 = 63.'),
  mc('q111', 'graph_interpretation', 'medium', 'Throughput points are 200, 210, 205, 220. Which statement is true?', ['Always rising', 'Overall rising with small dip', 'Always falling', 'No change'], 'Overall rising with small dip', 'It rises overall but dips from 210 to 205.'),
  num('q112', 'graph_interpretation', 'medium', 'A graph shows 4 equal 15-minute intervals with 120, 180, 240, 300 requests. Total requests?', 840, 'Sum all intervals: 120+180+240+300 = 840.')
];

export const QUESTION_MAP = new Map(QUESTIONS.map((question) => [question.id, question]));
