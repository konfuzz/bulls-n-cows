import SETTINGS from '../settings';

export function settingsView(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'settings';

  const title = document.createElement('h2');
  title.textContent = 'Settings';

  const baseSelect = document.createElement('select');
  baseSelect.className = 'base-select';

  const lengthSelect = document.createElement('select');
  lengthSelect.className = 'length-select';

  const baseOptions = SETTINGS.base.map((base) => {
    const option = document.createElement('option');
    option.value = String(base.value);
    option.textContent = base.label;
    return option;
  });

  baseSelect.append(...baseOptions);

  const updateLengthOptions = () => {
    const max = Math.min(Number(baseSelect.value), SETTINGS.maxLength);
    lengthSelect.replaceChildren(...createLengthOptions(SETTINGS.minLength, max));
  };

  baseSelect.addEventListener('change', updateLengthOptions);
  updateLengthOptions();

  const startButton = document.createElement('button');
  startButton.textContent = 'Start Game';

  container.append(title, baseSelect, lengthSelect, startButton);

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
