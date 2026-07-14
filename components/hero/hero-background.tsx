// components/hero/hero-background.tsx

"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { HeroGrid } from "@/components/hero/hero-grid";

export function HeroBackground({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.04);
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.04);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="bg-noise relative flex min-h-screen items-center overflow-hidden bg-background"
    >
      <HeroGrid />

      <motion.div
        style={{ x: springX, y: springY }}
        className="pointer-events-none absolute left-[15%] top-[20%] h-2 w-2 rounded-full bg-accent shadow-[0_0_40px_10px_rgba(37,99,235,0.5)]"
      />
      <motion.div
        style={{ x: springX, y: springY }}
        className="pointer-events-none absolute right-[18%] top-[55%] h-1.5 w-1.5 rounded-full bg-accent-hover shadow-[0_0_30px_8px_rgba(59,130,246,0.4)]"
      />

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
