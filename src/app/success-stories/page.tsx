import { Metadata } from 'next'
import { SuccessStoriesHero } from '@/components/sections/success-stories-hero'
import { getSuccessStories } from './actions'
import { ClientSearch } from '@/app/success-stories/client-search'

export const metadata: Metadata = {
  title: 'Success Stories - Qogent',
  description: 'Meet our students who turned their dreams into reality. From acceptance letters to new beginnings in Germany.',
}

export default async function SuccessStoriesPage() {
  const stories = await getSuccessStories()

  return (
    <main>
      <SuccessStoriesHero />
      <section className="py-12">
        <ClientSearch initialStories={stories} />
      </section>
    </main>
  )
} 