import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: "radial-gradient(ellipse at center, #1a0a2e 0%, #05040f 100%)",
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* Subtle orbs */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Center content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-8"
      >
        {/* Heart SVG */}
        <motion.div
          animate={{ scale: [1, 1.08, 1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="48" height="44" viewBox="0 0 48 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M24 42S2 28 2 14C2 8.477 6.477 4 12 4c3.6 0 6.8 1.8 8.8 4.6L24 12l3.2-3.4C29.2 5.8 32.4 4 36 4c5.523 0 10 4.477 10 10 0 14-22 28-22 28z"
              fill="url(#heartGrad)"
              stroke="rgba(201,149,108,0.4)"
              strokeWidth="0.5"
            />
            <defs>
              <linearGradient id="heartGrad" x1="2" y1="4" x2="46" y2="42" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#c9956c" />
                <stop offset="100%" stopColor="#f5d5c8" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Loading text */}
        <div className="text-center space-y-2">
          <p
            className="text-xs tracking-[0.35em] uppercase text-white/30 font-body"
            style={{ letterSpacing: "0.35em" }}
          >
            preparing something for you
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-px bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full progress-bar rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
