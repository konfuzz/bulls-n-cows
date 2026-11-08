import { loadRecords, saveRecords } from './recordsStorage';
import { afterEach, it, expect, vi, describe } from 'vitest';

function fakeStorage() {
  const map = new Map<string, string>();
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, v),
  } as unknown as Storage;
}

afterEach(() => vi.unstubAllGlobals());

describe('loadRecords and saveRecords', () => {
  it('сохраняет и читает обратно', () => {
    vi.stubGlobal('localStorage', fakeStorage());
    saveRecords([{ config: { length: 4, base: 10 }, attempts: 10, time: 100 }]);
    expect(loadRecords()).toEqual([{ config: { length: 4, base: 10 }, attempts: 10, time: 100 }]);
  });

  it('возвращает [] на мусор в хранилище', () => {
    const s = fakeStorage();
    s.setItem('bulls-and-cows/records', 'это не json');
    vi.stubGlobal('localStorage', s);
    expect(loadRecords()).toEqual([]);
  });
});
