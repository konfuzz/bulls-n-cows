import { createDictionary } from '../utils/createDictionary';

export function createDigitValidator(base: number): (char: string) => boolean {
  const dictionary = createDictionary(base);

  return (char: string) => {
    return dictionary.includes(char.toLowerCase());
  };
}
