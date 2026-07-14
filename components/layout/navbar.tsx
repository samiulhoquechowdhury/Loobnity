// components/layout/navbar.tsx

"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { NAV_LINKS, CTA_LINK } from "@/constants/nav-links";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled
            ? "border-b border-border bg-background/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="container-premium flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Loobnity
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-secondary transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              href={CTA_LINK.href}
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              {CTA_LINK.label}
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="h-px origin-left bg-accent/40"
        />
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
