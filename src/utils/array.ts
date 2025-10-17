export function getRandomArrayItem<T>(arr: readonly T[]): T | null {
  return arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
}
