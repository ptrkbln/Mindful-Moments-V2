import { TOPICS, type Topic } from "../data/gratitudeQuestions";
import { SOUNDTRACK_LABELS, type Soundtrack } from "../data/soundtracks";
import { type Dispatch, type JSX, type SetStateAction } from "react";

type SceneSettingProps = {
  topic: Topic;
  setTopic: Dispatch<SetStateAction<Topic>>;
  soundtrack: Soundtrack;
  setSoundtrack: Dispatch<SetStateAction<Soundtrack>>;
  timer: number;
  setTimer: Dispatch<SetStateAction<number>>;
  setIsSetupComplete: Dispatch<SetStateAction<boolean>>;
};

export default function SceneSetting({
  topic,
  setTopic,
  soundtrack,
  setSoundtrack,
  timer,
  setTimer,
  setIsSetupComplete,
}: SceneSettingProps): JSX.Element {
  // handlers
  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setTopic(e.currentTarget.value as Topic);
  const handleSoundtrackChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSoundtrack(e.currentTarget.value as Soundtrack);
  const handleTimerClick = (x: "increase" | "decrease") =>
    setTimer((prev) => (x === "increase" ? prev + 30 : prev - 30));

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
          <label htmlFor="topic-select">Choose a topic:</label>
          <select
            name="topics"
            id="topic-select"
            value={topic}
            onChange={handleTopicChange}
          >
            {TOPICS.map((topic) => {
              return (
                <option className="text-center" value={topic} key={topic}>
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
            {SOUNDTRACK_LABELS.map((track) => {
              return (
                <option className="text-center" value={track} key={track}>
                  {track}
                </option>
              );
            })}
          </select>

          <label>Set Timer:</label>
          <div>
            <button
              type="button"
              className="pr-1"
              disabled={timer < 60}
              onClick={() => handleTimerClick("decrease")}
            >
              -
            </button>

            <span>{timer}</span>

            <button
              type="button"
              className="pl-1"
              disabled={timer > 120}
              onClick={() => handleTimerClick("increase")}
            >
              +
            </button>
          </div>
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
