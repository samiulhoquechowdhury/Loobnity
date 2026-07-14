// app/services/page.tsx

import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicesHero } from "@/components/sections/services-hero";
import { ServicesDetail } from "@/components/sections/services-detail";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI development, custom software, web and mobile applications, cloud, automation, design, and enterprise engineering from Loobnity.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main>
        <ServicesHero />
        <ServicesDetail />
        <Cta />
      </main>

      <Footer />
    </>
  );
}
