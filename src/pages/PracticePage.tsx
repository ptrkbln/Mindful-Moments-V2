import { useState } from "react";
import { gratitudeQuestions } from "../data/gratitudeQuestions";
import angelicMeditation from "../assets/soundtracks/angelic-meditation.mp3";
import beachWaves from "../assets/soundtracks/beach-waves.mp3";
import eveningImprovisation from "../assets/soundtracks/evening-improvisation.mp3";
import rainForest from "../assets/soundtracks/rain-sound-and-rainforest.mp3";
import { TOPICS } from "../data/gratitudeQuestions";
import type { Topic } from "../data/gratitudeQuestions";

const soundtracks = {
  "Angelic Meditation": angelicMeditation,
  "Beach Waves": beachWaves,
  "Evening Improvisation": eveningImprovisation,
  "Rain Sounds and Rainforest": rainForest,
} as const;

type Soundtrack = keyof typeof soundtracks;

export default function PracticePage() {
  const [soundtrack, setSoundtrack] =
    useState<Soundtrack>("Angelic Meditation");
  const [timer, setTimer] = useState(120);
  const [topic, setTopic] = useState(
    () => TOPICS[Math.floor(Math.random() * TOPICS.length)]
  );

  // handlers
  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setTopic(e.currentTarget.value as Topic);
  const handleSoundtrackChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSoundtrack(e.currentTarget.value as Soundtrack);
  const handleClick = (x: "increase" | "decrease") =>
    setTimer((prev) => (x === "increase" ? prev + 30 : prev - 30));

  return (
    <div className="grid grid-cols-1 gap-5">
      <h2>Set the Scene</h2>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          /* handleSubmit(); */
        }}
      >
        <label htmlFor="topic-select">Choose a topic:</label>
        <select
          name="topics"
          id="topic-select"
          value={topic}
          onChange={handleTopicChange}
        >
          {TOPICS.map((topic) => {
            return (
              <option value={topic} key={topic}>
                {topic}
              </option>
            );
          })}
        </select>

        <label htmlFor="soundtrack-select">Select background music:</label>
        <select
          name="soundtracks"
          id="soundtrack-select"
          value={soundtrack}
          onChange={handleSoundtrackChange}
        >
          {Object.keys(soundtracks).map((track) => {
            return (
              <option value={track} key={track}>
                {track}
              </option>
            );
          })}
        </select>

        <label>Set Timer:</label>
        <div>
          {timer > 30 && (
            <button onClick={() => handleClick("decrease")}>-</button>
          )}
          <span>{timer}</span>
          {timer < 120 && (
            <button onClick={() => handleClick("increase")}>+</button>
          )}
        </div>
      </form>
    </div>
  );
}
