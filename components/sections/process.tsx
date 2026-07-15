// components/sections/process.tsx

"use client";

import { motion } from "framer-motion";
import {
  Search,
  PenTool,
  Code2,
  Bug,
  Rocket,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Research",
    description:
      "We study your users, your market, and your constraints before proposing a single solution.",
    icon: Search,
  },
  {
    number: "02",
    title: "Design",
    description:
      "Interfaces and systems are designed with the same rigor as the engineering that powers them.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Development",
    description:
      "Production-grade code, written for the team that will maintain it long after launch.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Testing",
    description:
      "Every release is verified against real usage patterns, not just a checklist.",
    icon: Bug,
  },
  {
    number: "05",
    title: "Deployment",
    description:
      "Shipped with zero-downtime infrastructure and monitoring in place from day one.",
    icon: Rocket,
  },
  {
    number: "06",
    title: "Support",
    description:
      "We stay involved after launch, iterating on what real usage tells us.",
    icon: LifeBuoy,
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
            {PROCESS_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  className="group relative grid grid-cols-[56px_1fr] gap-6 overflow-hidden border-b border-border py-8 last:border-b-0 md:grid-cols-[56px_180px_1fr] md:gap-10"
                >
                  {/* Number circle — border + text shift to accent on hover */}
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card font-mono text-sm text-secondary transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                    {step.number}
                  </div>

                  <h3 className="relative z-10 self-center text-xl font-medium tracking-tight text-foreground">
                    {step.title}
                  </h3>

                  <p className="relative z-10 max-w-lg self-center text-sm leading-relaxed text-secondary md:text-base">
                    {step.description}
                  </p>

                  {/* Icon — mostly clipped behind the row's bottom edge at rest,
                      rises + scales + tilts into view on hover. Sits behind the
                      text content (z-0) so it reads as "peeking up from below." */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-4 bottom-0 z-0 translate-y-[78%] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[38%] group-hover:opacity-100 md:-right-2"
                    style={{ perspective: "600px" }}
                  >
                    <div className="rotate-[8deg] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 group-hover:scale-110">
                      <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl border border-accent/20 bg-gradient-to-b from-accent/15 to-transparent shadow-[0_20px_60px_-15px_rgba(37,99,235,0.5)] backdrop-blur-sm md:h-40 md:w-40">
                        <Icon
                          className="h-14 w-14 text-accent md:h-16 md:w-16"
                          strokeWidth={1.25}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
