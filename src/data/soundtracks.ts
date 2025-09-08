import angelicMeditation from "../assets/soundtracks/angelic-meditation.mp3";
import beachWaves from "../assets/soundtracks/beach-waves.mp3";
import eveningImprovisation from "../assets/soundtracks/evening-improvisation.mp3";
import rainForest from "../assets/soundtracks/rain-sound-and-rainforest.mp3";

export const SOUNDTRACKS = {
  "Angelic Meditation": angelicMeditation,
  "Beach Waves": beachWaves,
  "Evening Improvisation": eveningImprovisation,
  "Rain sounds": rainForest,
} as const;

export type Soundtrack = keyof typeof SOUNDTRACKS;

export const SOUNDTRACK_LABELS = Object.keys(SOUNDTRACKS) as Soundtrack[];
