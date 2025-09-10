import type { Timer } from "../data/timer";
import { useRef, useEffect, useState, useCallback } from "react";
import { useSoundtrack } from "../hooks/useSoundtrack";
import type { Soundtrack } from "../data/soundtracks";

export default function TimerDisplay({
  timer,
  soundtrack,
}: {
  timer: Timer;
  soundtrack: Soundtrack;
}) {
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
  }, [stop]);

  // maybe needed if parent later changes timer -> reflect in setTimeLeft
  useEffect(() => {
    setTimeLeft(timer || 0);
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
    <div className="flex flex-col">
      {!!timer && !!timeLeft && (
        <>
          <p>
            While music plays, try closing your eyes and reflecting on the
            question.
          </p>
          <span className="text-center">
            {minutes}:{ss}
          </span>
        </>
      )}

      {timer === timeLeft && (
        <button onClick={startTimer}>Take a moment to reflect</button>
      )}

      {timeLeft > 0 && timer !== null && timeLeft < timer && (
        <button onClick={stopTimer}>Skip timer</button>
      )}
    </div>
  );
}
