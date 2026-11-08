import { describe, expect, it } from 'vitest';
import { formatDuration } from './formatDuration';

describe('formatDuration', () => {
  it.each([
    [0, '0.0s'],
    [3.42, '3.4s'],
    [59.9, '59.9s'],
    [60, '1.0min'],
    [90, '1.5min'],
  ])('форматирует %f секунд как "%s"', (seconds, expected) => {
    expect(formatDuration(seconds)).toBe(expected);
  });
});
