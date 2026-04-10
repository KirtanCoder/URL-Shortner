"use client";

import { useState } from "react";
import { ArrowRight, Copy, Check, Sparkles } from "lucide-react";

export function Hero() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    const randomId = Math.random().toString(36).substring(2, 8);
    setShortUrl(`shortify.io/${randomId}`);
    setIsLoading(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`https://${shortUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-muted-foreground">New:</span>
            <span>Analytics Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-balance text-center text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          Short links,{" "}
          <span className="bg-gradient-to-r from-accent to-indigo-400 bg-clip-text text-transparent">
            big impact
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg text-muted-foreground md:text-xl">
          Transform your long URLs into clean, shareable links. Track clicks,
          analyze performance, and grow your audience with powerful analytics.
        </p>

        {/* URL Input Form */}
        <form onSubmit={handleSubmit} className="mx-auto mt-12 max-w-2xl">
          <div className="relative flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your long URL here..."
                className="h-14 w-full rounded-xl border border-border bg-card px-5 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-accent px-8 font-medium text-accent-foreground transition-all hover:bg-accent/90 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent" />
              ) : (
                <>
                  Shorten
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Result */}
        {shortUrl && (
          <div className="mx-auto mt-6 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between rounded-xl border border-accent/50 bg-accent/10 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                  <Check className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your short URL</p>
                  <p className="font-mono font-medium text-accent">{shortUrl}</p>
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { value: "10M+", label: "Links created" },
            { value: "500K+", label: "Active users" },
            { value: "99.9%", label: "Uptime" },
            { value: "150+", label: "Countries" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
