import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'

export function ContactForm() {
  return (
    <Container size="sm" className="pb-24">
      <Card className="mx-auto max-w-3xl overflow-hidden bg-card p-1">
        <iframe
          src="https://tally.so/embed/wMzZ1k"
          width="100%"
          height="600"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Contact Qogent"
          className="bg-background"
        />
      </Card>
      <div className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
        <p>
          By submitting this form, you agree to our privacy policy. We'll never share your information without your permission.
        </p>
      </div>
    </Container>
  )
} 