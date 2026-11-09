import type { GameConfig } from '../types';

export function configKey({ length, base }: GameConfig): string {
  return `${length}-${base}`;
}
