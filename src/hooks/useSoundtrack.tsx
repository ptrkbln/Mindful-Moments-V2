/* 
@param duration - duration of music in seconds
@param trackLabel - soundtrack key frm SOUNDTRACKS to play

- Plays a soundtrack for the "duration" duration 
- Fades in over first 5 seconds and the start and fades out over last 5 seconds at the end
- returns isPlaying state and play/stop functions to control music
- cleans up timeouts and stops music on unmount or when props change
- Need to guard EXTERNALLY that duration !== null && soundtrack !== null

Use as: 
const { isPlaying, play, stop } = useSoundtrack(timer, trackLabel)
*/

import useSound from "use-sound";
import { useEffect, useRef, useState, useCallback } from "react";
import { SOUNDTRACKS, type Soundtrack } from "../data/soundtracks";

export function useSoundtrack(duration: number, trackLabel: Soundtrack) {
  const trackLengthMs = duration * 1000; // completely stop after duration in ms
  const fadeDurationMs = 5000; // start fade-in for 5 seconds after start and fade-out for the last 5 seconds
  const fadeOutStartMs = trackLengthMs - fadeDurationMs; // start fade-out 5 seconds before the end

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [play, { stop, sound }] = useSound(SOUNDTRACKS[trackLabel], {
    html5: true,
    interrupt: true,
  });

  // clear timeouts and stop music, eg. when unmounting
  const clearTimeoutsAndStop = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    stop();
  }, [stop]);

  const handlePlayMusic = useCallback(() => {
    if (isPlaying) return;
    clearTimeoutsAndStop();
    setIsPlaying(true);
    play();
    sound?.once("play", (id: number) => {
      sound.volume(0, id);
      sound.fade(0, 1, fadeDurationMs, id); // fade in
      const t1 = setTimeout(
        () => sound.fade(1, 0, fadeDurationMs, id),
        fadeOutStartMs
      ); //fade out
      const t2 = setTimeout(() => {
        stop();
        setIsPlaying(false);
      }, trackLengthMs); // stop
      timeoutsRef.current.push(t1, t2);
    });
  }, [
    fadeOutStartMs,
    play,
    stop,
    sound,
    trackLengthMs,
    isPlaying,
    clearTimeoutsAndStop,
  ]);

  // useCallback to make sure the cleanup uses the newly recreated function at rerenders instead of referencing the old one
  const handleStopMusic = useCallback(() => {
    setIsPlaying(false);
    clearTimeoutsAndStop();
  }, [clearTimeoutsAndStop]);

  // if duration or trackLabel changes, stop music and clear timeouts
  useEffect(() => {
    handleStopMusic();
  }, [duration, trackLabel, handleStopMusic]);

  // clean timeouts when unmounting
  useEffect(() => {
    return () => {
      clearTimeoutsAndStop();
    };
  }, [clearTimeoutsAndStop]);

  return { isPlaying, play: handlePlayMusic, stop: handleStopMusic };
}
