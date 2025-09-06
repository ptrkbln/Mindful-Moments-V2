import { useState } from "react";
import { gratitudeQuestions } from "../data/gratitudeQuestions";
import angelicMeditation from "../assets/soundtracks/angelic-meditation.mp3";
import beachWaves from "../assets/soundtracks/beach-waves.mp3";
import eveningImprovisation from "../assets/soundtracks/evening-improvisation.mp3";
import rainForest from "../assets/soundtracks/rain-sound-and-rainforest.mp3";

export default function PracticePage() {
  const [bgMusic, setBgMusic] = useState<string>(angelicMeditation);
  return <div>PracticePage</div>;
}
