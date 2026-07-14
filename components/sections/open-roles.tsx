// components/sections/open-roles.tsx

"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { OPEN_ROLES } from "@/constants/roles";

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

export function OpenRoles() {
  return (
    <section className="bg-background py-28 md:py-36">
      <div className="container-premium max-w-3xl">
        <div className="mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-secondary">
            Open roles
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {OPEN_ROLES.length} positions open.
          </h2>
        </div>

        <div className="flex flex-col">
          {OPEN_ROLES.map((role, i) => (
            <motion.a
              key={role.title}
              href={`mailto:careers@loobnity.com?subject=${encodeURIComponent(
                role.title
              )}`}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="group flex items-center justify-between border-b border-border py-6 transition-colors last:border-b-0 hover:bg-card"
            >
              <div>
                <h3 className="text-lg font-medium tracking-tight text-foreground">
                  {role.title}
                </h3>
                <p className="mt-1 text-sm text-secondary">
                  {role.team} · {role.location} · {role.type}
                </p>
              </div>
              <ArrowUpRight
                className="h-5 w-5 text-secondary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                strokeWidth={1.5}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
