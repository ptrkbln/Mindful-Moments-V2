import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import backgroundVideo from "../assets/videos/190053-887019455_small.mp4";
import { Link } from "react-router-dom";
import TypeIt from "typeit-react";

/* --- variants --- */
const wobbleIn: Variants = {
  hidden: { opacity: 0, rotate: -4 },
  visible: {
    opacity: 1,
    rotate: [-6, 3, -1.5, 0],
    transition: { duration: 0.8, ease: "easeOut", delay: 6 },
  },
};

export default function Landing() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (inView && !isVideoLoaded) {
      setIsVideoLoaded(true);
    }
  }, [inView, isVideoLoaded]);

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
          loop
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
        <h1 className="text-orange-200 text-5xl font-bold">
          <span className="font-charmonman md:text-6xl font-bold text-green-400">
            Mindful
          </span>
          <span className="font-semibold text-4xl">Moments</span>
        </h1>
      </motion.div>

      {/* heading */}

      <motion.div
        initial="hidden"
        animate="visible"
        className="absolute inset-0 grid place-items-center z-20 text-center px-4"
      >
        {/* this part needs min-height, add notebook css background */}
        <div className="inline-block bg-black/50 rounded px-4 py-2 min-w-[min(90vw,800px)]">
          <h1 className="text-orange-200 text-lg md:text-4xl font-bold leading-tight">
            <TypeIt
              options={{
                // style each word if you want:
                strings: [
                  '<span font-charmonman">Cultivating happiness through gratitude:</span> <br/> Reflect, feel good and improve well-being.',
                ],
                speed: 48, // base cps
                lifeLike: true, // natural jitter
                startDelay: 1000, // wait for your overlay/video fade
                cursor: true,
                loop: false,
              }}
            />
          </h1>
        </div>
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
