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
    }, 15000);
    return () => clearInterval(id);
  }, [taskQuestions.length]);

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {/* Topic */}
      <span
        className="text-[clamp(11px,3.2vw,13px)] font-light text-center
        tracking-[0.18em] text-primary-dark/90 mb-3 sm:mb-4
        [text-shadow:0_2px_12px_rgba(167,139,250,0.3)]"
      >
        GRATITUDE FOR {taskObj.topic.toUpperCase()}
      </span>
      {/* Main task + follow-up questions */}
      <AnimatePresence mode="wait">
        <AnimateFadeInOut key={i}>
          <div
            className="font-light text-[clamp(21px,4vw,25px)] tracking-wide text-center leading-tight
          text-neutral-800 supports-[background-clip:text]:text-transparent max-w-[45ch] mx-auto min-h-[2.6em]
            bg-gradient-to-r from-violet-600/90 via-purple-600/90 to-pink-600/90 bg-clip-text 
            [text-shadow:0_1px_0_rgba(255,255,255,.45)] flex items-center justify-center"
          >
            {taskQuestions[i]}
          </div>
          <div className="flex items-center justify-center gap-2 pt-4 sm:pt-5">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-violet-300/80"></span>
            <p
              className="text-center italic text-xs sm:text-sm 
            text-violet-400/80
              tracking-wider font-light"
            >
              {i === 0
                ? "Opening thought"
                : i === taskQuestions.length - 1
                ? "Closing reflection"
                : "Deeper reflection"}
            </p>
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-violet-300/80"></span>
          </div>
        </AnimateFadeInOut>
      </AnimatePresence>
    </div>
  );
}
