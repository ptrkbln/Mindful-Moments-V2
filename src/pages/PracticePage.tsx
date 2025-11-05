import { useMemo, useState } from "react";
import SceneSetting from "../components/SceneSetting";
import type { Soundtrack } from "../data/soundtracks";
import type { Timer } from "../data/timer";
import { type Topic, gratitudeQuestions } from "../data/gratitudeQuestions";
import GratitudeTask from "../components/GratitudeTask";
import {
  getParsedRoot,
  getAvailableTopicsFromRoot,
  getAvailableTaskIdsFromRoot,
} from "../utils/storage";
import { getRandomArrayItem } from "../utils/array";
import useTodayDone from "../hooks/useTodayDone";
import { AnimatePresence } from "framer-motion";
import AnimateFadeInOut from "../components/AnimateFadeInOut";

export default function PracticePage() {
  const [soundtrack, setSoundtrack] = useState<Soundtrack | null>(null);
  const [timer, setTimer] = useState<Timer | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  // const [todaysTask, setTodaysTask] = useState<DailyTask | null>(null);
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
  const isTodayDone = useTodayDone();

  // pick a random task when all options are selected, memoized to stay stable across re-renders and prevents flicker
  const todaysTask = useMemo(() => {
    if (!topic || !soundtrack || !timer) return null;
    const tasks = gratitudeQuestions.filter(
      (task) => task.topic === topic && availableTaskIds.includes(task.id)
    );
    return getRandomArrayItem(tasks);
  }, [topic, soundtrack, timer, availableTaskIds]);

  /* 
  1) check if there are still available (uncompleted) topics:
   - if yes: show SceneSetting to let  user choose options (topic, soundtrack, timer)
   - if no: show "You completed our DEMO" screen
  2) once all three options are selected (topic, soundtrack, timer) -> render GratitudeTask
  */
  return (
    <AnimatePresence mode="wait">
      {isTodayDone ? (
        <AnimateFadeInOut key="today-done">
          <div
            className="w-full max-w-sm
  shadow-[0_8px_32px_rgba(167,139,250,0.15),inset_0_0_20px_rgba(255,255,255,0.4)]
  bg-gradient-to-br from-white/40 via-white/25 to-white/15
  ring-1 ring-white/30 rounded-[60px] backdrop-blur-md
  px-8 py-16 flex flex-col items-center gap-6 text-center"
          >
            <div className="text-4xl mb-2">🌸</div>

            <h2
              className="text-2xl font-light
    bg-gradient-to-r from-violet-600/90 via-purple-600/90 to-pink-600/90
    bg-clip-text text-transparent"
            >
              You're all set for today!
            </h2>

            <p className="text-violet-500/80 font-light leading-relaxed">
              Your gratitude has been saved.
              <br />
              Come back tomorrow to continue your journey.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-violet-300/50"></span>
              <span className="text-violet-300/70">✦</span>
              <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-violet-300/50"></span>
            </div>
          </div>
        </AnimateFadeInOut>
      ) : topic && soundtrack && timer ? (
        <AnimateFadeInOut key="gratitude-task">
          <GratitudeTask
            todaysTask={todaysTask}
            soundtrack={soundtrack}
            timer={timer}
          />
        </AnimateFadeInOut>
      ) : availableTopics.length === 0 ? (
        <AnimateFadeInOut key="demo-completed">
          <div className="flex flex-col items-center justify-center gap-4 text-center p-8 bg-gradient-to-b from-emerald-200 to-emerald-50 rounded-2xl shadow-lg max-w-md">
            <span className="text-4xl">🎉</span>
            <h2 className="text-2xl font-semibold text-emerald-700">
              You completed our DEMO!
            </h2>
            <p className="text-neutral-600">
              Great job finishing all the gratitude tasks. Come back later for
              more reflections.
            </p>
          </div>
        </AnimateFadeInOut>
      ) : (
        <AnimateFadeInOut key="scene-setting">
          <SceneSetting
            topic={topic}
            setTopic={setTopic}
            soundtrack={soundtrack}
            setSoundtrack={setSoundtrack}
            timer={timer}
            setTimer={setTimer}
            availableTopics={availableTopics}
          />
        </AnimateFadeInOut>
      )}
    </AnimatePresence>
  );
}
