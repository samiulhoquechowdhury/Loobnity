// components/layout/navbar.tsx

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { NAV_LINKS, CTA_LINK } from "@/constants/nav-links";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { cn } from "@/lib/utils";
import loobnityLogo from "@/app/icon.png";

const CLOSE_DELAY_MS = 150;

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  const closeTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  function openDropdown(label: string) {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenItem(label);
  }

  function scheduleClose() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setOpenItem(null), CLOSE_DELAY_MS);
  }

  function openCommandPalette() {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true })
    );
  }

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
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={loobnityLogo}
              alt="Loobnity"
              className="h-7 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.dropdown && openDropdown(link.label)}
                onMouseLeave={() => link.dropdown && scheduleClose()}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-secondary transition-colors hover:text-foreground"
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        openItem === link.label && "rotate-180"
                      )}
                      strokeWidth={1.5}
                    />
                  )}
                </Link>

                {link.dropdown && (
                  <NavDropdown
                    groups={link.dropdown}
                    open={openItem === link.label}
                    onItemClick={() => setOpenItem(null)}
                  />
                )}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={openCommandPalette}
              className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs text-secondary transition-colors hover:text-foreground"
            >
              <span>Search</span>
              <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
                ⌘K
              </kbd>
            </button>

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
