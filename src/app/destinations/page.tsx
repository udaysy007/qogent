"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import { ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Grid } from "@/components/ui/grid"
import { CountryCard } from "@/components/country-card"
import { SearchAndFilter } from "@/components/search-and-filter"
import { CallToAction } from "@/components/call-to-action"
import { useCountries } from "@/hooks/use-countries"
import { Skeleton } from "@/components/ui/skeleton"
import dynamic from 'next/dynamic'

// Hero skeleton that shows instantly
const HeroSkeleton = () => (
  <div className="relative min-h-[30vh] w-full overflow-visible">
    <div className="container relative z-10 mx-auto flex min-h-[30vh] flex-col items-center justify-center gap-6 px-4 pb-6 pt-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-64 bg-muted/10 animate-pulse rounded-lg"></div>
        <div className="h-10 w-48 bg-muted/10 animate-pulse rounded-lg"></div>
        <div className="h-24 w-full max-w-[550px] bg-muted/10 animate-pulse rounded-lg mt-2"></div>
      </div>
    </div>
  </div>
)

// Loading state for search component
const SearchSkeleton = () => (
  <div className="flex flex-col lg:flex-row gap-4">
    <div className="flex-1 h-11 bg-muted/10 animate-pulse rounded-full"></div>
    <div className="flex gap-3">
      <div className="w-40 h-11 bg-muted/10 animate-pulse rounded-full"></div>
      <div className="w-40 h-11 bg-muted/10 animate-pulse rounded-full"></div>
    </div>
  </div>
)

// Dynamic imports with loading states and suspended rendering
const DestinationsHero = dynamic(
  () => import('@/components/sections/destinations-hero').then(mod => ({ default: mod.DestinationsHero })),
  {
    loading: () => <HeroSkeleton />
  }
)

const SearchFilter = dynamic(
  () => import('@/components/search-and-filter').then(mod => ({ default: mod.SearchAndFilter })),
  {
    ssr: false,
    loading: () => <SearchSkeleton />
  }
)

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [isClient, setIsClient] = useState(false)
  
  // Fetch countries from database - with retry logic
  const { data: countries, isLoading, error } = useCountries()
  
  // Set isClient to true only on the client-side to avoid SSR issues
  useEffect(() => {
    // Mark as client-side immediately
    setIsClient(true)
  }, [])
  
  // Memoize filter function to avoid recreation on every render
  const filterDestinations = useCallback((destination: any) => {
    // Skip filtering if no query or filters set
    if (!searchQuery && Object.keys(activeFilters).length === 0) return true;
    
    // Search filter
    if (searchQuery && !destination.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !destination.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Region filter
    if (activeFilters.region && destination.region !== activeFilters.region) {
      return false;
    }
    
    // Tag filter
    if (activeFilters.tag && destination.tags && !destination.tags.includes(activeFilters.tag)) {
      return false;
    }
    
    return true;
  }, [searchQuery, activeFilters]);

  // Get all destinations filtered by search and filters
  const filteredDestinations = isClient && countries ? 
    countries.filter(filterDestinations) : [];

  // Loading UI - memoized
  const LoadingSkeleton = () => (
    <Grid cols={3} gap="lg">
      {Array(9).fill(0).map((_, i) => (
        <div key={i} className="rounded-lg overflow-hidden">
          <Skeleton className="h-[200px] w-full" />
          <div className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </Grid>
  )

  return (
    <>
      {/* Render hero immediately - no waiting */}
      <DestinationsHero />
      
      <main className="pb-20">
        {/* Combined destinations section - now includes search */}
        <Section className="pt-10 pb-16 bg-transparent">
          <Container>
            <h2 className="text-2xl font-bold mb-8 text-center md:text-left">Study Destinations</h2>
            
            {/* Search and filter now part of the destinations section */}
            <div className="mb-10">
              {!isClient ? <SearchSkeleton /> : (
                <SearchFilter
                  placeholder="Search destinations..."
                  onSearch={setSearchQuery}
                  onFilter={setActiveFilters}
                  className="flex flex-col lg:flex-row lg:items-center gap-4"
                  filters={[
                    {
                      id: "region",
                      label: "Region",
                      options: [
                        { value: "europe", label: "Europe" },
                        { value: "north-america", label: "North America" },
                        { value: "asia", label: "Asia" },
                        { value: "oceania", label: "Oceania" }
                      ]
                    },
                    {
                      id: "tag",
                      label: "Features",
                      options: [
                        { value: "affordable", label: "Affordable" },
                        { value: "english-taught", label: "English Taught" },
                        { value: "work-opportunities", label: "Work Opportunities" },
                        { value: "immigration-pathway", label: "Immigration Pathway" }
                      ]
                    }
                  ]}
                />
              )}
            </div>
            
            {isLoading || !isClient ? (
              <LoadingSkeleton />
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Error loading destinations. Please try again later.</p>
              </div>
            ) : filteredDestinations.length > 0 ? (
              <Grid cols={3} gap="lg">
                {filteredDestinations.map(destination => (
                  <CountryCard 
                    key={destination.id} 
                    country={destination}
                    variant={destination.featured ? "featured" : undefined}
                  />
                ))}
              </Grid>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No destinations match your search criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("")
                    setActiveFilters({})
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </Container>
        </Section>
      </main>
    </>
  )
} 