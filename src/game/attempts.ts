import type { Attempt } from '../types';

export function addAttempt(history: Attempt[], attempt: Attempt): Attempt[] {
  return [...history, attempt];
}

export function hasAttempt(history: Attempt[], guess: string): boolean {
  return history.some((a) => a.guess.toLowerCase() === guess.toLowerCase());
}
