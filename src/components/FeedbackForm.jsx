import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
export default function FeedbackForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleSubmit = async () => {
    if (!message.trim() || status === "loading") return;
    setStatus("loading");
    try {
      await addDoc(collection(db, "messages"), {
        text: message.trim(),
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="relative py-24 md:py-36 px-6">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(201,149,108,0.05) 0%, transparent 65%)",
        }}
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50, scale: 0.97 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-xl mx-auto"
      >
        {/* Section label */}
        <p
          className="text-xs tracking-[0.35em] uppercase font-body text-center mb-4"
          style={{ color: "rgba(201,149,108,0.5)" }}
        >
          your words
        </p>

        {/* Heading */}
        <h2
          className="font-display font-light text-center mb-2 leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#f0ece8" }}
        >
          Say something.
        </h2>
        <p
          className="font-body text-center mb-10"
          style={{ color: "rgba(240,236,232,0.4)", fontSize: "0.9rem" }}
        >
          It will reach me. I promise I'll read it.
        </p>

        {/* Card */}
        <div
          className="rounded-2xl p-6 md:p-8 glass-strong"
          style={{ border: "1px solid rgba(201,149,108,0.15)" }}
        >
          {/* Textarea */}
          <div className="relative mb-5">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="If you want to say something..."
              rows={5}
              maxLength={500}
              className="w-full bg-white/[0.04] rounded-xl px-5 py-4 font-body text-white/80 placeholder-white/20 transition-all duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: "1rem",
                lineHeight: 1.75,
              }}
              onFocus={(e) => {
                e.target.style.border = "1px solid rgba(201,149,108,0.35)";
                e.target.style.background = "rgba(255,255,255,0.06)";
                e.target.style.boxShadow = "0 0 0 3px rgba(201,149,108,0.08)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid rgba(255,255,255,0.08)";
                e.target.style.background = "rgba(255,255,255,0.04)";
                e.target.style.boxShadow = "none";
              }}
            />
            {/* Char count */}
            <span
              className="absolute bottom-3 right-4 text-xs font-body"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              {message.length}/500
            </span>
          </div>

          {/* Send button */}
          <motion.button
            onClick={handleSubmit}
            disabled={!message.trim() || status === "loading" || status === "success"}
            whileHover={message.trim() ? { scale: 1.02 } : {}}
            whileTap={message.trim() ? { scale: 0.98 } : {}}
            className="relative w-full py-4 rounded-xl font-body font-medium text-sm tracking-wide overflow-hidden transition-all duration-300"
            style={{
              background:
                message.trim() && status === "idle"
                  ? "linear-gradient(135deg, rgba(124,58,237,0.7), rgba(201,149,108,0.7))"
                  : "rgba(255,255,255,0.06)",
              color: message.trim() && status === "idle" ? "#fff" : "rgba(255,255,255,0.3)",
              border:
                message.trim() && status === "idle"
                  ? "1px solid rgba(201,149,108,0.4)"
                  : "1px solid rgba(255,255,255,0.06)",
              cursor: message.trim() && status === "idle" ? "pointer" : "not-allowed",
            }}
          >
            {/* Glow overlay on hover */}
            {message.trim() && status === "idle" && (
              <motion.div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(201,149,108,0.4))",
                  boxShadow: "0 0 30px rgba(201,149,108,0.3)",
                }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {status === "loading" && (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="block w-4 h-4 border-2 border-white/30 border-t-white/80 rounded-full"
                />
              )}
              {status === "idle" && "Send it →"}
              {status === "loading" && "Sending..."}
              {status === "success" && "Message sent ❤️"}
              {status === "error" && "Something went wrong. Try again."}
            </span>
          </motion.button>
        </div>

        {/* Success toast */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="mt-4 text-center py-3 px-5 rounded-xl glass"
              style={{ border: "1px solid rgba(201,149,108,0.25)" }}
            >
              <p className="font-body text-sm" style={{ color: "rgba(201,149,108,0.9)" }}>
                Your words are safe with me. ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
