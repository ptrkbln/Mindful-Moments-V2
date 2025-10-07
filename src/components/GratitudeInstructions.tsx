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

  // rotate between main task and its follow-ups every 10 secs
  useEffect(() => {
    const id = setInterval(() => {
      setI((prev) => (prev + 1) % taskQuestions.length);
    }, 10000);
    return () => clearInterval(id);
  }, [taskQuestions.length]);

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {/* Topic */}
      <span
        className="text-[clamp(12px,4vw,14px)] py-2 font-light text-center
        tracking-[0.15em] text-primary-dark/90
        [text-shadow:0_2px_12px_rgba(167,139,250,0.3)]"
      >
        GRATITUDE FOR {taskObj.topic.toUpperCase()}
      </span>
      {/* Main task + follow-up questions */}
      <AnimatePresence mode="wait">
        <AnimateFadeInOut key={i}>
          <div
            className="font-extralight text-[clamp(20px,4vw,24px)] tracking-wide text-center leading-snug
          text-neutral-800 supports-[background-clip:text]:text-transparent
            bg-gradient-to-r from-violet-600/90 via-purple-600/90 to-pink-600/90 bg-clip-text 
            [text-shadow:0_1px_0_rgba(255,255,255,.45)]"
          >
            {taskQuestions[i]}
          </div>
          <p
            className="text-center text-[11px] sm:text-xs lg:text-[13px]
          text-neutral-500/75 pt-3 
            [text-shadow:0_1px_4px_rgba(255,255,255,0.6)]"
          >
            {i === 0
              ? "Opening thought"
              : i === taskQuestions.length - 1
              ? "Closing reflection"
              : "Deeper reflection"}
          </p>
        </AnimateFadeInOut>
      </AnimatePresence>
    </div>
  );
}
