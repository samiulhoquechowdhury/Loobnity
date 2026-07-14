// components/sections/technologies.tsx

"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiGo,
  SiPython,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiGraphql,
  SiOpenai,
} from "react-icons/si";
import { Bot, Gem } from "lucide-react";

const TECHNOLOGIES = [
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Go", Icon: SiGo },
  { name: "Python", Icon: SiPython },
  { name: "Docker", Icon: SiDocker },
  { name: "Kubernetes", Icon: SiKubernetes },
  { name: "AWS", Icon: SiAmazon },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Redis", Icon: SiRedis },
  { name: "GraphQL", Icon: SiGraphql },
  { name: "OpenAI", Icon: SiOpenai },
  { name: "Claude", Icon: Bot },
  { name: "Gemini", Icon: Gem },
];

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function Technologies() {
  return (
    <section className="bg-background-secondary py-28 md:py-36">
      <div className="container-premium">
        <div className="mb-16 max-w-xl">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-secondary">
            Our stack
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Modern tools, chosen deliberately.
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4 md:grid-cols-8">
          {TECHNOLOGIES.map(({ name, Icon }, i) => (
            <motion.div
              key={name}
              custom={i}
              variants={scaleIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="group flex flex-col items-center justify-center gap-3 bg-card px-4 py-8 transition-colors duration-300 hover:bg-background"
            >
              <Icon
                className="h-7 w-7 text-secondary transition-colors duration-300 group-hover:text-accent"
                aria-hidden="true"
              />
              <span className="text-xs text-secondary transition-colors duration-300 group-hover:text-foreground">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
