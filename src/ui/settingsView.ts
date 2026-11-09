import SETTINGS from '../settings';
import type { GameConfig } from '../types';
import { countPossibleSecrets } from '../game/countPossibleSecrets';
import { focusAfterRender } from './focusAfterRender';

interface SettingsHandlers {
  onStart: (config: GameConfig) => void;
  onLeaderboard: () => void;
}

export function settingsView(
  { length, base }: GameConfig,
  { onStart, onLeaderboard }: SettingsHandlers,
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'settings';

  const title = document.createElement('h2');
  title.className = 'screen-title';
  title.textContent = 'Settings';

  const baseSelect = document.createElement('select');
  baseSelect.className = 'base-select';

  const lengthSelect = document.createElement('select');
  lengthSelect.className = 'length-select';

  const hint = document.createElement('p');
  hint.className = 'settings-hint';

  const baseOptions = SETTINGS.base.map((base) => {
    const option = document.createElement('option');
    option.value = String(base.value);
    option.textContent = base.label;
    return option;
  });

  baseSelect.append(...baseOptions);

  const updateHint = () => {
    const combinations = countPossibleSecrets(Number(lengthSelect.value), Number(baseSelect.value));
    hint.textContent = `Возможных вариантов: ${combinations.toLocaleString('ru-RU')}`;
  };

  const updateLengthOptions = (preferredLength: number) => {
    const max = Math.min(Number(baseSelect.value), SETTINGS.maxLength);
    const selected = Math.min(Math.max(preferredLength, SETTINGS.minLength), max);
    lengthSelect.replaceChildren(...createLengthOptions(SETTINGS.minLength, max));
    lengthSelect.value = String(selected);
    updateHint();
  };

  baseSelect.addEventListener('change', () => updateLengthOptions(Number(lengthSelect.value)));
  lengthSelect.addEventListener('change', updateHint);

  baseSelect.value = String(base);
  updateLengthOptions(length);

  const startButton = document.createElement('button');
  startButton.className = 'button';
  startButton.textContent = 'Start Game';
  focusAfterRender(startButton);

  startButton.addEventListener('click', () => {
    onStart({ length: Number(lengthSelect.value), base: Number(baseSelect.value) });
  });

  const leaderBoardButton = document.createElement('button');
  leaderBoardButton.className = 'button';
  leaderBoardButton.textContent = 'Leaderboard';
  leaderBoardButton.addEventListener('click', onLeaderboard);

  const actions = document.createElement('div');
  actions.className = 'settings-actions';
  actions.append(startButton, leaderBoardButton);

  container.append(title, baseSelect, lengthSelect, hint, actions);

  return container;
}

function createLengthOptions(minLength: number, maxLength: number) {
  const options: HTMLOptionElement[] = [];
  for (let i = minLength; i <= maxLength; i++) {
    const option = document.createElement('option');
    option.value = String(i);
    option.textContent = String(i);
    options.push(option);
  }
  return options;
}
