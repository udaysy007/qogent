import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { UniversitiesListing } from './universities-listing'
import { UniversitiesHero } from '@/components/sections/universities-hero'

export const metadata: Metadata = {
  title: 'Universities | Find Your Perfect University Abroad',
  description: 'Explore top universities around the world for international students. Filter by country, program, and more to find your ideal university match.',
}

export default function UniversitiesPage() {
  return (
    <>
      <UniversitiesHero />
      
      <section className="py-16 bg-transparent">
        <Container>
          <div className="max-w-screen-xl mx-auto">
            <UniversitiesListing />
          </div>
        </Container>
      </section>
    </>
  )
} 