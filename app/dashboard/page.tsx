"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Link2,
  Plus,
  Copy,
  ExternalLink,
  BarChart2,
  Trash2,
  Search,
  LogOut,
  Settings,
  Check,
} from "lucide-react";

const mockLinks = [
  {
    id: "1",
    shortId: "ab3k9x",
    originalUrl: "https://example.com/very-long-url-that-needs-shortening/page/1",
    clicks: 1234,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    shortId: "x9m2pq",
    originalUrl: "https://another-website.com/blog/article/how-to-build-apps",
    clicks: 856,
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    shortId: "k4n7wy",
    originalUrl: "https://docs.programming.io/getting-started/installation",
    clicks: 2341,
    createdAt: "2024-01-12",
  },
  {
    id: "4",
    shortId: "p2r8zv",
    originalUrl: "https://shop.example.com/products/special-offer-2024",
    clicks: 567,
    createdAt: "2024-01-10",
  },
  {
    id: "5",
    shortId: "m5t3bh",
    originalUrl: "https://marketing.company.com/campaign/spring-sale",
    clicks: 3421,
    createdAt: "2024-01-08",
  },
];

export default function DashboardPage() {
  const [links, setLinks] = useState(mockLinks);
  const [newUrl, setNewUrl] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    setIsCreating(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newLink = {
      id: String(links.length + 1),
      shortId: Math.random().toString(36).substring(2, 8),
      originalUrl: newUrl,
      clicks: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setLinks([newLink, ...links]);
    setNewUrl("");
    setShowCreateForm(false);
    setIsCreating(false);
  };

  const handleCopy = async (id: string, shortId: string) => {
    await navigator.clipboard.writeText(`https://shortify.io/${shortId}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const filteredLinks = links.filter(
    (link) =>
      link.originalUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.shortId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-border bg-card lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b border-border px-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Link2 className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Shortify</span>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 p-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg bg-accent/10 px-3 py-2.5 text-sm font-medium text-accent"
            >
              <Link2 className="h-4 w-4" />
              My Links
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <BarChart2 className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>

          {/* User */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-sm font-medium text-accent">
                JD
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
              <button className="text-muted-foreground transition-colors hover:text-foreground">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:pl-64">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-sm lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Link2 className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Shortify</span>
          </div>
        </header>

        <div className="p-6 lg:p-8">
          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">Total Links</p>
              <p className="mt-1 text-3xl font-bold">{links.length}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">Total Clicks</p>
              <p className="mt-1 text-3xl font-bold">{totalClicks.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">Avg. Clicks/Link</p>
              <p className="mt-1 text-3xl font-bold">
                {links.length > 0 ? Math.round(totalClicks / links.length) : 0}
              </p>
            </div>
          </div>

          {/* Actions bar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search links..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <Plus className="h-4 w-4" />
              Create Link
            </button>
          </div>

          {/* Create link form */}
          {showCreateForm && (
            <div className="mb-6 rounded-xl border border-accent/50 bg-accent/5 p-6">
              <form onSubmit={handleCreateLink} className="flex flex-col gap-4 sm:flex-row">
                <input
                  type="url"
                  placeholder="Paste your long URL here..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="h-11 flex-1 rounded-lg border border-border bg-card px-4 placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="h-11 rounded-lg border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50"
                  >
                    {isCreating ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent" />
                    ) : (
                      "Shorten"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Links table */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="hidden grid-cols-12 gap-4 border-b border-border bg-muted/50 px-6 py-4 text-sm font-medium text-muted-foreground md:grid">
              <div className="col-span-3">Short URL</div>
              <div className="col-span-5">Original URL</div>
              <div className="col-span-2">Clicks</div>
              <div className="col-span-2">Actions</div>
            </div>

            <div className="divide-y divide-border">
              {filteredLinks.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-muted-foreground">No links found</p>
                </div>
              ) : (
                filteredLinks.map((link) => (
                  <div
                    key={link.id}
                    className="grid grid-cols-1 gap-4 px-6 py-4 transition-colors hover:bg-muted/30 md:grid-cols-12 md:items-center"
                  >
                    <div className="col-span-3">
                      <span className="font-mono text-sm text-accent">
                        shortify.io/{link.shortId}
                      </span>
                      <p className="mt-0.5 text-xs text-muted-foreground md:hidden">
                        {link.clicks.toLocaleString()} clicks
                      </p>
                    </div>
                    <div className="col-span-5 flex items-center gap-2">
                      <span className="truncate text-sm text-muted-foreground">
                        {link.originalUrl}
                      </span>
                      <a
                        href={link.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 text-muted-foreground/50 transition-colors hover:text-foreground"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                    <div className="col-span-2 hidden items-center gap-2 md:flex">
                      <BarChart2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{link.clicks.toLocaleString()}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(link.id, link.shortId)}
                        className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 text-xs font-medium transition-colors hover:bg-muted"
                      >
                        {copiedId === link.id ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-green-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(link.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
