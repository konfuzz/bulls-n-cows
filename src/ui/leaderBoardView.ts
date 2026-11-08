import type { GameRecord } from '../types';

export function leaderBoardView(records: GameRecord[], onRestart: () => void): HTMLElement {
  const container = document.createElement('div');

  const title = document.createElement('h2');
  title.textContent = 'Leaderboard';

  const newGameButton = document.createElement('button');
  newGameButton.textContent = 'New Game';
  newGameButton.addEventListener('click', onRestart);

  const table = document.createElement('div');

  const createTableRow = (configText: string, attemptsText: string, timeText: string) => {
    const row = document.createElement('div');

    const config = document.createElement('div');
    config.textContent = configText;

    const attempts = document.createElement('div');
    attempts.textContent = attemptsText;

    const time = document.createElement('div');
    time.textContent = timeText;

    row.append(config, attempts, time);
    return row;
  };

  const tableHead = createTableRow('Length / Base', 'Attempts', 'Time');
  const rows = records.map((rec) =>
    createTableRow(
      `${rec.config.length}/${rec.config.base}`,
      `${rec.attempts} attempts`,
      `${rec.time} seconds`,
    ),
  );

  table.append(tableHead, ...rows);

  container.append(title, newGameButton, table);
  return container;
}
