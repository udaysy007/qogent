'use client'

import { useState } from 'react'
import { UniversityCard } from '@/components/cards/university-card'
import { useUniversities } from '@/hooks/use-universities'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { 
  GraduationCap, 
  MapPin,
  ExternalLink,
  Search
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { University } from '@/types/university'

// Define the UniversityCard type based on what's needed for the card component
interface UniversityCardType extends University {
  featuredFields: string[];
  qogentSuccessRate: string;
}

export function UniversitiesListing() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { data: universities, error } = useUniversities()

  // Get unique countries from universities
  const allCountries = [...new Set(universities?.map((uni: University) => uni.countryName) || [])]

  // Filter universities based on country and search query
  const filteredUniversities = universities?.filter((university: University) => {
    const matchesCountry = !selectedCountry || university.countryName === selectedCountry
    const matchesSearch = !searchQuery || 
      university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.countryName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCountry && matchesSearch
  })

  // Transform University to UniversityCardType
  const transformedUniversities = filteredUniversities?.map((university: University): UniversityCardType => ({
    ...university,
    featuredFields: ['Business', 'Engineering', 'Computer Science'], // Default featured fields
    qogentSuccessRate: '85%' // Default success rate
  })) || []

  return (
    <>
      {/* Search and Filter Section */}
      <div className="space-y-6 mb-12">
        {/* Search Bar - styled like blog search */}
        <div className="group relative w-full max-w-2xl mx-auto transition-all duration-300">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search universities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full py-3 pl-11 pr-4",
                "bg-background/50 backdrop-blur-xl",
                "border border-border/50",
                "rounded-full",
                "text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary/20",
                "transition-all duration-300"
              )}
            />
          </div>
        </div>
        
        {/* Country Filter */}
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <Select
              value={selectedCountry || "all"}
              onValueChange={(value) => setSelectedCountry(value === "all" ? null : value)}
            >
              <SelectTrigger className="w-[200px] bg-background/50 border-border/50 focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {allCountries.map((country: string) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{transformedUniversities.length}</span> {transformedUniversities.length === 1 ? 'university' : 'universities'} shown
          </div>
        </div>
      </div>
      
      {/* Results Section */}
      {error ? (
        <div className="p-12 text-center bg-muted rounded-lg border">
          <p className="text-lg text-muted-foreground">
            Error loading universities. Please try again later.
          </p>
        </div>
      ) : transformedUniversities.length === 0 ? (
        <div className="p-12 text-center bg-muted/50 border rounded-lg">
          <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No Universities Found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or selecting a different country.
          </p>
          {(selectedCountry || searchQuery) && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedCountry(null)
                setSearchQuery("")
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 transition-all duration-300">
            {!universities ? (
              // Skeleton loading state
              <>
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="group relative overflow-hidden">
                    <div className="animate-pulse space-y-4 p-6">
                      <Skeleton className="h-40 w-full rounded-lg bg-muted/50" />
                      <Skeleton className="h-4 w-3/4 bg-muted/50" />
                      <Skeleton className="h-4 w-1/2 bg-muted/50" />
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-full bg-muted/50" />
                        <Skeleton className="h-3 w-5/6 bg-muted/50" />
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-16 rounded-full bg-muted/50" />
                        <Skeleton className="h-8 w-16 rounded-full bg-muted/50" />
                      </div>
                    </div>
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </Card>
                ))}
              </>
            ) : (
              transformedUniversities.map((university: UniversityCardType) => (
                <UniversityCard
                  key={university.id}
                  university={university}
                  variant="default"
                />
              ))
            )}
          </div>
          
          {/* Country-specific links */}
          <div className="mt-16 pt-12 border-t border-border/5">
            <h3 className="text-xl font-semibold mb-6">Looking for more universities?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {allCountries.map((country: string) => (
                <Button 
                  key={country} 
                  variant="outline" 
                  className="justify-between group hover:bg-accent/50 transition-colors duration-300"
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