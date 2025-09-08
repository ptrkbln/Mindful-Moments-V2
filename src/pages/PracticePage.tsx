import { useState } from "react";
import SceneSetting from "../components/SceneSetting";
import type { Soundtrack } from "../data/soundtracks";
import type { Timer } from "../data/timer";
import type { Topic } from "../data/topics";

export default function PracticePage() {
  const [soundtrack, setSoundtrack] = useState<Soundtrack | null>(null);
  const [timer, setTimer] = useState<Timer | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  return (
    <>
      {!isSetupComplete && (
        <SceneSetting
          setTopic={setTopic}
          setSoundtrack={setSoundtrack}
          setTimer={setTimer}
          setIsSetupComplete={setIsSetupComplete}
        />
      )}
    </>
  );
}
