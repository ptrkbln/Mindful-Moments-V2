import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type CarouselProps<T extends string | number> = {
  header: string;
  options: readonly T[];
  SoundtrackPreview?: React.ComponentType<{ trackLabel: T }>;
  setterFunction: Dispatch<SetStateAction<T | null>>;
  bgImage: string;
};

export default function Carousel<T extends string | number>({
  header,
  options,
  SoundtrackPreview,
  setterFunction,
  bgImage,
}: CarouselProps<T>) {
  const [i, setI] = useState(0);

  // options come as arrays (of topics, of soundtrack, of timers)
  // Safety net to not break if no options available; handled already by grandparent PracticePage
  if (!options.length) {
    return <div>No options available.</div>;
  }
  // navigate through options counter
  const prev = () => setI((n) => (n - 1 + options.length) % options.length);
  const next = () => setI((n) => (n + 1) % options.length);
  //currently selected option
  const currentValue = options[i];

  return (
    /* card (container) */
    <div
      className="group relative mx-auto
        w-[clamp(300px,84vw,500px)] h-[clamp(300px,84vw,500px)]
        overflow-hidden rounded-4xl
        shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* slide-up panel, revealed on hover */}
      <div
        className="absolute inset-x-0 bottom-0
         h-[185px] sm:h-[195px]
         bg-white/65 backdrop-blur-md [background:linear-gradient(180deg,rgba(255,255,255,0.75),rgba(255,255,255,0.6))]
         translate-y-[calc(100%-65px)]
         transition-transform duration-500 ease-out
         group-hover:translate-y-0"
      >
        {/* header: eg. Today I'll focus on */}
        <div className="flex items-center justify-center px-6 py-4">
          <h2 className="text-[clamp(20px,4vw,24px)] font-extralight text-neutral-700 tracking-wide font-['Playpen_Sans',cursive]">
            {header}
          </h2>
        </div>
        {/* options: current value + preview if soundtrack + counter */}
        <div className="px-6 py-3 space-y-4 text-neutral-800">
          <div className="flex items-center gap-2 min-h-10">
            <div className="min-w-0 flex-1 text-[clamp(16px,3.5vw,20px)] font-bold pl-1 truncate">
              {currentValue}
            </div>
            <div className="w-8 h-8 pr-[clamp(0px,19vw,160px)] grid place-items-center">
              {SoundtrackPreview && typeof currentValue === "string" && (
                <SoundtrackPreview trackLabel={currentValue} />
              )}
            </div>
            <span className="w-12 text-right text-xs sm:text-sm text-neutral-400 tabular-nums">
              {i + 1}/{options.length}
            </span>
          </div>
          {/* controls: prev/next arrow-buttons + confirm */}
          <div className="pt-2 flex gap-2">
            <button
              onClick={prev}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-900/40 text-white hover:bg-neutral-900/60"
              aria-label="previous"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={next}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-900/40 text-white hover:bg-neutral-900/60"
              aria-label="next"
            >
              <FaAngleRight />
            </button>
            <button
              onClick={() => setterFunction(currentValue)}
              className="ml-auto rounded-2xl px-4 py-2 text-sm bg-neutral-900 text-white/95 hover:bg-neutral-800 transition"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
