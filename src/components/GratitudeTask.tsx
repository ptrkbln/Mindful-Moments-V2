import type { Soundtrack } from "../data/soundtracks";
import type { Timer } from "../data/timer";
import TimerDisplay from "./TimerDisplay";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AnimateFadeInOut from "./AnimateFadeInOut";
import { type DailyTask } from "../data/gratitudeQuestions";
import GratitudeInstructions from "./GratitudeInstructions";
import GratitudeForm from "./GratitudeForm";

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

  // fallback/guard if no tasks available
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

  // display a single gratitude task: timer first, when complete (or skipped), show form
  return (
    <div
      className="w-[clamp(0px,100%,700px)] h-[clamp(440px,75dvh,min(650px,calc(100dvh-200px)))]
      shadow-[0_8px_32px_rgba(167,139,250,0.15),0_12px_48px_rgba(219,39,119,0.08),inset_0_0_20px_rgba(255,255,255,0.4)]
      bg-gradient-to-br from-white/40 via-white/25 to-white/15 overflow-hidden
      ring-1 ring-white/30 rounded-[60px] sm:rounded-[80px] backdrop-blur-md
      px-4 sm:px-6 py-5 flex flex-col transition-all duration-300
      hover:shadow-[0_12px_40px_rgba(167,139,250,0.2),0_16px_56px_rgba(219,39,119,0.12),inset_0_0_24px_rgba(255,255,255,0.5)]"
    >
      <AnimatePresence mode="wait">
        {!isTimerDone && soundtrack && timer ? (
          <AnimateFadeInOut key="intro">
            <div className="flex flex-col h-full">
              <div className="h-1/3 flex items-center justify-center">
                <GratitudeInstructions taskObj={todaysTask} />
              </div>
              <div className="h-2/3 min-h-0 flex items-center justify-center overflow-y-auto">
                <TimerDisplay
                  timer={timer}
                  soundtrack={soundtrack}
                  onComplete={() => setIsTimerDone(true)}
                />
              </div>
            </div>
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
