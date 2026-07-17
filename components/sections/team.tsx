// components/sections/team.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
type Member = {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
};

const TEAM: Member[] = [
  {
    name: "Sam",
    role: "Founder & Engineering Lead",
    image: "/images/team/sam.jpg",
    linkedin: "https://linkedin.com",
  },
];

function TeamCard({ member, i }: { member: Member; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10"
    >
      <Image
        src={member.image}
        alt={member.name}
        fill
        sizes="(min-width: 768px) 240px, 45vw"
        className="object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
        <div>
          <h3 className="text-sm font-medium text-white">{member.name}</h3>
          <p className="text-xs text-white/70">{member.role}</p>
        </div>

        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 opacity-0 transition-all duration-300 hover:border-accent hover:text-accent group-hover:opacity-100"
          >
            <FaLinkedin className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

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

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
