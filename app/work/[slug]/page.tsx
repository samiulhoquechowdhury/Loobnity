// app/work/[slug]/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Cta } from "@/components/sections/cta";
import { PROJECTS } from "@/constants/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Case Study" };
  }

  return {
    title: project.name,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <>
      <Navbar />

      <main className="bg-background pt-32 pb-28 md:pt-40 md:pb-36">
        <div className="container-premium max-w-4xl">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-foreground"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
              strokeWidth={1.5}
            />
            All work
          </Link>

          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-secondary">
            {project.category}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary">
            {project.description}
          </p>
        </div>

        <div className="container-premium mt-16">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border bg-card">
            <Image
              src={project.image}
              alt={`${project.name} preview`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="container-premium mt-16 grid grid-cols-1 gap-10 border-t border-border pt-16 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-xs uppercase tracking-[0.15em] text-secondary">
              Category
            </h3>
            <p className="text-base text-foreground">{project.category}</p>
          </div>
          <div>
            <h3 className="mb-2 text-xs uppercase tracking-[0.15em] text-secondary">
              Focus
            </h3>
            <p className="text-base text-foreground">{project.tag}</p>
          </div>
          <div>
            <h3 className="mb-2 text-xs uppercase tracking-[0.15em] text-secondary">
              Next case study
            </h3>
            <Link
              href={`/work/${nextProject.slug}`}
              className="text-base text-accent transition-colors hover:text-accent-hover"
            >
              {nextProject.name} →
            </Link>
          </div>
        </div>
      </main>

      <Cta />
      <Footer />
    </>
  );
}
