import type { GameConfig, Attempt } from '../types';
import SETTINGS from '../settings';
import { isValidGuess } from '../game/isValidGuess';
import { createDigitValidator } from '../game/createDigitValidator';
import { evaluateGuess } from '../game/evaluateGuess';

export function gameView(
  { length, base }: GameConfig,
  secret: string,
  onRestart: () => void,
): HTMLElement {
  let history: Attempt[] = [];

  const isValidChar = createDigitValidator(base);
  const container = document.createElement('div');

  const newGameButton = document.createElement('button');
  newGameButton.textContent = 'New Game';
  newGameButton.addEventListener('click', onRestart);

  const title = document.createElement('h2');
  const baseLabel = SETTINGS.base.find((b) => b.value === base)?.label ?? base;
  title.textContent = `Game: length ${length}, base ${baseLabel}`;

  const formWrapper = document.createElement('div');
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

  const historyElement = document.createElement('div');
  const error = document.createElement('p');

  const addAttempt = (history: Attempt[], attempt: Attempt): Attempt[] => {
    return [...history, attempt];
  };

  const renderHistoryRow = ({ guess, bulls, cows }: Attempt) => {
    const historyRow = document.createElement('div');

    const newHistoryGuess = document.createElement('p');
    newHistoryGuess.textContent = guess;

    const newHistoryResult = document.createElement('p');
    newHistoryResult.textContent = `bulls: ${bulls}, cows: ${cows}`;

    historyRow.append(newHistoryGuess, newHistoryResult);
    return historyRow;
  };

  const finishGame = () => {
    const banner = document.createElement('div');

    const title = document.createElement('h3');
    title.textContent = `You won in ${history.length} tries!`;

    const leaderBoardButton = document.createElement('button');
    leaderBoardButton.textContent = 'Leaderboard';

    banner.append(title, newGameButton, leaderBoardButton);
    formWrapper.replaceChildren(banner);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!isValidGuess(input.value, length, base)) {
      error.textContent = 'Error';
      return;
    }

    if (history.some((a) => a.guess.toLowerCase() === input.value.toLowerCase())) {
      error.textContent = 'Эта попытка уже была';
      return;
    }

    error.textContent = '';

    const { bulls, cows } = evaluateGuess(secret, input.value);
    history = addAttempt(history, { guess: input.value, bulls, cows });
    const historyRows = history.toReversed().map((h) => renderHistoryRow(h));

    form.reset();

    historyElement.replaceChildren(...historyRows);

    if (length === bulls) finishGame();
  });

  form.append(input, button);
  formWrapper.append(form);

  container.append(title, newGameButton, formWrapper, error, historyElement);

  return container;
}
