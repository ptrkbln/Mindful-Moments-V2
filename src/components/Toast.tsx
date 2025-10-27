import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "../contexts/ToastContext";
import { useEffect, useState } from "react";
import {
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
} from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

export default function Toast() {
  const { isOpen, setIsOpen, message, variant } = useToast();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isOpen && !isPaused) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, setIsOpen, isPaused]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -25, scale: 0.75 }}
          animate={{
            opacity: 1,
            y: 50,
            scale: 1,
          }}
          exit={{ opacity: 0, y: -25, scale: 0.75 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50
              rounded-2xl backdrop-blur-xl
              shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)]
              ring-1 ring-white/20
              ${
                variant === "success"
                  ? "bg-gradient-to-br from-purple-500/20 via-purple-400/10 to-pink-400/5"
                  : "bg-gradient-to-br from-red-500/20 via-rose-400/10 to-pink-400/5"
              }
            `}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex items-center gap-2 pl-6 pr-7 py-4 relative">
            <span
              className={`
                ${
                  variant === "success"
                    ? "text-purple-600 drop-shadow-[0_2px_4px_rgba(147,51,234,0.3)]"
                    : "text-rose-600 drop-shadow-[0_2px_4px_rgba(225,29,72,0.3)]"
                }
              `}
            >
              {variant === "success" ? (
                <IoCheckmarkCircleOutline className="size-6 text-primary-dark/90" />
              ) : (
                <IoAlertCircleOutline className="size-6 text-accent-dark/110" />
              )}
            </span>
            <span
              className={`
                text-sm font-medium
                ${
                  variant === "success"
                    ? "text-purple-900/90"
                    : "text-rose-900/90"
                }
              `}
            >
              {message}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className={`absolute top-1 right-1 z-10 flex items-center justify-center
                    rounded-full bg-transparent 
                  hover:bg-white/30  active:scale-95
                    transition-all duration-200
                    ${
                      variant === "success"
                        ? "text-purple-400/70 hover:text-purple-500"
                        : "text-rose-600/40 hover:text-rose-600/70"
                    }`}
            >
              <IoIosClose className="size-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
