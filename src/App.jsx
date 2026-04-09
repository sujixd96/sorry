import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ScrollProgress";
import Particles from "./components/Particles";
import MusicToggle from "./components/MusicToggle";
import Hero from "./components/Hero";
import StorySection from "./components/StorySection";
import FeedbackForm from "./components/FeedbackForm";
import ChatEntry from "./components/ChatEntry";


function Footer() {
  return (
    <footer className="relative py-16 px-6 text-center">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16"
        style={{
          background: "linear-gradient(to bottom, rgba(201,149,108,0.3), transparent)",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="pt-8"
      >
        <span
          className="font-display font-light italic text-2xl"
          style={{ color: "rgba(201,149,108,0.4)" }}
        >
          — with honesty
        </span>
        <div className="mt-6 text-xs tracking-widest uppercase font-body" style={{ color: "rgba(255,255,255,0.1)" }}>
          made with intent
        </div>
      </motion.div>
    </footer>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadComplete = () => {
    setLoading(false);
    setTimeout(() => setShowContent(true), 300);
  };

  return (
    <div className="relative min-h-screen noise" style={{ background: "#05040f" }}>
      {/* Ambient gradient background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(45,20,88,0.25) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(201,149,108,0.08) 0%, transparent 50%)",
        }}
      />

      {/* Floating particles */}
      <Particles />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative z-10"
          >
            {/* Scroll progress bar */}
            <ScrollProgress />

            {/* Music toggle */}
            <MusicToggle />

            {/* Sections */}
            <main>
              <Hero />

              {/* Separator */}
              <div
                className="h-px mx-auto max-w-sm"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(124,58,237,0.3), transparent)",
                }}
              />

              <StorySection />

              {/* Separator */}
              <div
                className="h-px mx-auto max-w-sm"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(201,149,108,0.25), transparent)",
                }}
              />

              <FeedbackForm />

              {/* Separator */}
              <div
                className="h-px mx-auto max-w-sm"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(124,58,237,0.2), transparent)",
                }}
              />

              <ChatEntry />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
