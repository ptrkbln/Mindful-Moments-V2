import { useMemo, useState, useEffect } from "react";
import SceneSetting from "../components/SceneSetting";
import type { Soundtrack } from "../data/soundtracks";
import type { Timer } from "../data/timer";
import {
  type Topic,
  type DailyTask,
  gratitudeQuestions,
} from "../data/gratitudeQuestions";
import GratitudeTask from "../components/GratitudeTask";
import {
  getParsedRoot,
  getAvailableTopicsFromRoot,
  getAvailableTaskIdsFromRoot,
} from "../utils/storage";
import { getRandomArrayItem } from "../utils/array";

export default function PracticePage() {
  const [soundtrack, setSoundtrack] = useState<Soundtrack | null>(null);
  const [timer, setTimer] = useState<Timer | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [todaysTask, setTodaysTask] = useState<DailyTask | null>(null);
  const root = useMemo(() => getParsedRoot(), []); // localStorage snapshot (once at mount), not reactive
  // topics and taskIds derived from snapshot (stable until page remounts)
  const availableTopics = useMemo(
    () => getAvailableTopicsFromRoot(root),
    [root]
  );
  const availableTaskIds = useMemo(
    () => getAvailableTaskIdsFromRoot(root),
    [root]
  );

  // pick a random task when all options are selected, store in state to avoid rerandomizing
  useEffect(() => {
    if (topic && soundtrack && timer) {
      const randomTask = getRandomArrayItem(
        gratitudeQuestions.filter(
          (task) => task.topic === topic && availableTaskIds.includes(task.id)
        )
      );
      setTodaysTask(randomTask);
    }
  }, [availableTaskIds, topic, soundtrack, timer]);

  /* 
  1) check if there are still available (uncompleted) topics:
   - if yes: show SceneSetting to let  user choose options (topic, soundtrack, timer)
   - if no: show "You completed our DEMO" screen
  2) once all three options are selected (topic, soundtrack, timer) -> render GratitudeTask
  */
  return (
    <>
      {topic && soundtrack && timer ? (
        <GratitudeTask
          todaysTask={todaysTask}
          soundtrack={soundtrack}
          timer={timer}
        />
      ) : availableTopics.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 text-center p-8 bg-gradient-to-b from-emerald-200 to-emerald-50 rounded-2xl shadow-lg max-w-md">
          <span className="text-4xl">🎉</span>
          <h2 className="text-2xl font-semibold text-emerald-700">
            You completed our DEMO!
          </h2>
          <p className="text-neutral-600">
            Great job finishing all the gratitude prompts. Come back later for
            more reflections.
          </p>
        </div>
      ) : (
        <SceneSetting
          topic={topic}
          setTopic={setTopic}
          soundtrack={soundtrack}
          setSoundtrack={setSoundtrack}
          timer={timer}
          setTimer={setTimer}
          availableTopics={availableTopics}
        />
      )}
    </>
  );
}
