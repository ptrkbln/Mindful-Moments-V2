import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import AnimateFadeInOut from "./AnimateFadeInOut";
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
  "Let a color choose you. What is it?",
  "What color is your gratitude?",
] as const;

export default function GratitudeForm({
  todaysTask,
}: {
  todaysTask: DailyTask;
}) {
  const [input, setInput] = useState("");
  const [color, setColor] = useState("#000000");
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
              <div className="relative flex-1 min-h-0 overflow-hidden">
                <textarea
                  className="absolute inset-0 w-full h-full text-neutral-dark font-['Playpen_Sans',cursive]
                  font-extralight text-[clamp(16px,4vw,19px)] leading-[40px] resize-none
                  pl-[66px] sm:pl-[96px] pr-3 sm:pr-7 pt-[7px]
                  shadow-[0_8px_24px_-4px_rgba(167,139,250,0.15),0_4px_12px_rgba(219,39,119,0.08),inset_0_2px_8px_rgba(255,255,255,0.6)]
                  ring-1 ring-violet-200/30 
                  overflow-x-hidden overflow-y-auto bg-local
                  transition-all duration-300 focus:outline-none focus:shadow-[0_0_0_2px_rgba(167,139,250,.35)] 
                  placeholder:italic placeholder:text-[clamp(15px,3.5vw,18px)] placeholder:text-slate-500/70 
                  [background-image:url('./assets/images/lines_text_area.png'),url('./assets/backgrounds/wrinkled_paper.webp')]
                  [background-repeat:repeat-y,repeat] [background-position:-30px_0,center] sm:[background-position:0_0,center] [background-size:auto_40px,850px_auto]"
                  style={{
                    filter: "brightness(1.07)",
                  }}
                  placeholder={todaysTask.task}
                  value={input}
                  required
                  autoFocus
                  onChange={(e) => setInput(e.currentTarget.value)}
                />

                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/70 via-white/40 to-transparent pointer-events-none" />
              </div>
              <div className="bg-white/50 px-6 pt-5 pb-6">
                <p className="text-[9px] tracking-[0.25em] uppercase text-slate-500/60 mb-3 text-center">
                  Gratitude for {todaysTask.topic}
                </p>

                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="size-2 rounded-full bg-violet-400/70 shadow-sm"></div>
                  <div className="size-1.5 rounded-full bg-slate-300/50"></div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    disabled={!input.trim()}
                    className="px-5 py-2 text-[12.5px] rounded-full w-[90%] sm:w-auto bg-gradient-to-r from-violet-200/55 via-purple-200/55 to-pink-200/55 ring-1 ring-violet-300/20 border border-white/30 text-violet-600 font-medium shadow-[0_4px_16px_-2px_rgba(167,139,250,0.3),0_2px_8px_rgba(219,39,119,0.15)] hover:shadow-[0_6px_24px_-2px_rgba(167,139,250,0.4),0_4px_12px_rgba(219,39,119,0.2)] hover:from-violet-200/80 hover:via-purple-200/70 hover:to-pink-200/70 hover:text-violet-800 active:translate-y-[1px] active:scale-[0.98] active:shadow-[0_2px_8px_-2px_rgba(167,139,250,0.3)] transition-all duration-300 ease-out
                 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setIsInputDone(true)}
                  >
                    Move On →
                  </button>
                </div>
              </div>
            </div>
          </AnimateFadeInOut>
        ) : (
          <AnimateFadeInOut key="color-step">
            <div className="flex flex-col h-full">
              <div
                className="relative flex items-center justify-center flex-1 min-h-0"
                style={{
                  background: `linear-gradient(180deg, ${color}30, ${color}15, transparent)`,
                }}
              >
                <div className="p-[3px] rounded-full bg-white/40">
                  <button
                    type="button"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="size-[clamp(130px,20vmin,160px)] rounded-full cursor-pointer appearance-none 
                    shadow-[0_12px_40px_rgba(0,0,0,.15)] active:translate-y-[1px] transition-transform hover:scale-103 duration-300"
                    style={{ backgroundColor: color }}
                  />
                  <span
                    className="pointer-events-none absolute -inset-1 rounded-full blur-xl
                    bg-[radial-gradient(30%_30%_at_50%_50%,rgba(255,255,255,.5),transparent_65%)]"
                  />
                </div>

                {/* backdrop ColorPicker close button */}
                {showColorPicker && (
                  <>
                    <button
                      className="fixed inset-0 z-30 bg-black/10 cursor-default"
                      onClick={() => setShowColorPicker(false)}
                    />

                    <div
                      className="absolute z-40 p-4 rounded-3xl 
                bg-white/60 backdrop-blur-sm shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25)]
                  ring-1 ring-white/60 -bottom-30"
                    >
                      <HexColorPicker
                        color={color}
                        onChange={setColor}
                        style={{
                          width: "250px",
                          height: "150px",
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
                        <IoIosClose className="size-6" />
                      </button>
                    </div>
                  </>
                )}

                {/* required for form due to HexColorPicker not submitting a value */}
                <input type="hidden" name="moodColor" value={color} />

                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/75 to-transparent pointer-events-none" />
              </div>
              {/* Bottom control panel */}
              <div className="bg-white/50 px-6 pt-4 pb-6">
                <p className="text-slate-700/80 text-[15px] leading-relaxed font-normal text-center mb-3">
                  {todaysColorPrompt}
                </p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="size-1.5 rounded-full bg-slate-300/50"></div>
                  <div className="size-2 rounded-full bg-violet-400/70 shadow-sm"></div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-5 py-2 text-[12.5px] rounded-full w-[90%] sm:w-auto bg-gradient-to-r from-violet-200/55 via-purple-200/55 to-pink-200/55 ring-1 ring-violet-300/20 border border-white/30 text-violet-600 font-medium shadow-[0_4px_16px_-2px_rgba(167,139,250,0.3),0_2px_8px_rgba(219,39,119,0.15)] hover:shadow-[0_6px_24px_-2px_rgba(167,139,250,0.4),0_4px_12px_rgba(219,39,119,0.2)] hover:from-violet-200/80 hover:via-purple-200/70 hover:to-pink-200/70 hover:text-violet-800 active:translate-y-[1px] active:scale-[0.98] active:shadow-[0_2px_8px_-2px_rgba(167,139,250,0.3)] transition-all duration-300 ease-out"
                  >
                    Save My Gratitude
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
