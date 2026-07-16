// components/hero/glitch-heading.tsx

"use client";

import * as React from "react";

interface GlitchHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function GlitchHeading({ children, className }: GlitchHeadingProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 50, y: 50 });
  const [active, setActive] = React.useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  const maskImage = `radial-gradient(circle 160px at ${pos.x}% ${pos.y}%, black 0%, black 35%, transparent 72%)`;

  const overlayBaseStyle: React.CSSProperties = {
    WebkitMaskImage: maskImage,
    maskImage,
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`relative inline-block cursor-default select-none ${
        className ?? ""
      }`}
    >
      {/* Base text — always visible, normal color */}
      <span className="relative z-10">{children}</span>

      {active && (
        <>
          {/* Colorful "other dimension" layer, revealed only near the cursor */}
          <span
            aria-hidden="true"
            style={overlayBaseStyle}
            className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(90deg,#ff2fd6,#7c3aed,#22d3ee,#ff2fd6)] bg-[length:300%_100%] bg-clip-text text-transparent animate-glitch-hue"
          >
            {children}
          </span>

          {/* Chromatic aberration — red channel, offset left */}
          <span
            aria-hidden="true"
            style={{
              ...overlayBaseStyle,
              transform: "translate(-3px, 1px)",
            }}
            className="pointer-events-none absolute inset-0 z-20 text-red-500 mix-blend-screen opacity-70 animate-glitch-jitter-a"
          >
            {children}
          </span>

          {/* Chromatic aberration — cyan channel, offset right */}
          <span
            aria-hidden="true"
            style={{
              ...overlayBaseStyle,
              transform: "translate(3px, -1px)",
            }}
            className="pointer-events-none absolute inset-0 z-20 text-cyan-400 mix-blend-screen opacity-70 animate-glitch-jitter-b"
          >
            {children}
          </span>
        </>
      )}
    </div>
  );
}
