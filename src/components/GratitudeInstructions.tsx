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
    <div
      className="flex flex-col items-center gap-2
                   [grid-template-rows:auto_auto_auto] w-full"
    >
      {/* Topic */}
      <span className="text-[clamp(14px,4vw,16px)] py-2 font-light">
        GRATITUDE FOR {taskObj.topic.toUpperCase()}
      </span>
      {/* Main task + follow-up questions */}
      <AnimatePresence mode="wait">
        <AnimateFadeInOut key={i}>
          <div
            className="font-extralight text-neutral-dark text-[clamp(18px,4vw,22px)] 
                     tracking-wide font-['Playpen_Sans',cursive] text-center"
          >
            {taskQuestions[i]}
          </div>
          <p className="text-center italic text-xs sm:text-sm text-neutral-dark/50 pt-2">
            {i === 0
              ? "Opening thought"
              : i === taskQuestions.length - 1
              ? "Closing reflection"
              : "Deeper reflection"}
          </p>
        </AnimateFadeInOut>
      </AnimatePresence>
      {/*       <div className="sm:pt-4 flex gap-4">
        <button
          onClick={() =>
            setI((prev) => (prev === 0 ? taskQuestions.length - 1 : prev - 1))
          }
          className="h-10 px-3 text-xs flex items-center justify-center rounded-full
          bg-violet-100/80
          ring-1 ring-violet-200/70
          border border-violet-200/40
          text-neutral-dark
          shadow-[0_2px_10px_-2px_rgba(167,139,250,.15)]
          hover:bg-violet-200/60 hover:text-violet-600 active:translate-y-[1px] 
          transition-all duration-200 my-3"
        >
          <FaAngleLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() =>
            setI((prev) => (prev === taskQuestions.length - 1 ? 0 : prev + 1))
          }
          className="h-10 px-3 text-xs flex items-center justify-center rounded-full
          bg-violet-100/80
          ring-1 ring-violet-200/70
          border border-violet-200/40
          text-neutral-dark
          shadow-[0_2px_10px_-2px_rgba(167,139,250,.15)]
          hover:bg-violet-200/60 hover:text-violet-600 active:translate-y-[1px] 
          transition-all duration-200 my-3"
        >
          <FaAngleRight className="w-4 h-4" />
        </button>
      </div> */}
    </div>
  );
}
