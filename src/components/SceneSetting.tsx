import { TOPICS, type Topic } from "../data/topics";
import { SOUNDTRACK_LABELS, type Soundtrack } from "../data/soundtracks";
import { type Dispatch, type JSX, type SetStateAction } from "react";
import Carousel from "../components/Carousel";
import SoundtrackPreview from "./SoundtrackPreview";
import { TIMERS } from "../data/timer";
import type { Timer } from "../data/timer";

type SceneSettingProps = {
  setTopic: Dispatch<SetStateAction<Topic | null>>;
  setSoundtrack: Dispatch<SetStateAction<Soundtrack | null>>;
  setTimer: Dispatch<SetStateAction<Timer | null>>;
  setIsSetupComplete: Dispatch<SetStateAction<boolean>>;
};

export default function SceneSetting({
  setTopic,
  setSoundtrack,
  setTimer,
  setIsSetupComplete,
}: SceneSettingProps): JSX.Element {
  return (
    <>
      <h2>Set the Scene</h2>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          /* handleSubmit(); */
        }}
      >
        <div className="grid grid-cols-1 gap-5 text-center border border-primary w-xsm borde sm:w-sm">
          <Carousel
            header="Choose a topic"
            options={TOPICS}
            setterFunction={setTopic}
          />
          <Carousel
            header="Select soundtrack"
            options={SOUNDTRACK_LABELS}
            SoundtrackPreview={SoundtrackPreview}
            setterFunction={setSoundtrack}
          />
          <Carousel
            header="Set timer"
            options={TIMERS}
            setterFunction={setTimer}
          />
          <button
            className="bg-accent"
            type="button"
            onClick={() => setIsSetupComplete(true)}
          >
            START
          </button>
        </div>
      </form>
    </>
  );
}
