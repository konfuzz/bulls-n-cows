export interface GameConfig {
  length: number;
  base: number;
}

export type Attempt = { guess: string; bulls: number; cows: number };
