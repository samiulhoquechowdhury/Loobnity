// components/sections/scroll-story.tsx

"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type Beat = {
  eyebrow: string;
  title: string;
  description: string;
};

const BEATS: Beat[] = [
  {
    eyebrow: "01 — Research",
    title: "We start by understanding the problem, not the solution.",
    description:
      "Before a single screen is designed, we sit with your users, your data, and your constraints — so what we build actually fits.",
  },
  {
    eyebrow: "02 — Architecture",
    title: "Systems built to hold weight, not just demo well.",
    description:
      "Every decision — database, infrastructure, API shape — is made for the system you'll have in two years, not the one that looks good in a pitch.",
  },
  {
    eyebrow: "03 — Craft",
    title: "The details you don't notice are the ones we obsess over.",
    description:
      "Loading states, error copy, animation timing, keyboard focus — the parts of a product that separate expensive from ordinary.",
  },
  {
    eyebrow: "04 — Scale",
    title: "Built to grow past the first thousand users.",
    description:
      "We design for the load you'll have after launch succeeds, not just the load you'll have on day one.",
  },
];

function StoryBeat({
  beat,
  index,
  total,
  scrollYProgress,
}: {
  beat: Beat;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const segment = 1 / total;
  const start = index * segment;
  const end = start + segment;

  // Fade + rise in during the first third of this beat's segment,
  // hold fully visible through the middle, fade + rise out during the last third.
  const inEnd = start + segment * 0.3;
  const outStart = end - segment * 0.3;

  const opacity = useTransform(
    scrollYProgress,
    [start, inEnd, outStart, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [start, inEnd, outStart, end],
    [40, 0, 0, -40]
  );
  const scale = useTransform(
    scrollYProgress,
    [start, inEnd, outStart, end],
    [0.96, 1, 1, 0.96]
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <span className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {beat.eyebrow}
      </span>
      <h3 className="max-w-2xl text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {beat.title}
      </h3>
      <p className="mt-6 max-w-md text-base leading-relaxed text-secondary">
        {beat.description}
      </p>
    </motion.div>
  );
}

export function ScrollStory() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  const progressBarScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    // Tall wrapper — its height is what "budgets" the scroll distance
    // the pinned content gets to play out over. 100vh per beat feels right
    // for 4 beats; tune per how much scroll distance feels natural.
    <section
      ref={containerRef}
      className="relative bg-background-secondary"
      style={{ height: `${BEATS.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="relative flex-1">
          {BEATS.map((beat, i) => (
            <StoryBeat
              key={beat.eyebrow}
              beat={beat}
              index={i}
              total={BEATS.length}
              scrollYProgress={smoothProgress}
            />
          ))}
        </div>

        {/* Progress rail — small but essential Apple-page detail:
            it tells the user they're "inside" a pinned section and
            shows how much is left, so scrolling through it doesn't
            feel like the page got stuck. */}
        <div className="relative z-10 mx-auto mb-10 h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            style={{ scaleX: progressBarScale }}
            className="h-full w-full origin-left rounded-full bg-accent"
          />
        </div>
      </div>
    </section>
  );
}
