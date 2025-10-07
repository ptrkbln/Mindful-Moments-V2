import type { Timer } from "../data/timer";
import { useRef, useEffect, useState, useCallback } from "react";
import { useSoundtrack } from "../hooks/useSoundtrack";
import type { Soundtrack } from "../data/soundtracks";

type TimerDisplayProps = {
  timer: Timer;
  soundtrack: Soundtrack;
  onComplete: () => void;
};

export default function TimerDisplay({
  timer,
  soundtrack,
  onComplete,
}: TimerDisplayProps) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(timer);
  // convert timer to mins and secs
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const ss = String(seconds).padStart(2, "0");

  const { play, stop } = useSoundtrack(timer, soundtrack);

  function startTimer() {
    if (intervalRef.current) return; // timer already running
    play();
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        stopTimer(); // stop at 0 seconds left
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
    setTimeLeft(0);
    onComplete();
  }, [stop, onComplete]);

  // maybe needed if parent later changes timer -> reflect in setTimeLeft
  useEffect(() => {
    setTimeLeft(timer);
  }, [timer]);

  // cleanup function on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {!!timer && !!timeLeft && (
        <span className="tabular-nums font-extralight font-['Nunito',cursive] text-[clamp(40px,20vw,80px)] text-neutral-dark/70">
          {minutes}:{ss}
        </span>
      )}

      {timer === timeLeft && (
        <button
          onClick={startTimer}
          className="h-10 px-6 py-2 text-sm rounded-full w-full sm:w-auto
          bg-gradient-to-r from-violet-200/70 via-purple-200/70 to-pink-200/70
          ring-1 ring-violet-300/40
          border border-white/50
        text-violet-700 font-medium
          shadow-[0_4px_16px_-2px_rgba(167,139,250,0.3),0_2px_8px_rgba(219,39,119,0.15)]
          hover:shadow-[0_6px_24px_-2px_rgba(167,139,250,0.4),0_4px_12px_rgba(219,39,119,0.2)]
        hover:from-violet-200/80 hover:via-purple-200/80 hover:to-pink-200/80
        hover:text-violet-800 active:translate-y-[1px] 
          active:scale-[0.98] active:shadow-[0_2px_8px_-2px_rgba(167,139,250,0.3)]
          transition-all duration-300 ease-out
          backdrop-blur-sm"
        >
          Let's start
        </button>
      )}

      {timeLeft > 0 && timer !== null && timeLeft < timer && (
        <button
          onClick={stopTimer}
          className="h-10 px-6 py-2 text-sm rounded-full
        bg-white/40
          ring-1 ring-violet-200/30
          border border-white/40
        text-violet-600/80 font-medium
          shadow-[0_2px_12px_-2px_rgba(167,139,250,0.2)]
        hover:bg-white/50
          hover:shadow-[0_4px_16px_-2px_rgba(167,139,250,0.3)]
        hover:text-violet-700 
          active:translate-y-[1px] 
          transition-all duration-300 ease-out
          backdrop-blur-sm"
        >
          Skip
        </button>
      )}
    </div>
  );
}
