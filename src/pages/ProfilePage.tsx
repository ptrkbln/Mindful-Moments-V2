import { AnimatePresence } from "framer-motion";
import AnimateFadeInOut from "../components/AnimateFadeInOut";

export default function ProfilePage() {
  return (
    <AnimatePresence mode="wait">
      <AnimateFadeInOut key="scene-setting">
        <div
          className="w-full max-w-sm
            shadow-[0_8px_32px_rgba(167,139,250,0.15),inset_0_0_20px_rgba(255,255,255,0.4)]
            bg-gradient-to-br from-white/40 via-white/25 to-white/15
            ring-1 ring-white/30 rounded-[60px] backdrop-blur-md
            px-8 py-16 flex flex-col items-center gap-6 text-center"
        >
          <h2
            className="text-2xl font-light
              bg-gradient-to-r from-violet-600/90 via-purple-600/90 to-pink-600/90
              bg-clip-text text-transparent"
          >
            Work in progress...
          </h2>
        </div>
      </AnimateFadeInOut>
    </AnimatePresence>
  );
}
