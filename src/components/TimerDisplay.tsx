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
    <div className="flex flex-col items-center">
      {!!timer && !!timeLeft && (
        <>
          {/*           <p className="font-light flex justify-center text-center">
            While music plays, try closing your eyes and reflecting on the
            question.
          </p> */}

          <span className="tabular-nums font-extralight font-['Nunito',cursive] text-[clamp(40px,20vw,80px)] text-neutral-dark/70">
            {minutes}:{ss}
          </span>
        </>
      )}

      {timer === timeLeft && (
        <button
          onClick={startTimer}
          className="h-10 px-4 rounded-full text-lg text-white
                shadow-[0_10px_24px_-10px_rgba(167,139,250,.4)]
                ring-1 ring-violet-200/20
                active:translate-y-[1px] transition-all duration-300
                [background:linear-gradient(135deg,#a78bfa,#c4b5fd)]
                hover:[background:linear-gradient(135deg,#7c3aed,#a78bfa)]
                hover:shadow-[0_12px_28px_-12px_rgba(167,139,250,.5)]"
        >
          Let's start
        </button>
      )}

      {timeLeft > 0 && timer !== null && timeLeft < timer && (
        <button
          onClick={stopTimer}
          className="h-10 px-4 text-sm rounded-full
                bg-violet-100/80
                ring-1 ring-violet-200/70
                border border-violet-200/40
                text-neutral-dark
                shadow-[0_2px_10px_-2px_rgba(167,139,250,.15)]
                hover:bg-violet-200/60 hover:text-violet-600 active:translate-y-[1px] 
                transition-all duration-200"
        >
          Skip
        </button>
      )}
    </div>
  );
}
