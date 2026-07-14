// components/sections/services-detail.tsx

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
} from "lucide-react";

type ServiceDetail = {
  icon: typeof Sparkles;
  title: string;
  description: string;
  includes: string[];
};

const SERVICES: ServiceDetail[] = [
  {
    icon: Sparkles,
    title: "AI Development",
    description:
      "Custom models, retrieval systems, and AI-native product features built on infrastructure you actually own.",
    includes: [
      "LLM integration & agent workflows",
      "Retrieval-augmented generation (RAG)",
      "Fine-tuning & evaluation pipelines",
      "Model hosting & inference optimization",
    ],
  },
  {
    icon: Code2,
    title: "Custom Software",
    description:
      "Systems engineered around how your team actually operates, not retrofitted from an off-the-shelf template.",
    includes: [
      "Internal tools & operational platforms",
      "API design & system architecture",
      "Legacy system modernization",
      "Third-party integrations",
    ],
  },
  {
    icon: Globe,
    title: "Web Applications",
    description:
      "Fast, resilient platforms built with modern frameworks and a relentless eye for detail.",
    includes: [
      "Marketing sites & web apps",
      "Performance & Core Web Vitals tuning",
      "Design systems & component libraries",
      "SEO & analytics foundations",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native-feeling iOS and Android experiences designed for retention, not just release day.",
    includes: [
      "React Native & native development",
      "Offline-first architecture",
      "App Store & Play Store launch support",
      "Push notifications & analytics",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Infrastructure that scales quietly in the background so your product never has to slow down.",
    includes: [
      "AWS / GCP / Azure architecture",
      "CI/CD pipelines",
      "Observability & monitoring",
      "Cost optimization",
    ],
  },
  {
    icon: Workflow,
    title: "Automation",
    description:
      "Workflow and process automation that removes hours of manual work from your team's week.",
    includes: [
      "Internal workflow automation",
      "Data pipeline construction",
      "Third-party API orchestration",
      "Reporting & alerting systems",
    ],
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description:
      "Interfaces designed with the same rigor as the systems that power them.",
    includes: [
      "Product design & prototyping",
      "Design systems",
      "User research & usability testing",
      "Motion & interaction design",
    ],
  },
  {
    icon: Building2,
    title: "Enterprise Solutions",
    description:
      "Secure, compliant, and built to operate reliably at organizational scale.",
    includes: [
      "Security & compliance review",
      "SSO & role-based access control",
      "Audit logging & data governance",
      "SLA-backed delivery",
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: (i % 2) * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function ServicesDetail() {
  return (
    <section className="bg-background pb-28 md:pb-36">
      <div className="container-premium">
        <div className="flex flex-col">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 gap-8 border-b border-border py-12 last:border-b-0 md:grid-cols-[1fr_1.2fr]"
              >
                <div>
                  <Icon
                    className="mb-5 h-6 w-6 text-accent"
                    strokeWidth={1.5}
                  />
                  <h2 className="text-2xl font-medium tracking-tight text-foreground">
                    {service.title}
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-secondary">
                    {service.description}
                  </p>
                </div>

                <ul className="grid grid-cols-1 gap-x-8 gap-y-3 self-center sm:grid-cols-2">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-secondary"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
