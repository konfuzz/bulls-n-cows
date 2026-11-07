import type { GameConfig } from '../types';
import SETTINGS from '../settings';

export function gameView(config: GameConfig): HTMLElement {
  const container = document.createElement('div');

  const title = document.createElement('h2');
  const baseLabel = SETTINGS.base.find((b) => b.value === config.base)?.label ?? config.base;
  title.textContent = `Game: length ${config.length}, base ${baseLabel}`;

  const form = document.createElement('form');

  const input = document.createElement('input');
  input.placeholder = 'Guess';

  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Guess';

  const history = document.createElement('div');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newHistoryItem = document.createElement('p');
    newHistoryItem.textContent = input.value;
    form.reset();
    history.append(newHistoryItem);
  });

  form.append(input, button);

  container.append(title, form, history);

  return container;
}
