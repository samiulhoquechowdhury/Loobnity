// constants/posts.ts

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO format
  readTime: string;
  image: string;
  content: string[]; // paragraphs
};

export const POSTS: Post[] = [
  {
    slug: "why-we-build-in-small-teams",
    title: "Why we build in small teams",
    excerpt:
      "Most software problems aren't solved by adding more people. Here's how we scope engagements to stay small and move fast.",
    category: "Engineering",
    date: "2026-05-12",
    readTime: "4 min read",
    image: "/images/blog/small-teams.png",
    content: [
      "Every additional person on a project adds communication overhead before they add output. We've found that a two-to-three person senior team consistently outpaces a larger group on the same problem, because decisions get made in the room instead of in a queue.",
      "This shapes how we scope work. Rather than proposing a large team to look impressive, we propose the smallest team that can genuinely own the problem end to end — design, backend, infrastructure, all in one conversation.",
      "The tradeoff is throughput on very large, parallelizable projects. For those, we scale by running multiple small teams in parallel rather than one large team, keeping the communication graph inside each team small.",
    ],
  },
  {
    slug: "evaluating-llm-features-before-launch",
    title: "Evaluating LLM features before launch",
    excerpt:
      "AI features fail quietly. Here's the evaluation process we run before anything backed by a model reaches production.",
    category: "AI",
    date: "2026-04-03",
    readTime: "6 min read",
    image: "/images/blog/llm-evaluation.png",
    content: [
      "Traditional software fails loudly — a broken endpoint returns an error. AI features fail quietly, producing a plausible-looking wrong answer that a user might not catch. That difference changes how you have to test before launch.",
      "We build a labeled evaluation set from real (or realistic) inputs before writing a single line of production code, and we re-run it against every prompt or model change. Without it, you're optimizing on vibes.",
      "The evaluation set also becomes the regression suite. When a model provider ships a new version, we know within minutes whether it's actually an upgrade for our specific use case, rather than trusting a general benchmark.",
    ],
  },
  {
    slug: "the-cost-of-a-slow-first-release",
    title: "The cost of a slow first release",
    excerpt:
      "A six-month build before the first real user touches the product is a six-month bet made with no data.",
    category: "Product",
    date: "2026-02-18",
    readTime: "3 min read",
    image: "/images/blog/slow-release.png",
    content: [
      "The riskiest part of any new product isn't the code — it's the assumptions underneath it. Every month spent building before a real user sees the product is a month of compounding, untested assumptions.",
      "We push for a real (even narrow) release as early as the third or fourth week of an engagement wherever possible, even if it covers one workflow instead of ten. What comes back from that first release usually reshapes the roadmap more than the original brief did.",
      "This isn't about cutting corners on quality — it's about cutting the distance between a decision and the feedback that tells you if it was right.",
    ],
  },
];
