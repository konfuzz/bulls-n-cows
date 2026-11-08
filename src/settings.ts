import type { GameConfig } from './types';

const defaultConfig: GameConfig = { length: 4, base: 10 };

const settings = {
  base: [
    {
      value: 2,
      label: 'bin',
    },
    {
      value: 8,
      label: 'oct',
    },
    {
      value: 10,
      label: 'dec',
    },
    {
      value: 16,
      label: 'hex',
    },
  ],
  minLength: 2,
  maxLength: 6,
  defaultConfig,
};

export default settings;
