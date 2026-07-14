// components/sections/testimonials.tsx

"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Loobnity rebuilt our scheduling platform in a quarter what our last vendor couldn't finish in a year. The engineering depth was obvious from the first call.",
    name: "Priya Menon",
    role: "VP of Engineering",
    company: "Nimbus Health",
  },
  {
    quote:
      "They didn't just implement what we asked for — they questioned the brief where it didn't hold up, and the product is better for it.",
    name: "Daniel Ochoa",
    role: "Head of Product",
    company: "Corvus Logistics",
  },
  {
    quote:
      "Our fleet dashboard went from a spreadsheet to a real-time console our operators actually enjoy using. That's a hard bar to clear.",
    name: "Wei Lin",
    role: "COO",
    company: "Kestrel Robotics",
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

export function Testimonials() {
  return (
    <section className="bg-background py-28 md:py-36">
      <div className="container-premium">
        <div className="mb-16 max-w-xl">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-secondary">
            What clients say
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Trusted by the teams we build for.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col justify-between rounded-lg border border-border bg-white/[0.02] p-8 backdrop-blur-sm"
            >
              <div>
                <Quote
                  className="mb-6 h-6 w-6 text-accent/70"
                  strokeWidth={1.5}
                />
                <p className="text-base leading-relaxed text-foreground/90">
                  {t.quote}
                </p>
              </div>

              <div className="mt-8 border-t border-border pt-5">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-sm text-secondary">
                  {t.role}, {t.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
