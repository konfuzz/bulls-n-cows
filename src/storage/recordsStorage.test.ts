import { loadRecords, saveRecords, STORAGE_KEY } from './recordsStorage';
import { afterEach, it, expect, vi, describe } from 'vitest';
import type { RecordsMap } from '../types';

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
    const records: RecordsMap = {
      '4-10': [{ config: { length: 4, base: 10 }, attempts: 10, time: 100 }],
    };
    saveRecords(records);
    expect(loadRecords()).toEqual(records);
  });

  it('возвращает {} на мусор в хранилище', () => {
    const s = fakeStorage();
    s.setItem(STORAGE_KEY, 'это не json');
    vi.stubGlobal('localStorage', s);
    expect(loadRecords()).toEqual({});
  });

  it('игнорирует старый формат (плоский массив)', () => {
    const s = fakeStorage();
    s.setItem(
      STORAGE_KEY,
      JSON.stringify([{ config: { length: 4, base: 10 }, attempts: 1, time: 1 }]),
    );
    vi.stubGlobal('localStorage', s);
    expect(loadRecords()).toEqual({});
  });
});
