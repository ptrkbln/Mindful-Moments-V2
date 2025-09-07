import { useState } from "react";
import { gratitudeQuestions } from "../data/gratitudeQuestions";
import { TOPICS } from "../data/gratitudeQuestions";
import SceneSetting from "../components/SceneSetting";
import type { Soundtrack } from "../data/soundtracks";
import SoundtrackPreview from "../components/SoundtrackPreview";

export default function PracticePage() {
  const [soundtrack, setSoundtrack] =
    useState<Soundtrack>("Angelic Meditation");
  const [timer, setTimer] = useState(120);
  const [topic, setTopic] = useState(
    () => TOPICS[Math.floor(Math.random() * TOPICS.length)]
  );
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  return (
    <>
      {!isSetupComplete && (
        <SceneSetting
          topic={topic}
          setTopic={setTopic}
          soundtrack={soundtrack}
          setSoundtrack={setSoundtrack}
          timer={timer}
          setTimer={setTimer}
          setIsSetupComplete={setIsSetupComplete}
        />
      )}
    </>
  );
}
