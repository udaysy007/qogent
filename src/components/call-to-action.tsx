import { ReactNode } from "react"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CallToActionProps {
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
  background?: "default" | "muted" | "primary"
  image?: ReactNode
  align?: "left" | "center"
}

export function CallToAction({
  title,
  description,
  primaryAction,
  secondaryAction,
  background = "primary",
  image,
  align = "center"
}: CallToActionProps) {
  return (
    <Section background={background}>
      <Container>
        <div className={`flex flex-col ${image ? "lg:flex-row" : ""} gap-8 items-center`}>
          <div className={`flex-1 ${align === "center" && !image ? "text-center mx-auto max-w-2xl" : ""}`}>
            <Heading level={2} className="mb-4">
              {title}
            </Heading>
            
            {description && (
              <p className={`text-lg mb-6 ${background === "primary" ? "text-primary-foreground/80" : "text-muted-foreground"} max-w-2xl`}>
                {description}
              </p>
            )}
            
            {(primaryAction || secondaryAction) && (
              <div className={`flex flex-wrap gap-4 ${align === "center" && !image ? "justify-center" : ""}`}>
                {primaryAction && (
                  <Button 
                    asChild 
                    size="lg" 
                    variant={background === "primary" ? "secondary" : "default"}
                  >
                    <Link href={primaryAction.href}>
                      {primaryAction.text}
                    </Link>
                  </Button>
                )}
                
                {secondaryAction && (
                  <Button 
                    variant={background === "primary" ? "outline" : "outline"} 
                    asChild 
                    size="lg"
                    className={background === "primary" ? "bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" : ""}
                  >
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