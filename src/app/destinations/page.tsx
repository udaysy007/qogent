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
  <div className="relative min-h-[50vh] w-full bg-gradient-to-b from-muted/30 to-muted/10">
    <div className="container flex items-center justify-start min-h-[50vh]">
      <div className="bg-background/30 backdrop-blur-md p-6 rounded-xl shadow-lg animate-pulse h-64 w-full max-w-md flex flex-col gap-4">
        <div className="h-10 bg-muted/20 rounded-md w-3/4"></div>
        <div className="h-10 bg-muted/20 rounded-md w-1/2"></div>
        <div className="h-24 bg-muted/20 rounded-md w-full"></div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-8 w-16 bg-muted/20 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

// Loading state for search component
const SearchSkeleton = () => (
  <div className="flex flex-col lg:flex-row gap-4">
    <div className="flex-1 h-11 bg-muted/20 animate-pulse rounded-full"></div>
    <div className="flex gap-3">
      <div className="w-40 h-11 bg-muted/20 animate-pulse rounded-full"></div>
      <div className="w-40 h-11 bg-muted/20 animate-pulse rounded-full"></div>
    </div>
  </div>
)

// Dynamic imports with loading states and suspended rendering
const DestinationsHero = dynamic(
  () => import('@/components/sections/destinations-hero').then(mod => ({ default: mod.DestinationsHero })),
  {
    ssr: false,
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
        {/* Integrated Search Bar - positioned to overlap with hero and content */}
        <div className="relative -mt-12 mb-16 z-10">
          <Container className="max-w-6xl">
            <div className="bg-background/80 backdrop-blur-md rounded-2xl shadow-lg border border-border/40 p-4 md:p-5 transition-all duration-300 hover:shadow-xl hover:bg-background/90">
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
          </Container>
        </div>
        
        {/* Combined destinations section */}
        <Section background="muted" className="-mt-6 pt-10 pb-16 rounded-t-3xl">
          <Container>
            <h2 className="text-2xl font-bold mb-8 text-center md:text-left">Study Destinations</h2>
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
        
        <Section background="muted" className="mt-16 rounded-t-3xl pt-16">
          <Container>
            <CallToAction
              title="Compare Study Destinations"
              description="Not sure which country is right for you? Use our comparison tool to evaluate costs, programs, and opportunities."
              primaryAction={{
                text: "Compare Countries",
                href: "/tools/compare-destinations"
              }}
            />
          </Container>
        </Section>
      </main>
    </>
  )
} 