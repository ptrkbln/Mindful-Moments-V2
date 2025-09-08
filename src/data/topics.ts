export const TOPICS = [
  "Self",
  "Others",
  "Nature",
  "Home",
  "Skills",
  "Experiences",
] as const;

// derive the union type from TOPICS
export type Topic = (typeof TOPICS)[number];
