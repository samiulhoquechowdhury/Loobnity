// components/sections/horizontal-showcase.tsx

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/constants/projects";

const CARD_WIDTH = 420; // px, keep in sync with the w-[420px] class below
const CARD_GAP = 32; // px, keep in sync with gap-8 (32px) below

function HorizontalCard({
  project,
  progress,
  index,
}: {
  project: (typeof PROJECTS)[number];
  progress: number; // 0 = card centered, 1 = fully off to either side
  index: number;
}) {
  // Distance-from-center drives scale + opacity — the card nearest
  // viewport center reads as "focused," others recede.
  const scale = 1 - Math.min(progress, 1) * 0.14;
  const opacity = 1 - Math.min(progress, 1) * 0.55;

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
      }}
      className="group relative w-[420px] shrink-0 overflow-hidden rounded-lg border border-border bg-card transition-[transform,opacity] duration-100 ease-out"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-background-secondary">
        <Image
          src={project.image}
          alt={`${project.name} preview`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="420px"
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
        </div>
        <Link
          href={`/work/${project.slug}`}
          aria-label={`View ${project.name} case study`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-secondary transition-colors duration-300 group-hover:border-accent group-hover:text-accent"
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}

export function HorizontalShowcase() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [cardProgress, setCardProgress] = React.useState<number[]>(() =>
    PROJECTS.map(() => 1)
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });

  const trackWidth =
    PROJECTS.length * CARD_WIDTH + (PROJECTS.length - 1) * CARD_GAP;

  // How far the track needs to travel so the last card reaches center —
  // clamped to 0 so it never goes negative on small viewports.
  const maxTravel = Math.max(trackWidth - CARD_WIDTH, 0);

  const x = useTransform(smoothProgress, [0, 1], [0, -maxTravel]);

  useMotionValueEvent(x, "change", (latestX) => {
    // Recompute each card's distance from viewport center as the
    // track translates, so the "focused" card is always whichever
    // one currently sits nearest center — not a fixed index.
    if (typeof window === "undefined") return;
    const viewportCenter = window.innerWidth / 2;

    const next = PROJECTS.map((_, i) => {
      const cardCenter =
        latestX + i * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2 + 48; // +48 accounts for track's left padding
      const distance = Math.abs(cardCenter - viewportCenter);
      return Math.min(distance / (CARD_WIDTH * 0.9), 1);
    });

    setCardProgress(next);
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-background"
      style={{ height: `${PROJECTS.length * 60}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-premium mb-10">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-secondary">
            Browse the work
          </p>
          <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Keep scrolling.
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 pl-12">
          {PROJECTS.map((project, i) => (
            <HorizontalCard
              key={project.slug}
              project={project}
              progress={cardProgress[i] ?? 1}
              index={i}
            />
          ))}
          {/* trailing spacer so the last card can reach center, not just the track edge */}
          <div className="w-[40vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
