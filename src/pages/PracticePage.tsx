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

  return (
    <>
      {topic && soundtrack && timer ? (
        <GratitudeTask topic={topic} soundtrack={soundtrack} timer={timer} />
      ) : (
        <SceneSetting
          topic={topic}
          setTopic={setTopic}
          soundtrack={soundtrack}
          setSoundtrack={setSoundtrack}
          timer={timer}
          setTimer={setTimer}
        />
      )}
    </>
  );
}
