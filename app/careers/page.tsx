// app/careers/page.tsx

import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CareersHero } from "@/components/sections/careers-hero";
import { Benefits } from "@/components/sections/benefits";
import { OpenRoles } from "@/components/sections/open-roles";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Loobnity — a small, senior team building software and AI products for ambitious companies.",
};

export default function CareersPage() {
  return (
    <>
      <Navbar />

      <main>
        <CareersHero />
        <Benefits />
        <OpenRoles />
      </main>

      <Footer />
    </>
  );
}
