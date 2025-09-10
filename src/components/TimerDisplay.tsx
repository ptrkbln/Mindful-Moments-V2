import type { Timer } from "../data/timer";
import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";

export default function TimerDisplay({
  timer,
  setTimer,
}: {
  timer: Timer | null;
  setTimer: Dispatch<SetStateAction<Timer | null>>;
}) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(timer ? timer : 0);
  // convert timer to mins and secs
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const ss = String(seconds).padStart(2, "0");

  function startTimer() {
    if (intervalRef.current) return; // timer already running

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
    setTimeLeft(0);
    // setTimer(null);
  }, []);

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
