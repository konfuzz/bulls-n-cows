import { describe, expect, it } from 'vitest';
import type { Attempt } from '../types';
import { addAttempt, hasAttempt } from './attempts';

const attempt: Attempt = { guess: '1234', bulls: 2, cows: 2 };

describe('addAttempt', () => {
  it('добавляет попытку в конец', () => {
    expect(addAttempt([], attempt)).toEqual([attempt]);
  });

  it('не мутирует исходный массив', () => {
    const history = [attempt];
    const next = addAttempt(history, { guess: '5678', bulls: 0, cows: 0 });

    expect(history).toHaveLength(1);
    expect(next).toHaveLength(2);
  });
});

describe('hasAttempt', () => {
  it('находит попытку без учёта регистра', () => {
    expect(hasAttempt([{ guess: 'Ab12', bulls: 1, cows: 0 }], 'aB12')).toBe(true);
  });

  it('возвращает false для новой попытки', () => {
    expect(hasAttempt([attempt], '9999')).toBe(false);
  });
});
