"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Glow } from "@/components/ui/glow"
import { cn } from "@/lib/utils"
import { Breadcrumbs } from "@/components/breadcrumbs"

export function GetStartedHero() {
  return (
    <section className="relative min-h-[30vh] w-full overflow-visible">
      {/* Background Glow - subtle blue gradient */}
      <div className="absolute inset-0 -top-[100%] overflow-visible pointer-events-none">
        <Glow
          variant="above"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-[30vh] flex-col items-center justify-center gap-6 px-4 pb-6 pt-8 text-center lg:px-6">
        <div className="flex flex-col items-center gap-2">
          <h1 className={cn(
            "inline-block animate-appear",
            "bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground",
            "bg-clip-text text-transparent",
            "text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl",
            "leading-[1.15] sm:leading-[1.15]",
            "pb-2",
            "drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          )}>
            Your Study Abroad
          </h1>
          <span className={cn(
            "bg-gradient-to-r from-blue-400 to-blue-600",
            "bg-clip-text text-transparent",
            "text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl",
            "leading-[1.15] sm:leading-[1.15]",
            "pb-1",
            "animate-appear [animation-delay:150ms]"
          )}>
            Journey Starts Here
          </span>
        </div>
        <p className="mx-auto max-w-[550px] text-base font-medium text-muted-foreground animate-appear opacity-0 [animation-delay:300ms] sm:text-lg md:text-xl">
          Ready to turn your study abroad dream into reality? We'll guide you through every step of the way.
        </p>
        <div className="flex flex-wrap gap-3 animate-appear opacity-0 [animation-delay:450ms]">
          <Button asChild size="lg">
            <Link href="#roadmap">
              Start Planning <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/tools/country-comparison">
              Compare Destinations
            </Link>
          </Button>
        </div>
      </div>

      {/* Very subtle gradient effect that blends with page */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.05),transparent_80%)]" />
    </section>
  )
} 