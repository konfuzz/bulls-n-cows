import type { GameRecord } from '../types';

export const STORAGE_KEY = 'bulls-n-cows-records';

export function loadRecords(): GameRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const records = JSON.parse(raw);
    return Array.isArray(records) ? (records as GameRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveRecords(records: GameRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
