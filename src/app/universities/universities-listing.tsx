'use client'

import { useState } from 'react'
import { UniversityCard } from '@/components/cards/university-card'
import { useUniversityCards } from '@/hooks/use-universities'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { 
  GraduationCap, 
  ChevronDown,
  MapPin,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function UniversitiesListing() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  // Fetch university cards data
  const { data: universityCards, isLoading, error } = useUniversityCards()

  // Extract unique countries for filter options
  const allCountries = universityCards 
    ? [...new Set(universityCards.map(uni => uni.countryName))]
    : []

  // Filter universities based on selected country
  const filteredUniversities = universityCards
    ? universityCards.filter(uni => {
        // Filter by country
        if (selectedCountry && uni.countryName !== selectedCountry) {
          return false
        }
        
        return true
      })
    : []

  return (
    <>
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Featured Universities</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore top universities across our destination countries. For a complete list,
          please visit our country-specific websites.
        </p>
      </div>
      
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <Select
            value={selectedCountry || "all"}
            onValueChange={(value) => setSelectedCountry(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {allCountries.map((country) => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <p>
            <span className="font-medium">{filteredUniversities.length}</span> {filteredUniversities.length === 1 ? 'university' : 'universities'} shown
          </p>
        </div>
      </div>
      
      {/* University Grid */}
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
      ) : error ? (
        <div className="p-12 text-center bg-muted rounded-lg border">
          <p className="text-lg text-muted-foreground">
            Error loading universities. Please try again later.
          </p>
        </div>
      ) : filteredUniversities.length === 0 ? (
        <div className="p-12 text-center bg-muted/50 border rounded-lg">
          <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No Universities Found</h3>
          <p className="text-muted-foreground mb-4">
            Try selecting a different country.
          </p>
          {selectedCountry && (
            <Button 
              variant="outline" 
              onClick={() => setSelectedCountry(null)}
            >
              Show All Countries
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.map((university) => (
              <UniversityCard
                key={university.id}
                university={university}
                variant="default"
              />
            ))}
          </div>
          
          {/* Country-specific links */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-semibold mb-4">Looking for more universities?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {allCountries.map(country => (
                <Button 
                  key={country} 
                  variant="outline" 
                  className="justify-between group"
                  asChild
                >
                  <a 
                    href={`https://ms-in-${country.toLowerCase().replace(/\s+/g, '')}.qogent.com`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between"
                  >
                    <span>View all {country} universities</span>
                    <ExternalLink className="h-4 w-4 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
} 