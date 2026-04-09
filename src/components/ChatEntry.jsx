import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function ChatEntry() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLeaving, setIsLeaving] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

 const handleEnter = () => {
  if (!username.trim()) return;

  setIsLeaving(true);

  const room = "suji-sakshi-new"; // 🔥 same room for both

  setTimeout(() => {
    window.open(
      `https://hack.chat/?${room}#${encodeURIComponent(username.trim())}`,
      "_blank"
    );
    setIsLeaving(false);
  }, 600);
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleEnter();
  };

  return (
    <section className="relative py-24 md:py-36 px-6">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(45,20,88,0.2) 0%, transparent 65%)",
        }}
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-sm mx-auto"
      >
        {/* Label */}
        <p
          className="text-xs tracking-[0.35em] uppercase font-body text-center mb-4"
          style={{ color: "rgba(124,58,237,0.6)" }}
        >
          private room
        </p>

        {/* Heading */}
        <h2
          className="font-display font-light text-center mb-2 leading-tight"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#f0ece8" }}
        >
          Just us.
        </h2>
        <p
          className="font-body text-center mb-8 text-sm"
          style={{ color: "rgba(240,236,232,0.35)" }}
        >
          A quiet place to talk. No records, no noise.
        </p>

        {/* Login card */}
        <AnimatePresence>
          {!isLeaving ? (
            <motion.div
              key="card"
              exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              transition={{ duration: 0.5 }}
              className="glass-strong rounded-2xl p-7"
              style={{ border: "1px solid rgba(124,58,237,0.2)" }}
            >
              {/* Glow top */}
              <div
                className="w-8 h-8 rounded-full mx-auto mb-6"
                style={{
                  background: "radial-gradient(circle, rgba(124,58,237,0.6), transparent)",
                  filter: "blur(8px)",
                }}
              />

              {/* Username input */}
              <div className="mb-4">
                <label
                  className="block text-xs tracking-widest uppercase font-body mb-2"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Your name
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your name..."
                  className="w-full bg-white/[0.04] rounded-xl px-4 py-3 font-body text-white/80 placeholder-white/20 transition-all duration-300"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontSize: "0.95rem",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid rgba(124,58,237,0.4)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1px solid rgba(255,255,255,0.08)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Password input */}
              <div className="mb-6">
                <label
                  className="block text-xs tracking-widest uppercase font-body mb-2"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Passphrase
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Something only you'd know..."
                  className="w-full bg-white/[0.04] rounded-xl px-4 py-3 font-body text-white/80 placeholder-white/20 transition-all duration-300"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontSize: "0.95rem",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid rgba(124,58,237,0.4)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1px solid rgba(255,255,255,0.08)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Enter button */}
              <motion.button
                onClick={handleEnter}
                disabled={!username.trim()}
                whileHover={username.trim() ? { scale: 1.02 } : {}}
                whileTap={username.trim() ? { scale: 0.97 } : {}}
                className="relative w-full py-3.5 rounded-xl font-body text-sm tracking-wide overflow-hidden transition-all duration-300 btn-glow"
                style={{
                  background: username.trim()
                    ? "linear-gradient(135deg, rgba(45,20,88,0.9), rgba(124,58,237,0.6))"
                    : "rgba(255,255,255,0.04)",
                  color: username.trim() ? "rgba(245,213,200,0.95)" : "rgba(255,255,255,0.2)",
                  border: username.trim()
                    ? "1px solid rgba(124,58,237,0.4)"
                    : "1px solid rgba(255,255,255,0.05)",
                  cursor: username.trim() ? "pointer" : "not-allowed",
                }}
              >
                <span className="relative z-10">Enter the room →</span>
              </motion.button>

              <p
                className="text-center text-xs mt-4 font-body"
                style={{ color: "rgba(255,255,255,0.18)" }}
              >
                Opens in a new tab · encrypted · ephemeral
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="leaving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-4xl mb-3"
              >
                🤍
              </motion.div>
              <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                Opening...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
