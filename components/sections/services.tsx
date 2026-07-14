// components/sections/services.tsx

"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Code2,
  Globe,
  Smartphone,
  Cloud,
  Workflow,
  PenTool,
  Building2,
  ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  {
    icon: Sparkles,
    title: "AI Development",
    description:
      "Custom models, agents, and AI-native features built on production-grade infrastructure.",
  },
  {
    icon: Code2,
    title: "Custom Software",
    description:
      "Bespoke systems engineered around how your team actually works, not a generic template.",
  },
  {
    icon: Globe,
    title: "Web Applications",
    description:
      "Fast, resilient web platforms built with modern frameworks and a relentless eye for detail.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native-feeling iOS and Android experiences designed for retention, not just release.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Infrastructure that scales quietly in the background so your product never has to slow down.",
  },
  {
    icon: Workflow,
    title: "Automation",
    description:
      "Workflow and process automation that removes hours of manual work from your team's week.",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description:
      "Interfaces designed with the same rigor as the systems that power them.",
  },
  {
    icon: Building2,
    title: "Enterprise Solutions",
    description:
      "Secure, compliant, and built to operate reliably at organizational scale.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function Services() {
  return (
    <section className="bg-background py-28 md:py-36">
      <div className="container-premium">
        <div className="mb-16 max-w-xl">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-secondary">
            What we do
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Every discipline a modern product needs.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="group relative flex flex-col justify-between bg-card p-7 transition-colors duration-300 hover:bg-background-secondary"
              >
                <div>
                  <Icon
                    className="mb-5 h-6 w-6 text-secondary transition-colors duration-300 group-hover:text-accent"
                    strokeWidth={1.5}
                  />
                  <h3 className="mb-2 text-base font-medium text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-secondary">
                    {service.description}
                  </p>
                </div>

                <ArrowUpRight
                  className="mt-6 h-4 w-4 text-secondary opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100"
                  strokeWidth={1.5}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
