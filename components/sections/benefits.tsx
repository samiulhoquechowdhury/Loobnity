// components/sections/benefits.tsx

"use client";

import { motion } from "framer-motion";
import { Home, Clock, HeartPulse, GraduationCap } from "lucide-react";

const BENEFITS = [
  {
    icon: Home,
    title: "Remote-first",
    description:
      "Work from anywhere. We coordinate around overlap hours, not fixed shifts.",
  },
  {
    icon: Clock,
    title: "Flexible hours",
    description: "Structured around output, not a clock-in time.",
  },
  {
    icon: HeartPulse,
    title: "Health coverage",
    description: "Comprehensive health benefits for full-time team members.",
  },
  {
    icon: GraduationCap,
    title: "Learning budget",
    description: "Annual budget for courses, conferences, and books.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function Benefits() {
  return (
    <section className="border-y border-border bg-background-secondary py-24 md:py-28">
      <div className="container-premium">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <Icon className="mb-4 h-6 w-6 text-accent" strokeWidth={1.5} />
              <h3 className="mb-2 text-base font-medium text-foreground">
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
