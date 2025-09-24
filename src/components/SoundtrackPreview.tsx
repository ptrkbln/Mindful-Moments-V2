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
      <button
        type="button"
        onClick={isPlaying ? stop : play}
        className="px-1 sm:px-2 flex items-center justify-center rounded-full
        text-violet-400/70
        hover:text-violet-500 hover:bg-violet-100/30 hover:scale-110
        transition-all duration-200 cursor-pointer"
      >
        {isPlaying ? (
          <FaStop className="text-[clamp(14px,3.5vw,17px)]" />
        ) : (
          <FaPlay className="text-[clamp(14px,3.5vw,17px)]" />
        )}
      </button>
    </>
  );
}
