// components/sections/services-detail.tsx

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Code2,
  Globe,
  Smartphone,
  Cloud,
  Workflow,
  PenTool,
  Building2,
  Check,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceDetail = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  includes: string[];
};

const SERVICES: ServiceDetail[] = [
  {
    id: "ai-development",
    icon: Sparkles,
    title: "AI Development",
    description:
      "Custom models, retrieval systems, and AI-native product features built on infrastructure you actually own.",
    includes: [
      "LLM integration & agent workflows",
      "Retrieval-augmented generation (RAG)",
      "Fine-tuning & evaluation pipelines",
      "Model hosting & inference optimization",
    ],
  },
  {
    id: "custom-software",
    icon: Code2,
    title: "Custom Software",
    description:
      "Systems engineered around how your team actually operates, not retrofitted from an off-the-shelf template.",
    includes: [
      "Internal tools & operational platforms",
      "API design & system architecture",
      "Legacy system modernization",
      "Third-party integrations",
    ],
  },
  {
    id: "web-applications",
    icon: Globe,
    title: "Web Applications",
    description:
      "Fast, resilient platforms built with modern frameworks and a relentless eye for detail.",
    includes: [
      "Marketing sites & web apps",
      "Performance & Core Web Vitals tuning",
      "Design systems & component libraries",
      "SEO & analytics foundations",
    ],
  },
  {
    id: "mobile-apps",
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native-feeling iOS and Android experiences designed for retention, not just release day.",
    includes: [
      "React Native & native development",
      "Offline-first architecture",
      "App Store & Play Store launch support",
      "Push notifications & analytics",
    ],
  },
  {
    id: "cloud-solutions",
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Infrastructure that scales quietly in the background so your product never has to slow down.",
    includes: [
      "AWS / GCP / Azure architecture",
      "CI/CD pipelines",
      "Observability & monitoring",
      "Cost optimization",
    ],
  },
  {
    id: "automation",
    icon: Workflow,
    title: "Automation",
    description:
      "Workflow and process automation that removes hours of manual work from your team's week.",
    includes: [
      "Internal workflow automation",
      "Data pipeline construction",
      "Third-party API orchestration",
      "Reporting & alerting systems",
    ],
  },
  {
    id: "ui-ux-design",
    icon: PenTool,
    title: "UI/UX Design",
    description:
      "Interfaces designed with the same rigor as the systems that power them.",
    includes: [
      "Product design & prototyping",
      "Design systems",
      "User research & usability testing",
      "Motion & interaction design",
    ],
  },
  {
    id: "enterprise-solutions",
    icon: Building2,
    title: "Enterprise Solutions",
    description:
      "Secure, compliant, and built to operate reliably at organizational scale.",
    includes: [
      "Security & compliance review",
      "SSO & role-based access control",
      "Audit logging & data governance",
      "SLA-backed delivery",
    ],
  },
];

// ---------- Sticky sidebar with scroll-tracked active state ----------

function useActiveSection(ids: string[]) {
  const [active, setActive] = React.useState(ids[0]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function ServiceSidebar({ activeId }: { activeId: string }) {
  return (
    <nav className="sticky top-28 hidden max-h-[calc(100vh-8rem)] w-56 shrink-0 flex-col gap-0.5 self-start overflow-y-auto lg:flex">
      {SERVICES.map((service) => {
        const isActive = service.id === activeId;
        return (
          <button
            key={service.id}
            onClick={() => jumpTo(service.id)}
            className="group relative flex items-center gap-2.5 rounded-md py-2.5 pl-4 pr-3 text-left text-sm transition-colors duration-200"
          >
            <span
              className={cn(
                "absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full transition-colors duration-300",
                isActive ? "bg-accent" : "bg-transparent"
              )}
            />
            <span
              className={cn(
                "transition-colors duration-200",
                isActive
                  ? "font-medium text-foreground"
                  : "text-secondary group-hover:text-foreground"
              )}
            >
              {service.title}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

// ---------- Individual service card ----------
// Cursor-glow position is tracked via a CSS custom property set directly
// on the DOM node in the mousemove handler — NOT React state — so hovering
// a card never triggers a re-render. The glow itself is a single
// radial-gradient background (cheap), not a blur() filter (expensive).

function ServiceCard({ service }: { service: ServiceDetail }) {
  const Icon = service.icon;
  const cardRef = React.useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect || !cardRef.current) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--glow-x", `${x}%`);
    cardRef.current.style.setProperty("--glow-y", `${y}%`);
  }

  return (
    <motion.div
      id={service.id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "service-card group relative scroll-mt-24 overflow-hidden rounded-2xl border border-white/10 p-8 sm:p-10",
        "bg-[#121212]",
        "shadow-[0_16px_40px_-20px_rgba(0,0,0,0.55)]",
        "transition-colors duration-300 hover:border-accent/25"
      )}
      style={
        {
          contentVisibility: "auto",
          containIntrinsicSize: "0 320px",
        } as React.CSSProperties
      }
    >
      {/* Cursor glow — a plain radial-gradient (cheap), positioned via CSS
          vars set outside React state, opacity-toggled by CSS :hover only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(37,99,235,0.10), transparent 70%)",
        }}
      />

      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr]">
        <div
          className="relative h-16 w-16 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
          style={{ perspective: "600px" }}
        >
          <div className="h-full w-full rotate-[6deg] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0">
            <div className="flex h-full w-full items-center justify-center rounded-2xl border border-accent/20 bg-gradient-to-b from-accent/15 to-transparent">
              <Icon className="h-7 w-7 text-accent" strokeWidth={1.25} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]">
            {service.title}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-secondary sm:text-base">
            {service.description}
          </p>

          <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {service.includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-secondary"
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                  <Check
                    className="h-2.5 w-2.5 text-accent"
                    strokeWidth={2.5}
                  />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesDetail() {
  const ids = React.useMemo(() => SERVICES.map((s) => s.id), []);
  const activeId = useActiveSection(ids);

  return (
    <section className="bg-background pb-28 md:pb-36">
      <div className="container-premium flex gap-12">
        <ServiceSidebar activeId={activeId} />

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
