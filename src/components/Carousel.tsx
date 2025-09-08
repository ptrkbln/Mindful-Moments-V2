import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type CarouselProps<T extends string> = {
  header: string;
  options: readonly T[];
  SoundtrackPreview?: React.ComponentType<{ trackLabel: T }>;
  setterFunction: Dispatch<SetStateAction<T>>;
};

export default function Carousel<T extends string>({
  header,
  options,
  SoundtrackPreview,
  setterFunction,
}: CarouselProps<T>) {
  const [i, setI] = useState(0);
  const prev = () => setI((n) => (n - 1 + options.length) % options.length);
  const next = () => setI((n) => (n + 1) % options.length);

  return (
    <div className="mx-auto min-w-64 min-h-24 relative grid place-items-center bg-neutral-300 rounded-4xl">
      <h2>{header}</h2>
      {options[i]}
      {SoundtrackPreview && <SoundtrackPreview trackLabel={options[i]} />}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-black/40 text-white"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-black/40 text-white"
      >
        ›
      </button>
      <span className="absolute bottom-2 right-3 text-xs text-white/70">
        {i + 1}/{options.length}
      </span>
      <button onClick={() => setterFunction(options[i])}>Confirm</button>
    </div>
  );
}
