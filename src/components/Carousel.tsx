import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

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

  if (!options.length) {
    return (
      <div className="mx-auto min-w-64 min-h-24 relative grid place-items-center bg-neutral-300 rounded-4xl">
        <h2>{header}</h2>
        <p>No more options available.</p>
      </div>
    );
  }

  const prev = () => setI((n) => (n - 1 + options.length) % options.length);
  const next = () => setI((n) => (n + 1) % options.length);

  const currentValue = options[i];

  return (
    <div
      className="group relative mx-auto
        w-[clamp(300px,84vw,500px)] h-[clamp(300px,84vw,500px)]
        overflow-hidden rounded-2xl
        shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_5px_8px_0_rgba(0,0,0,0.14),0_1px_14px_0_rgba(0,0,0,0.12)]
        bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div
        className="absolute inset-x-0 bottom-0
         h-[170px] sm:h-[195px]
         bg-white/70 backdrop-blur-md
         translate-y-[calc(100%-65px)]
         transition-transform duration-500 ease-out will-change-transform
         group-hover:translate-y-0"
      >
        <div className="flex items-center justify-center px-6 pt-4">
          <h2 className="text-2xl sm:text-3xl font-light text-neutral-900">
            {header}
          </h2>
        </div>

        <div className="px-6 py-3 space-y-4 text-neutral-900">
          <div className="flex items-center gap-2 min-h-10">
            <div className="min-w-0 flex-1 sm:text-xl font-medium pl-1 truncate">
              {currentValue}
            </div>
            <div className="w-8 h-8 pr-[clamp(0px,19vw,160px)] grid place-items-center">
              {SoundtrackPreview && typeof currentValue === "string" && (
                <SoundtrackPreview trackLabel={currentValue} />
              )}
            </div>
            <span className="w-12 text-right text-xs sm:text-sm text-neutral-700/70 tabular-nums">
              {i + 1}/{options.length}
            </span>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={prev}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white"
              aria-label="previous"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white"
              aria-label="next"
            >
              ›
            </button>
            <button
              onClick={() => setterFunction(currentValue)}
              className="ml-auto rounded-2xl px-3 py-1 sm:py-[6px] bg-neutral-900 text-white/95 hover:bg-neutral-800 transition"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
