import {
  gratitudeQuestions,
  type DailyTask,
  type Topic,
} from "../data/gratitudeQuestions";

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
