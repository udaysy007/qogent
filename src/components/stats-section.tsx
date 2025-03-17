import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Grid } from "@/components/ui/grid"

interface Stat {
  value: string
  label: string
  description?: string
}

interface StatsSectionProps {
  title?: string
  description?: string
  stats: Stat[]
  columns?: 2 | 3 | 4
  background?: "default" | "muted" | "primary"
}

export function StatsSection({
  title,
  description,
  stats,
  columns = 3,
  background = "default"
}: StatsSectionProps) {
  return (
    <Section background={background}>
      <Container>
        {(title || description) && (
          <div className="text-center mb-12">
            {title && <Heading level={2} className="mb-3">{title}</Heading>}
            {description && <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>}
          </div>
        )}
        
        <Grid cols={columns} gap="lg">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-lg font-medium mb-1">{stat.label}</p>
              {stat.description && (
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              )}
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  )
} 