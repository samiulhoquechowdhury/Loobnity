// components/sections/showcase.tsx

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/constants/projects";

const PROJECTS_PREVIEW = PROJECTS.slice(0, 3);

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const [hovering, setHovering] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  function handleEnter() {
    setHovering(true);
    videoRef.current?.play();
  }

  function handleLeave() {
    setHovering(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group overflow-hidden rounded-lg border border-border bg-card"
    >
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative aspect-[16/10] overflow-hidden border-b border-border bg-background-secondary"
      >
        <Image
          src={project.image}
          alt={`${project.name} preview`}
          fill
          className="object-cover transition-opacity duration-500"
          style={{ opacity: hovering && project.video ? 0 : 1 }}
        />
        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
            style={{ opacity: hovering ? 1 : 0 }}
          />
        )}
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
  );
}

export function Showcase() {
  return (
    <section className="bg-background py-28 md:py-36">
      <div className="container-premium">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-secondary">
              Selected work
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Products We&apos;ve shipped.
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
          >
            View all work
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PROJECTS_PREVIEW.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
