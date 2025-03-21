import { Metadata } from 'next'
import { ContactHero } from '@/components/contact/contact-hero'
import { ContactForm } from '@/components/contact/contact-form'

export const metadata: Metadata = {
  title: 'Contact Us | Get in Touch with Qogent',
  description:
    'Have questions about studying abroad? Get in touch with Qogent. We\'re here to help you navigate your international education journey.',
  keywords: [
    'contact Qogent',
    'study abroad help',
    'international education support',
    'education consultation',
    'student advisory',
  ],
}

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <ContactHero />
      <ContactForm />
    </main>
  )
} 