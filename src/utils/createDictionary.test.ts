import { describe, it, expect } from 'vitest';
import { createDictionary } from './createDictionary';

describe('createDictionary', () => {
  it('создаёт словарь в двоичной системе', () => {
    expect(createDictionary(2)).toEqual(['0', '1']);
  });
  it('создаёт словарь в восьмеричной системе', () => {
    expect(createDictionary(8)).toEqual(['0', '1', '2', '3', '4', '5', '6', '7']);
  });
  it('создаёт словарь в десятичной системе', () => {
    expect(createDictionary(10)).toEqual(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
  });
  it('создаёт словарь в шестнадцатеричной системе', () => {
    expect(createDictionary(16)).toEqual([
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
    ]);
  });
});
