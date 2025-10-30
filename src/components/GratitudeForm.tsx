import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import AnimateFadeInOut from "./AnimateFadeInOut";
import GratitudeInstructions from "./GratitudeInstructions";
import { HexColorPicker } from "react-colorful";
import { IoIosClose } from "react-icons/io";
import { getRandomArrayItem } from "../utils/array";
import type { DailyTask } from "../data/gratitudeQuestions";
import { STORAGE_KEY } from "../utils/storage";
import { useToast } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import { getTodayDateKey } from "../utils/getTodayDateKey";
import {
  parsedRoot,
  type DateKey,
  type DailyEntry,
  type Root,
} from "../utils/storage";

const COLOR_INPUT_PROMPTS = [
  "Which color resonates with you today?",
  "What shade matches your mood right now?",
  "Pick the hue that feels most like today.",
  "Which color best holds your feelings?",
  "Point to the color that fits this moment.",
  "If today were a color, what would it be?",
  "What color are you drawn to in this moment?",
  "Let a color choose you. What is it?",
  "What color is your gratitude?",
] as const;

export default function GratitudeForm({
  todaysTask,
}: {
  todaysTask: DailyTask;
}) {
  const [input, setInput] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [isInputDone, setIsInputDone] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [date] = useState(() => getTodayDateKey());
  const { setIsOpen, setMessage, setVariant } = useToast();
  const navigate = useNavigate();

  const todaysColorPrompt = useMemo(
    () =>
      getRandomArrayItem(COLOR_INPUT_PROMPTS) ??
      "Which color resonates with you today?",
    []
  );

  function handleSubmit() {
    try {
      const todaysEntry: Record<DateKey, DailyEntry> = {
        [date]: {
          taskId: todaysTask.id,
          answers: {
            journalText: input.trim(),
            moodColor: color,
          },
        },
      };

      const storedRootRaw = localStorage.getItem(STORAGE_KEY);
      const storedRoot = parsedRoot(storedRootRaw);

      const updatedRoot: Root = storedRoot
        ? {
            ...storedRoot,
            entriesByDate: {
              ...storedRoot.entriesByDate,
              ...todaysEntry,
            },
          }
        : { v: 1, entriesByDate: todaysEntry };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRoot));

      //setIsTodayDone(true);
      // toast notification & navigate
      setVariant("success");
      setMessage("You paused, you reflected — and it's saved 💫");
      setIsOpen(true);
      navigate("/app/");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      setVariant("error");
      setMessage("Hmm… that didn't work. One more try?");
      setIsOpen(true);
      // what do to with form inputs??
    }
  }

  return (
    <form
      className="w-full h-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <AnimatePresence mode="wait">
        {!isInputDone ? (
          <AnimateFadeInOut key="text-step">
            <div className="flex flex-col h-full">
              <div className="h-1/3 flex items-center justify-center">
                <GratitudeInstructions taskObj={todaysTask} />
              </div>
              <div className="h-2/3 min-h-0 flex flex-col items-center justify-center gap-2">
                <textarea
                  className="w-full max-w-[600px] h-full max-h-[279px] text-neutral-dark font-['Playpen_Sans',cursive]
                  font-extralight text-[clamp(16px,4vw,20px)] leading-[40px] resize-none
                  pl-[66px] sm:pl-[100px] pr-4 pt-[7px] pb-[34px] rounded-[20px]
                  shadow-[0_8px_24px_-4px_rgba(167,139,250,0.15),0_4px_12px_rgba(219,39,119,0.08),inset_0_2px_8px_rgba(255,255,255,0.6)]
                  ring-1 ring-violet-200/30
                  my-4 overflow-x-hidden overflow-y-auto bg-local
                  transition-all duration-300 focus:outline-none
                  focus:shadow-[0_12px_32px_-2px_rgba(167,139,250,0.25),0_6px_16px_rgba(219,39,119,0.12),inset_0_2px_12px_rgba(255,255,255,0.7)]
                  placeholder:italic placeholder:text-[clamp(16px,4vw,20px)] placeholder:text-left sm:placeholder:text-center
                  [background-image:url('./assets/images/lines_text_area.png'),url('./assets/backgrounds/wrinkled_paper.webp')]
                  [background-repeat:repeat-y,repeat] [background-position:-30px_0,center] sm:[background-position:0_0,center]"
                  style={{
                    filter: "saturate(0.8) brightness(1.05)",
                  }}
                  placeholder="Write freely… even a few lines is enough."
                  value={input}
                  required
                  onChange={(e) => setInput(e.currentTarget.value)}
                />
                <button
                  type="button"
                  disabled={!input.trim()}
                  className="h-10 px-6 py-2 text-sm rounded-full w-full sm:w-auto
                  bg-gradient-to-r from-violet-200/70 via-purple-200/70 to-pink-200/70
                  ring-1 ring-violet-300/40 border border-white/50 text-violet-700 font-medium
                  shadow-[0_4px_16px_-2px_rgba(167,139,250,0.3),0_2px_8px_rgba(219,39,119,0.15)]
                  hover:shadow-[0_6px_24px_-2px_rgba(167,139,250,0.4),0_4px_12px_rgba(219,39,119,0.2)]
                hover:from-violet-200/80 hover:via-purple-200/80 hover:to-pink-200/80
                hover:text-violet-800 active:translate-y-[1px] 
                 active:scale-[0.98] active:shadow-[0_2px_8px_-2px_rgba(167,139,250,0.3)]
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-all duration-300 ease-out backdrop-blur-sm"
                  onClick={() => setIsInputDone(true)}
                >
                  Continue →
                </button>
              </div>
            </div>
          </AnimateFadeInOut>
        ) : (
          <AnimateFadeInOut key="color-step">
            <div className="flex flex-col h-full items-center justify-around pt-[8vh]">
              <label
                htmlFor="moodColor"
                className="font-extralight text-[clamp(20px,4vw,24px)] tracking-wide text-center leading-snug
              text-neutral-800 supports-[background-clip:text]:text-transparent
                bg-gradient-to-r from-violet-600/90 via-purple-600/90 to-pink-600/90 bg-clip-text 
                [text-shadow:0_1px_0_rgba(255,255,255,.45)] max-w-[80%]"
              >
                {todaysColorPrompt}
              </label>

              <div className="flex flex-col items-center justify-end h-full mt-5">
                <div className="relative p-[3px] rounded-full bg-gradient-to-r from-violet-300/30 via-purple-300/30 to-pink-300/30">
                  <button
                    type="button"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="size-[clamp(130px,20vmin,160px)] rounded-full cursor-pointer appearance-none bg-white/70
                    shadow-[0_10px_30px_rgba(0,0,0,.15)] active:translate-y-[1px] transition-transform hover:scale-103"
                    style={{ backgroundColor: color }}
                  />
                  <span
                    className="pointer-events-none absolute -inset-1 rounded-full blur-xl
                    bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,.7),transparent_70%)]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center min-h-[45%] relative">
                {/* backdrop ColorPicker close button */}
                {showColorPicker && (
                  <button
                    className="fixed inset-0 z-30 bg-transparent cursor-default"
                    onClick={() => setShowColorPicker(false)}
                  />
                )}

                <div
                  className={`absolute p-4 rounded-3xl z-40
                bg-white/40 backdrop-blur-sm shadow-[0_8px_32px_-8px_rgba(0,0,0,0.2)]
                  ring-1 ring-white/40 h-[95%] max-h-[185px] transition-all duration-150
                          ${
                            showColorPicker
                              ? "opacity-100 scale-100 ease-out"
                              : "opacity-0 scale-95 ease-in pointer-events-none"
                          }`}
                >
                  <HexColorPicker
                    color={color}
                    onChange={setColor}
                    style={{
                      width: "auto",
                      height: "100%",
                      aspectRatio: "1",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowColorPicker(false)}
                    className="absolute -top-2 -right-2 z-10 flex items-center justify-center
                    size-6 rounded-full bg-white/60 backdrop-blur-md text-purple-400/70
                    shadow-lg ring-1 ring-purple-200/30
                  hover:bg-white/80 hover:text-purple-500 active:scale-95
                    transition-[background-color,color,transform] duration-200"
                  >
                    <IoIosClose className="size-5" />
                  </button>
                </div>

                {/* required for form due to HexColorPicker not submitting a value */}
                <input type="hidden" name="moodColor" value={color} />

                <div
                  className={`flex flex-col justify-between h-full w-full items-center transition-all duration-150
                          ${
                            showColorPicker
                              ? "opacity-0 ease-in pointer-events-none"
                              : "opacity-100 ease-out"
                          }`}
                >
                  <div className="flex items-center justify-center gap-2 pt-8">
                    <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-violet-300/80"></span>
                    <p className="text-center italic text-xs sm:text-sm text-violet-400/80 tracking-wider font-light">
                      Tap the circle
                    </p>
                    <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-violet-300/80"></span>
                  </div>
                  <button
                    className="h-10 px-6 py-2 text-sm rounded-full 
                    bg-gradient-to-r from-violet-200/70 via-purple-200/70 to-pink-200/70
                    ring-1 ring-violet-300/40 border border-white/50
                  text-violet-700 font-medium
                    shadow-[0_4px_16px_-2px_rgba(167,139,250,0.3),0_2px_8px_rgba(219,39,119,0.15)]
                    hover:shadow-[0_6px_24px_-2px_rgba(167,139,250,0.4),0_4px_12px_rgba(219,39,119,0.2)]
                  hover:from-violet-200/80 hover:via-purple-200/80 hover:to-pink-200/80
                  hover:text-violet-800 active:translate-y-[1px] 
                    active:scale-[0.98] active:shadow-[0_2px_8px_-2px_rgba(167,139,250,0.3)]
                    disabled:opacity-50 disabled:cursor-not-allowed 
                    transition-all duration-200 backdrop-blur-sm mb-10"
                  >
                    Done for Today
                  </button>
                </div>
              </div>
            </div>
          </AnimateFadeInOut>
        )}
      </AnimatePresence>
    </form>
  );
}
