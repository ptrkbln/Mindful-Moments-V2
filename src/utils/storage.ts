import { DailyTask } from "../data/gratitudeQuestions";

export const STORAGE_KEY = "mindful-moments" as const;

export type DateKey = string;
export type DailyEntry = {
  taskId: DailyTask["id"];
  answers: { journalText: string; moodColor: string };
};

export function isDailyEntry(x: unknown): x is DailyEntry {
  if (!x || typeof x !== "object") return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const object = x as any;
  const hasTaskId = typeof object.taskId === "string";
  const hasAnswers =
    object.answers &&
    typeof object.answers === "object" &&
    typeof object.answers.journalText === "string" &&
    typeof object.answers.moodColor === "string";
  return hasTaskId && hasAnswers;
}

export type Root = {
  v: 1;
  entriesByDate: Record<DateKey, DailyEntry>;
};

export function isRoot(x: unknown): x is Root {
  if (!x || typeof x !== "object" || Array.isArray(x)) return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const object = x as any;
  if (object.v !== 1) return false;
  if (
    !object.entriesByDate ||
    typeof object.entriesByDate !== "object" ||
    Array.isArray(object.entriesByDate)
  )
    return false;
  for (const key in object.entriesByDate) {
    if (!isDailyEntry(object.entriesByDate[key])) return false;
  }
  return true;
}

export function parsedRoot(raw: string | null): Root | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    return isRoot(data) ? data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
