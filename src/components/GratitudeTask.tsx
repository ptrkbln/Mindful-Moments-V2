import type { Soundtrack } from "../data/soundtracks";
import type { Timer } from "../data/timer";
import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import AnimateFadeInOut from "./AnimateFadeInOut";
import { type DailyTask } from "../data/gratitudeQuestions";
import GratitudeInstructions from "./GratitudeInstructions";
import GratitudeForm from "./GratitudeForm";
import loopVideo from "../assets/videos/boat-loop.mp4";
import { useSoundtrack } from "../hooks/useSoundtrack";

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
  const [timeLeft, setTimeLeft] = useState<number>(timer);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { play, stop } = useSoundtrack(timer, soundtrack);

  function startTimer() {
    if (intervalRef.current) return;
    setIsTimerRunning(true);
    play();
    videoRef.current?.play();
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        stopTimer();
        return 0;
      });
    }, 1000);
  }

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    stop();
    videoRef.current?.pause();
    setTimeLeft(0);
    setIsTimerRunning(false);
    setIsTimerDone(true);
  }, [stop]);

  useEffect(() => {
    const videoElement = videoRef.current;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (videoElement) videoElement.pause();
    };
  }, []);

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

  const progress = 1 - timeLeft / timer;
  const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const sec = String(timeLeft % 60).padStart(2, "0");

  return (
    <div
      className="w-[clamp(0px,100%,600px)] h-[clamp(400px,70dvh,450px)] relative
      shadow-[0_8px_32px_rgba(167,139,250,0.15),0_12px_48px_rgba(219,39,119,0.08),inset_0_0_20px_rgba(255,255,255,0.4)]
      bg-gradient-to-br from-white/40 via-white/25 to-white/15 overflow-hidden
      ring-1 ring-white/30 rounded-[60px] sm:rounded-[80px] backdrop-blur-md
      flex flex-col transition-[box-shadow] duration-300"
    >
      <AnimatePresence mode="wait">
        {!isTimerDone && soundtrack && timer ? (
          <AnimateFadeInOut key="intro">
            <div className="flex flex-col h-full">
              {/* Top section: Video takes most space */}
              <div className="flex-1 min-h-0 relative overflow-hidden">
                <video
                  ref={videoRef}
                  src={loopVideo}
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-75"
                  style={{
                    filter:
                      "hue-rotate(210deg) saturate(1.05) brightness(1.05) contrast(0.94)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
              </div>

              {/* Bottom section: All controls and info */}
              <div className="bg-white/50">
                <GratitudeInstructions taskObj={todaysTask} />

                {/* Timer progress */}
                <div className="px-6 pt-2 pb-4">
                  <div className="h-1.5 rounded-full bg-slate-200/60 overflow-hidden mb-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-400 via-violet-300 to-pink-300
                                 transition-[width] duration-700 ease-out shadow-[0_0_10px_rgba(168,85,247,0.35)]"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600/80">
                    <span className="text-[11px]">Focus time</span>
                    <span className="tabular-nums font-medium text-[11px]">
                      {min}:{sec}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <div className="px-6 pb-6 flex justify-center">
                  {!isTimerRunning ? (
                    <button
                      onClick={startTimer}
                      className="px-5 py-2 text-[12.5px] rounded-full w-[90%] sm:w-auto bg-gradient-to-r from-violet-200/55 via-purple-200/55 to-pink-200/55 ring-1 ring-violet-300/20 border border-white/30 text-violet-600 font-medium shadow-[0_4px_16px_-2px_rgba(167,139,250,0.3),0_2px_8px_rgba(219,39,119,0.15)] hover:shadow-[0_6px_24px_-2px_rgba(167,139,250,0.4),0_4px_12px_rgba(219,39,119,0.2)] hover:from-violet-200/80 hover:via-purple-200/70 hover:to-pink-200/70 hover:text-violet-800 active:translate-y-[1px] active:scale-[0.98] active:shadow-[0_2px_8px_-2px_rgba(167,139,250,0.3)] transition-all duration-300 ease-out backdrop-blur-sm"
                    >
                      Let's start
                    </button>
                  ) : (
                    <button
                      onClick={stopTimer}
                      className="px-5 py-2 text-[12.5px] rounded-full w-[90%] sm:w-auto bg-white/40 ring-1 ring-violet-200/30 border border-white/40 text-violet-600/80 font-medium shadow-[0_2px_12px_-2px_rgba(167,139,250,0.2)] hover:bg-white/60 hover:shadow-[0_4px_16px_-2px_rgba(167,139,250,0.3)] hover:text-violet-700 active:translate-y-[1px] transition-all duration-300 ease-out backdrop-blur-sm"
                    >
                      Skip reflection
                    </button>
                  )}
                </div>
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
