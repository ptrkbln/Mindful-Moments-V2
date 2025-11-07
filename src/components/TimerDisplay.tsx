import { useRef, useEffect, useState } from "react";
import { useSoundtrack } from "../hooks/useSoundtrack";
import type { Soundtrack } from "../data/soundtracks";
import type { Timer } from "../data/timer";
import loopVideo from "../assets/videos/boat-loop.mp4";
import GratitudeInstructions from "./GratitudeInstructions";
import type { DailyTask } from "../data/gratitudeQuestions";

type TimerDisplayProps = {
  timer: Timer;
  soundtrack: Soundtrack;
  todaysTask: DailyTask;
  onComplete: () => void;
};

export default function TimerDisplay({
  timer,
  soundtrack,
  todaysTask,
  onComplete,
}: TimerDisplayProps) {
  const [timeLeft, setTimeLeft] = useState<number>(timer);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { play, stop } = useSoundtrack(timer, soundtrack);

  function startTimer() {
    if (intervalRef.current) return; // if timer's already running, skip this logic
    setIsTimerRunning(true);
    play(); // play soundtrack
    videoRef.current?.play(); // play video
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        stopTimer(); // stop at 0 seconds left
        return 0;
      });
    }, 1000);
  }

  function stopTimer() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    stop();
    videoRef.current?.pause();
    onComplete();
  }

  // cleanup function on unmount
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

  const progress = 1 - timeLeft / timer;
  const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const sec = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="flex flex-col h-full">
      {/* Top section: Video takes most space */}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        <video
          ref={videoRef}
          src={loopVideo}
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
          style={{
            filter:
              "hue-rotate(210deg) saturate(1.05) brightness(1.05) contrast(0.94)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/75 to-transparent pointer-events-none" />
      </div>

      {/* Bottom section: All controls and info */}
      <div className="bg-white/33">
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
              className="px-5 py-2 text-[12.5px] rounded-full w-[90%] sm:w-auto bg-gradient-to-r from-violet-200/55 via-purple-200/55 to-pink-200/55 ring-1 ring-violet-300/20 border border-white/30 text-violet-600 font-medium shadow-[0_4px_16px_-2px_rgba(167,139,250,0.3),0_2px_8px_rgba(219,39,119,0.15)] hover:shadow-[0_6px_24px_-2px_rgba(167,139,250,0.4),0_4px_12px_rgba(219,39,119,0.2)] hover:from-violet-200/80 hover:via-purple-200/70 hover:to-pink-200/70 hover:text-violet-800 active:translate-y-[1px] active:scale-[0.98] active:shadow-[0_2px_8px_-2px_rgba(167,139,250,0.3)] transition-all duration-300 ease-out"
            >
              Let's Start
            </button>
          ) : (
            <button
              onClick={stopTimer}
              className="px-5 py-2 text-[12.5px] rounded-full w-[90%] sm:w-auto ring-1 bg-white/33 ring-violet-200/30 border border-white/40 text-violet-600/80 font-medium shadow-[0_2px_12px_-2px_rgba(167,139,250,0.2)] hover:bg-white/80 hover:shadow-[0_4px_16px_-2px_rgba(167,139,250,0.3)] hover:text-violet-700 active:translate-y-[1px] transition-all duration-300 ease-out backdrop-blur-sm"
            >
              Finish Early
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
