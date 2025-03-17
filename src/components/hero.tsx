import { ReactNode } from "react"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroProps {
  title: string
  description?: string
  primaryAction?: {
    text: string
    href: string
  }
  secondaryAction?: {
    text: string
    href: string
  }
  image?: ReactNode
  background?: "default" | "muted" | "primary"
  align?: "left" | "center"
}

export function Hero({
  title,
  description,
  primaryAction,
  secondaryAction,
  image,
  background = "default",
  align = "center"
}: HeroProps) {
  return (
    <Section background={background}>
      <Container>
        <div className={`flex flex-col ${image ? "lg:flex-row" : ""} gap-10 items-center`}>
          <div className={`flex-1 ${align === "center" && !image ? "text-center mx-auto max-w-3xl" : ""}`}>
            <Heading level={1} className="mb-4 sm:mb-6">
              {title}
            </Heading>
            
            {description && (
              <p className="text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl">
                {description}
              </p>
            )}
            
            {(primaryAction || secondaryAction) && (
              <div className={`flex flex-wrap gap-4 ${align === "center" && !image ? "justify-center" : ""}`}>
                {primaryAction && (
                  <Button asChild size="lg">
                    <Link href={primaryAction.href}>
                      {primaryAction.text}
                    </Link>
                  </Button>
                )}
                
                {secondaryAction && (
                  <Button variant="outline" asChild size="lg">
                    <Link href={secondaryAction.href}>
                      {secondaryAction.text}
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {image && (
            <div className="flex-1 w-full">
              {image}
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
} 