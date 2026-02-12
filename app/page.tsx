"use client"

import Link from "next/link";
import { Zap, CheckCircle, SlidersHorizontal } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      <div className="fixed inset-0 -z-10 bg-background">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-200 h-200 bg-primary/10 rounded-full blur-3xl opacity-40"></div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 min-h-[85vh] flex flex-col items-center justify-center text-center space-y-12">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
          Built for modern developers
        </div>

        <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight leading-tight">
          Structured thinking
          <br />
          <span className="text-primary">
            for developers.
          </span>
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          A focused space to document ideas, systems, and engineering decisions.
          Write clearly. Think deeply. Build better software.
        </p>

        <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground pt-2">

          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span>Fast & Clean</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span>Open Source</span>
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            <span>Structured</span>
          </div>

        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/auth/sign-up"
            className="px-8 py-3 rounded-md bg-primary text-primary-foreground text-sm font-medium transition hover:opacity-90"
          >
            Get started
          </Link>

          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Explore writing →
          </Link>
        </div>

        <p className="text-xs text-muted-foreground pt-6">
          Open source • Minimal • Focused
        </p>

      </div>
    </div>
  );
}
