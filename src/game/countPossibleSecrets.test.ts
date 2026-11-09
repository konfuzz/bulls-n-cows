import { countPossibleSecrets } from './countPossibleSecrets';
import { describe, it, expect, vi } from 'vitest';

describe('countPossibleSecrets', () => {
  it('правильно считает количество вариантов', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
    expect(countPossibleSecrets(2, 10)).toBe(90);
    expect(countPossibleSecrets(4, 8)).toBe(1680);
    expect(countPossibleSecrets(6, 16)).toBe(5765760);
    expect(countPossibleSecrets(2, 16)).toBe(240);
  });

  it('берёт из кэша уже посчитанное значение', () => {
    const spy = vi.spyOn(Map.prototype, 'get');

    countPossibleSecrets(2, 2);
    spy.mockClear();

    expect(countPossibleSecrets(2, 2)).toBe(2);
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
