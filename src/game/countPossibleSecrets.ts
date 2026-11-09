const cache = new Map<string, number>();

export function countPossibleSecrets(length: number, base: number): number {
  const key = `${length}-${base}`;
  const cached = cache.get(key);
  if (cached !== undefined) return cached;

  const result = length === 0 ? 1 : base * countPossibleSecrets(length - 1, base - 1);

  cache.set(key, result);
  return result;
}
