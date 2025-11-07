import type { Soundtrack } from "../data/soundtracks";
import type { Timer } from "../data/timer";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AnimateFadeInOut from "./AnimateFadeInOut";
import { type DailyTask } from "../data/gratitudeQuestions";
import GratitudeForm from "./GratitudeForm";
import TimerDisplay from "./TimerDisplay";

type GratitudeTaskProps = {
  todaysTask: DailyTask | null;
  soundtrack: Soundtrack;
  timer: Timer;
};

export default function GratitudeTask({
  todaysTask,
  soundtrack,
  timer,
}: GratitudeTaskProps) {
  const [isTimerDone, setIsTimerDone] = useState(false);

  if (!todaysTask) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-6 text-center p-10
      bg-white/40 backdrop-blur-sm rounded-3xl 
      shadow-[0_8px_32px_-8px_rgba(0,0,0,0.2)]
      ring-1 ring-white/40 max-w-md"
      >
        <h2 className="text-xl font-light text-purple-600/90 tracking-wide">
          Something went wrong
        </h2>
        <p className="text-sm text-violet-400/80 font-light leading-relaxed max-w-xs">
          We couldn't load your practice today. Take a mindful breath and try
          refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-[clamp(0px,100%,600px)] h-[clamp(400px,70dvh,450px)] relative
      shadow-[0_8px_32px_rgba(167,139,250,0.15),0_12px_48px_rgba(219,39,119,0.08),inset_0_0_20px_rgba(255,255,255,0.4)]
      bg-gradient-to-b from-white/45 via-white/95 to-white/45 overflow-hidden
      ring-1 ring-white/30 rounded-[60px] sm:rounded-[80px]
      flex flex-col mx-auto"
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isTimerDone && soundtrack && timer ? (
          <AnimateFadeInOut key="timer">
            <TimerDisplay
              timer={timer}
              soundtrack={soundtrack}
              todaysTask={todaysTask}
              onComplete={() => setIsTimerDone(true)}
            />
          </AnimateFadeInOut>
        ) : (
          <AnimateFadeInOut key="form">
            <GratitudeForm todaysTask={todaysTask} />
          </AnimateFadeInOut>
        )}
      </AnimatePresence>
    </div>
  );
}
