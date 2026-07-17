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
import { ArrowUpRight, MousePointer2 } from "lucide-react";
import { PROJECTS } from "@/constants/projects";
import { cn } from "@/lib/utils";

const CARD_WIDTH = 420;
const CARD_GAP = 32;
const STEP = CARD_WIDTH + CARD_GAP;
const FOCUS_RANGE = CARD_WIDTH * 0.85; // px of travel over which a card fades out of focus

// ---------- Desktop: pinned, scroll-driven track ----------

function HorizontalCard({
  project,
  index,
  x,
  onFocus,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  x: ReturnType<typeof useSpring>;
  onFocus: (index: number) => void;
}) {
  const targetX = -index * STEP; // this card's exact centered position — a constant, no measurement needed

  const distance = useTransform(x, (latestX) => Math.abs(latestX - targetX));
  const focus = useTransform(distance, [0, FOCUS_RANGE], [1, 0]); // 1 = centered, 0 = fully out of focus

  const scale = useTransform(focus, [0, 1], [0.87, 1]);
  const opacity = useTransform(focus, [0, 1], [0.45, 1]);
  const brightness = useTransform(focus, [0, 1], [0.6, 1]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  return (
    <motion.div
      style={{ scale, opacity, filter, willChange: "transform" }}
      className="w-[420px] shrink-0"
    >
      <Link
        href={`/work/${project.slug}`}
        onFocus={() => onFocus(index)}
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
            priority={index === 0}
            loading={index === 0 ? undefined : "lazy"}
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

function ProgressDots({
  total,
  scrollYProgress,
  onJump,
}: {
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  onJump: (index: number) => void;
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const segment = 1 / total;
      setActiveIndex(Math.min(Math.floor(v / segment), total - 1));
    });
  }, [scrollYProgress, total]);

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-2.5",
        "bg-white/[0.04] backdrop-blur-md",
        "shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)]"
      )}
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onJump(i)}
          aria-label={`Go to project ${i + 1}`}
          className={cn(
            "h-[7px] w-[7px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            i <= activeIndex
              ? "bg-accent shadow-[0_0_10px_1px_rgba(37,99,235,0.55)]"
              : "bg-white/15 hover:bg-white/30"
          )}
        />
      ))}
    </div>
  );
}

function DesktopShowcase() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = React.useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });

  const maxTravel = (PROJECTS.length - 1) * STEP;
  const x = useTransform(smoothProgress, [0, 1], [0, -maxTravel]);

  useMotionValueEvent(smoothProgress, "change", (v) => {
    if (v > 0.03 && showHint) setShowHint(false);
  });

  function scrollToIndex(index: number) {
    if (!containerRef.current) return;
    const total = PROJECTS.length;
    const targetProgress = total <= 1 ? 0 : index / (total - 1);
    const sectionHeight = containerRef.current.offsetHeight;
    const sectionTop = containerRef.current.offsetTop;
    const targetScroll =
      sectionTop + targetProgress * (sectionHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }

  return (
    <section
      ref={containerRef}
      className="relative hidden bg-background md:block"
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

          <motion.div
            animate={{ opacity: showHint ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs text-secondary"
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

        <motion.div
          style={{ x, willChange: "transform" }}
          className="flex items-center gap-8"
        >
          <div className="w-[calc(50vw-210px)] shrink-0" />
          {PROJECTS.map((project, i) => (
            <HorizontalCard
              key={project.slug}
              project={project}
              index={i}
              x={x}
              onFocus={scrollToIndex}
            />
          ))}
          <div className="w-[calc(50vw-210px)] shrink-0" />
        </motion.div>

        <div className="relative z-20 mt-10 flex justify-center">
          <ProgressDots
            total={PROJECTS.length}
            scrollYProgress={smoothProgress}
            onJump={scrollToIndex}
          />
        </div>
      </div>
    </section>
  );
}

// ---------- Mobile: lightweight native snap-scroll, no pinning ----------

function MobileShowcase() {
  return (
    <section className="block bg-background py-20 md:hidden">
      <div className="container-premium mb-8">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-secondary">
          Browse the work
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Selected work
        </h2>
      </div>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PROJECTS.map((project, i) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group w-[80vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-lg border border-border bg-card"
          >
            <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-background-secondary">
              <Image
                src={project.image}
                alt=""
                fill
                className="object-cover"
                sizes="340px"
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
              />
            </div>
            <div className="flex items-center justify-between p-5">
              <div className="min-w-0">
                <p className="mb-1 text-xs uppercase tracking-[0.15em] text-secondary">
                  {project.category}
                </p>
                <h3 className="truncate text-base font-medium tracking-tight text-foreground">
                  {project.name}
                </h3>
              </div>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-secondary"
                strokeWidth={1.5}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ---------- Section ----------

export function HorizontalShowcase() {
  return (
    <>
      <DesktopShowcase />
      <MobileShowcase />
    </>
  );
}
