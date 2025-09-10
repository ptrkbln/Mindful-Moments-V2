import { useEffect, useState } from "react";
import SceneSetting from "../components/SceneSetting";
import type { Soundtrack } from "../data/soundtracks";
import type { Timer } from "../data/timer";
import type { Topic } from "../data/topics";
import GratitudeTask from "../components/GratitudeTask";

export default function PracticePage() {
  const [soundtrack, setSoundtrack] = useState<Soundtrack | null>(null);
  const [timer, setTimer] = useState<Timer | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  useEffect(() => {
    setIsSetupComplete(!!(topic && soundtrack && timer));
  }, [topic, soundtrack, timer]);

  return (
    <>
      {isSetupComplete ? (
        <GratitudeTask
          topic={topic}
          soundtrack={soundtrack}
          timer={timer}
          setTimer={setTimer}
        />
      ) : (
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
