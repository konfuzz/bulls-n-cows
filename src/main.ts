import './style.css';
import { settingsView } from './ui/settingsView';

const root = document.createElement('div');
root.className = 'root';

const title = document.createElement('h1');
title.textContent = 'Bulls and Cows';

root.append(title, settingsView());

document.body.append(root);
