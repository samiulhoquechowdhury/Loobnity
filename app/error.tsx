// app/error.tsx

"use client";

import { useEffect } from "react";
import { RotateCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <span className="font-mono text-sm text-secondary">Error</span>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Something went wrong.
      </h1>
      <p className="mt-4 max-w-sm text-base leading-relaxed text-secondary">
        An unexpected error occurred while loading this page. Try again.
      </p>
      <button
        onClick={() => reset()}
        className="group mt-10 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
      >
        <RotateCw
          className="h-4 w-4 transition-transform group-hover:rotate-180"
          strokeWidth={1.5}
        />
        Try again
      </button>
    </div>
  );
}
