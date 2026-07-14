// components/sections/blog-grid.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { POSTS } from "@/constants/posts";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogGrid() {
  return (
    <section className="bg-background pb-28 md:pb-36">
      <div className="container-premium">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {POSTS.map((post, i) => (
            <motion.div
              key={post.slug}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-card">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.15em] text-secondary">
                  {post.category} · {formatDate(post.date)}
                </p>
                <h2 className="mt-2 text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  {post.excerpt}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
