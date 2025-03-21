import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { PrivacyContent } from '@/components/legal/privacy-content'

export const metadata: Metadata = {
  title: 'Privacy Policy | Qogent',
  description: 'Learn how Qogent protects and handles your personal information.',
  keywords: [
    'Qogent privacy policy',
    'student data protection',
    'education privacy',
    'data handling policy',
  ],
}

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-16 md:py-24">
      <Container size="sm">
        <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <div className="prose prose-gray mx-auto dark:prose-invert">
          <PrivacyContent />
        </div>
      </Container>
    </main>
  )
} 