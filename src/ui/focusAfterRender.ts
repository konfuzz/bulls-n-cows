export function focusAfterRender(element: HTMLElement): void {
  queueMicrotask(() => element.focus());
}
