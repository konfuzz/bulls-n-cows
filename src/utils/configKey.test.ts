import { describe, expect, it } from 'vitest';
import { configKey } from './configKey';

describe('configKey', () => {
  it('строит ключ из длины и основания', () => {
    expect(configKey({ length: 4, base: 10 })).toBe('4-10');
    expect(configKey({ length: 2, base: 2 })).toBe('2-2');
    expect(configKey({ length: 6, base: 16 })).toBe('6-16');
  });
});
