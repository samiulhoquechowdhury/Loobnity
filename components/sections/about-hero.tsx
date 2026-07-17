// components/sections/about-hero.tsx

"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

const HEADLINE = "Software built by people who ship, not just plan.";

const STATS = [
  { value: "40+", label: "Products shipped" },
  { value: "1", label: "Year in business" },
  { value: "8", label: "Disciplines covered" },
];

function AnimatedHeadline() {
  const words = HEADLINE.split(" ");

  return (
    <h1 className="flex flex-wrap text-4xl font-semibold leading-[1.12] tracking-tight text-foreground sm:text-5xl md:text-6xl">
      {words.map((word, i) => (
        <span key={i} className="mr-[0.28em] overflow-hidden pb-1">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              delay: 0.15 + i * 0.055,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

function GridBackground() {
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(280px circle at ${glowX}% ${glowY}%, rgba(37,99,235,0.10), transparent 70%)`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <div onMouseMove={handleMove} className="absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern
            id="about-grid"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 56 0 L 0 0 0 56"
              fill="none"
              stroke="rgba(255,255,255,0.045)"
              strokeWidth="1"
            />
          </pattern>
          <radialGradient id="about-grid-fade" cx="50%" cy="15%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="about-grid-mask">
            <rect width="100%" height="100%" fill="url(#about-grid-fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#about-grid)"
          mask="url(#about-grid-mask)"
        />
      </svg>
      <motion.div
        style={{ background }}
        className="pointer-events-none absolute inset-0 hidden md:block"
      />
    </div>
  );
}

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-20 md:pt-40 md:pb-24">
      <GridBackground />

      <div className="container-premium relative z-10 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-xs uppercase tracking-[0.2em] text-secondary"
        >
          About Loobnity
        </motion.p>

        <AnimatedHeadline />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-secondary"
        >
          We started with a simple frustration: too much software gets built
          slowly, by teams disconnected from the people who use it. We work
          close to the product, from first sketch to production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-8 sm:max-w-md"
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-semibold tracking-tight text-foreground">
                {stat.value}
              </p>
              <p className="mt-1 text-xs leading-snug text-secondary">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
