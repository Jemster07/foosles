/**
 * Shuffles an array in place using the Fisher-Yates (Knuth) algorithm.
 * Returns a new shuffled array without mutating the original input.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j] as T, shuffled[i] as T];
  }

  return shuffled;
}
