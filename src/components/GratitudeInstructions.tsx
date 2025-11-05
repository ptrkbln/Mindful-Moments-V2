import type { DailyTask } from "../data/gratitudeQuestions";
import { useState, useEffect } from "react";
import AnimateFadeInOut from "./AnimateFadeInOut";
import { AnimatePresence } from "framer-motion";

// nested component: show the task instructions + toggleable followup questions
export default function GratitudeInstructions({
  taskObj,
}: {
  taskObj: DailyTask;
}) {
  const [i, setI] = useState(0);
  const taskQuestions: string[] = [taskObj.task, ...taskObj.followUps]; // main task and its follow-ups

  // rotate between main task and its follow-ups every 15 secs
  useEffect(() => {
    if (taskQuestions.length === 0) return;

    const id = setInterval(() => {
      setI((prev) => (prev + 1) % taskQuestions.length);
    }, 15000);

    return () => clearInterval(id);
  }, [taskQuestions.length]);

  return (
    <div className="px-6 pt-3 pb-1.5">
      {/* Compact top bar */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[9.5px] tracking-[2px] uppercase text-slate-500/75">
          Gratitude for {taskObj.topic}
        </span>
        <span className="text-[10px] text-slate-500/70 tabular-nums">
          {i + 1}/{taskQuestions.length}
        </span>
      </div>

      {/* Question - more compact */}
      <AnimatePresence mode="wait">
        <AnimateFadeInOut key={i}>
          <p className="text-slate-700/80 text-[16px] leading-relaxed tracking-[0.2px] font-normal">
            {taskQuestions[i]}
          </p>
        </AnimateFadeInOut>
      </AnimatePresence>
    </div>
  );
}
