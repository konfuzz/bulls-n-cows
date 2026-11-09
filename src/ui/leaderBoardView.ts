import SETTINGS from '../settings';
import type { GameConfig, RecordsMap } from '../types';
import { configKey } from '../utils/configKey';
import { formatDuration } from '../utils/formatDuration';

export function leaderBoardView(
  records: RecordsMap,
  defaultConfig: GameConfig,
  onNewGame: () => void,
): HTMLElement {
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

  const renderTable = (key: string) => {
    const group = records[key] ?? [];
    if (group.length === 0) {
      table.replaceChildren(createPlaceholder());
      return;
    }

    const head = createTableRow('Length / System', 'Attempts', 'Time');
    head.classList.add('table-row--head');

    const rows = group.map((rec) =>
      createTableRow(
        `${rec.config.length} · ${baseLabel(rec.config.base)}`,
        `${rec.attempts}`,
        formatDuration(rec.time),
      ),
    );

    table.replaceChildren(head, ...rows);
  };

  container.append(title, newGameButton);

  const configs = listConfigs(records);

  if (configs.length === 0) {
    renderTable('');
    container.append(table);
    return container;
  }

  const defaultKey = configKey(defaultConfig);
  const selectedKey = configs.some((config) => configKey(config) === defaultKey)
    ? defaultKey
    : configKey(configs[0]);

  const configSelect = document.createElement('select');
  configSelect.className = 'config-select';
  configSelect.append(
    ...configs.map((config) => {
      const option = document.createElement('option');
      option.value = configKey(config);
      option.textContent = `${config.length} · ${baseLabel(config.base)}`;
      return option;
    }),
  );
  configSelect.value = selectedKey;
  configSelect.addEventListener('change', () => renderTable(configSelect.value));

  renderTable(selectedKey);

  container.append(configSelect, table);
  return container;
}

function createTableRow(configText: string, attemptsText: string, timeText: string): HTMLElement {
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
}

function createPlaceholder(): HTMLElement {
  const placeholder = document.createElement('p');
  placeholder.className = 'empty-state';
  placeholder.textContent = 'Пока нет рекордов';
  return placeholder;
}

function baseLabel(base: number): string {
  return SETTINGS.base.find((b) => b.value === base)?.label ?? String(base);
}

function listConfigs(records: RecordsMap): GameConfig[] {
  return Object.keys(records)
    .map(parseConfigKey)
    .sort((a, b) => a.base - b.base || a.length - b.length);
}

function parseConfigKey(key: string): GameConfig {
  const [length, base] = key.split('-').map(Number);
  return { length, base };
}
