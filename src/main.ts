import './style.css';
import { settingsView } from './ui/settingsView';
import { gameView } from './ui/gameView';
import { generateSecret } from './game/generateSecret';

const root = document.createElement('div');
root.className = 'root';

const title = document.createElement('h1');
title.textContent = 'Bulls and Cows';

root.append(
  title,
  settingsView((config) => {
    const secret = generateSecret(config.length, config.base);
    root.replaceChildren(gameView(config, secret));
  }),
);

document.body.append(root);
