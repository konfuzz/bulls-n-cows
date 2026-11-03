import { describe, expect, it } from 'vitest';
import { generateSecret } from './generateSecret';

describe('generateSecret', () => {
  it('возвращает строку заданной длины', () => {
    expect(generateSecret(4, 10)).toHaveLength(4);
  });

  it('цифры не повторяются', () => {
    const secret = generateSecret(6, 10);
    expect(new Set([...secret]).size).toBe(6);
  });

  it('длина не может превышать размер базы', () => {
    expect(() => generateSecret(3, 2)).toThrow('Длина на может первышать размер базы');
  });

  it('используются только допустимые значения', () => {
    expect(generateSecret(2, 2)).toMatch(/^[0,1]/);
    expect(generateSecret(6, 16)).toMatch(/^[0-9a-f]/);
    expect(generateSecret(6, 8)).toMatch(/^[0-7]/);
    expect(generateSecret(6, 10)).toMatch(/^[0-9]/);
  });

  it('используется переданный источник случайности', () => {
    expect(generateSecret(4, 16, () => 0.999)).toBe('fedc');
    expect(generateSecret(4, 16, () => 0)).toBe('0123');
  });

  it('секрет может начинаться с 0', () => {
    expect(generateSecret(4, 10, () => 0)).toBe('0123');
  });
});
