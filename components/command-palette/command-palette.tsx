// components/command-palette/command-palette.tsx

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Layers,
  Briefcase,
  Users,
  Newspaper,
  Mail,
  ArrowUpRight,
  Search,
  CornerDownLeft,
} from "lucide-react";

type CommandItem = {
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  action: () => void;
  keywords?: string[];
};

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isModK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isModK) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock background scroll while open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function go(path: string) {
    router.push(path);
    setOpen(false);
  }

  const pages: CommandItem[] = [
    { label: "Home", icon: Home, action: () => go("/") },
    { label: "Services", icon: Layers, action: () => go("/services") },
    { label: "Work", icon: Briefcase, action: () => go("/work") },
    { label: "About", icon: Users, action: () => go("/about") },
    { label: "Careers", icon: Users, action: () => go("/careers") },
    { label: "Blog", icon: Newspaper, action: () => go("/blog") },
    { label: "Contact", icon: Mail, action: () => go("/contact") },
  ];

  const actions: CommandItem[] = [
    {
      label: "Start a project",
      hint: "Go to contact",
      icon: ArrowUpRight,
      action: () => go("/contact"),
      keywords: ["hire", "quote", "email", "start"],
    },
    {
      label: "View selected work",
      hint: "Go to work",
      icon: ArrowUpRight,
      action: () => go("/work"),
      keywords: ["projects", "portfolio", "case studies"],
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-[18%] z-[100] w-[92vw] max-w-xl -translate-x-1/2"
          >
            <Command
              label="Command palette"
              className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
              loop
            >
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search
                  className="h-4 w-4 shrink-0 text-secondary"
                  strokeWidth={1.5}
                />
                <Command.Input
                  autoFocus
                  placeholder="Search pages or jump to an action..."
                  className="w-full bg-transparent py-4 text-sm text-foreground placeholder:text-secondary focus:outline-none"
                />
                <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-secondary sm:inline-block">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[360px] overflow-y-auto p-2">
                <Command.Empty className="px-3 py-8 text-center text-sm text-secondary">
                  No results found.
                </Command.Empty>

                <Command.Group
                  heading="Pages"
                  className="px-1 pb-1 pt-3 text-xs uppercase tracking-[0.1em] text-secondary [&_[cmdk-group-heading]]:mb-2 [&_[cmdk-group-heading]]:px-2"
                >
                  {pages.map((item) => (
                    <Command.Item
                      key={item.label}
                      value={item.label}
                      onSelect={item.action}
                      className="group flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-sm text-foreground data-[selected=true]:bg-background-secondary"
                    >
                      <span className="flex items-center gap-3">
                        <item.icon
                          className="h-4 w-4 text-secondary group-data-[selected=true]:text-accent"
                          strokeWidth={1.5}
                        />
                        {item.label}
                      </span>
                      <CornerDownLeft
                        className="h-3.5 w-3.5 text-secondary opacity-0 group-data-[selected=true]:opacity-100"
                        strokeWidth={1.5}
                      />
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Actions"
                  className="px-1 pb-1 pt-3 text-xs uppercase tracking-[0.1em] text-secondary [&_[cmdk-group-heading]]:mb-2 [&_[cmdk-group-heading]]:px-2"
                >
                  {actions.map((item) => (
                    <Command.Item
                      key={item.label}
                      value={`${item.label} ${item.keywords?.join(" ") ?? ""}`}
                      onSelect={item.action}
                      className="group flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-sm text-foreground data-[selected=true]:bg-background-secondary"
                    >
                      <span className="flex items-center gap-3">
                        <item.icon
                          className="h-4 w-4 text-secondary group-data-[selected=true]:text-accent"
                          strokeWidth={1.5}
                        />
                        <span>
                          {item.label}
                          {item.hint && (
                            <span className="ml-2 text-xs text-secondary">
                              {item.hint}
                            </span>
                          )}
                        </span>
                      </span>
                      <CornerDownLeft
                        className="h-3.5 w-3.5 text-secondary opacity-0 group-data-[selected=true]:opacity-100"
                        strokeWidth={1.5}
                      />
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>

              <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-[11px] text-secondary">
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded border border-border px-1.5 py-0.5 font-mono">
                    ↑↓
                  </kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded border border-border px-1.5 py-0.5 font-mono">
                    ↵
                  </kbd>
                  Select
                </span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
