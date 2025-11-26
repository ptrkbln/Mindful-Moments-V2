import { useMemo } from "react";
import {
  getCompletedDaysTotal,
  getCurrentStreak,
  getMaxStreak,
  getParsedRoot,
  isTodayPracticeCompleted,
} from "../utils/storage";
import AnimateFadeInOut from "../components/AnimateFadeInOut";
import { getRandomArrayItem } from "../utils/array";
import { Link } from "react-router-dom";

const NOT_DONE_GREETINGS = [
  "Ready for a small moment of calm?",
  "Let's make today a little lighter.",
  "A moment of clarity starts here.",
  "Give yourself a quiet moment.",
  "Your space for gratitude begins here.",
  "Find a little brightness today.",
  "Your mindful space starts here.",
  "Let's take one gentle step forward.",
  "Give yourself this tiny moment.",
  "A moment for yourself starts here.",
  "Your quiet corner begins here.",
  "Let's drift into a gentler space.",
  "A soft pause to anchor your day.",
] as const;

const DONE_GREETINGS = [
  "You've taken a moment for yourself today.",
  "You showed up for yourself today.",
  "A gentle moment, completed.",
  "You've added a little warmth to your day.",
  "You nurtured your well-being today.",
  "You gifted yourself a moment of care.",
  "You took a gentle step inward.",
  "You showed kindness to yourself.",
  "You gifted yourself a moment of care.",
] as const;

const INSIGHT_MESSAGES = [
  "Consistent small moments make the biggest difference.",
  "Short daily reflections help more than long rare ones.",
  "Tiny daily habits build resilience over time.",
  "With time, gratitude makes positive moments easier to notice.",
  "Gratitude can soften stress by shifting attention to steady moments.",
  "Even tiny notes of gratitude can reframe tough days.",
  "One good moment can help balance a heavy day.",
  "Writing one good thought can brighten the rest of the day.",
  "People who practice gratitude often feel more connected and less alone.",
  "Small moments of gratitude can help you sleep better and wake lighter.",
  "Your brain naturally grows what you pay attention to.",
  "What you notice regularly becomes easier to find.",
] as const;

export default function HomePage() {
  const root = useMemo(() => getParsedRoot(), []);
  const isTodayDone = isTodayPracticeCompleted(root);
  const totalDays = getCompletedDaysTotal(root);
  const maxStreak = getMaxStreak(root);
  const currentStreak = getCurrentStreak(root);
  const greeting = useMemo(
    () => getRandomArrayItem(isTodayDone ? DONE_GREETINGS : NOT_DONE_GREETINGS),
    [isTodayDone]
  );
  const insightMessage = useMemo(
    () => getRandomArrayItem(INSIGHT_MESSAGES),
    []
  );

  return (
    <AnimateFadeInOut>
      <div className="mx-auto flex flex-col items-center justify-around min-h-[500px] gap-8 sm:gap-10">
        <section className="text-center flex flex-col justify-around items-center gap-8 sm:gap-10 px-2">
          <h1
            className="text-4xl md:text-5xl font-light bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 
            bg-clip-text text-transparent leading-tight"
          >
            {greeting}
          </h1>
          <p className="text-lg md:text-xl text-violet-700/70 font-light leading-relaxed">
            {insightMessage}
          </p>
          {!isTodayDone && (
            <Link
              to="practice"
              className="mt-3 px-8 py-3 rounded-full text-[15px] sm:text-base text-violet-700/85
            bg-white/50 border border-white/70 ring-1 ring-violet-200/30
              shadow-[0_4px_16px_rgba(148,163,184,0.35)] hover:bg-white/65
              hover:shadow-[0_6px_26px_rgba(148,163,184,0.45)] hover:text-violet-700
              active:translate-y-[1px] active:shadow-[0_3px_12px_rgba(148,163,184,0.35)]
              transition-all duration-300 ease-out"
            >
              Jump To Practice
            </Link>
          )}
        </section>

        {/* isTodayDone && Link to journal history? */}

        <section className="w-full max-w-lg px-4">
          <div
            className="bg-white/50 rounded-3xl shadow-[0_8px_32px_rgba(140,116,255,0.15)]
            ring-1 ring-white/60 px-6 py-5"
          >
            <p className="text-[11px] tracking-[3px] uppercase text-center text-violet-400/85 mb-3">
              Your journey so far
            </p>

            <div className="grid grid-cols-3 text-center">
              <div className="flex flex-col items-center gap-1">
                <p className="text-2xl md:text-3xl font-light text-violet-600">
                  {totalDays}
                </p>
                <p className="tracking-[2.5px] uppercase text-violet-400/85 text-[10px] pt-1 pr-1">
                  Total days
                </p>
              </div>

              <div className="flex flex-col items-center gap-1 border-x border-white/85">
                <p className="text-2xl md:text-3xl font-light text-violet-600">
                  {currentStreak}
                </p>
                <p className="tracking-[2.5px] uppercase text-violet-400/85 text-[10px] pt-1">
                  Streak
                </p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="text-2xl md:text-3xl font-light text-violet-600">
                  {maxStreak}
                </p>
                <p className="tracking-[2.5px] uppercase text-violet-400/85 text-[10px] pt-1 pl-1">
                  Best streak
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AnimateFadeInOut>
  );
}
