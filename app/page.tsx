// app/page.tsx

import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/hero/hero";
import { Trusted } from "@/components/sections/trusted";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Showcase } from "@/components/sections/showcase";
import { Technologies } from "@/components/sections/technologies";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
// app/page.tsx — add the import:
import { ScrollStory } from "@/components/sections/scroll-story";

export const metadata: Metadata = {
  title: "Loobnity — Building Software That Matters",
  description:
    "Loobnity designs and builds software, AI systems, and digital products for teams that refuse to ship anything ordinary.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Trusted />
        <Services />
        <ScrollStory />
        <Process />
        <Showcase />
        <Technologies />
        <Testimonials />
        <Pricing />
        <Faq />
        <Cta />
      </main>

      <Footer />
    </>
  );
}
