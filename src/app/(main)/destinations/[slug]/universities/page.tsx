'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Grid } from '@/components/ui/grid'
import { Heading } from '@/components/ui/heading'
import { Paragraph } from '@/components/ui/paragraph'
import { GraduationCap } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import { UniversityCard } from '@/components/cards/university-card'
import { useCountry } from '@/hooks/use-countries'
import { UniversityCard as UniversityCardType } from '@/types/university'

export default function DestinationUniversitiesPage() {
  const params = useParams()
  const slug = params?.slug as string
  
  // Fetch country data with universities
  const { data: country, isLoading } = useCountry(slug)
  
  // Universities are included directly in the country data
  const universities = country?.universities || []

  // Use client-side only rendering to prevent hydration issues
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!slug) {
    return null
  }

  // Return loading skeleton during server render and initial client render
  if (!isClient) {
    return (
      <div className="py-12">
        <Container>
          <div className="h-6 w-48 bg-muted rounded mb-6"></div>
          <div className="space-y-4 mb-12">
            <div className="h-10 w-72 bg-muted rounded"></div>
            <div className="h-5 w-full max-w-3xl bg-muted rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <Skeleton className="h-14 w-14 rounded-lg mr-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="py-12">
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Destinations', href: '/destinations' },
            { label: country?.name || 'Country', href: `/destinations/${slug}` },
            { label: 'Universities', href: `/destinations/${slug}/universities` },
          ]}
          className="mb-6"
        />

        <div className="mb-12">
          <Heading level={1} className="mb-4">
            {country?.name ? `Universities in ${country.name}` : 'Universities'}
          </Heading>
          <Paragraph className="text-muted-foreground max-w-3xl">
            {country?.name 
              ? `Explore top universities in ${country.name} offering quality education to international students. Find detailed information about programs, admission requirements, and more.` 
              : 'Loading university information...'}
          </Paragraph>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <Skeleton className="h-14 w-14 rounded-lg mr-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : universities.length === 0 ? (
          <div className="p-12 text-center bg-muted/50 border rounded-lg">
            <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Universities Found</h3>
            <Paragraph className="text-muted-foreground">
              We couldn't find any universities for this country. Check back later as we continue to update our database.
            </Paragraph>
          </div>
        ) : (
          <Grid cols={3} gap="lg" className="mb-12">
            {universities.map((university: UniversityCardType) => (
              <UniversityCard
                key={university.id}
                university={{
                  id: university.id,
                  name: university.name,
                  slug: university.slug,
                  countryId: university.countryId,
                  countryName: country?.name || '',
                  logo: university.logo,
                  isPublic: university.isPublic,
                  ranking: {
                    qs: university.ranking?.qs
                  },
                  location: country?.name || '',
                  featuredFields: ['Business', 'Engineering', 'Computer Science'],
                  qogentSuccessRate: '85%'
                }}
                variant="default"
              />
            ))}
          </Grid>
        )}
      </Container>
    </div>
  )
} 