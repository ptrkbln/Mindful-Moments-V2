import { type Topic } from "../data/topics";
import { SOUNDTRACK_LABELS, type Soundtrack } from "../data/soundtracks";
import { type Dispatch, type JSX, type SetStateAction } from "react";
import Carousel from "../components/Carousel";
import SoundtrackPreview from "./SoundtrackPreview";
import { TIMERS, type Timer } from "../data/timer";
import { AnimatePresence } from "framer-motion";
import AnimateFadeInOut from "./AnimateFadeInOut";
import { getAvailableTopics } from "../utils/gratitudeUtils";

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
  // get available topics from tasks that user has not yet completed
  const availableTopics = getAvailableTopics();

  // display 3 Carousels consequently as user options for todays task (topic, soundtrack, timer)
  return (
    <>
      <div className="relative min-h-24">
        <AnimatePresence mode="wait">
          {topic === null && (
            <AnimateFadeInOut key="topic">
              <Carousel
                header="Choose a topic"
                options={availableTopics}
                setterFunction={setTopic}
              />
            </AnimateFadeInOut>
          )}

          {topic && soundtrack === null && (
            <AnimateFadeInOut key="soundtrack">
              <Carousel
                header="Select soundtrack"
                options={SOUNDTRACK_LABELS}
                SoundtrackPreview={SoundtrackPreview}
                setterFunction={setSoundtrack}
              />
            </AnimateFadeInOut>
          )}

          {topic && soundtrack && timer === null && (
            <AnimateFadeInOut key="timer">
              <Carousel
                header="Set timer"
                options={TIMERS}
                setterFunction={setTimer}
              />
            </AnimateFadeInOut>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
