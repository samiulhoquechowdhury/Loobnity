// components/sections/work-grid.tsx

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/constants/projects";
import { cn } from "@/lib/utils";

const FILTERS: Array<Project["tag"] | "All"> = [
  "All",
  "AI",
  "Web",
  "Mobile",
  "Enterprise",
];

export function WorkGrid() {
  const [active, setActive] = React.useState<(typeof FILTERS)[number]>("All");

  const filtered =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === active);

  return (
    <section className="bg-background pb-28 md:pb-36">
      <div className="container-premium">
        <div className="mb-12 flex flex-wrap items-center gap-2 border-b border-border pb-8">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                active === filter
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-secondary hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group overflow-hidden rounded-lg border border-border bg-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-background-secondary">
                  <Image
                    src={project.image}
                    alt={`${project.name} preview`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex items-center justify-between p-6">
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-[0.15em] text-secondary">
                      {project.category}
                    </p>
                    <h3 className="text-lg font-medium tracking-tight text-foreground">
                      {project.name}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-secondary">
                      {project.description}
                    </p>
                  </div>

                  <Link
                    href={`/work/${project.slug}`}
                    aria-label={`View ${project.name} case study`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-secondary transition-colors duration-300 group-hover:border-accent group-hover:text-accent"
                  >
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
