import { gratitudeQuestions } from "../data/gratitudeQuestions";
import type { Topic } from "../data/topics";

// check which gratitude tasks are not yet completed by user and display only those topics
export function getAvailableTopics(): Topic[] {
  const availableTopics: Topic[] = [];
  gratitudeQuestions
    .filter((taskObj) => !taskObj.completed)
    .forEach((task) => {
      if (!availableTopics.includes(task.topic))
        availableTopics.push(task.topic);
    });
  return availableTopics;
}
