import useSound from "use-sound";
import { FaPlay, FaStop } from "react-icons/fa";
import { SOUNDTRACKS, type Soundtrack } from "../data/soundtracks";
import { useEffect, useRef, useState, useCallback } from "react";

const FADE_DURATION_MS = 5000; // start fade-in 5s after start and start fade-out 5s before end
const PREVIEW_END_MS = 20000; // completely stop after 20s
const FADE_OUT_START_MS = PREVIEW_END_MS - FADE_DURATION_MS; // trigger fade-out after 20 - 5 = 15s

export default function SoundtrackPreview({
  trackLabel,
}: {
  trackLabel: Soundtrack;
}) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const timeoutsRef = useRef<number[]>([]);
  const [play, { stop, sound }] = useSound(SOUNDTRACKS[trackLabel], {
    html5: true,
    interrupt: true,
  });

  const handlePlayMusic = () => {
    setIsPlaying(true);
    play();
    sound?.once("play", (id: number) => {
      sound.volume(0, id);
      sound.fade(0, 1, FADE_DURATION_MS, id); // fade in
      const t1 = setTimeout(
        () => sound.fade(1, 0, FADE_DURATION_MS, id),
        FADE_OUT_START_MS
      ); //fade out
      const t2 = setTimeout(() => {
        stop();
        setIsPlaying(false);
      }, PREVIEW_END_MS); // stop
      timeoutsRef.current.push(t1, t2);
    });
  };

  const handleStopMusic = useCallback(() => {
    setIsPlaying(false);
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    stop();
  }, [stop]);

  // useCallback to make sure the cleanup uses the newly recreated function at rerenders instead of referencing the old one
  useEffect(() => {
    return () => {
      handleStopMusic();
    };
  }, [stop, handleStopMusic]);

  return (
    <>
      {!isPlaying ? (
        <button type="button" onClick={handlePlayMusic}>
          <FaPlay />
        </button>
      ) : (
        <button type="button" onClick={handleStopMusic}>
          <FaStop />
        </button>
      )}
    </>
  );
}
