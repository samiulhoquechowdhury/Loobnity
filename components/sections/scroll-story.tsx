// components/sections/scroll-story.tsx

"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Beat = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};

const BEATS: Beat[] = [
  {
    eyebrow: "Research",
    title: "We start by understanding the problem, not the solution.",
    description:
      "Before a single screen is designed, we sit with your users, your data, and your constraints — so what we build actually fits.",
    image: "/images/story/research.png",
  },
  {
    eyebrow: "Architecture",
    title: "Systems built to hold weight, not just demo well.",
    description:
      "Every decision — database, infrastructure, API shape — is made for the system you'll have in two years, not the one that looks good in a pitch.",
    image: "/images/story/architecture.png",
  },
  {
    eyebrow: "Craft",
    title: "The details you don't notice are the ones we obsess over.",
    description:
      "Loading states, error copy, animation timing, keyboard focus — the parts of a product that separate expensive from ordinary.",
    image: "/images/story/craft.png",
  },
  {
    eyebrow: "Scale",
    title: "Built to grow past the first thousand users.",
    description:
      "We design for the load you'll have after launch succeeds, not just the load you'll have on day one.",
    image: "/images/story/scale.png",
  },
];

// Apple-style easing — slower, weightier settle than the site's default
// [0.16, 1, 0.3, 1]. Used only in this section so the pinned story reads
// as deliberately heavier/calmer than the rest of the page's motion.
const EASE_APPLE = [0.22, 1, 0.36, 1] as const;

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
  const inEnd = start + segment * 0.32;
  const outStart = end - segment * 0.28;

  const opacity = useTransform(
    scrollYProgress,
    [start, inEnd, outStart, end],
    [0, 1, 1, 0]
  );
  const cardY = useTransform(
    scrollYProgress,
    [start, inEnd, outStart, end],
    [28, 0, 0, -24]
  );

  // Image lags slightly behind the card on entry (starts further right,
  // arrives a touch later) — the calm, deliberate "settling into place"
  // feel rather than everything arriving at once.
  const imageX = useTransform(
    scrollYProgress,
    [start, inEnd + segment * 0.05, outStart, end],
    [120, 0, 0, -70]
  );
  const imageOpacity = useTransform(
    scrollYProgress,
    [start, start + segment * 0.18, outStart, end],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      <div className="flex items-center">
        {/* Text card — quiet glass: faint tint, thin blur, hairline edge */}
        <motion.div
          style={{ y: cardY }}
          transition={{ ease: EASE_APPLE }}
          className={cn(
            "relative z-10 w-[280px] shrink-0 rounded-[28px] border border-white/10 p-7 sm:w-[360px] sm:p-10",
            "bg-white/[0.04] backdrop-blur-md",
            "shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)]"
          )}
        >
          <span className="mb-6 inline-block text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {beat.eyebrow}
          </span>
          <h3 className="text-xl font-semibold leading-[1.2] tracking-tight text-foreground sm:text-2xl md:text-[28px]">
            {beat.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-secondary">
            {beat.description}
          </p>
        </motion.div>

        {/* Image — exactly 10% of its width sits behind the card at rest,
            via a fixed responsive negative margin, not container-relative math */}
        <motion.div
          style={{ x: imageX, opacity: imageOpacity }}
          className="relative z-0 h-[170px] w-[240px] shrink-0 -ml-[24px] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.75)] sm:h-[260px] sm:w-[360px] sm:-ml-[36px]"
        >
          <Image
            src={beat.image}
            alt=""
            fill
            className="object-cover"
            sizes="360px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProgressDots({
  total,
  scrollYProgress,
}: {
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const segment = 1 / total;
      const next = Math.min(Math.floor(v / segment), total - 1);
      setActiveIndex(next);
    });
  }, [scrollYProgress, total]);

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-2.5",
        "bg-white/[0.04] backdrop-blur-md",
        "shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)]"
      )}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-[7px] w-[7px] rounded-full transition-all duration-700",
            i <= activeIndex
              ? "bg-accent shadow-[0_0_10px_1px_rgba(37,99,235,0.55)]"
              : "bg-white/15"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      ))}
    </div>
  );
}

export function ScrollStory() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });

  return (
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

        <div className="relative z-20 mb-10 flex justify-center">
          <ProgressDots total={BEATS.length} scrollYProgress={smoothProgress} />
        </div>
      </div>
    </section>
  );
}
