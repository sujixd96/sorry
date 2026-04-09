import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stories = [
  {
    id: 1,
    label: "01 — the truth",
    heading: "I know I made mistakes.",
    body: "Not the kind that slip through accidentally — the kind you make when you're too caught up in yourself to see what's right in front of you. I was careless with something that deserved care. I was distant when you needed presence. I said things that shouldn't have been said, and left unspoken the things that mattered most.",
    accent: "rgba(124,58,237,0.15)",
    accentBorder: "rgba(124,58,237,0.3)",
  },
  {
    id: 2,
    label: "02 — what I see now",
    heading: "But you matter to me.",
    body: "More than I've probably shown. More than I know how to say elegantly. You're one of the rare people I think about not because I have to — but because you just stay, quietly, somewhere important. I don't want distance to become the default between us.",
    accent: "rgba(201,149,108,0.12)",
    accentBorder: "rgba(201,149,108,0.3)",
    heartbeat: true,
  },
  {
    id: 3,
    label: "03 — what I'm asking",
    heading: "I'm not asking for everything back.",
    body: "Just a moment. A chance to be heard, and to listen in return. Whatever this becomes — I hope it starts with honesty. And I mean every word written here.",
    accent: "rgba(245,213,200,0.06)",
    accentBorder: "rgba(245,213,200,0.2)",
  },
];

function StoryCard({ story, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.97,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.0,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative mx-auto max-w-2xl w-full"
    >
      {/* Glow orb behind card */}
      <div
        className="absolute -inset-8 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${story.accent} 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Glass card */}
      <div
        className="relative rounded-2xl p-8 md:p-12 glass"
        style={{
          borderColor: story.accentBorder,
          border: `1px solid ${story.accentBorder}`,
        }}
      >
        {/* Label */}
        <p
          className="text-xs tracking-[0.35em] uppercase font-body mb-6"
          style={{ color: "rgba(201,149,108,0.6)" }}
        >
          {story.label}
        </p>

        {/* Heading */}
        <h2
          className="font-display font-light mb-6 leading-tight"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            color: "#f0ece8",
          }}
        >
          {story.heartbeat ? (
            <span className="heartbeat gradient-text">{story.heading}</span>
          ) : (
            story.heading
          )}
        </h2>

        {/* Divider */}
        <div
          className="w-16 h-px mb-6"
          style={{
            background: `linear-gradient(to right, ${story.accentBorder}, transparent)`,
          }}
        />

        {/* Body */}
        <p
          className="font-body font-light leading-relaxed"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            color: "rgba(240,236,232,0.65)",
            lineHeight: 1.85,
          }}
        >
          {story.body}
        </p>
      </div>
    </motion.div>
  );
}

export default function StorySection() {
  return (
    <section className="relative py-24 md:py-36 px-6">
      {/* Connecting line between cards */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 5%, rgba(124,58,237,0.15) 30%, rgba(201,149,108,0.15) 70%, transparent 95%)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-20 md:gap-32">
        {stories.map((story, index) => (
          <StoryCard key={story.id} story={story} index={index} />
        ))}
      </div>
    </section>
  );
}
