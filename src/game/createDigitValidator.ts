export function createDigitValidator(base: number): (char: string) => boolean {
  const dictionary = Array.from({ length: base }).map((_, i) => i.toString(base));

  return (char: string) => {
    return dictionary.includes(char.toLowerCase());
  };
}
