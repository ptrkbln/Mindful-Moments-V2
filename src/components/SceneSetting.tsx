import type { Topic } from "../data/gratitudeQuestions";
import { SOUNDTRACK_LABELS, type Soundtrack } from "../data/soundtracks";
import { type Dispatch, type JSX, type SetStateAction } from "react";
import Carousel from "../components/Carousel";
import SoundtrackPreview from "./SoundtrackPreview";
import { TIMERS, type Timer } from "../data/timer";
import { AnimatePresence } from "framer-motion";
import AnimateFadeInOut from "./AnimateFadeInOut";
import bgTopic from "../assets/images/bg_topic2.jpg";
import bgSoundtrack from "../assets/images/bg_soundtrack.jpg";
import bgTimer from "../assets/images/bg_timer.jpg";

type SceneSettingProps = {
  topic: Topic | null;
  setTopic: Dispatch<SetStateAction<Topic | null>>;
  soundtrack: Soundtrack | null;
  setSoundtrack: Dispatch<SetStateAction<Soundtrack | null>>;
  timer: Timer | null;
  setTimer: Dispatch<SetStateAction<Timer | null>>;
  availableTopics: Topic[];
};

// step-by-step selector for topic-soundtrack-timer, stateless UI, parents own states
export default function SceneSetting({
  topic,
  setTopic,
  soundtrack,
  setSoundtrack,
  timer,
  setTimer,
  availableTopics,
}: SceneSettingProps): JSX.Element {
  return (
    <>
      <div className="relative min-h-24">
        <AnimatePresence mode="wait">
          {topic === null && (
            <AnimateFadeInOut key="topic">
              <Carousel
                header="Today I'll reflect on"
                options={availableTopics}
                setterFunction={setTopic}
                bgImage={bgTopic}
              />
            </AnimateFadeInOut>
          )}

          {topic && soundtrack === null && (
            <AnimateFadeInOut key="soundtrack">
              <Carousel
                header="I'll be guided by"
                options={SOUNDTRACK_LABELS}
                SoundtrackPreview={SoundtrackPreview}
                setterFunction={setSoundtrack}
                bgImage={bgSoundtrack}
              />
            </AnimateFadeInOut>
          )}

          {topic && soundtrack && timer === null && (
            <AnimateFadeInOut key="timer">
              <Carousel
                header="I'll reflect for...seconds"
                options={TIMERS}
                setterFunction={setTimer}
                bgImage={bgTimer}
              />
            </AnimateFadeInOut>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
