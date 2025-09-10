import useSound from "use-sound";
import type { Soundtrack } from "../data/soundtracks";
import type { Topic } from "../data/topics";
import type { Timer } from "../data/timer";
import type { Dispatch, SetStateAction } from "react";
import TimerDisplay from "./TimerDisplay";

type GratitudeTaskProps = {
  topic: Topic | null;
  soundtrack: Soundtrack | null;
  timer: Timer | null;
  setTimer: Dispatch<SetStateAction<Timer | null>>;
};
export default function GratitudeTask({
  topic,
  soundtrack,
  timer,
  setTimer,
}: GratitudeTaskProps) {
  return <TimerDisplay timer={timer} setTimer={setTimer} />;
}
