import type { Soundtrack } from "../data/soundtracks";
import type { Topic } from "../data/topics";
import type { Timer } from "../data/timer";
import TimerDisplay from "./TimerDisplay";
import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import AnimateFadeInOut from "./AnimateFadeInOut";
import { gratitudeQuestions } from "../data/gratitudeQuestions";
import GratitudeInstructions from "./GratitudeInstructions";
import { HexColorPicker } from "react-colorful";
import { IoIosClose } from "react-icons/io";

const COLOR_INPUT_PROMPTS = [
  "Which color resonates with you today?",
  "What shade matches your mood right now?",
  "Pick the hue that feels most like today.",
  "Which color best holds your feelings?",
  "Point to the color that fits this moment.",
  "If today were a color, what would it be?",
  "What color are you drawn to in this moment?",
  "Let a color choose you. What is it?",
  "What color is your gratitude?",
] as const;

function getRandomArrayItem<T>(arr: readonly T[]): T | null {
  return arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
}

type GratitudeTaskProps = {
  topic: Topic;
  soundtrack: Soundtrack;
  timer: Timer;
};

export default function GratitudeTask({
  topic,
  soundtrack,
  timer,
}: GratitudeTaskProps) {
  const [isTimerDone, setIsTimerDone] = useState(false);
  const [input, setInput] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [isInputDone, setIsInputDone] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  // on mount select a color-input step prompt and keep it through rerenders
  const todaysColorPrompt = useMemo(
    () =>
      getRandomArrayItem(COLOR_INPUT_PROMPTS) ??
      "Which color resonates with you today?",
    []
  );

  // based on user's selected topic in previous step, check available tasks not yet completed by user and return one randomly
  // useMemo to prevent changing todaysTask with each rerender (eg. with textarea input)
  const todaysTask = useMemo(() => {
    const tasks = gratitudeQuestions.filter(
      (task) => task.topic === topic && !task.completed
    );
    return getRandomArrayItem(tasks);
  }, [topic]);

  // guard: if there are no tasks available, show a warning card and stop further component from rendering
  if (!todaysTask) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4 text-center p-8 
           bg-gradient-to-b from-rose-200 to-rose-50 rounded-2xl shadow-lg max-w-md"
      >
        <span className="text-4xl">⚠️</span>
        <h2 className="text-2xl font-semibold text-rose-700">
          Oops, something went wrong
        </h2>
        <p className="text-neutral-600">
          We couldn't load a gratitude task for you. Please refresh the page and
          try again.
        </p>
      </div>
    );
  }

  /* 
  Display a single gratitude exercise for a chosen topic:
  - first instructions with timer
  - after timer runs out (or is skipped) display form (first textarea, then color input)
  */
  return (
    <div
      className="w-[clamp(0px,100%,700px)] h-[clamp(440px,75dvh,min(650px,calc(100dvh-200px)))]
      shadow-[0_8px_32px_rgba(167,139,250,0.15),0_12px_48px_rgba(219,39,119,0.08),inset_0_0_20px_rgba(255,255,255,0.4)]
      bg-gradient-to-br from-white/40 via-white/25 to-white/15 overflow-hidden
      ring-1 ring-white/30 rounded-[60px] sm:rounded-[80px] backdrop-blur-md
      px-4 sm:px-6 py-5 flex flex-col transition-all duration-300
      hover:shadow-[0_12px_40px_rgba(167,139,250,0.2),0_16px_56px_rgba(219,39,119,0.12),inset_0_0_24px_rgba(255,255,255,0.5)]"
    >
      {/* intro block: AnimatePresence handles mount/unmount fade between gratitude task steps */}
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
          /* form block: wrapper + inner AnimatePresence to animate each form step: text input -> color input */
          <AnimateFadeInOut key="form">
            <form
              className="w-full h-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <AnimatePresence mode="wait">
                {!isInputDone ? (
                  <AnimateFadeInOut key="text-step">
                    <div className="flex flex-col h-full">
                      <div className="h-1/3 flex items-center justify-center">
                        <GratitudeInstructions taskObj={todaysTask} />
                      </div>
                      <div className="h-2/3 min-h-0 flex flex-col items-center justify-center gap-2">
                        <textarea
                          className="w-full max-w-[600px] h-full max-h-[279px] text-neutral-dark font-['Playpen_Sans',cursive]
                          font-extralight text-[clamp(16px,4vw,20px)] leading-[40px] resize-none
                          pl-[66px] sm:pl-[100px] pr-4 pt-[7px] pb-[34px] rounded-[20px]
                          shadow-[0_8px_24px_-4px_rgba(167,139,250,0.15),0_4px_12px_rgba(219,39,119,0.08),inset_0_2px_8px_rgba(255,255,255,0.6)]
                          ring-1 ring-violet-200/30
                          my-4 overflow-x-hidden overflow-y-auto bg-local
                          transition-all duration-300
                          focus:outline-none
                          focus:shadow-[0_12px_32px_-2px_rgba(167,139,250,0.25),0_6px_16px_rgba(219,39,119,0.12),inset_0_2px_12px_rgba(255,255,255,0.7)]
                          placeholder:italic placeholder:text-[clamp(16px,4vw,20px)] placeholder:text-left sm:placeholder:text-center
                          [background-image:url('./assets/images/lines_text_area.png'),url('./assets/backgrounds/wrinkled_paper.webp')]
                          [background-repeat:repeat-y,repeat] [background-position:-30px_0,center] sm:[background-position:0_0,center]"
                          style={{
                            filter: "saturate(0.8) brightness(1.05)",
                          }}
                          placeholder="Write freely… even a few lines is enough."
                          value={input}
                          required
                          onChange={(e) => setInput(e.currentTarget.value)}
                        />
                        <button
                          type="button"
                          disabled={!input.trim()}
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
                          disabled:opacity-50 disabled:cursor-not-allowed
                          transition-all duration-300 ease-out
                          backdrop-blur-sm"
                          onClick={() => setIsInputDone(true)}
                        >
                          Continue →
                        </button>
                      </div>
                    </div>
                  </AnimateFadeInOut>
                ) : (
                  /* once the textarea is done, continue to color input step */
                  <AnimateFadeInOut key="color-step">
                    <div className="flex flex-col h-full items-center justify-around pt-[8vh]">
                      {/* Top section - always visible instructions */}
                      <label
                        htmlFor="moodColor"
                        className="font-extralight text-[clamp(20px,4vw,24px)] tracking-wide text-center leading-snug
                      text-neutral-800 supports-[background-clip:text]:text-transparent
                        bg-gradient-to-r from-violet-600/90 via-purple-600/90 to-pink-600/90 bg-clip-text 
                        [text-shadow:0_1px_0_rgba(255,255,255,.45)] max-w-[80%]"
                      >
                        {todaysColorPrompt}
                      </label>

                      {/* Middle section - Color preview (button) */}
                      <div className="flex flex-col items-center justify-end h-full mt-5">
                        <div className="relative p-[3px] rounded-full bg-gradient-to-r from-violet-300/30 via-purple-300/30 to-pink-300/30">
                          <button
                            type="button"
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            className="size-[clamp(130px,20vmin,160px)] rounded-full cursor-pointer appearance-none bg-white/70
                            shadow-[0_10px_30px_rgba(0,0,0,.15)] focus:outline-none
                            transition-transform hover:scale-103"
                            style={{ backgroundColor: color }}
                          />
                          <span
                            className="pointer-events-none absolute -inset-1 rounded-full blur-xl
                            bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,.7),transparent_70%)]"
                          />
                        </div>
                      </div>

                      {/* Bottom section - conditionally render button or picker (same height) */}
                      <div className="flex items-center justify-start min-h-[45%]">
                        {showColorPicker ? (
                          <div
                            className="relative p-4 rounded-3xl
                          bg-white/40 backdrop-blur-sm
                            shadow-[0_8px_32px_-8px_rgba(0,0,0,0.2)]
                            ring-1 ring-white/40"
                          >
                            <HexColorPicker
                              color={color}
                              onChange={setColor}
                              style={{
                                width: "150px",
                                height: "150px",
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => setShowColorPicker(false)}
                              aria-label="Close color picker"
                              className="absolute -top-3 -right-3 z-10 flex items-center justify-center
                              size-7 rounded-full bg-white/85 backdrop-blur-md text-primary-dark
                              shadow-[0_6px_16px_rgba(0,0,0,.15)] ring-1 ring-white/70
                            hover:bg-white active:scale-95"
                            >
                              <IoIosClose className="size-5" />
                            </button>
                            {/*                             <button
                              type="button"
                              onClick={() => setShowColorPicker(false)}
                              className="mt-2 w-full px-4 py-1 text-sm rounded-full
                              bg-gradient-to-r from-violet-200/70 via-purple-200/70 to-pink-200/70
                            text-violet-700 font-medium
                            hover:from-violet-200/80 hover:via-purple-200/80 hover:to-pink-200/80
                              transition-all"
                            >
                              Close
                            </button> */}
                          </div>
                        ) : (
                          <div className="flex flex-col justify-between h-full">
                            <div className="flex items-center justify-start gap-2 pt-8">
                              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-violet-300/80"></span>
                              <p
                                className="text-center italic text-xs sm:text-sm 
                              text-violet-400/80 tracking-wider font-light"
                              >
                                Tap the circle
                              </p>
                              <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-violet-300/80"></span>
                            </div>
                            <button
                              type="submit"
                              className="h-10 px-6 py-2 text-sm rounded-full w-[95%] sm:w-auto
                              bg-gradient-to-r from-violet-200/70 via-purple-200/70 to-pink-200/70
                              ring-1 ring-violet-300/40
                              border border-white/50
                            text-violet-700 font-medium
                              shadow-[0_4px_16px_-2px_rgba(167,139,250,0.3),0_2px_8px_rgba(219,39,119,0.15)]
                              hover:shadow-[0_6px_24px_-2px_rgba(167,139,250,0.4),0_4px_12px_rgba(219,39,119,0.2)]
                            hover:from-violet-200/80 hover:via-purple-200/80 hover:to-pink-200/80
                            hover:text-violet-800 active:translate-y-[1px] 
                              active:scale-[0.98] active:shadow-[0_2px_8px_-2px_rgba(167,139,250,0.3)]
                              disabled:opacity-50 disabled:cursor-not-allowed 
                              transition-all duration-300 ease-out
                              backdrop-blur-sm mb-10"
                            >
                              Done for Today
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </AnimateFadeInOut>
                )}
              </AnimatePresence>
            </form>
          </AnimateFadeInOut>
        )}
      </AnimatePresence>
    </div>
  );
}
