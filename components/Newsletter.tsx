"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="glass-panel rounded-2xl px-6 py-8 sm:px-10 sm:py-10 relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-orange-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 bg-orange-500/15 text-orange-300 border border-orange-400/20 rounded-full px-3 py-1 text-xs font-semibold mb-3">
            ✉ AI Weekly
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-2">
            Get the best AI tool updates, weekly
          </h2>
          <p className="text-slate-400 text-sm max-w-md">
            One email a week: new model releases, tool comparisons, and the picks actually worth trying. No spam, unsubscribe anytime.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full sm:w-auto sm:min-w-[360px]">
          {status === "success" ? (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/25 text-emerald-300 text-sm font-medium rounded-xl px-4 py-3">
              ✓ You&apos;re subscribed — welcome to AI Weekly!
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  aria-label="Email address"
                  className="glass-input flex-1 px-4 py-3 text-sm"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary justify-center whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Subscribing…" : "Subscribe"}
                </button>
              </div>
              {status === "error" && (
                <p className="text-red-400 text-xs mt-2">{errorMsg}</p>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
}
