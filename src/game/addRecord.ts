import type { GameRecord } from '../types';

export function addRecord(
  records: GameRecord[],
  record: GameRecord,
  limit: number = 10,
): GameRecord[] {
  const newRecords = [...records, record].sort(sortRecords).slice(0, limit);
  return newRecords;
}

function sortRecords(a: GameRecord, b: GameRecord) {
  return a.attempts === b.attempts
    ? Math.sign(a.time - b.time)
    : Math.sign(a.attempts - b.attempts);
}
