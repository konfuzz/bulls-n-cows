import './style.css';
import SETTINGS from './settings.ts';
import { settingsView } from './ui/settingsView';
import { gameView } from './ui/gameView';
import { generateSecret } from './game/generateSecret';
import type { GameConfig } from './types.ts';

const root = document.createElement('div');
root.className = 'root';

const title = document.createElement('h1');
title.textContent = 'Bulls and Cows';

let currentConfig: GameConfig = SETTINGS.defaultConfig;

const showSettings = () => {
  root.replaceChildren(title, settingsView(currentConfig, startGame));
};

const startGame = (config: GameConfig) => {
  currentConfig = config;
  const secret = generateSecret(config.length, config.base);
  root.replaceChildren(title, gameView(config, secret, showSettings));
};

showSettings();
document.body.append(root);
