import './style.css';
import { settingsView } from './ui/settingsView';
import { gameView } from './ui/gameView';
import { generateSecret } from './game/generateSecret';

const root = document.createElement('div');
root.className = 'root';

const title = document.createElement('h1');
title.textContent = 'Bulls and Cows';

const renderMainScreen = () => {
  root.replaceChildren(
    title,
    settingsView((config) => {
      const secret = generateSecret(config.length, config.base);
      root.replaceChildren(title, gameView(config, secret, renderMainScreen));
    }),
  );
};

renderMainScreen();

document.body.append(root);
