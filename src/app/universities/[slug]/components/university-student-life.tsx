'use client'

import { useState } from 'react'
import { University, Testimonial } from '@/types/university'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import { 
  Home, 
  Utensils, 
  Landmark, 
  Users, 
  Heart, 
  Star, 
  Coffee,
  ImageIcon,
  Quote,
  Gamepad2,
  GraduationCap
} from 'lucide-react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'

interface UniversityStudentLifeProps {
  university: University
}

export function UniversityStudentLife({ university }: UniversityStudentLifeProps) {
  const hasTestimonials = university.qogentMetrics.testimonials && university.qogentMetrics.testimonials.length > 0
  const [isMobile, setIsMobile] = useState(false)

  // Function to format club names better
  const formatClubsList = (clubsString: string) => {
    if (!clubsString) return []
    
    // If the string contains commas, split by commas
    if (clubsString.includes(',')) {
      return clubsString.split(',').map(club => club.trim())
    }
    
    // If the string contains bullet points, split by bullet points
    if (clubsString.includes('•')) {
      return clubsString.split('•').map(club => club.trim()).filter(Boolean)
    }
    
    // If the string contains newlines, split by newlines
    if (clubsString.includes('\n')) {
      return clubsString.split('\n').map(club => club.trim()).filter(Boolean)
    }
    
    // Otherwise, try to detect patterns and split intelligently
    // For example, if we see "Clubs include: A, B, C" or "A. B. C." etc.
    const clubsMatch = clubsString.match(/include[s]?:?\s*(.*)/i)
    if (clubsMatch && clubsMatch[1]) {
      return clubsMatch[1].split(/[,.;]/).map(club => club.trim()).filter(Boolean)
    }
    
    // If all else fails, just return the raw string in an array
    return [clubsString]
  }

  // Process clubs list
  const clubsList = formatClubsList(university.studentLife.clubs)

  // Group clubs by category (simple algorithm)
  const categorizeClubs = (clubs: string[]) => {
    const categories = {
      academic: [] as string[],
      cultural: [] as string[],
      sports: [] as string[],
      social: [] as string[],
      other: [] as string[]
    }
    
    clubs.forEach(club => {
      const lowercaseClub = club.toLowerCase()
      
      if (
        lowercaseClub.includes('societ') || 
        lowercaseClub.includes('association') || 
        lowercaseClub.includes('council') || 
        lowercaseClub.includes('union') ||
        lowercaseClub.includes('academic') ||
        lowercaseClub.includes('study') ||
        lowercaseClub.includes('research')
      ) {
        categories.academic.push(club)
      } else if (
        lowercaseClub.includes('cultur') || 
        lowercaseClub.includes('art') || 
        lowercaseClub.includes('music') || 
        lowercaseClub.includes('dance') ||
        lowercaseClub.includes('theatre') ||
        lowercaseClub.includes('international')
      ) {
        categories.cultural.push(club)
      } else if (
        lowercaseClub.includes('sport') || 
        lowercaseClub.includes('athlet') || 
        lowercaseClub.includes('team') || 
        lowercaseClub.includes('club') ||
        lowercaseClub.includes('football') ||
        lowercaseClub.includes('soccer') ||
        lowercaseClub.includes('basketball') ||
        lowercaseClub.includes('tennis') ||
        lowercaseClub.includes('swimming')
      ) {
        categories.sports.push(club)
      } else if (
        lowercaseClub.includes('social') || 
        lowercaseClub.includes('community') || 
        lowercaseClub.includes('volunteer') || 
        lowercaseClub.includes('charity')
      ) {
        categories.social.push(club)
      } else {
        categories.other.push(club)
      }
    })
    
    return categories
  }

  const clubCategories = categorizeClubs(clubsList)

  return (
    <div className="flex flex-col gap-8">
      {/* Introduction section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Student Life at {university.name}</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            Experience the vibrant student community at {university.name}. From 
            comfortable accommodation options to diverse student clubs and activities, 
            here's what you can expect from campus life.
          </p>
        </div>
      </section>

      {/* Housing section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Home className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Housing Options</h3>
        </div>
        <Card className="overflow-hidden">
          <div className="p-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p>{university.studentLife.housing}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-primary/5">
                On-campus residence halls
              </Badge>
              <Badge variant="outline" className="bg-primary/5">
                Off-campus apartments
              </Badge>
              <Badge variant="outline" className="bg-primary/5">
                Shared accommodations
              </Badge>
            </div>
          </div>
        </Card>
      </section>

      {/* Campus facilities */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Landmark className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Campus Facilities</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">Academic Facilities</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pb-5">
              <ul className="space-y-1.5">
                {university.studentLife.campusFacilities
                  .filter(facility => 
                    facility.toLowerCase().includes('librar') || 
                    facility.toLowerCase().includes('lab') || 
                    facility.toLowerCase().includes('study') || 
                    facility.toLowerCase().includes('class')
                  )
                  .map((facility, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70 mt-1.5 mr-2"></span>
                      <span className="text-sm">{facility}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Coffee className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">Dining & Recreation</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pb-5">
              <ul className="space-y-1.5">
                {university.studentLife.campusFacilities
                  .filter(facility => 
                    facility.toLowerCase().includes('cafe') || 
                    facility.toLowerCase().includes('dining') || 
                    facility.toLowerCase().includes('food') || 
                    facility.toLowerCase().includes('court') ||
                    facility.toLowerCase().includes('gym') ||
                    facility.toLowerCase().includes('center')
                  )
                  .map((facility, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70 mt-1.5 mr-2"></span>
                      <span className="text-sm">{facility}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">Health & Wellness</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pb-5">
              <ul className="space-y-1.5">
                {university.studentLife.campusFacilities
                  .filter(facility => 
                    facility.toLowerCase().includes('health') || 
                    facility.toLowerCase().includes('medical') || 
                    facility.toLowerCase().includes('clinic') || 
                    facility.toLowerCase().includes('counsel') ||
                    facility.toLowerCase().includes('support')
                  )
                  .map((facility, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70 mt-1.5 mr-2"></span>
                      <span className="text-sm">{facility}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Student clubs */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Student Clubs & Organizations</h3>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="font-medium mb-3 pb-2 border-b flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span>Academic Clubs</span>
                </h4>
                <ul className="space-y-2">
                  {clubCategories.academic.map((club, index) => (
                    <li key={index} className="text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70 inline-block mr-2"></span>
                      {club}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 pb-2 border-b flex items-center gap-2">
                  <Gamepad2 className="h-4 w-4 text-primary" />
                  <span>Sports & Athletics</span>
                </h4>
                <ul className="space-y-2">
                  {clubCategories.sports.map((club, index) => (
                    <li key={index} className="text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70 inline-block mr-2"></span>
                      {club}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 pb-2 border-b flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-primary" />
                  <span>Cultural Groups</span>
                </h4>
                <ul className="space-y-2">
                  {clubCategories.cultural.map((club, index) => (
                    <li key={index} className="text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70 inline-block mr-2"></span>
                      {club}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 pb-2 border-b flex items-center gap-2">
                  <Heart className="h-4 w-4 text-primary" />
                  <span>Social & Community</span>
                </h4>
                <ul className="space-y-2">
                  {[...clubCategories.social, ...clubCategories.other].map((club, index) => (
                    <li key={index} className="text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70 inline-block mr-2"></span>
                      {club}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* International support */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Landmark className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">International Student Support</h3>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p>{university.studentLife.internationalSupport}</p>
            </div>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-primary/5 rounded-lg p-4">
                <h4 className="font-medium text-sm mb-2">Orientation Programs</h4>
                <p className="text-xs text-muted-foreground">
                  Special orientation sessions for international students to help you adjust to campus life.
                </p>
              </div>
              
              <div className="bg-primary/5 rounded-lg p-4">
                <h4 className="font-medium text-sm mb-2">Visa Assistance</h4>
                <p className="text-xs text-muted-foreground">
                  Support with visa requirements, regulations, and immigration matters.
                </p>
              </div>
              
              <div className="bg-primary/5 rounded-lg p-4">
                <h4 className="font-medium text-sm mb-2">Cultural Events</h4>
                <p className="text-xs text-muted-foreground">
                  Celebrations of diverse cultures and international holidays throughout the year.
                </p>
              </div>
              
              <div className="bg-primary/5 rounded-lg p-4">
                <h4 className="font-medium text-sm mb-2">Language Support</h4>
                <p className="text-xs text-muted-foreground">
                  Language courses, conversation partners, and writing assistance programs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Student testimonials */}
      {hasTestimonials && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Quote className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">Student Testimonials</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {university.qogentMetrics.testimonials!.map((testimonial, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4 items-start">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      {testimonial.studentImage ? (
                        <AvatarImage src={testimonial.studentImage} alt={testimonial.studentName} />
                      ) : (
                        <AvatarFallback>
                          {testimonial.studentName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{testimonial.studentName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.program}, {testimonial.year}
                      </p>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3.5 w-3.5 ${i < testimonial.rating ? 'text-primary fill-primary' : 'text-muted'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <blockquote className="mt-4 italic text-sm relative pl-4 border-l-2 border-primary/30">
                    "{testimonial.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  )
} 