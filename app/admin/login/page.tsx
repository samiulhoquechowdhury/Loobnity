// app/admin/login/page.tsx

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Incorrect password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-border bg-card p-8"
      >
        <div className="mb-6 flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background-secondary text-accent">
            <Lock className="h-4 w-4" strokeWidth={1.5} />
          </span>
          <h1 className="text-lg font-medium tracking-tight text-foreground">
            Admin login
          </h1>
        </div>

        <label htmlFor="password" className="mb-2 block text-sm text-secondary">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-border bg-background-secondary px-4 py-3 text-sm text-foreground focus:border-accent"
        />

        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading || password.length === 0}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />}
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}