import SETTINGS from '../settings';
import type { GameRecord } from '../types';
import { formatDuration } from '../utils/formatDuration';

export function leaderBoardView(records: GameRecord[], onNewGame: () => void): HTMLElement {
  const container = document.createElement('div');
  container.className = 'leaderboard';

  const title = document.createElement('h2');
  title.className = 'screen-title';
  title.textContent = 'Leaderboard';

  const newGameButton = document.createElement('button');
  newGameButton.className = 'button';
  newGameButton.textContent = 'New Game';
  newGameButton.addEventListener('click', onNewGame);

  const table = document.createElement('div');
  table.className = 'table';

  const createTableRow = (configText: string, attemptsText: string, timeText: string) => {
    const row = document.createElement('div');
    row.className = 'table-row';

    const config = document.createElement('div');
    config.textContent = configText;

    const attempts = document.createElement('div');
    attempts.textContent = attemptsText;

    const time = document.createElement('div');
    time.textContent = timeText;

    row.append(config, attempts, time);
    return row;
  };

  const tableHead = createTableRow('Length / System', 'Attempts', 'Time');
  tableHead.classList.add('table-row--head');

  const rows = records.map((rec) => {
    const baseLabel =
      SETTINGS.base.find((b) => b.value === rec.config.base)?.label ?? rec.config.base;
    return createTableRow(
      `${rec.config.length} · ${baseLabel}`,
      `${rec.attempts}`,
      formatDuration(rec.time),
    );
  });

  table.append(tableHead, ...rows);

  container.append(title, newGameButton, table);
  return container;
}
