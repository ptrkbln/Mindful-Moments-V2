import { TOPICS, type Topic } from "../data/gratitudeQuestions";
import { SOUNDTRACK_LABELS, type Soundtrack } from "../data/soundtracks";
import { type Dispatch, type JSX, type SetStateAction } from "react";
import Carousel from "../components/Carousel";
import SoundtrackPreview from "./SoundtrackPreview";

type SceneSettingProps = {
  topic: Topic;
  setTopic: Dispatch<SetStateAction<Topic>>;
  soundtrack: Soundtrack;
  setSoundtrack: Dispatch<SetStateAction<Soundtrack>>;
  timer: number;
  setTimer: Dispatch<SetStateAction<string>>;
  setIsSetupComplete: Dispatch<SetStateAction<boolean>>;
};

const timerOptions = ["60", "90", "120", "150"];

/* const instructions = ["Choose a topic", "Select backgroud music", "Set timer"];
const options = [TOPICS, SOUNDTRACK_LABELS, ] */

export default function SceneSetting({
  topic,
  setTopic,
  soundtrack,
  setSoundtrack,
  timer,
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
            options={timerOptions}
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
