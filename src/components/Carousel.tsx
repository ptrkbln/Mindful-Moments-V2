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
      w-[clamp(300px,84vw,450px)] h-[clamp(300px,84vw,450px)]
      overflow-hidden rounded-[50px] sm:rounded-[70px]"
      style={{
        backgroundImage: `
          linear-gradient(
          135deg,
          rgba(253, 226, 228, .55) 0%,
          rgba(226, 239, 243, .45) 50%,
          rgba(204, 229, 246, .40) 100%
          ),
          url(${bgImage})
          `,
        backgroundBlendMode: "overlay, normal",
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
        filter:
          "saturate(.90) contrast(.96) brightness(1.04) hue-rotate(-4deg)",
        boxShadow: [
          "0 40px 100px -40px rgba(76,119,133,.15)",
          "0 20px 60px -24px rgba(0,0,0,.06)",
          "inset 0 40px 80px -60px rgba(255,255,255,.70)",
          "inset 0 -24px 72px -56px rgba(0,0,0,.04)",
        ].join(", "),
      }}
    >
      {/* slide-up panel, revealed on hover */}
      <div
        className="absolute inset-x-0 bottom-0
         h-[185px] sm:h-[50%]
         backdrop-blur-md 
         [background:linear-gradient(180deg,rgba(240,235,255,0.55)_0%,rgba(250,248,255,0.45)_50%,rgba(226,239,243,0.35)_100%)]
         translate-y-[calc(100%-65px)]
         transition-transform duration-400 
         group-hover:translate-y-0"
      >
        {/* header: eg. Today I'll focus on */}
        <div className="flex items-center justify-center py-4">
          <h2
            className="text-[clamp(20px,4vw,24px)] font-extralight text-neutral-dark 
                         tracking-wide font-['Playpen_Sans',cursive]"
          >
            {header}
          </h2>
        </div>

        {/* options: current value + preview if soundtrack + counter */}
        <div className="px-8 py-2 space-y-4 text-neutral-dark">
          <div className="flex items-center gap-2 min-h-10 px-1">
            {SoundtrackPreview && (
              <SoundtrackPreview trackLabel={currentValue} />
            )}
            <div className="min-w-0 flex-1 text-[clamp(16px,3.5vw,19px)] font-bold pl-1 truncate">
              {currentValue}
            </div>

            <span className="w-12 text-right text-xs sm:text-sm text-primary/90 tabular-nums">
              {i + 1}/{options.length}
            </span>
          </div>

          {/* controls: prev/next arrow-buttons + confirm */}
          <div className="sm:pt-4 flex gap-2">
            <button
              onClick={prev}
              className="w-9 h-9 flex items-center justify-center rounded-full
                bg-violet-100/80
                ring-1 ring-violet-200/70
                border border-violet-200/40
                text-neutral-dark
                shadow-[0_2px_10px_-2px_rgba(167,139,250,.15)]
                hover:bg-violet-200/60 hover:text-violet-600 
                active:translate-y-[1px] transition-all duration-200"
              aria-label="previous"
            >
              <FaAngleLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 flex items-center justify-center rounded-full
                bg-violet-100/80
                ring-1 ring-violet-200/70
                border border-violet-200/40
                text-neutral-dark
                shadow-[0_2px_10px_-2px_rgba(167,139,250,.15)]
                hover:bg-violet-200/60 hover:text-violet-600 active:translate-y-[1px] 
                transition-all duration-200"
              aria-label="next"
            >
              <FaAngleRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setterFunction(currentValue)}
              className="ml-auto h-10 px-4 rounded-full text-white
                shadow-[0_10px_24px_-10px_rgba(167,139,250,.4)] text-sm
                ring-1 ring-violet-200/20
                active:translate-y-[1px] transition-all duration-300
                [background:linear-gradient(135deg,#a78bfa,#c4b5fd)]
                hover:[background:linear-gradient(135deg,#7c3aed,#a78bfa)]
                hover:shadow-[0_12px_28px_-12px_rgba(167,139,250,.5)]"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
