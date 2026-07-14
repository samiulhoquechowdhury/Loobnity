// constants/projects.ts

export type Project = {
  slug: string;
  name: string;
  category: string;
  tag: "AI" | "Web" | "Mobile" | "Enterprise";
  description: string;
  image: string;
  video?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "nimbus-health",
    name: "Nimbus Health",
    category: "Healthcare · Web Platform",
    tag: "Web",
    description:
      "A patient-scheduling platform rebuilt for speed, serving 40,000+ appointments a month.",
    image: "/images/work/nimbus-health.png",
    video: "/videos/work/nimbus-health.mp4",
  },
  {
    slug: "corvus-logistics",
    name: "Corvus Logistics",
    category: "Logistics · AI + Automation",
    tag: "AI",
    description:
      "Route optimization powered by a custom model, cutting delivery time by 18%.",
    image: "/images/work/corvus-logistics.png",
    video: "/videos/work/corvus-logistics.mp4",
  },
  {
    slug: "kestrel-robotics",
    name: "Kestrel Robotics",
    category: "Robotics · Enterprise Dashboard",
    tag: "Enterprise",
    description:
      "A real-time fleet monitoring console built for operators managing hundreds of units.",
    image: "/images/work/kestrel-robotics.png",
    video: "/videos/work/kestrel-robotics.mp4",
  },
  {
    slug: "bramble-retail",
    name: "Bramble Retail",
    category: "Retail · Mobile App",
    tag: "Mobile",
    description:
      "A loyalty and checkout app used in-store across 60+ locations.",
    image: "/images/work/bramble-retail.png",
  },
  {
    slug: "verdant-energy",
    name: "Verdant Energy",
    category: "Energy · Web Platform",
    tag: "Web",
    description:
      "A monitoring dashboard for distributed solar assets, built for non-technical field teams.",
    image: "/images/work/verdant-energy.png",
  },
  {
    slug: "halyard-capital",
    name: "Halyard Capital",
    category: "Finance · Enterprise Platform",
    tag: "Enterprise",
    description:
      "A compliance-first reporting platform handling regulated financial data at scale.",
    image: "/images/work/halyard-capital.png",
  },
];
