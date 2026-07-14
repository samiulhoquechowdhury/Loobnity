// components/hero/hero.tsx

"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroBackground } from "@/components/hero/hero-background";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

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
            Software &amp; AI engineering studio
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
              <code className="font-mono text-secondary">
                <span className="text-accent">export async function</span>{" "}
                deploy(build: Artifact) {"{"}
                {"\n"}
                {"  "}await pipeline.run(build);
                {"\n"}
                {"  "}
                <span className="text-accent">return</span> status.
                <span className="text-foreground">Live</span>;{"\n"}
                {"}"}
              </code>
            </pre>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16, y: -16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -right-6 -top-6 rounded-md border border-border bg-card px-4 py-2.5 text-xs text-secondary shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
          >
            Build passed <span className="text-accent">✓</span>
          </motion.div>
        </motion.div>
      </div>
    </HeroBackground>
  );
}
