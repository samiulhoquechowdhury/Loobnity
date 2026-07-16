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
  animate,
} from "framer-motion";
import { ArrowUpRight, MousePointer2 } from "lucide-react";
import { PROJECTS } from "@/constants/projects";

const CARD_WIDTH = 420;
const CARD_GAP = 32;
const TRACK_PADDING_LEFT = 48; // matches `pl-12` (12 * 4px) on the track below

function useViewportWidth() {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    function update() {
      setWidth(window.innerWidth);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}

function HorizontalCard({
  project,
  index,
  x,
  viewportWidth,
  onFocusCard,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  x: ReturnType<typeof useSpring>;
  viewportWidth: number;
  onFocusCard: (index: number) => void;
}) {
  // Card's absolute center position, recomputed live from the track's
  // current x — lives entirely in the motion-value graph, no setState.
  const cardCenter = useTransform(
    x,
    (latestX) =>
      latestX +
      index * (CARD_WIDTH + CARD_GAP) +
      CARD_WIDTH / 2 +
      TRACK_PADDING_LEFT
  );

  const distance = useTransform(cardCenter, (center) =>
    Math.min(Math.abs(center - viewportWidth / 2) / (CARD_WIDTH * 0.9), 1)
  );

  const scale = useTransform(distance, [0, 1], [1, 0.86]);
  const opacity = useTransform(distance, [0, 1], [1, 0.45]);
  const brightness = useTransform(distance, [0, 1], [1, 0.55]);
  const blur = useTransform(distance, [0, 1], [0, 2.5]);

  const filter = useTransform(
    [brightness, blur],
    ([b, bl]) => `brightness(${b}) blur(${bl}px)`
  );

  return (
    <motion.div
      style={{ scale, opacity, filter }}
      className="w-[420px] shrink-0"
    >
      <Link
        href={`/work/${project.slug}`}
        onFocus={() => onFocusCard(index)}
        aria-label={`View ${project.name} case study — ${project.category}`}
        className="group block overflow-hidden rounded-lg border border-border bg-card transition-colors duration-300 hover:border-accent/40 focus-visible:border-accent"
      >
        <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-background-secondary">
          <Image
            src={project.image}
            alt=""
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
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-secondary transition-colors duration-300 group-hover:border-accent group-hover:text-accent"
          >
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function HorizontalShowcase() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const viewportWidth = useViewportWidth();
  const [showHint, setShowHint] = React.useState(true);
  const [focusedIndex, setFocusedIndex] = React.useState(0);

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
  const maxTravel = Math.max(trackWidth - CARD_WIDTH, 0);

  const x = useTransform(smoothProgress, [0, 1], [0, -maxTravel]);

  useMotionValueEvent(smoothProgress, "change", (v) => {
    if (v > 0.03 && showHint) setShowHint(false);
  });

  // Tabbing to a card scrolls the pinned section so that card reaches
  // center — the keyboard-accessible equivalent of scrolling to it.
  function handleFocusCard(index: number) {
    setFocusedIndex(index);
    if (!containerRef.current) return;

    const targetProgress =
      PROJECTS.length <= 1 ? 0 : index / (PROJECTS.length - 1);
    const sectionHeight = containerRef.current.offsetHeight;
    const sectionTop = containerRef.current.offsetTop;
    const targetScroll =
      sectionTop + targetProgress * (sectionHeight - window.innerHeight);

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }

  return (
    <section
      ref={containerRef}
      className="relative bg-background"
      style={{ height: `${PROJECTS.length * 60}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-premium mb-10 flex items-end justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-secondary">
              Browse the work
            </p>
            <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Keep scrolling.
            </h2>
          </div>

          {/* Scroll hint — fades out once the user starts scrolling in */}
          <motion.div
            animate={{ opacity: showHint ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="hidden items-center gap-2 text-xs text-secondary md:flex"
          >
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex items-center gap-2"
            >
              <MousePointer2 className="h-3.5 w-3.5" strokeWidth={1.5} />
              Scroll to explore
            </motion.span>
          </motion.div>
        </div>

        <motion.div style={{ x }} className="flex gap-8 pl-12">
          {PROJECTS.map((project, i) => (
            <HorizontalCard
              key={project.slug}
              project={project}
              index={i}
              x={x}
              viewportWidth={viewportWidth}
              onFocusCard={handleFocusCard}
            />
          ))}
          <div className="w-[40vw] shrink-0" />
        </motion.div>

        {/* Screen-reader announcement of the currently focused project */}
        <p aria-live="polite" className="sr-only">
          Viewing {PROJECTS[focusedIndex]?.name}
        </p>
      </div>
    </section>
  );
}
