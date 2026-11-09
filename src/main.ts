import './style.css';
import SETTINGS from './settings';
import { settingsView } from './ui/settingsView';
import { gameView } from './ui/gameView';
import { leaderBoardView } from './ui/leaderBoardView';
import { generateSecret } from './game/generateSecret';
import { loadRecords, saveRecords } from './storage/recordsStorage';
import { addRecord } from './game/addRecord';
import type { GameConfig, GameRecord } from './types';

const root = document.createElement('div');
root.className = 'root';

const title = document.createElement('h1');
title.textContent = '🐂 Bulls and Cows 🐄';

let currentConfig: GameConfig = SETTINGS.defaultConfig;

const showSettings = () => {
  root.replaceChildren(title, settingsView(currentConfig, startGame));
};

const updateRecords = (record: GameRecord) => {
  const records = addRecord(loadRecords(), record, SETTINGS.recordsLimit);
  saveRecords(records);
};

const showLeaderBoard = () => {
  root.replaceChildren(title, leaderBoardView(loadRecords(), showSettings));
};

const startGame = (config: GameConfig) => {
  currentConfig = config;
  const secret = generateSecret(config.length, config.base);
  root.replaceChildren(
    title,
    gameView(config, secret, {
      onRestart: showSettings,
      onWin: updateRecords,
      onLeaderboard: showLeaderBoard,
    }),
  );
};

showSettings();
document.body.append(root);
