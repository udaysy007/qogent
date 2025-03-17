import { ReactNode } from "react"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Grid } from "@/components/ui/grid"

interface Feature {
  icon: ReactNode
  title: string
  description: string
}

interface FeatureSectionProps {
  title: string
  description?: string
  features: Feature[]
  columns?: 1 | 2 | 3 | 4
  background?: "default" | "muted" | "primary"
}

export function FeatureSection({
  title,
  description,
  features,
  columns = 3,
  background = "default"
}: FeatureSectionProps) {
  return (
    <Section background={background}>
      <Container>
        <div className="text-center mb-12">
          <Heading level={2} className="mb-3">{title}</Heading>
          {description && <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>}
        </div>
        
        <Grid cols={columns} gap="lg">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-start">
              {feature.icon && (
                <div className="mb-4 p-3 bg-primary/10 rounded-lg text-primary">
                  {feature.icon}
                </div>
              )}
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  )
} 