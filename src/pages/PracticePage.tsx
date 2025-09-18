import { useState } from "react";
import SceneSetting from "../components/SceneSetting";
import type { Soundtrack } from "../data/soundtracks";
import type { Timer } from "../data/timer";
import type { Topic } from "../data/topics";
import GratitudeTask from "../components/GratitudeTask";
import { getAvailableTopics } from "../utils/gratitudeUtils";

export default function PracticePage() {
  const [soundtrack, setSoundtrack] = useState<Soundtrack | null>(null);
  const [timer, setTimer] = useState<Timer | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const availableTopics = getAvailableTopics();

  /* 
  1) check if there are still available (uncompleted) topics:
   - if yes: show SceneSetting to let  user choose options (topic, soundtrack, timer)
   - if no: show "You completed our DEMO" screen
  2) Once all three options are selected (topic, soundtrack, timer) -> show GratitudeTask
  */
  return (
    <>
      {topic && soundtrack && timer ? (
        <GratitudeTask topic={topic} soundtrack={soundtrack} timer={timer} />
      ) : availableTopics.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 text-center p-8 bg-gradient-to-b from-emerald-200 to-emerald-50 rounded-2xl shadow-lg max-w-md">
          <span className="text-4xl">🎉</span>
          <h2 className="text-2xl font-semibold text-emerald-700">
            You completed our DEMO!
          </h2>
          <p className="text-neutral-600">
            Great job finishing all the gratitude prompts. Come back later for
            more reflections.
          </p>
        </div>
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
