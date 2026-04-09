import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Uses a free ambient audio from a public URL
// Replace AUDIO_URL with your own audio file if desired
const AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_URL);
    audio.loop = true;
    audio.volume = 0.18;
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => setLoaded(true));
    audio.load();

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-40 glass rounded-full w-11 h-11 flex items-center justify-center glow-violet group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
      title={playing ? "Pause music" : "Play ambient music"}
    >
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.span
            key="pause"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="text-rose-gold text-sm"
          >
            {/* Sound waves icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" fill="rgba(201,149,108,0.3)" stroke="#c9956c"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#c9956c"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="rgba(201,149,108,0.5)"/>
            </svg>
          </motion.span>
        ) : (
          <motion.span
            key="play"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="text-white/40 text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)"/>
              <line x1="23" y1="9" x2="23" y2="15" stroke="rgba(255,255,255,0.2)"/>
              <line x1="19" y1="7" x2="19" y2="17" stroke="rgba(255,255,255,0.2)"/>
            </svg>
          </motion.span>
        )}
      </AnimatePresence>

      {/* Ripple when playing */}
      {playing && (
        <>
          <motion.span
            className="absolute inset-0 rounded-full border border-violet-glow/30"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="absolute inset-0 rounded-full border border-violet-glow/20"
            animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
          />
        </>
      )}
    </motion.button>
  );
}
