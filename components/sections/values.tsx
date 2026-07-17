// components/sections/values.tsx

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Target, MessageSquare, Gauge, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Value = {
  index: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const VALUES: Value[] = [
  {
    index: "01",
    icon: Target,
    title: "Outcomes over ceremony",
    description:
      "We measure success by what ships and what it changes, not by hours logged or documents produced.",
  },
  {
    index: "02",
    icon: MessageSquare,
    title: "Direct communication",
    description:
      "No account managers relaying messages. You talk to the people actually writing the code.",
  },
  {
    index: "03",
    icon: Gauge,
    title: "Built to last",
    description:
      "Code that the next engineer, whether ours or yours, can read, extend, and trust.",
  },
];

function ValueCard({ value, i }: { value: Value; i: number }) {
  const Icon = value.icon;
  const cardRef = React.useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect || !cardRef.current) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--glow-x", `${x}%`);
    cardRef.current.style.setProperty("--glow-y", `${y}%`);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 p-8",
        "bg-[#121212]",
        "shadow-[0_16px_40px_-20px_rgba(0,0,0,0.55)]",
        "transition-colors duration-300 hover:border-accent/25"
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(37,99,235,0.10), transparent 70%)",
        }}
      />

      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <div
            className="h-12 w-12 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
            style={{ perspective: "600px" }}
          >
            <div className="h-full w-full rotate-[6deg] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0">
              <div className="flex h-full w-full items-center justify-center rounded-xl border border-accent/20 bg-gradient-to-b from-accent/15 to-transparent">
                <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
              </div>
            </div>
          </div>
          <span className="font-mono text-xs text-secondary/60">
            {value.index}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-medium tracking-tight text-foreground">
          {value.title}
        </h3>
        <p className="text-sm leading-relaxed text-secondary">
          {value.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Values() {
  return (
    <section className="border-y border-border bg-background-secondary py-28 md:py-36">
      <div className="container-premium">
        <div className="mb-16 max-w-xl">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-secondary">
            What we believe
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Three ideas, held without exception.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {VALUES.map((value, i) => (
            <ValueCard key={value.title} value={value} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
