import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Grid } from "@/components/ui/grid"
import { TestimonialCard } from "@/components/testimonial-card"

interface TestimonialsSectionProps {
  title?: string
  description?: string
  testimonials: {
    id: number
    content: string
    author: string
    role?: string
    avatar?: string
    rating?: number
  }[]
  columns?: 1 | 2 | 3
  background?: "default" | "muted" | "primary"
}

export function TestimonialsSection({
  title = "What Our Students Say",
  description,
  testimonials,
  columns = 3,
  background = "default"
}: TestimonialsSectionProps) {
  return (
    <Section background={background}>
      <Container>
        <div className="text-center mb-12">
          <Heading level={2} className="mb-3">{title}</Heading>
          {description && <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>}
        </div>
        
        <Grid cols={columns} gap="lg">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Grid>
      </Container>
    </Section>
  )
}