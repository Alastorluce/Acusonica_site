import { motion, useScroll, useTransform } from "framer-motion";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 origin-left bg-white/90"
      style={{ scaleX, width: "100%" }}
    />
  );
}
