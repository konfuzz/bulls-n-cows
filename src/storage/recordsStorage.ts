import type { RecordsMap } from '../types';

export const STORAGE_KEY = 'bulls-n-cows-records';

export function loadRecords(): RecordsMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as RecordsMap;
    }
    return {};
  } catch {
    return {};
  }
}

export function saveRecords(records: RecordsMap): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
