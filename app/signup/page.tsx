"use client";

import { useState } from "react";
import Link from "next/link";
import { Link2, ArrowLeft, Eye, EyeOff, Check } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const features = [
    "Unlimited short links",
    "Click analytics & tracking",
    "Custom branded domains",
    "QR code generation",
  ];

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col">
        {/* Back link */}
        <div className="p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-20">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-8 flex justify-center lg:justify-start">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                  <Link2 className="h-5 w-5 text-accent-foreground" />
                </div>
                <span className="text-2xl font-semibold tracking-tight">
                  Shortify
                </span>
              </Link>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-8">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="mt-2 text-muted-foreground">
                  Start shortening URLs in seconds
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="h-12 w-full rounded-xl border border-border bg-input px-4 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-border bg-input px-4 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Create a strong password"
                      className="h-12 w-full rounded-xl border border-border bg-input px-4 pr-12 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full rounded-xl bg-accent font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent" />
                      Creating account...
                    </div>
                  ) : (
                    "Create account"
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                By signing up, you agree to our{" "}
                <Link href="#" className="text-accent hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-accent hover:underline">
                  Privacy Policy
                </Link>
              </p>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-accent hover:underline">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Features */}
      <div className="hidden flex-1 items-center justify-center border-l border-border bg-card/50 lg:flex">
        <div className="max-w-md px-12">
          <h2 className="text-3xl font-bold">
            Start shortening links{" "}
            <span className="text-accent">for free</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join thousands of users who trust Shortify to manage their links and
            track their performance.
          </p>

          <ul className="mt-10 space-y-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10">
                  <Check className="h-3.5 w-3.5 text-accent" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
