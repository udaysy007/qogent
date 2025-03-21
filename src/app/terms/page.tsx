import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { TermsContent } from '@/components/legal/terms-content'

export const metadata: Metadata = {
  title: 'Terms of Service | Qogent',
  description: 'Read our terms of service and understand your rights and responsibilities when using Qogent.',
  keywords: [
    'Qogent terms',
    'terms of service',
    'user agreement',
    'legal terms',
  ],
}

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-16 md:py-24">
      <Container size="sm">
        <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-foreground">
          Terms of Service
        </h1>
        <div className="prose prose-gray mx-auto dark:prose-invert">
          <TermsContent />
        </div>
      </Container>
    </main>
  )
} 