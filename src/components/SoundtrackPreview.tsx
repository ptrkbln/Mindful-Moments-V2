import useSound from "use-sound";
import { FaPlay } from "react-icons/fa";
import { SOUNDTRACKS, type Soundtrack } from "../data/soundtracks";

const FADE_DURATION_MS = 5000; // start fade-in 5s after start and start fade-out 5s before end
const PREVIEW_END_MS = 20000; // completely stop after 20s
const FADE_OUT_START_MS = PREVIEW_END_MS - FADE_DURATION_MS; // trigger fade-out after 20 - 5 = 15s

export default function SoundtrackPreview({
  trackLabel,
}: {
  trackLabel: Soundtrack;
}) {
  const [play, { stop, sound }] = useSound(SOUNDTRACKS[trackLabel], {
    html5: true,
    interrupt: true,
  });
  return (
    <button
      type="button"
      onClick={() => {
        play();
        sound?.once("play", (id: number) => {
          sound.volume(0, id);
          sound.fade(0, 1, FADE_DURATION_MS, id); // fade in
          setTimeout(
            () => sound.fade(1, 0, FADE_DURATION_MS, id),
            FADE_OUT_START_MS
          ); //fade out
          setTimeout(() => stop(), PREVIEW_END_MS); // stop
        });
      }}
    >
      <FaPlay />
    </button>
  );
}
