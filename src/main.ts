import './style.css';
import { settingsView } from './ui/settingsView';
import { gameView } from './ui/gameView';

const root = document.createElement('div');
root.className = 'root';

const title = document.createElement('h1');
title.textContent = 'Bulls and Cows';

root.append(
  title,
  settingsView((config) => root.replaceChildren(gameView(config))),
);

document.body.append(root);
