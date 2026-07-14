// components/sections/about-hero.tsx

"use client";

import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="bg-background pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-premium max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-xs uppercase tracking-[0.2em] text-secondary"
        >
          About Loobnity
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          Software built by people who ship, not just plan.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-lg leading-relaxed text-secondary"
        >
          Loobnity started with a simple frustration: too much software gets
          built slowly, by teams disconnected from the people who use it. We
          work in small, senior teams that stay close to the product from the
          first sketch to the thing running in production.
        </motion.p>
      </div>
    </section>
  );
}
