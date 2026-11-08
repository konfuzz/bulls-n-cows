export function formatDuration(seconds: number): string {
  return seconds < 60 ? `${seconds.toFixed(1)}s` : `${(seconds / 60).toFixed(1)}min`;
}
