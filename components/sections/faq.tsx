// components/sections/faq.tsx

"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: "What kinds of teams do you work with?",
    answer:
      "Mostly funded startups and mid-size companies that need senior engineering and design capacity, either to ship a new product or to strengthen an existing platform.",
  },
  {
    question: "How long does a typical engagement take?",
    answer:
      "Project-based work usually runs 6 to 16 weeks depending on scope. Dedicated team engagements are ongoing and reviewed on a monthly cadence.",
  },
  {
    question: "Do you work with in-house engineering teams?",
    answer:
      "Yes. We regularly embed alongside existing teams, either leading a specific initiative or filling a capability gap like AI or infrastructure.",
  },
  {
    question: "What does the first step look like?",
    answer:
      "A short discovery call to understand the problem, followed by a scoped proposal. There's no cost or obligation to move forward after that call.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Every project includes a post-launch support window, and most clients move into an ongoing arrangement once the initial scope ships.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function Faq() {
  return (
    <section className="bg-background py-28 md:py-36">
      <div className="container-premium max-w-3xl">
        <div className="mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-secondary">
            Questions
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Frequently asked.
          </h2>
        </div>

        <div className="flex flex-col">
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.question}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="border-b border-border"
            >
              <details className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-foreground marker:content-none">
                  {faq.question}
                  <Plus
                    className="h-5 w-5 shrink-0 text-secondary transition-transform duration-300 group-open:rotate-45 group-open:text-accent"
                    strokeWidth={1.5}
                  />
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary">
                  {faq.answer}
                </p>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
