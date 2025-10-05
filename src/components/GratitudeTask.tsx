import type { Soundtrack } from "../data/soundtracks";
import type { Topic } from "../data/topics";
import type { Timer } from "../data/timer";
import TimerDisplay from "./TimerDisplay";
import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import AnimateFadeInOut from "./AnimateFadeInOut";
import { gratitudeQuestions } from "../data/gratitudeQuestions";
import GratitudeInstructions from "./GratitudeInstructions";

type GratitudeTaskProps = {
  topic: Topic;
  soundtrack: Soundtrack;
  timer: Timer;
};

// tailwind styling classes used by form elements
const textAreaStyle =
  "w-[clamp(290px,50vw,600px)] h-[clamp(200px,50vw,240px)]  text-[#222] font-['Playpen_Sans',cursive] font-extralight text-[18px] sm:text-[24px] resize-none leading-[40px] pl-[100px] sm:pr-1 pt-[7px] pb-[34px] rounded-[12px] shadow-[0px_2px_14px_#000] border-y border-white m-8 [background-image:url('./assets/images/lines_text_area.png'),url('./assets/backgrounds/wrinkled_paper.webp')] [background-repeat:repeat-y,repeat]";
const colorInputStyle =
  "h-20 w-20 cursor-pointer rounded-full p-0 border-2 border-black  overflow-hidden appearance-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full [&::-moz-color-swatch]:border-0 [&::-moz-color-swatch]:border-radius-full";

export default function GratitudeTask({
  topic,
  soundtrack,
  timer,
}: GratitudeTaskProps) {
  const [isTimerDone, setIsTimerDone] = useState(false);
  const [input, setInput] = useState("");
  const [color, setColor] = useState("#000000");
  const [isInputDone, setIsInputDone] = useState(false);

  // based on the selected topic, check available tasks not yet completed by user and return one randomly
  const getRandomTask = (chosenTopic: Topic) => {
    const tasks = gratitudeQuestions.filter(
      (task) => task.topic === chosenTopic && !task.completed
    );
    if (tasks.length === 0) return null;
    return tasks[Math.floor(Math.random() * tasks.length)];
  };

  //useMemo for getRandomTask function to not change the gratitude task on each rerender
  const todaysTask = useMemo(() => getRandomTask(topic), [topic]);

  if (!todaysTask) {
    // guard: if there are no tasks available, show a warning card and stop further component from rendering
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center p-8 bg-gradient-to-b from-rose-200 to-rose-50 rounded-2xl shadow-lg max-w-md">
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
  - after timer runs out (or is skipped) display form 
  */
  return (
    <div
      className="w-[clamp(300px,84vw,700px)] h-[clamp(500px,120vw,650px)] 
       shadow-[inset_0_0_12px_rgba(255,255,255,0.3)] bg-gradient-to-br from-white/35 via-white/20 to-white/10
       ring-1 ring-white/20 overflow-hidden rounded-[50px] sm:rounded-[70px] backdrop-blur-sm
       px-2 py-10 flex flex-col justify-around"
    >
      <AnimatePresence mode="wait">
        {/* intro block: AnimatePresence handles mount/unmount fade between gratitude task steps */}
        <AnimateFadeInOut key="intro">
          {soundtrack && timer && !isTimerDone && (
            <div className="flex flex-col justify-around w-full h-full">
              <GratitudeInstructions taskObj={todaysTask} />
              <TimerDisplay
                timer={timer}
                soundtrack={soundtrack}
                onComplete={() => setIsTimerDone(true)}
              />
            </div>
          )}
        </AnimateFadeInOut>

        {/* form block: wrapper + inner AnimatePresence to animate each step (text input -> color input) */}
        {isTimerDone && (
          <div className="w-full h-full">
            <AnimateFadeInOut key="form">
              <form className="w-full h-full">
                <AnimatePresence mode="wait" initial={false}>
                  {!isInputDone ? (
                    <AnimateFadeInOut key="text-step">
                      <div className="w-full h-full min-h-0 flex flex-col justify-between items-center">
                        <GratitudeInstructions taskObj={todaysTask} />
                        <div className="w-full flex flex-col items-center">
                          <textarea
                            className={textAreaStyle}
                            value={input}
                            required
                            onChange={(e) => setInput(e.currentTarget.value)}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsInputDone(true)}
                        >
                          Save and continue
                        </button>
                      </div>
                    </AnimateFadeInOut>
                  ) : (
                    <AnimateFadeInOut key="color-step">
                      <div className="w-full h-full min-h-0 flex flex-col justify-between items-center">
                        <label>Which color resonates with you today?</label>
                        <div className="flex items-center justify-center">
                          <input
                            type="color"
                            className={colorInputStyle}
                            value={color}
                            required
                            onChange={(e) => setColor(e.currentTarget.value)}
                          />
                        </div>

                        <button>Submit Today's Thoughts</button>
                      </div>
                    </AnimateFadeInOut>
                  )}
                </AnimatePresence>
              </form>
            </AnimateFadeInOut>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
