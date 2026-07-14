// app/not-found.tsx

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <span className="font-mono text-sm text-secondary">404</span>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        This page doesn't exist.
      </h1>
      <p className="mt-4 max-w-sm text-base leading-relaxed text-secondary">
        The page you're looking for may have moved or never existed.
      </p>
      <Link
        href="/"
        className="group mt-10 inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card"
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
          strokeWidth={1.5}
        />
        Back to home
      </Link>
    </div>
  );
}
