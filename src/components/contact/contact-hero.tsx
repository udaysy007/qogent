import { Container } from '@/components/ui/container'

export function ContactHero() {
  return (
    <Container size="sm" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Let's Talk About Your Study Abroad Journey
        </h1>
        <p className="mb-8 text-lg text-muted-foreground md:text-xl">
          Whether you're just starting to dream about studying abroad or you're deep in the application process and need help, we've been there. Really. Let's figure this out together.
        </p>
        <div className="flex flex-col gap-4 text-base text-muted-foreground md:text-lg">
          <p>
            🌍 Based in Bangalore, helping students worldwide
          </p>
          <p>
            ⏰ Response time: Usually within 24 hours
          </p>
          <p>
            💬 Available in English, Hindi, and German
          </p>
        </div>
      </div>
    </Container>
  )
} 