// components/layout/nav-dropdown.tsx

"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { DropdownGroup } from "@/constants/nav-links";
import { cn } from "@/lib/utils";

interface NavDropdownProps {
  groups: DropdownGroup[];
  open: boolean;
  onItemClick?: () => void;
}

export function NavDropdown({ groups, open, onItemClick }: NavDropdownProps) {
  const columnCount = groups.length;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "absolute left-1/2 top-full z-40 mt-3 -translate-x-1/2 rounded-2xl border border-white/10 p-2",
            "bg-card/95 backdrop-blur-xl",
            "shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
          )}
          style={{
            width: columnCount > 1 ? columnCount * 260 : 300,
          }}
        >
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
            }}
          >
            {groups.map((group, gi) => (
              <div key={group.heading ?? gi} className="p-2">
                {group.heading && (
                  <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-[0.12em] text-secondary">
                    {group.heading}
                  </p>
                )}
                <div className="flex flex-col gap-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={onItemClick}
                        className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors duration-150 hover:bg-white/[0.06]"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background-secondary text-secondary transition-colors duration-150 group-hover:border-accent/40 group-hover:text-accent">
                          <Icon className="h-4 w-4" strokeWidth={1.5} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-foreground">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block truncate text-xs leading-relaxed text-secondary">
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
