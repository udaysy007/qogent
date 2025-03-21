"use client";

import { Glow } from "@/components/ui/glow";
import { cn } from "@/lib/utils";

export function ToolsHero() {
  return (
    <section className="relative min-h-[30vh] w-full overflow-visible pb-0">
      {/* Background Glow */}
      <div className="absolute inset-0 -top-[100%] overflow-visible pointer-events-none">
        <Glow
          variant="above"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-[30vh] flex-col items-center justify-center gap-6 px-4 pb-0 pt-8 text-center lg:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 leading-[1.15] pb-1">
            Your Study Abroad Toolkit
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Smart tools to make your study abroad journey easier 🎓
          </p>
        </div>
      </div>

      {/* Subtle Background Effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.08),transparent_70%)]" />
    </section>
  );
} 