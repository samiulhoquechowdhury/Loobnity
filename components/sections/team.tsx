// components/sections/team.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

type Member = {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
};

const TEAM: Member[] = [
  {
    name: "Sam Baruah",
    role: "Founder & Engineering Lead",
    image: "/images/team/sam.jpg",
    linkedin: "https://linkedin.com",
  },
];

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

export function Team() {
  return (
    <section className="bg-background py-28 md:py-36">
      <div className="container-premium">
        <div className="mb-16 max-w-xl">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-secondary">
            The team
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Small by design.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-card">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
                />
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-xs text-secondary">{member.role}</p>
                </div>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="text-secondary transition-colors hover:text-foreground"
                  >
                    <Linkedin className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
