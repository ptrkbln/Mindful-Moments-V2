import { FaPlay, FaStop } from "react-icons/fa";
import { type Soundtrack } from "../data/soundtracks";
import { useSoundtrack } from "../hooks/useSoundtrack";

const playbackDuration = 20;

export default function SoundtrackPreview({
  trackLabel,
}: {
  trackLabel: Soundtrack;
}) {
  const { isPlaying, play, stop } = useSoundtrack(playbackDuration, trackLabel);

  return (
    <>
      {!isPlaying ? (
        <button type="button" onClick={play}>
          <FaPlay />
        </button>
      ) : (
        <button type="button" onClick={stop}>
          <FaStop />
        </button>
      )}
    </>
  );
}
