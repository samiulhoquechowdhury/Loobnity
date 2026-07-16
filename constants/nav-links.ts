// constants/nav-links.ts

import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Code2,
  Globe,
  Smartphone,
  Cloud,
  Workflow,
  PenTool,
  Building2,
  Briefcase,
  Newspaper,
} from "lucide-react";

export type DropdownItem = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

export type DropdownGroup = {
  heading?: string;
  items: DropdownItem[];
};

export type NavLink = {
  label: string;
  href: string;
  dropdown?: DropdownGroup[];
};

export const NAV_LINKS: NavLink[] = [
  {
    label: "Services",
    href: "/services",
    dropdown: [
      {
        heading: "Build",
        items: [
          {
            label: "AI Development",
            href: "/services#ai-development",
            description: "Models, agents, and AI-native features.",
            icon: Sparkles,
          },
          {
            label: "Custom Software",
            href: "/services#custom-software",
            description: "Systems built around how you work.",
            icon: Code2,
          },
          {
            label: "Web Applications",
            href: "/services#web-applications",
            description: "Fast, resilient modern web platforms.",
            icon: Globe,
          },
          {
            label: "Mobile Apps",
            href: "/services#mobile-apps",
            description: "Native-feeling iOS and Android apps.",
            icon: Smartphone,
          },
        ],
      },
      {
        heading: "Scale",
        items: [
          {
            label: "Cloud Solutions",
            href: "/services#cloud-solutions",
            description: "Infrastructure that scales quietly.",
            icon: Cloud,
          },
          {
            label: "Automation",
            href: "/services#automation",
            description: "Remove hours of manual work weekly.",
            icon: Workflow,
          },
          {
            label: "UI/UX Design",
            href: "/services#ui-ux-design",
            description: "Interfaces designed with real rigor.",
            icon: PenTool,
          },
          {
            label: "Enterprise Solutions",
            href: "/services#enterprise-solutions",
            description: "Secure, compliant, built to scale.",
            icon: Building2,
          },
        ],
      },
    ],
  },
  {
    label: "Work",
    href: "/work",
    dropdown: [
      {
        items: [
          {
            label: "All work",
            href: "/work",
            description: "Every case study, filterable by focus.",
            icon: Briefcase,
          },
          {
            label: "Blog",
            href: "/blog",
            description: "Notes on engineering, AI, and product.",
            icon: Newspaper,
          },
        ],
      },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
];

export const CTA_LINK: NavLink = {
  label: "Start a project",
  href: "/contact",
};
