// components/sections/ai-agents.tsx

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Brain,
  Search,
  Database,
  Code2,
  Cloud,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

// ---------- Left panel: looping simulated agent log ----------

const LOG_LINES = [
  "trigger: new support ticket received",
  "agent: classifying intent...",
  "agent: intent = billing_question",
  "tool: query customer_db(id=48213)",
  "tool: fetch invoice_history()",
  "agent: drafting response...",
  "action: reply sent, ticket resolved",
];

function AgentLog() {
  const [visibleCount, setVisibleCount] = React.useState(0);
  const [cycle, setCycle] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "-100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!isInView) return;

    if (visibleCount < LOG_LINES.length) {
      const t = setTimeout(() => setVisibleCount((c) => c + 1), 450);
      return () => clearTimeout(t);
    }

    const resetTimer = setTimeout(() => {
      setVisibleCount(0);
      setCycle((c) => c + 1);
    }, 2200);
    return () => clearTimeout(resetTimer);
  }, [isInView, visibleCount]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex h-full flex-col rounded-2xl border border-white/10 p-6",
        "bg-white/[0.03] backdrop-blur-md",
        "shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
      )}
    >
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="ml-2 font-mono text-xs text-secondary">agent.log</span>
      </div>

      <div className="flex flex-1 min-h-[220px] flex-col justify-end gap-2 font-mono text-xs sm:text-sm">
        {LOG_LINES.slice(0, visibleCount).map((line, i) => {
          const isLast = i === visibleCount - 1;
          const [prefix, ...rest] = line.split(": ");
          const isAction = prefix === "action";
          const isTool = prefix === "tool";

          return (
            <motion.div
              key={`${cycle}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: isLast ? 1 : 0.45, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-2"
            >
              <span
                className={cn(
                  "shrink-0",
                  isAction
                    ? "text-accent"
                    : isTool
                    ? "text-secondary"
                    : "text-accent/70"
                )}
              >
                {prefix}
              </span>
              <span className="text-secondary">{rest.join(": ")}</span>
              {isLast && isAction && (
                <CheckCircle2
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                  strokeWidth={1.5}
                />
              )}
            </motion.div>
          );
        })}
        {visibleCount < LOG_LINES.length && visibleCount > 0 && (
          <span className="animate-pulse text-accent">▍</span>
        )}
      </div>
    </div>
  );
}

// ---------- Right panel: aligned, efficient reasoning-loop diagram ----------

const DIAGRAM_W = 1000;
const DIAGRAM_H = 480;

type NodeId =
  | "trigger"
  | "agent"
  | "memory"
  | "search"
  | "code"
  | "cloud"
  | "output";

type NodeDef = {
  id: NodeId;
  label: string;
  icon: LucideIcon;
  x: number;
  y: number;
  size: number;
  variant: "default" | "agent" | "output";
  delay: number;
};

const NODES: NodeDef[] = [
  {
    id: "trigger",
    label: "Trigger",
    icon: Zap,
    x: 70,
    y: 240,
    size: 48,
    variant: "default",
    delay: 0.05,
  },
  {
    id: "agent",
    label: "Agent",
    icon: Brain,
    x: 340,
    y: 240,
    size: 76,
    variant: "agent",
    delay: 0.2,
  },
  {
    id: "memory",
    label: "Memory",
    icon: Database,
    x: 340,
    y: 400,
    size: 44,
    variant: "default",
    delay: 0.4,
  },
  {
    id: "search",
    label: "Search",
    icon: Search,
    x: 660,
    y: 110,
    size: 48,
    variant: "default",
    delay: 0.48,
  },
  {
    id: "code",
    label: "Code",
    icon: Code2,
    x: 660,
    y: 240,
    size: 48,
    variant: "default",
    delay: 0.56,
  },
  {
    id: "cloud",
    label: "Cloud",
    icon: Cloud,
    x: 660,
    y: 370,
    size: 48,
    variant: "default",
    delay: 0.64,
  },
  {
    id: "output",
    label: "Action",
    icon: CheckCircle2,
    x: 930,
    y: 240,
    size: 52,
    variant: "output",
    delay: 1.05,
  },
];

const NODE_MAP = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<
  NodeId,
  NodeDef
>;

type Edge = {
  id: string;
  from: NodeId;
  to: NodeId;
  bidirectional?: boolean;
  drawDelay: number;
};

const EDGES: Edge[] = [
  { id: "trigger-agent", from: "trigger", to: "agent", drawDelay: 0 },
  {
    id: "agent-memory",
    from: "agent",
    to: "memory",
    bidirectional: true,
    drawDelay: 0.25,
  },
  {
    id: "agent-search",
    from: "agent",
    to: "search",
    bidirectional: true,
    drawDelay: 0.32,
  },
  {
    id: "agent-code",
    from: "agent",
    to: "code",
    bidirectional: true,
    drawDelay: 0.4,
  },
  {
    id: "agent-cloud",
    from: "agent",
    to: "cloud",
    bidirectional: true,
    drawDelay: 0.48,
  },
  { id: "agent-output", from: "agent", to: "output", drawDelay: 0.9 },
];

function pct(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

// Builds a cubic-bezier curve between two nodes, choosing control points
// based on the dominant axis of travel — horizontal edges bow via a
// midpoint-X curve, vertical edges (like agent → memory) bow via a
// midpoint-Y curve instead, so every connection looks intentional
// regardless of direction, not just the left-to-right ones.
function curvePath(from: NodeDef, to: NodeDef) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  if (Math.abs(dx) >= Math.abs(dy)) {
    const midX = from.x + dx / 2;
    return `M${from.x},${from.y} C${midX},${from.y} ${midX},${to.y} ${to.x},${to.y}`;
  }

  const midY = from.y + dy / 2;
  return `M${from.x},${from.y} C${from.x},${midY} ${to.x},${midY} ${to.x},${to.y}`;
}

function DiagramPath({
  id,
  d,
  delay,
}: {
  id: string;
  d: string;
  delay: number;
}) {
  return (
    <motion.path
      id={id}
      d={d}
      fill="none"
      stroke="rgba(255,255,255,0.14)"
      strokeWidth={1.5}
      vectorEffect="non-scaling-stroke"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

// A dot that travels along an already-drawn path using native SVG
// animateMotion + mpath — browser-native, GPU-composited, and needs
// zero React re-renders per frame (unlike a setState-driven loop).
function FlowDot({
  pathId,
  duration,
  begin,
  reverse = false,
}: {
  pathId: string;
  duration: number;
  begin: string;
  reverse?: boolean;
}) {
  return (
    <circle r={3.2} fill="#3b82f6">
      <animateMotion
        dur={`${duration}s`}
        begin={begin}
        repeatCount="indefinite"
        keyPoints={reverse ? "1;0" : "0;1"}
        keyTimes="0;1"
        calcMode="linear"
      >
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </circle>
  );
}

function DiagramNode({ node, delay }: { node: NodeDef; delay: number }) {
  const Icon = node.icon;
  const isAgent = node.variant === "agent";
  const isOutput = node.variant === "output";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        left: pct(node.x, DIAGRAM_W),
        top: pct(node.y, DIAGRAM_H),
        width: node.size,
        height: node.size,
      }}
      className={cn(
        "absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border",
        isAgent
          ? "border-accent/50 bg-accent/10 shadow-[0_0_30px_-4px_rgba(37,99,235,0.7)]"
          : isOutput
          ? "border-accent/30 bg-white/[0.05] backdrop-blur-md"
          : "border-white/10 bg-white/[0.04] backdrop-blur-md"
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4",
          isAgent || isOutput ? "text-accent" : "text-secondary"
        )}
        strokeWidth={1.5}
      />
      <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.1em] text-secondary">
        {node.label}
      </span>
      {isAgent && (
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.08em] text-accent">
          reasoning
        </span>
      )}
    </motion.div>
  );
}

function AgentDiagram() {
  const reducedMotion = usePrefersReducedMotion();
  const agent = NODE_MAP.agent;

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-white/10 p-4 sm:p-6",
        "bg-white/[0.03] backdrop-blur-md",
        "shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
      )}
    >
      {/* This inner box is the ONLY coordinate canvas — the outer div above
          is pure chrome (border, padding, background) and contributes
          nothing to the coordinate math, so nothing can throw off alignment. */}
      <div
        className="relative w-full"
        style={{ aspectRatio: `${DIAGRAM_W} / ${DIAGRAM_H}` }}
      >
        <svg
          viewBox={`0 0 ${DIAGRAM_W} ${DIAGRAM_H}`}
          className="absolute inset-0 h-full w-full"
        >
          {EDGES.map((edge) => {
            const from = NODE_MAP[edge.from];
            const to = NODE_MAP[edge.to];
            const d = curvePath(from, to);
            const pathId = `path-${edge.id}`;
            const forwardDur = edge.bidirectional ? 1.5 : 2.2;
            const forwardBegin = edge.drawDelay + 0.6;
            const reverseBegin = forwardBegin + forwardDur;

            return (
              <g key={edge.id}>
                <DiagramPath id={pathId} d={d} delay={edge.drawDelay} />
                <path
                  d={d}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth={1.5}
                  strokeDasharray="4 7"
                  vectorEffect="non-scaling-stroke"
                  className="diagram-flow"
                  style={{ opacity: 0.5 }}
                />
                {!reducedMotion && (
                  <>
                    <FlowDot
                      pathId={pathId}
                      duration={forwardDur}
                      begin={`${forwardBegin}s`}
                    />
                    {edge.bidirectional && (
                      <FlowDot
                        pathId={pathId}
                        duration={forwardDur}
                        begin={`${reverseBegin}s`}
                        reverse
                      />
                    )}
                  </>
                )}
              </g>
            );
          })}

          {/* Reasoning ring — rotates continuously around the Agent node,
              representing iterative thought before it decides to act. */}
          <g transform={`translate(${agent.x} ${agent.y})`}>
            <circle
              r={agent.size / 2 + 14}
              fill="none"
              stroke="rgba(37,99,235,0.35)"
              strokeWidth={1.5}
              strokeDasharray="3 7"
              vectorEffect="non-scaling-stroke"
            >
              {!reducedMotion && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 0 0"
                  to="360 0 0"
                  dur="7s"
                  repeatCount="indefinite"
                />
              )}
            </circle>
          </g>
        </svg>

        <div className="absolute inset-0">
          {NODES.map((node) => (
            <DiagramNode key={node.id} node={node} delay={node.delay} />
          ))}
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-secondary sm:text-xs">
        Trigger <span className="text-accent">→</span> agent reasons{" "}
        <span className="text-accent">→</span> calls tools &amp; memory{" "}
        <span className="text-accent">→</span> executes action
      </p>
    </div>
  );
}

// ---------- Section ----------

export function AiAgents() {
  return (
    <section className="bg-background-secondary py-28 md:py-36">
      <div className="container-premium">
        <div className="mb-16 max-w-xl">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-secondary">
            Beyond software
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            We also build the agents that run it.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            AI systems that don't just answer questions — they take real actions
            across your tools, on their own, safely.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <AgentLog />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <AgentDiagram />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
