import { motion } from "framer-motion";

export default function AnimateFadeInOut({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="h-full w-full"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
