// components/providers/smooth-scroll-provider.tsx

"use client";

import * as React from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
