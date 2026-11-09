import { describe, expect, it } from 'vitest';
import { evaluateGuess } from './evaluateGuess';

describe('evaluateGuess', () => {
  it.each([
    {
      name: 'полное совпадение — все быки',
      secret: '1234',
      guess: '1234',
      expected: { bulls: 4, cows: 0 },
    },
    { name: 'полный промах', secret: '1234', guess: '5678', expected: { bulls: 0, cows: 0 } },
    {
      name: 'все цифры есть, но ни одна не на месте',
      secret: '1234',
      guess: '4321',
      expected: { bulls: 0, cows: 4 },
    },
    { name: 'смешанный случай', secret: '1234', guess: '1432', expected: { bulls: 2, cows: 2 } },
  ])('$name', ({ secret, guess, expected }) => {
    expect(evaluateGuess(secret, guess)).toEqual(expected);
  });

  it('бросает ошибку, когда длины не совпадают', () => {
    expect(() => evaluateGuess('1234', '123456')).toThrow();
    expect(() => evaluateGuess('123456', '1234')).toThrow();
  });

  it('регистр букв в hex не имеет значения', () => {
    expect(evaluateGuess('aBcD', 'AbCd')).toEqual({ bulls: 4, cows: 0 });
  });
});
