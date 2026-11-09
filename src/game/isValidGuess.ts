import { createDigitValidator } from './createDigitValidator';

export function isValidGuess(guess: string, length: number, base: number): boolean {
  if (guess.length !== length) return false;

  const distinctChars = new Set(guess.toLowerCase());
  if (distinctChars.size !== length) return false;

  const isValidChar = createDigitValidator(base);

  return [...distinctChars].every(isValidChar);
}
