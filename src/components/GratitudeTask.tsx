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
  "w-[300px] sm:w-[600px] text-[#222] font-['Playpen_Sans',cursive] font-extralight text-[18px] sm:text-[24px] resize-none leading-[40px] pl-[100px] sm:pr-1 pt-[7px] pb-[34px] rounded-[12px] shadow-[0px_2px_14px_#000] border-y border-white m-8 [background-image:url('../assets/lines_text_area.png'),url('../assets/paper_text_area.png')] [background-repeat:repeat-y,repeat]";
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
        return <span key={i}>{followUp}</span>;
      });
    };
    return (
      <div className="flex flex-col items-center">
        <p>Gratitude for {topic}</p>
        {taskObj?.task}
        <button onClick={() => setShowMoreToggle((s) => !s)}>
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
            <AnimatePresence mode="wait">
              {!isInputDone ? (
                <AnimateFadeInOut key="text-step">
                  <div className="flex flex-col items-center">
                    <Instructions taskObj={todaysTask} />
                    <textarea
                      className={textAreaStyle}
                      rows={7}
                      cols={33}
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
            </AnimatePresence>
          </form>
        </AnimateFadeInOut>
      )}
    </AnimatePresence>
  );
}
