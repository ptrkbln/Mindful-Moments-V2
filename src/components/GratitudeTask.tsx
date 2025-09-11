import type { Soundtrack } from "../data/soundtracks";
import type { Topic } from "../data/topics";
import type { Timer } from "../data/timer";
import TimerDisplay from "./TimerDisplay";
import { useState, useMemo } from "react";
import { gratitudeQuestions, type DailyTask } from "../data/gratitudeQuestions";

type GratitudeTaskProps = {
  topic: Topic;
  soundtrack: Soundtrack;
  timer: Timer;
};

const textAreaStyle =
  "w-[300px] sm:w-[600px] text-[#222] font-['Playpen_Sans',cursive] font-extralight text-[18px] sm:text-[24px] resize-none leading-[40px] pl-[100px] sm:pr-1 pt-[7px] pb-[34px] rounded-[12px] shadow-[0px_2px_14px_#000] border-y border-white m-8 [background-image:url('../../public/lines_text_area.png'),url('../../public/paper_text_area.png')] [background-repeat:repeat-y,repeat]";
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
  const [color, setColor] = useState("");

  const pickRandomTask = (chosenTopic: Topic) => {
    const tasks = gratitudeQuestions.filter(
      (task) => task.topic === chosenTopic
    );
    if (!tasks) {
      const allDone: DailyTask = {
        id: "all done",
        topic: chosenTopic,
        task: "all done",
        followUps: ["all done"],
      };
      return allDone;
    }
    return tasks[Math.floor(Math.random() * tasks.length)];
  };

  const todaysTask = useMemo(() => pickRandomTask(topic), [topic]);

  const renderFollowUps = (taskObj: DailyTask) => {
    return taskObj.followUps.map((followUp) => {
      return <span>{followUp}</span>;
    });
  };

  return (
    <>
      <p>Gratitude for {topic} </p>
      {todaysTask?.task}
      <button onClick={() => setShowMoreToggle(!showMoreToggle)}>
        {showMoreToggle ? "Show less" : "Show more"}
      </button>
      {showMoreToggle && renderFollowUps(todaysTask)}
      {soundtrack && timer && (
        <TimerDisplay
          timer={timer}
          soundtrack={soundtrack}
          onComplete={() => setIsTimerDone(true)}
        />
      )}
      {isTimerDone && (
        <form className="flex flex-col items-center">
          <textarea
            className={textAreaStyle}
            rows={7}
            cols={33}
            value={input}
            required
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInput(e.currentTarget.value)
            }
          />
          <label>Which color resonates with you today?</label>
          <input
            type="color"
            className={colorInputStyle}
            value={color}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setColor(e.currentTarget.value)
            }
          />
          <button>Submit Today's Thoughts</button>
        </form>
      )}
    </>
  );
}
