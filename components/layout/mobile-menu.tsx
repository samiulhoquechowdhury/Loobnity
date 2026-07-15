// components/layout/mobile-menu.tsx

"use client";
import Image from "next/image";
import loobnityLogo from "@/app/loobnity-logo.png";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { NAV_LINKS, CTA_LINK } from "@/constants/nav-links";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[60] bg-background md:hidden"
        >
          <div className="flex items-center justify-between px-6 pt-6">
            <Image src={loobnityLogo} alt="Loobnity" className="h-6 w-auto" />

            <button
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-secondary transition-colors hover:text-foreground"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-1 px-6">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.08 + i * 0.05,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block border-b border-border py-5 text-3xl font-medium tracking-tight text-foreground"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="absolute bottom-8 left-6 right-6">
            <Link
              href={CTA_LINK.href}
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-md bg-accent px-6 py-4 text-base font-medium text-white transition-colors hover:bg-accent-hover"
            >
              {CTA_LINK.label}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
