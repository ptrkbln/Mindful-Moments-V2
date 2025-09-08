import { useState } from "react";
import { gratitudeQuestions } from "../data/gratitudeQuestions";
import { TOPICS } from "../data/gratitudeQuestions";
import SceneSetting from "../components/SceneSetting";
import type { Soundtrack } from "../data/soundtracks";
import SoundtrackPreview from "../components/SoundtrackPreview";
import type { Topic } from "../data/gratitudeQuestions";

export default function PracticePage() {
  const [soundtrack, setSoundtrack] = useState<Soundtrack | null>(null);
  const [timer, setTimer] = useState<string | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
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
