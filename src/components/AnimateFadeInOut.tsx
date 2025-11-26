import { motion } from "framer-motion";

export default function AnimateFadeInOut({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="w-full h-full flex flex-grow justify-center items-center"
      initial={{ opacity: 0, filter: "brightness(1.15)" }}
      animate={{ opacity: 1, filter: "brightness(1)" }}
      exit={{ opacity: 0, filter: "brightness(1.15)" }}
      transition={{ duration: 0.8, ease: "easeIn" }}
    >
      {children}
    </motion.div>
  );
}
