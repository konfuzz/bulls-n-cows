export interface GameConfig {
  length: number;
  base: number;
}

export interface GameRecord {
  config: GameConfig;
  attempts: number;
  time: number;
}

export type Attempt = { guess: string; bulls: number; cows: number };

export type RecordsMap = Record<string, GameRecord[]>;
