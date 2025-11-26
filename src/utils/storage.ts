import {
  gratitudeQuestions,
  type DailyTask,
  type Topic,
} from "../data/gratitudeQuestions";
import { getTodayDateKey } from "./getTodayDateKey";

// localStorage key for all gratitude entries
export const STORAGE_KEY = "mindful-moments" as const;
// each entry is stored under a dateKey (yyyy-mm-dd)
export type DateKey = string;
// single gratitude entry, stores user answers
export type DailyEntry = {
  taskId: DailyTask["id"];
  answers: { journalText: string; moodColor: string };
};
// root structure for the stored data in localStorage
export type Root = {
  v: 1;
  entriesByDate: Record<DateKey, DailyEntry>;
};

// type guard: checks that object follows DailyEntry structure
// to ensure localStorage data is valid before parsing
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

// type guard: checks that parsed JSON matches root structure
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

// parse a raw JSON string frm localStorage into root-object
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

// gets and parses root from localStorage
export function getParsedRoot() {
  return parsedRoot(localStorage.getItem(STORAGE_KEY));
}

// collect unique completed taskIds from a parsed root
function getCompletedTaskIdsSet(root: Root | null): Set<DailyTask["id"]> {
  const completedIdsSet: Set<DailyTask["id"]> = new Set();
  if (root)
    Object.values(root.entriesByDate).forEach((val) =>
      completedIdsSet.add(val.taskId)
    );

  return completedIdsSet;
}

// collect unique available taskIds based on completed taskIds
function getAvailableTaskIdsFromCompleted(
  completedTaskIdsSet: Set<DailyTask["id"]>
): DailyTask["id"][] {
  const availableIds: DailyTask["id"][] = [];
  gratitudeQuestions.forEach((task) => {
    if (!completedTaskIdsSet.has(task.id)) availableIds.push(task.id);
  });

  return availableIds;
}

// collect available taskIds directly from root object
export function getAvailableTaskIdsFromRoot(
  root: Root | null
): DailyTask["id"][] {
  return getAvailableTaskIdsFromCompleted(getCompletedTaskIdsSet(root));
}

// collect unique available topics based on available taskIds
function getAvailableTopicsFromIds(
  availableTaskIds: DailyTask["id"][]
): Topic[] {
  const availableTopics: Set<Topic> = new Set();
  const availableIdsSet = new Set(availableTaskIds);
  gratitudeQuestions.forEach((task) => {
    if (availableIdsSet.has(task.id)) availableTopics.add(task.topic);
  });

  return [...availableTopics];
}

// collect available topics directly from root object
export function getAvailableTopicsFromRoot(root: Root | null): Topic[] {
  return getAvailableTopicsFromIds(getAvailableTaskIdsFromRoot(root));
}

// return true if today's practice is completed
export function isTodayPracticeCompleted(root: Root | null) {
  return !root ? false : !!root.entriesByDate?.[getTodayDateKey()];
}

// return days of completed practice
export function getCompletedDaysTotal(root: Root | null) {
  return !root ? 0 : Object.keys(root.entriesByDate).length;
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;
function diffInDays(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY);
}
// return max consecutive days of completed practice
export function getMaxStreak(root: Root | null) {
  if (!root) return 0;
  const dateKeys = Object.keys(root.entriesByDate); // YYYY-MM-DD format
  if (dateKeys.length === 0) return 0;

  const sortedKeys = dateKeys.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < sortedKeys.length; i++) {
    const prevDate = new Date(sortedKeys[i - 1]);
    const currDate = new Date(sortedKeys[i]);

    const daysBetween = diffInDays(prevDate, currDate);

    if (daysBetween === 1) {
      currentStreak++;
    } else {
      if (currentStreak > maxStreak) maxStreak = currentStreak;
      currentStreak = 1;
    }
  }
  if (currentStreak > maxStreak) maxStreak = currentStreak;
  return maxStreak;
}

export function getCurrentStreak(root: Root | null) {
  if (!root) return 0;

  const dateKeys = Object.keys(root.entriesByDate); // YYYY-MM-DD format
  if (dateKeys.length === 0) return 0;

  const sortedKeysDescending = dateKeys.sort((a, b) =>
    a > b ? -1 : a < b ? 1 : 0
  );

  const today = new Date(getTodayDateKey());
  const yesterday = new Date(today.getTime() - MS_PER_DAY);

  const isTodayDone = !!root.entriesByDate[getTodayDateKey()];
  const isYesterdayDone =
    !!root.entriesByDate[yesterday.toString().slice(0, 10)];

  // streak broken
  if (!isTodayDone && !isYesterdayDone) return 0;

  // start counting from today or yesterday if today not yet done
  let streak = isTodayDone ? 1 : 0;
  let lastCompletedDate = isTodayDone ? today : yesterday;

  for (let i = 0; i < sortedKeysDescending.length; i++) {
    const current = new Date(sortedKeysDescending[i]);
    const difference = diffInDays(current, lastCompletedDate);

    if (difference === 1) {
      streak++;
      lastCompletedDate = current;
    } else if (difference > 1) break;
  }
  return streak;
}
