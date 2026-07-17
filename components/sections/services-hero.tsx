// components/sections/services-hero.tsx

"use client";

import * as React from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import {
  Sparkles,
  Code2,
  Globe,
  Smartphone,
  Cloud,
  Workflow,
  PenTool,
  Building2,
} from "lucide-react";

const CATEGORIES = [
  { label: "AI Development", id: "ai-development", icon: Sparkles },
  { label: "Custom Software", id: "custom-software", icon: Code2 },
  { label: "Web Applications", id: "web-applications", icon: Globe },
  { label: "Mobile Apps", id: "mobile-apps", icon: Smartphone },
  { label: "Cloud Solutions", id: "cloud-solutions", icon: Cloud },
  { label: "Automation", id: "automation", icon: Workflow },
  { label: "UI/UX Design", id: "ui-ux-design", icon: PenTool },
  { label: "Enterprise", id: "enterprise-solutions", icon: Building2 },
];

const HEADLINE = "Every discipline, under one team.";

function AnimatedHeadline() {
  const words = HEADLINE.split(" ");

  return (
    <h1 className="flex flex-wrap text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
      {words.map((word, i) => (
        <span key={i} className="mr-[0.28em] overflow-hidden pb-1">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              delay: 0.15 + i * 0.07,
              duration: 0.75,
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

function HeroGridBackground() {
  // useMotionValue writes directly to the DOM via Framer's own render
  // loop — no React setState, no component re-render on mousemove.
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
            id="services-grid"
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
          <radialGradient id="services-grid-fade" cx="50%" cy="20%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="services-grid-mask">
            <rect width="100%" height="100%" fill="url(#services-grid-fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#services-grid)"
          mask="url(#services-grid-mask)"
        />
      </svg>

      <motion.div
        style={{ background }}
        className="pointer-events-none absolute inset-0 hidden md:block"
      />
    </div>
  );
}

function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-20 md:pt-40 md:pb-28">
      <HeroGridBackground />

      <div className="container-premium relative z-10 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-xs uppercase tracking-[0.2em] text-secondary"
        >
          Services
        </motion.p>

        <AnimatedHeadline />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-secondary"
        >
          From first sketch to production infrastructure, one team carries the
          work end to end.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                onClick={() => jumpTo(cat.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 + i * 0.04, duration: 0.4 }}
                whileTap={{ scale: 0.96 }}
                className="group flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:text-foreground"
              >
                <Icon
                  className="h-3.5 w-3.5 text-secondary transition-colors duration-200 group-hover:text-accent"
                  strokeWidth={1.5}
                />
                {cat.label}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
