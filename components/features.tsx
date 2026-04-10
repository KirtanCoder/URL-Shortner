import { BarChart3, Globe, Lock, Zap, Link2, QrCode } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Generate short URLs in milliseconds. No waiting, no delays, just instant results.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description:
      "Track clicks, locations, devices, and more. Understand your audience better.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "Your links are protected with enterprise-grade security. HTTPS by default.",
  },
  {
    icon: Globe,
    title: "Global CDN",
    description:
      "Links resolve instantly worldwide with our distributed network infrastructure.",
  },
  {
    icon: Link2,
    title: "Custom Domains",
    description:
      "Use your own branded domain for a professional look and increased trust.",
  },
  {
    icon: QrCode,
    title: "QR Codes",
    description:
      "Generate QR codes for any link automatically. Perfect for print and offline.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border bg-card/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need to manage links
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Powerful features designed for individuals and teams who want more
            than just short URLs.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:bg-card/80"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
