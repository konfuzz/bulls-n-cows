export function createDictionary(base: number): string[] {
  return Array.from({ length: base }).map((_, i) => i.toString(base));
}
