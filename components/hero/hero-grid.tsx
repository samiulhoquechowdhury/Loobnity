// components/hero/hero-grid.tsx

"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function HeroGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <pattern
            id="hero-grid-pattern"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          </pattern>
          <radialGradient id="hero-grid-fade" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="hero-grid-mask">
            <rect width="100%" height="100%" fill="url(#hero-grid-fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#hero-grid-pattern)"
          mask="url(#hero-grid-mask)"
        />
      </svg>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-[30%] h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]"
      />
    </div>
  );
}
