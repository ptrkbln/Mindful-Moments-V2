import { useState, useRef, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import backgroundVideo from "../assets/videos/190053-887019455_small.mp4";
import { Link } from "react-router-dom";
import TypeIt from "typeit-react";
import type { IconType } from "react-icons";
import {
  LuListChecks,
  LuHeadphones,
  LuPenLine,
  LuBookmark,
} from "react-icons/lu";

/* --- variants --- */
const wobbleIn: Variants = {
  hidden: { opacity: 0, rotate: -4 },
  visible: {
    opacity: 1,
    rotate: [-6, 3, -1.5, 0],
    transition: { duration: 0.8, ease: "easeOut", delay: 7.9 },
  },
};

const typeItHeaders: readonly [string, string] = [
  "A question, a soundtrack, and a space to write it in.",
  "Breathe in. Reflect. Begin.",
];

type Instruction = { label: string[]; icon: IconType; tooltip: string };

const instructions: Instruction[] = [
  {
    label: ["Set the", "Scene"],
    icon: LuListChecks,
    tooltip: "Choose a topic, pick a soundtrack, and set your timer.",
  },
  {
    label: ["Settle &", "Reflect"],
    icon: LuHeadphones,
    tooltip: "Close your eyes. Breathe. Let the music guide your focus.",
  },
  {
    label: ["Write", "It In"],
    icon: LuPenLine,
    tooltip: "When the music fades, write down what you're grateful for.",
  },
  {
    label: ["Save &", "Revisit"],
    icon: LuBookmark,
    tooltip: "Save your entry, track your streak, revisit favorites.",
  },
];

const renderInstructions = (arr: Instruction[]) => {
  if (arr.length < 1) return;
  return arr.map((instrObj, i) => {
    const Icon = instrObj.icon;
    return (
      <div
        key={i}
        className="flex flex-col gap-3 h-[65px] w-[120px] items-center relative group hover:cursor-help"
      >
        <span className="absolute w-[150px] -top-18 px-2 py-2 text-xs rounded-xl bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-center leading-snug">
          {instrObj.tooltip}
        </span>
        <Icon className="text-xl" />
        <div>
          {instrObj.label.map((line, i) => (
            <span key={i} className="block  leading-4 text-sm">
              {line}
            </span>
          ))}
        </div>
      </div>
    );
  });
};

export default function Landing() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isVideoLoaded) {
      setIsVideoLoaded(true);
    }
  }, [isVideoLoaded]);

  useEffect(() => {
    if (isVideoLoaded && videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, [isVideoLoaded]);

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {isVideoLoaded && (
        <motion.video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={backgroundVideo}
          autoPlay
          muted
          playsInline
          aria-label="Background video of moving clouds in the sky"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      )}
      {/* logo */}
      <motion.div
        variants={wobbleIn}
        className="absolute top-20 md:top-30 lg:left-1/4 transform -translate-x-1/2 z-20 text-center"
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-orange-200 font-bold">
          <span className="font-charmonman text-6xl  font-bold text-green-400">
            Mindful
          </span>
          <span className="font-semibold text-4xl">Moments</span>
        </h1>
      </motion.div>

      {/* heading */}
      <motion.div className="absolute inset-0 grid place-items-center z-20 text-center px-4">
        {/* this part needs min-height, add notebook css background */}
        <div className="inline-block rounded px-4 py-2 min-w-[min(90vw,800px)]">
          <h1 className="text-orange-200 text-lg md:text-4xl font-bold leading-tight">
            <TypeIt
              options={{
                speed: 48, // base cps
                lifeLike: true, // natural jitter
                startDelay: 1000, // wait for your overlay/video fade
                cursor: true,
                loop: false,
              }}
              getBeforeInit={(instance) => {
                instance
                  .type(typeItHeaders[0], { delay: 750 })
                  .delete(typeItHeaders[0].length)
                  .type(typeItHeaders[1]);

                return instance;
              }}
            />
          </h1>
        </div>
      </motion.div>

      <motion.div
        variants={wobbleIn}
        className="absolute bottom-14 w-full flex gap-2.5 justify-center mb-32 z-30"
        initial="hidden"
        animate="visible"
      >
        {renderInstructions(instructions)}
      </motion.div>

      {/* button */}
      <motion.div
        variants={wobbleIn}
        className="absolute bottom-16 w-full text-center"
        initial="hidden"
        animate="visible"
      >
        <Link to="/home">
          <button
            className="button px-6 py-3 text-md md:text-lg bg-green-700 text-orange-50 rounded-full hover:bg-green-800 hover:scale-105"
            aria-label="Get inspired button"
          >
            START YOUR JOURNEY
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
