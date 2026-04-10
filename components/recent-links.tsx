"use client";

import { ExternalLink, BarChart2, Copy } from "lucide-react";
import { useState } from "react";

const demoLinks = [
  {
    id: 1,
    shortId: "ab3k9x",
    originalUrl: "https://example.com/very-long-url-that-needs-shortening",
    clicks: 1234,
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    shortId: "x9m2pq",
    originalUrl: "https://another-website.com/blog/article/how-to-build-apps",
    clicks: 856,
    createdAt: "5 hours ago",
  },
  {
    id: 3,
    shortId: "k4n7wy",
    originalUrl: "https://docs.programming.io/getting-started/installation",
    clicks: 2341,
    createdAt: "1 day ago",
  },
  {
    id: 4,
    shortId: "p2r8zv",
    originalUrl: "https://shop.example.com/products/special-offer-2024",
    clicks: 567,
    createdAt: "2 days ago",
  },
];

export function RecentLinks() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = async (id: number, shortId: string) => {
    await navigator.clipboard.writeText(`https://shortify.io/${shortId}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="stats" className="border-t border-border bg-card/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Recently shortened
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            See what links are being shortened in real-time by our community.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          <div className="hidden grid-cols-12 gap-4 border-b border-border bg-muted/50 px-6 py-4 text-sm font-medium text-muted-foreground md:grid">
            <div className="col-span-2">Short URL</div>
            <div className="col-span-6">Original URL</div>
            <div className="col-span-2">Clicks</div>
            <div className="col-span-2">Actions</div>
          </div>

          <div className="divide-y divide-border">
            {demoLinks.map((link) => (
              <div
                key={link.id}
                className="grid grid-cols-1 gap-4 px-6 py-4 transition-colors hover:bg-muted/30 md:grid-cols-12 md:items-center"
              >
                <div className="col-span-2">
                  <span className="font-mono text-sm text-accent">
                    /{link.shortId}
                  </span>
                </div>
                <div className="col-span-6 flex items-center gap-2">
                  <span className="truncate text-sm text-muted-foreground">
                    {link.originalUrl}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/50" />
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {link.clicks.toLocaleString()}
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(link.id, link.shortId)}
                    className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 text-xs font-medium transition-colors hover:bg-muted"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copiedId === link.id ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
