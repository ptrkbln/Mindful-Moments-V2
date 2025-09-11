import { TOPICS, type Topic } from "../data/topics";
import { SOUNDTRACK_LABELS, type Soundtrack } from "../data/soundtracks";
import { type Dispatch, type JSX, type SetStateAction } from "react";
import Carousel from "../components/Carousel";
import SoundtrackPreview from "./SoundtrackPreview";
import { TIMERS } from "../data/timer";
import type { Timer } from "../data/timer";
import { AnimatePresence, motion } from "framer-motion";

type SceneSettingProps = {
  topic: Topic | null;
  setTopic: Dispatch<SetStateAction<Topic | null>>;
  soundtrack: Soundtrack | null;
  setSoundtrack: Dispatch<SetStateAction<Soundtrack | null>>;
  timer: Timer | null;
  setTimer: Dispatch<SetStateAction<Timer | null>>;
};

export default function SceneSetting({
  topic,
  setTopic,
  soundtrack,
  setSoundtrack,
  setTimer,
  timer,
}: SceneSettingProps): JSX.Element {
  function ExitLeft({ children }: { children: React.ReactNode }) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <>
      <div className="relative min-h-24">
        <AnimatePresence mode="wait">
          {topic === null && (
            <ExitLeft key="topic">
              <Carousel
                header="Choose a topic"
                options={TOPICS}
                setterFunction={setTopic}
              />
            </ExitLeft>
          )}

          {topic && soundtrack === null && (
            <ExitLeft key="soundtrack">
              <Carousel
                header="Select soundtrack"
                options={SOUNDTRACK_LABELS}
                SoundtrackPreview={SoundtrackPreview}
                setterFunction={setSoundtrack}
              />
            </ExitLeft>
          )}

          {topic && soundtrack && timer === null && (
            <ExitLeft key="timer">
              <Carousel
                header="Set timer"
                options={TIMERS}
                setterFunction={setTimer}
              />
            </ExitLeft>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
