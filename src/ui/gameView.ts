import type { GameConfig } from '../types';
import SETTINGS from '../settings';
import { isValidGuess } from '../game/isValidGuess';
import { createDigitValidator } from '../game/createDigitValidator';
import { evaluateGuess } from '../game/evaluateGuess';

export function gameView({ length, base }: GameConfig, secret: string): HTMLElement {
  const isValidChar = createDigitValidator(base);
  const container = document.createElement('div');

  const title = document.createElement('h2');
  const baseLabel = SETTINGS.base.find((b) => b.value === base)?.label ?? base;
  title.textContent = `Game: length ${length}, base ${baseLabel}`;

  const form = document.createElement('form');

  const input = document.createElement('input');
  input.placeholder = 'Guess';
  input.maxLength = length;

  input.addEventListener('beforeinput', (e) => {
    if (!e.data) return;

    if (!isValidChar(e.data) || input.value.includes(e.data) || e.data.length > 1) {
      e.preventDefault();
      return;
    }
  });

  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Guess';

  const history = document.createElement('div');
  const error = document.createElement('p');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!isValidGuess(input.value, length, base)) {
      error.textContent = 'Error';
      return;
    }

    error.textContent = '';

    const { bulls, cows } = evaluateGuess(secret, input.value);

    const historyRow = document.createElement('div');

    const newHistoryGuess = document.createElement('p');
    newHistoryGuess.textContent = input.value;

    const newHistoryResult = document.createElement('p');
    newHistoryResult.textContent = `bulls: ${bulls}, cows: ${cows}`;
    form.reset();

    historyRow.append(newHistoryGuess, newHistoryResult);
    history.append(historyRow);
  });

  form.append(input, button);

  container.append(title, form, error, history);

  return container;
}
