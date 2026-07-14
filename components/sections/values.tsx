// components/sections/values.tsx

"use client";

import { motion } from "framer-motion";
import { Target, MessageSquare, Gauge } from "lucide-react";

const VALUES = [
  {
    icon: Target,
    title: "Outcomes over ceremony",
    description:
      "We measure success by what ships and what it changes, not by hours logged or documents produced.",
  },
  {
    icon: MessageSquare,
    title: "Direct communication",
    description:
      "No account managers relaying messages. You talk to the people actually writing the code.",
  },
  {
    icon: Gauge,
    title: "Built to last",
    description:
      "Code that the next engineer, whether ours or yours, can read, extend, and trust.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function Values() {
  return (
    <section className="border-y border-border bg-background-secondary py-28 md:py-36">
      <div className="container-premium">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <Icon className="mb-5 h-6 w-6 text-accent" strokeWidth={1.5} />
              <h3 className="mb-2 text-lg font-medium tracking-tight text-foreground">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-secondary">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
