// components/sections/trusted.tsx

import { cn } from "@/lib/utils";

const PARTNER_LOGOS = [
  "Nimbus Health",
  "Fintra",
  "Corvus Logistics",
  "Arclight Media",
  "Bramble Retail",
  "Verdant Energy",
  "Kestrel Robotics",
  "Halyard Capital",
];

export function Trusted() {
  const marqueeItems = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <section className="border-y border-border bg-background-secondary py-14">
      <div className="container-premium mb-8">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-secondary">
          Trusted by product and engineering teams
        </p>
      </div>

      <div
        className={cn(
          "relative overflow-hidden",
          "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        )}
      >
        <div className="flex w-max animate-marquee gap-16">
          {marqueeItems.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex shrink-0 items-center text-lg font-medium tracking-tight text-secondary/70 grayscale transition-colors hover:text-foreground"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
