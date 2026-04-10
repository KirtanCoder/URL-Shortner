export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Paste your URL",
      description:
        "Copy any long URL and paste it into the input field. We support all valid URLs.",
    },
    {
      step: "02",
      title: "Click shorten",
      description:
        "Hit the shorten button and we'll generate a unique, short link for you instantly.",
    },
    {
      step: "03",
      title: "Share anywhere",
      description:
        "Copy your new short link and share it on social media, emails, or anywhere you want.",
    },
  ];

  return (
    <section id="how-it-works" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Shortening URLs has never been easier. Just three simple steps.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <div key={item.step} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-px w-full bg-gradient-to-r from-border to-transparent md:block md:w-1/2 md:translate-x-1/2" />
              )}
              <div className="relative text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card">
                  <span className="font-mono text-xl font-bold text-accent">
                    {item.step}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
