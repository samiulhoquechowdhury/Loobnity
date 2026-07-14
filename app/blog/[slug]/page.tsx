// app/blog/[slug]/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { POSTS } from "@/constants/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Blog Post" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="bg-background pt-32 pb-28 md:pt-40 md:pb-36">
        <article className="container-premium max-w-2xl">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-foreground"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
              strokeWidth={1.5}
            />
            All posts
          </Link>

          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-secondary">
            {post.category} · {formatDate(post.date)} · {post.readTime}
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg border border-border bg-card">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-10 flex flex-col gap-6">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
