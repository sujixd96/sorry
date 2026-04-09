import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FULL_TEXT = "I'm sorry.";
const SUB_TEXT = "Some words take time to find. These ones have been waiting a while.";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [subDisplay, setSubDisplay] = useState("");
  const [doneMain, setDoneMain] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    let i = 0;
    const typeMain = () => {
      if (i < FULL_TEXT.length) {
        setDisplayText(FULL_TEXT.slice(0, i + 1));
        i++;
        setTimeout(typeMain, i === 1 ? 600 : 80 + Math.random() * 60);
      } else {
        setDoneMain(true);
        setTimeout(() => setShowSub(true), 600);
      }
    };
    const startDelay = setTimeout(typeMain, 900);
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (!showSub) return;
    let j = 0;
    const typeSub = () => {
      if (j < SUB_TEXT.length) {
        setSubDisplay(SUB_TEXT.slice(0, j + 1));
        j++;
        setTimeout(typeSub, 25 + Math.random() * 20);
      } else {
        setTimeout(() => setShowScroll(true), 800);
      }
    };
    typeSub();
  }, [showSub]);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 60%, rgba(45,20,88,0.6) 0%, rgba(10,8,24,0.9) 50%, #05040f 100%)",
      }}
    >
      {/* Background orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,149,108,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xs tracking-[0.4em] uppercase text-white/25 font-body mb-12"
        >
          a letter, of sorts
        </motion.p>

        {/* Main typewriter headline */}
        <h1
          className="font-display font-light text-center leading-none mb-8"
          style={{ fontSize: "clamp(4rem, 12vw, 9rem)", letterSpacing: "-0.02em" }}
        >
          <span className="gradient-text text-glow">{displayText}</span>
          {!doneMain && (
            <span className="cursor-blink ml-1 text-rose-gold" style={{ fontWeight: 300 }}>|</span>
          )}
        </h1>

        {/* Divider line */}
        {doneMain && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-24 h-px mx-auto mb-10"
            style={{
              background: "linear-gradient(to right, transparent, rgba(201,149,108,0.6), transparent)",
            }}
          />
        )}

        {/* Subtitle typewriter */}
        {showSub && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-display font-light italic text-white/60 text-center max-w-xl mx-auto"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", lineHeight: 1.7 }}
          >
            {subDisplay}
            {subDisplay.length < SUB_TEXT.length && (
              <span className="cursor-blink ml-0.5">|</span>
            )}
          </motion.p>
        )}

        {/* Scroll cue */}
        {showScroll && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-20 flex flex-col items-center gap-3"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-white/20 font-body">
              read on
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-10"
              style={{
                background: "linear-gradient(to bottom, rgba(201,149,108,0.5), transparent)",
              }}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #05040f)",
        }}
      />
    </section>
  );
}
