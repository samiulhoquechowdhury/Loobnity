// app/work/page.tsx

import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WorkGrid } from "@/components/sections/work-grid";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Loobnity's work across AI, web, mobile, and enterprise engineering.",
};

export default function WorkPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="bg-background pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container-premium max-w-2xl">
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-secondary">
              Work
            </p>
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Products we've shipped.
            </h1>
          </div>
        </section>

        <WorkGrid />
        <Cta />
      </main>

      <Footer />
    </>
  );
}
