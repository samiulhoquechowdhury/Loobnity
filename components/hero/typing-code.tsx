// components/hero/typing-code.tsx

"use client";

import * as React from "react";

type CodeLine = {
  content: React.ReactNode;
  plainLength: number; // used to time the typing — must match visible char count of `content`
};

const LINES: CodeLine[] = [
  {
    content: (
      <>
        <span className="text-accent">export async function</span> deploy(
        build: Artifact) {"{"}
      </>
    ),
    plainLength: 44,
  },
  {
    content: <>{"  "}await pipeline.run(build);</>,
    plainLength: 28,
  },
  {
    content: (
      <>
        {"  "}
        <span className="text-accent">return</span> status.
        <span className="text-foreground">Live</span>;
      </>
    ),
    plainLength: 24,
  },
  { content: <>{"}"}</>, plainLength: 1 },
];

const CHAR_MS = 14; // typing speed per character
const LINE_PAUSE_MS = 120; // pause between lines

export function TypingCode() {
  const [visibleLines, setVisibleLines] = React.useState(0);
  const [visibleChars, setVisibleChars] = React.useState(0);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (visibleLines >= LINES.length) {
      setDone(true);
      return;
    }

    const currentLine = LINES[visibleLines];

    if (visibleChars < currentLine.plainLength) {
      const t = setTimeout(() => setVisibleChars((c) => c + 1), CHAR_MS);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setVisibleLines((l) => l + 1);
      setVisibleChars(0);
    }, LINE_PAUSE_MS);
    return () => clearTimeout(t);
  }, [visibleChars, visibleLines]);

  return (
    <code className="font-mono text-secondary">
      {LINES.slice(0, visibleLines).map((line, i) => (
        <React.Fragment key={i}>
          {line.content}
          {"\n"}
        </React.Fragment>
      ))}

      {visibleLines < LINES.length && (
        <>
          {/* Render the in-progress line clipped to visibleChars using a
              width-based reveal — simplest way to "type" JSX (with colored
              spans) rather than a plain string, without re-parsing markup
              character by character. */}
          <span
            className="inline-block overflow-hidden align-top"
            style={{
              width: `${
                (visibleChars / LINES[visibleLines].plainLength) * 100
              }%`,
              whiteSpace: "nowrap",
            }}
          >
            {LINES[visibleLines].content}
          </span>
          <span className="animate-pulse text-accent">▍</span>
        </>
      )}

      {done && <span className="animate-pulse text-accent">▍</span>}
    </code>
  );
}
