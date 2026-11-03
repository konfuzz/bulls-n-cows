type GuessResult = { bulls: number; cows: number };

export function evaluateGuess(secret: string, guess: string): GuessResult {
  if (secret.length !== guess.length) throw new Error('Длина секрета и попытки должны совпадать');

  const normalizedSecret = secret.toLowerCase();
  const normalizedGuess = guess.toLowerCase();

  const positions = [...normalizedSecret].map((_, i) => i);
  const bulls = positions.filter((i) => normalizedGuess[i] === normalizedSecret[i]).length;
  const cows = positions.filter(
    (i) =>
      normalizedGuess[i] !== normalizedSecret[i] && normalizedSecret.includes(normalizedGuess[i]),
  ).length;

  return { bulls, cows };
}
