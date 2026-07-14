// app/about/page.tsx

import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutHero } from "@/components/sections/about-hero";
import { Values } from "@/components/sections/values";
import { Team } from "@/components/sections/team";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Loobnity is a software and AI engineering studio built around senior craft, direct communication, and outcomes over ceremony.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        <AboutHero />
        <Values />
        <Team />
        <Cta />
      </main>

      <Footer />
    </>
  );
}
