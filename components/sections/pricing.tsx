// components/sections/pricing.tsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Project-Based",
    description:
      "A fixed-scope engagement for a defined product, feature set, or MVP.",
    features: [
      "Dedicated design + engineering pair",
      "Fixed timeline and milestones",
      "Weekly progress reviews",
      "30-day post-launch support",
    ],
    cta: "Scope a project",
  },
  {
    name: "Dedicated Team",
    description:
      "An embedded team working inside your roadmap on an ongoing basis.",
    features: [
      "Full-stack squad matched to your stack",
      "Direct Slack + standup access",
      "Flexible scope, monthly cadence",
      "Scales up or down with your needs",
    ],
    cta: "Build your team",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description:
      "For organizations with compliance, security, or scale requirements.",
    features: [
      "Custom security and compliance review",
      "Dedicated account and delivery lead",
      "SLA-backed support",
      "On-site or region-specific delivery",
    ],
    cta: "Talk to sales",
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

export function Pricing() {
  return (
    <section className="bg-background-secondary py-28 md:py-36">
      <div className="container-premium">
        <div className="mb-16 max-w-xl">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-secondary">
            Engagement models
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            How we work together.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Every engagement is scoped around the work, not a fixed price list.
            These are the shapes it usually takes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className={cn(
                "flex flex-col rounded-lg border p-8",
                plan.highlighted
                  ? "border-accent/40 bg-card shadow-[0_0_0_1px_rgba(37,99,235,0.15)]"
                  : "border-border bg-card"
              )}
            >
              {plan.highlighted && (
                <span className="mb-5 inline-flex w-fit items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  Most common
                </span>
              )}

              <h3 className="text-xl font-medium tracking-tight text-foreground">
                {plan.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">
                {plan.description}
              </p>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-secondary"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      strokeWidth={1.5}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={cn(
                  "group mt-10 inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors",
                  plan.highlighted
                    ? "bg-accent text-white hover:bg-accent-hover"
                    : "border border-border text-foreground hover:bg-background-secondary"
                )}
              >
                {plan.cta}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
