import { ReactNode } from "react"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Breadcrumbs } from "@/components/breadcrumbs"

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: {
    label: string
    href?: string
  }[]
  actions?: ReactNode
  background?: "default" | "muted" | "primary"
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  background = "muted"
}: PageHeaderProps) {
  return (
    <Section background={background} className="py-8 md:py-12">
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} />
        )}
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Heading level={1} className="mb-2">
              {title}
            </Heading>
            
            {description && (
              <p className="text-muted-foreground max-w-2xl">
                {description}
              </p>
            )}
          </div>
          
          {actions && (
            <div className="flex flex-wrap items-center gap-3">
              {actions}
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
} 