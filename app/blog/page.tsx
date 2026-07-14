// app/blog/page.tsx

import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BlogGrid } from "@/components/sections/blog-grid";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on engineering, AI, and product from the Loobnity team.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="bg-background pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container-premium max-w-2xl">
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-secondary">
              Blog
            </p>
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Notes on building.
            </h1>
          </div>
        </section>

        <BlogGrid />
      </main>

      <Footer />
    </>
  );
}
