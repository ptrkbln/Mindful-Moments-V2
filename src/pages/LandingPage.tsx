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
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// data
const typeItHeaders: readonly [string, string, string, string] = [
  "A question, a soundtrack, and a space to write it in.",
  "Breathe in. ",
  "Reflect. ",
  "Begin.",
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
      <motion.div
        key={i}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.6 + i * 0.2 }} // cascade
        className="flex flex-col items-center text-center relative group hover:cursor-help
             gap-3 w-full max-w-[120px] hover:-translate-y-0.5 transition-transform duration-500 ease-out"
      >
        <span
          className="absolute w-[160px] -top-18 md:-top-20 px-2 py-2 text-xs rounded-xl
           bg-neutral-dark/90 text-neutral-light opacity-0 backdrop-blur-sm ring-1 ring-neutral-light/20 shadow-lg/30 group-hover:opacity-100
           transition-opacity duration-300 text-center leading-snug pointer-events-none"
        >
          {instrObj.tooltip}
        </span>
        <Icon
          className="size-8 rounded-full bg-neutral-light/10 backdrop-blur-sm 
                  ring-3 ring-white/10 grid place-items-center
                  text-neutral-light/90 group-hover:text-primary-light transition-colors"
        />
        <div>
          {instrObj.label.map((line, j) => (
            <span
              key={j}
              className="block text-[13px] leading-tight text-neutral-light/90"
            >
              {line}
            </span>
          ))}
        </div>
      </motion.div>
    );
  });
};

const ctaButtonText = "Begin Journey";

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
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center"
      initial="hidden"
      animate="visible"
    >
      {/* backgrund video */}
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
      {/* overlay for darker background */}
      <div
        className="pointer-events-none absolute inset-0 z-10
                bg-gradient-to-b from-black/40 via-black/20 to-black/40
                shadow-[inset_0_0_140px_rgba(0,0,0,0.45)]"
      />
      {/* logo */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-20 sm:top-30 left-1/2 md:left-1/4 transform -translate-x-1/2 z-30 cursor-default"
        initial="hidden"
        animate="visible"
      >
        <h1 className="font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
          <span className="text-4xl sm:text-6xl  font-bold text-primary">
            Mindful
          </span>
          <span className="font-semibold text-2xl sm:text-4xl text-primary-light">
            Moments
          </span>
        </h1>
      </motion.div>

      {/* instruction steps */}
      <div
        className="absolute bottom-14 mb-18 sm:mb-28 z-30 
                grid grid-cols-2 sm:grid-cols-4 gap-4
                sm:gap-6 justify-items-center
                mx-auto"
      >
        {renderInstructions(instructions)}
      </div>

      {/* button */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-16 w-full text-center z-30"
      >
        <Link
          to="/app"
          className="inline-flex items-center justify-center rounded-full
             px-6 md:px-7 py-3 text-base md:text-lg font-medium
             bg-neutral-dark/20 backdrop-blur-md
             text-neutral-light
             ring-1 ring-white/15 hover:ring-primary/30
             hover:bg-primary/20
             transition-[transform,background-color,ring-color] duration-300 ease-out
             hover:scale-[1.05] active:scale-[0.99]
             focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
          aria-label="begin journey button"
        >
          {ctaButtonText}
        </Link>
      </motion.div>

      {/* heading */}
      <motion.div
        className="absolute inset-0 grid place-items-center z-20 text-center px-4 "
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.1, delay: 1 }}
      >
        <div className="inline-block rounded px-4 py-2 min-w-[min(90vw,800px)]">
          <h1 className="text-accent/90 font-heading text-lg md:text-4xl leading-tight cursor-default max-w-4xl mx-auto px-4 mb-30 md:mb-0">
            <TypeIt
              options={{
                html: true,
                speed: 52, // base cps
                lifeLike: true, // natural jitter
                cursor: true,
                loop: false,
                startDelay: 1700,
              }}
              getBeforeInit={(instance) => {
                instance
                  .type(
                    `<span class="first-heading">${typeItHeaders[0]}</span>`,
                    { delay: 750 }
                  )
                  .break()
                  .break()
                  .type(
                    `<span class="second-heading">${typeItHeaders[1]}</span>`,
                    { delay: 300 }
                  )
                  .type(
                    `<span class="second-heading">${typeItHeaders[2]}</span>`,
                    { delay: 300 }
                  )
                  .type(
                    `<span class="second-heading">${typeItHeaders[3]}</span>`,
                    { delay: 300 }
                  );
                return instance;
              }}
            />
          </h1>
        </div>
      </motion.div>
    </motion.div>
  );
}
