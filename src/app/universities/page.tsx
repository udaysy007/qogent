import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { UniversitiesListing } from './universities-listing'

export const metadata: Metadata = {
  title: 'Universities | Find Your Perfect University Abroad',
  description: 'Explore top universities around the world for international students. Filter by country, program, and more to find your ideal university match.',
}

export default function UniversitiesPage() {
  return (
    <div className="py-12">
      <Container>
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Universities Around the World
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover top universities that match your profile. Our curated list includes institutions with proven track records for international students.
            </p>
          </div>
          
          <UniversitiesListing />
        </div>
      </Container>
    </div>
  )
} 