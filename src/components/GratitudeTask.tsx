import type { Soundtrack } from "../data/soundtracks";
import type { Topic } from "../data/topics";
import type { Timer } from "../data/timer";
import TimerDisplay from "./TimerDisplay";
import { useState, useMemo } from "react";
import { type DailyTask } from "../data/gratitudeQuestions";
import { AnimatePresence } from "framer-motion";
import AnimateFadeInOut from "./AnimateFadeInOut";
import { gratitudeQuestions } from "../data/gratitudeQuestions";

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
  const [showMoreToggle, setShowMoreToggle] = useState(false);
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

  // nested component: show the task instructions + toggleable followup questions
  function Instructions({ taskObj }: { taskObj: DailyTask }) {
    const renderFollowUps = (taskObj: DailyTask) => {
      return taskObj.followUps.map((followUp, i) => {
        return (
          <p
            key={i}
            className="font-light text-neutral-dark text-[clamp(14px,4vw,18px)] 
                      text-center tracking-wide font-['Playpen_Sans',cursive] py-[2px]"
          >
            {followUp}
          </p>
        );
      });
    };
    return (
      <div className="flex flex-col items-center">
        <span className="text-[clamp(14px,4vw,16px)] py-2 font-light">
          GRATITUDE FOR {taskObj.topic.toUpperCase()}
        </span>
        <span
          className="font-extralight text-neutral-dark text-[clamp(18px,4vw,22px)] 
                         tracking-wide font-['Playpen_Sans',cursive] text-center"
        >
          {taskObj?.task}
        </span>
        <button
          onClick={() => setShowMoreToggle((value) => !value)}
          className="h-10 px-3 text-xs flex items-center justify-center rounded-full
          bg-violet-100/80
          ring-1 ring-violet-200/70
          border border-violet-200/40
          text-neutral-dark
          shadow-[0_2px_10px_-2px_rgba(167,139,250,.15)]
          hover:bg-violet-200/60 hover:text-violet-600 active:translate-y-[1px] 
          transition-all duration-200 my-3"
        >
          {showMoreToggle ? "Show less" : "Show more"}
        </button>
        {showMoreToggle && renderFollowUps(taskObj)}
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
            <>
              <Instructions taskObj={todaysTask} />
              <TimerDisplay
                timer={timer}
                soundtrack={soundtrack}
                onComplete={() => setIsTimerDone(true)}
              />
            </>
          )}
        </AnimateFadeInOut>

        {/* form block: wrapper + inner AnimatePresence to animate each step (text input -> color input) */}
        {isTimerDone && (
          <AnimateFadeInOut key="form">
            <form>
              {!isInputDone ? (
                <AnimateFadeInOut key="text-step">
                  <div className="flex flex-col items-center">
                    <Instructions taskObj={todaysTask} />
                    <textarea
                      className={textAreaStyle}
                      value={input}
                      required
                      onChange={(e) => setInput(e.currentTarget.value)}
                    />
                    <button type="button" onClick={() => setIsInputDone(true)}>
                      Save and continue
                    </button>
                  </div>
                </AnimateFadeInOut>
              ) : (
                <AnimateFadeInOut key="color-step">
                  <div className="flex flex-col items-center">
                    <label>Which color resonates with you today?</label>
                    <input
                      type="color"
                      className={colorInputStyle}
                      value={color}
                      required
                      onChange={(e) => setColor(e.currentTarget.value)}
                    />
                    <button>Submit Today's Thoughts</button>
                  </div>
                </AnimateFadeInOut>
              )}
            </form>
          </AnimateFadeInOut>
        )}
      </AnimatePresence>
    </div>
  );
}
