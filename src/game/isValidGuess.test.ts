import { describe, expect, it } from 'vitest';
import { isValidGuess } from './isValidGuess';

describe('isValidGuess', () => {
  it('длина совпадает', () => {
    expect(isValidGuess('1234', 4, 10)).toBe(true);
    expect(isValidGuess('12345', 4, 10)).toBe(false);
    expect(isValidGuess('123', 4, 10)).toBe(false);
  });

  it('все символы допустимые цифры для базы', () => {
    expect(isValidGuess('q123', 4, 16)).toBe(false);
    expect(isValidGuess('a1b3', 4, 16)).toBe(true);
    expect(isValidGuess('!@#$', 4, 16)).toBe(false);
    expect(isValidGuess('12', 2, 2)).toBe(false);
    expect(isValidGuess('01', 2, 2)).toBe(true);
    expect(isValidGuess('5678', 4, 8)).toBe(false);
    expect(isValidGuess('0567', 4, 8)).toBe(true);
    expect(isValidGuess('abc1', 4, 10)).toBe(false);
    expect(isValidGuess('7890', 4, 10)).toBe(true);
    expect(isValidGuess('    ', 4, 10)).toBe(false);
  });

  it('учитывает регистр символов', () => {
    expect(isValidGuess('aA12', 4, 16)).toBe(false);
    expect(isValidGuess('aB12', 4, 16)).toBe(true);
    expect(isValidGuess('1F3e', 4, 16)).toBe(true);
  });

  it('цифры не повторяются', () => {
    expect(isValidGuess('1213', 4, 10)).toBe(false);
    expect(isValidGuess('1234', 4, 10)).toBe(true);
    expect(isValidGuess('a2A3', 4, 16)).toBe(false);
    expect(isValidGuess('a2B3', 4, 16)).toBe(true);
  });
});
