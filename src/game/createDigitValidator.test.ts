import { describe, expect, it } from 'vitest';
import { createDigitValidator } from './createDigitValidator';

describe('createDigitValidator', () => {
  it('возвращает функцию-предикат', () => {
    expect(typeof createDigitValidator(10)).toBe('function');
  });

  it('предикаты для разных систем независимы', () => {
    const isDecimal = createDigitValidator(10);
    const isHex = createDigitValidator(16);

    expect(isDecimal('a')).toBe(false);
    expect(isHex('a')).toBe(true);
  });

  it.each([
    { name: 'десятичная: допустимая цифра', base: 10, char: '5', expected: true },
    { name: 'десятичная: буква недопустима', base: 10, char: 'a', expected: false },
    {
      name: 'десятичная: буква в верхнем регистре недопустима',
      base: 10,
      char: 'A',
      expected: false,
    },
    { name: 'двоичная: 0 допустим', base: 2, char: '0', expected: true },
    { name: 'двоичная: 1 допустим', base: 2, char: '1', expected: true },
    { name: 'двоичная: 2 недопустим', base: 2, char: '2', expected: false },
    { name: 'восьмеричная: 7 допустим', base: 8, char: '7', expected: true },
    { name: 'восьмеричная: 8 недопустим', base: 8, char: '8', expected: false },
    { name: 'hex: строчная буква допустима', base: 16, char: 'a', expected: true },
    { name: 'hex: заглавная буква допустима', base: 16, char: 'F', expected: true },
    { name: 'hex: g недопустима', base: 16, char: 'g', expected: false },
    { name: 'пустая строка недопустима', base: 16, char: '', expected: false },
    { name: 'пробел недопустим', base: 16, char: ' ', expected: false },
  ])('$name', ({ base, char, expected }) => {
    const isValid = createDigitValidator(base);
    expect(isValid(char)).toBe(expected);
  });
});
