"use client"

import { useState } from "react"
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

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  
  // Fetch countries from database
  const { data: countries, isLoading, error } = useCountries()
  
  // Filter destinations based on search and filters
  const filteredDestinations = countries ? countries.filter(destination => {
    // Search filter
    if (searchQuery && !destination.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !destination.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    // Region filter
    if (activeFilters.region && destination.region !== activeFilters.region) {
      return false
    }
    
    // Tag filter
    if (activeFilters.tag && destination.tags && !destination.tags.includes(activeFilters.tag)) {
      return false
    }
    
    return true
  }) : []

  // Get featured destinations
  const featuredDestinations = countries ? countries.filter(country => country.featured) : []

  // Loading UI
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-full">
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      ))}
    </div>
  )

  return (
    <main>
      <PageHeader
        title="Study Destinations"
        description="Explore countries where you can pursue your international education with comprehensive information on universities, costs, and student life."
      />
      
      <Section>
        <Container>
          <SearchAndFilter
            placeholder="Search destinations..."
            onSearch={setSearchQuery}
            onFilter={setActiveFilters}
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
        </Container>
      </Section>
      
      <Section background="muted">
        <Container>
          <h2 className="text-2xl font-bold mb-6">Featured Destinations</h2>
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Error loading destinations. Please try again later.</p>
            </div>
          ) : featuredDestinations.length > 0 ? (
            <Grid cols={3} gap="lg">
              {featuredDestinations.map(destination => (
                <CountryCard 
                  key={destination.id} 
                  country={destination} 
                  variant="featured" 
                />
              ))}
            </Grid>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No featured destinations available.</p>
            </div>
          )}
        </Container>
      </Section>
      
      <Section>
        <Container>
          <h2 className="text-2xl font-bold mb-6">All Destinations</h2>
          {isLoading ? (
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
      
      <CallToAction
        title="Compare Study Destinations"
        description="Not sure which country is right for you? Use our comparison tool to evaluate costs, programs, and opportunities."
        primaryAction={{
          text: "Compare Countries",
          href: "/tools/compare-destinations"
        }}
        background="muted"
      />
    </main>
  )
} 