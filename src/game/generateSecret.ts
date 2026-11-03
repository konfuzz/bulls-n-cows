export function generateSecret(
  length: number,
  base: number,
  random: () => number = Math.random,
): string {
  if (length > base) throw new Error('Длина не может превышать размер базы');

  const dictionary = Array.from({ length: base }).map((_, i) => i.toString(base));

  const secret = Array.from({ length }).map(() => {
    const index = Math.floor(random() * dictionary.length);
    const item = dictionary.splice(index, 1)[0];
    return item;
  });

  return secret.join('');
}
