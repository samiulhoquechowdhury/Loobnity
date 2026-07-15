// components/hero/hero.tsx

"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import { HeroBackground } from "@/components/hero/hero-background";
import { TypingCode } from "@/components/hero/typing-code";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const STATS = [
  { value: "40+", label: "Products shipped" },
  { value: "99.9%", label: "Uptime across deployments" },
  { value: "6 wk", label: "Average time to first release" },
];

export function Hero() {
  return (
    <HeroBackground>
      <div className="container-premium grid items-center gap-16 pt-32 pb-20 md:grid-cols-2 md:pt-40">
        <div>
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-secondary"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available for new projects
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Building software
            <br />
            that matters.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-md text-lg leading-relaxed text-secondary"
          >
            Loobnity partners with ambitious teams to design, engineer, and ship
            products, AI systems, and platforms built to last.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Start a project
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-card"
            >
              View our work
            </Link>
          </motion.div>

          {/* Live stats row — turns positioning copy into concrete numbers */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-secondary">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden md:block"
        >
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="ml-3 text-xs text-secondary">deploy.ts</span>
            </div>
            <pre className="overflow-x-auto px-5 py-5 text-sm leading-relaxed">
              <TypingCode />
            </pre>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16, y: -16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -right-6 -top-6 rounded-md border border-border bg-card px-4 py-2.5 text-xs text-secondary shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
          >
            Build passed <span className="text-accent">✓</span>
          </motion.div>

          {/* Second floating card — makes the mockup read as a live product
              surface with multiple signals, not one static screenshot */}
          <motion.div
            initial={{ opacity: 0, x: -16, y: 16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-6 -left-6 flex items-center gap-2.5 rounded-md border border-border bg-card px-4 py-2.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
          >
            <Activity className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-foreground">
                Response time
              </p>
              <p className="text-xs text-secondary">
                <span className="text-accent">42ms</span> avg
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </HeroBackground>
  );
}
