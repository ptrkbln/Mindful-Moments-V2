export const TIMERS = [60, 90, 120, 150] as const;
export type Timer = (typeof TIMERS)[number];
