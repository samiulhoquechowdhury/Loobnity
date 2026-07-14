// components/sections/process.tsx

"use client";

import { motion } from "framer-motion";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Research",
    description:
      "We study your users, your market, and your constraints before proposing a single solution.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Interfaces and systems are designed with the same rigor as the engineering that powers them.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "Production-grade code, written for the team that will maintain it long after launch.",
  },
  {
    number: "04",
    title: "Testing",
    description:
      "Every release is verified against real usage patterns, not just a checklist.",
  },
  {
    number: "05",
    title: "Deployment",
    description:
      "Shipped with zero-downtime infrastructure and monitoring in place from day one.",
  },
  {
    number: "06",
    title: "Support",
    description:
      "We stay involved after launch, iterating on what real usage tells us.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Process() {
  return (
    <section className="bg-background-secondary py-28 md:py-36">
      <div className="container-premium">
        <div className="mb-16 max-w-xl">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-secondary">
            How we work
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            A process built for outcomes, not ceremony.
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-[27px] top-2 bottom-2 hidden w-px bg-border md:block" />

          <div className="flex flex-col">
            {PROCESS_STEPS.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="group relative grid grid-cols-[56px_1fr] gap-6 border-b border-border py-8 last:border-b-0 md:grid-cols-[56px_180px_1fr] md:gap-10"
              >
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card font-mono text-sm text-secondary transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                  {step.number}
                </div>
                <h3 className="self-center text-xl font-medium tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="self-center max-w-lg text-sm leading-relaxed text-secondary md:text-base">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
