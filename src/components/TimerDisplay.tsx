import { useRef, useEffect, useState, useCallback } from "react";
import { useSoundtrack } from "../hooks/useSoundtrack";
import type { Soundtrack } from "../data/soundtracks";
import type { Timer } from "../data/timer";
import loopVideo from "../assets/videos/boat-loop.mp4";

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
  const [timeLeft, setTimeLeft] = useState<number>(timer);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { play, stop } = useSoundtrack(timer, soundtrack);

  function startTimer() {
    if (intervalRef.current) return; // if timer's already running, skip this logic
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

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    stop();
    videoRef.current?.pause();
    setTimeLeft(0);
    onComplete();
  }, [stop, onComplete]);

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
    <>
      {/* Top control panel with gradient that fades down */}
      <div className="bg-gradient-to-b from-white/60 via-white/40 to-transparent backdrop-blur-sm pb-6">
        {/* Timer progress */}
        <div className="px-6 pt-4 pb-3">
          <div className="h-1.5 rounded-full bg-slate-200/60 overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-400 via-violet-300 to-pink-300
                         transition-[width] duration-700 ease-out shadow-[0_0_10px_rgba(168,85,247,0.35)]"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600/80">
            <span className="text-[10px]">Focus time</span>
            <span className="tabular-nums font-medium text-slate-700 text-[11px]">
              {min}:{sec}
            </span>
          </div>
        </div>

        {/* Button */}
        <div className="px-6 flex justify-center">
          {timer === timeLeft && (
            <button
              onClick={startTimer}
              className="h-11 px-8 py-2 text-sm rounded-full w-[90%] sm:w-auto bg-gradient-to-r from-violet-200/70 via-purple-200/70 to-pink-200/70 ring-1 ring-violet-300/40 border border-white/50 text-violet-700 font-medium shadow-[0_4px_16px_-2px_rgba(167,139,250,0.3),0_2px_8px_rgba(219,39,119,0.15)] hover:shadow-[0_6px_24px_-2px_rgba(167,139,250,0.4),0_4px_12px_rgba(219,39,119,0.2)] hover:from-violet-200/80 hover:via-purple-200/80 hover:to-pink-200/80 hover:text-violet-800 active:translate-y-[1px] active:scale-[0.98] active:shadow-[0_2px_8px_-2px_rgba(167,139,250,0.3)] transition-all duration-300 ease-out backdrop-blur-sm"
            >
              Let's start
            </button>
          )}
          {timeLeft > 0 && timeLeft < timer && (
            <button
              onClick={stopTimer}
              className="h-11 px-8 py-2 text-sm rounded-full w-[90%] sm:w-auto bg-white/30 ring-1 ring-violet-200/30 border border-white/40 text-violet-600/80 font-medium shadow-[0_2px_12px_-2px_rgba(167,139,250,0.2)] hover:bg-white/60 hover:shadow-[0_4px_16px_-2px_rgba(167,139,250,0.3)] hover:text-violet-700 active:translate-y-[1px] transition-all duration-300 ease-out backdrop-blur-sm"
            >
              Skip
            </button>
          )}
        </div>
      </div>

      {/* Video section at bottom - boat floating in the sea */}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        <video
          ref={videoRef}
          src={loopVideo}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
      </div>
    </>
  );
}
