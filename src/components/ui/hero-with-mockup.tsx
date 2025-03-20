import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Mockup } from "@/components/ui/mockup"
import { Glow } from "@/components/ui/glow"
import { Github } from "lucide-react"
import { AvatarCircles } from "@/components/ui/avatar-circles"

interface HeroWithMockupProps {
  title: string
  description: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
    icon?: React.ReactNode
  }
  mockupImage: {
    src: string
    alt: string
    width: number
    height: number
  }
  className?: string
  avatarCircles?: {
    avatarUrls: string[]
    numPeople: number
  }
}

export function HeroWithMockup({
  title,
  description,
  primaryCta = {
    text: "Get Started",
    href: "/get-started",
  },
  secondaryCta = {
    text: "GitHub",
    href: "https://github.com/your-repo",
    icon: <Github className="mr-2 h-4 w-4" />,
  },
  mockupImage,
  className,
  avatarCircles,
}: HeroWithMockupProps) {
  return (
    <section
      className={cn(
        "relative text-foreground",
        "py-4 px-4 md:py-12 lg:py-20",
        "overflow-visible",
        className,
      )}
    >
      <div className="relative mx-auto max-w-[1280px] flex flex-col gap-8 lg:gap-16">
        {/* Background Glow */}
        <div className="absolute inset-0 -top-[100%] overflow-visible pointer-events-none">
          <Glow
            variant="above"
            className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
          />
        </div>
        
        <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:gap-8">
          {/* Heading */}
          <h1
            className={cn(
              "inline-block animate-appear",
              "bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground",
              "bg-clip-text text-transparent",
              "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl",
              "leading-[1.2] sm:leading-[1.2]",
              "pb-1",
              "drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]",
            )}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className={cn(
              "max-w-[550px] animate-appear opacity-0 [animation-delay:150ms]",
              "text-base sm:text-lg md:text-xl",
              "text-muted-foreground",
              "font-medium",
            )}
          >
            {description}
          </p>

          {/* Avatar Circles with Text */}
          {avatarCircles && (
            <div className="flex flex-col items-center gap-2 animate-appear opacity-0 [animation-delay:300ms]">
              <AvatarCircles
                avatarUrls={avatarCircles.avatarUrls}
                numPeople={avatarCircles.numPeople}
                className="justify-center"
              />
              <p className="text-sm text-muted-foreground italic">
                Join 1000+ students starting Winter 2025
              </p>
            </div>
          )}

          {/* CTAs */}
          <div
            className="relative z-10 flex flex-wrap justify-center gap-4 
            animate-appear"
          >
            <Button
              asChild
              size="lg"
              className={cn(
                "bg-primary hover:bg-primary/90",
                "text-primary-foreground shadow-lg",
                "transition-all duration-300",
                "rounded-full",
                "px-8 py-6 text-lg"
              )}
            >
              <a href={primaryCta.href}>{primaryCta.text}</a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className={cn(
                "border-primary/20 hover:border-primary/30 dark:border-primary/20 dark:hover:border-primary/30",
                "text-foreground/90 dark:text-foreground/90",
                "transition-all duration-300",
                "rounded-full",
                "px-8 py-6 text-lg"
              )}
            >
              <a href={secondaryCta.href}>
                {secondaryCta.icon}
                {secondaryCta.text}
              </a>
            </Button>
          </div>

          {/* Mockup */}
          <div className="relative w-full pt-12 px-4 sm:px-6 lg:px-8">
            <Mockup
              className={cn(
                "animate-appear opacity-0 [animation-delay:700ms]",
                "shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]",
                "border-brand/10 dark:border-brand/5",
              )}
            >
              <img
                {...mockupImage}
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </Mockup>
          </div>
        </div>
      </div>
    </section>
  )
} 