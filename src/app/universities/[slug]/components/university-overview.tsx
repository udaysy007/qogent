'use client'

import { University } from '@/types/university'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Building, 
  MapPin, 
  Waypoints, 
  Award, 
  Users,
  Calendar 
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface UniversityOverviewProps {
  university: University
}

export function UniversityOverview({ university }: UniversityOverviewProps) {
  // Extract unique fields from featured programs
  const uniqueFields = Array.from(
    new Set(university.featuredPrograms.map(program => program.field))
  ).slice(0, 5) // Limit to top 5

  // Process facilities into categories
  const categorizeAmenities = () => {
    // Default categories if none specified
    if (!university.studentLife.campusFacilities || university.studentLife.campusFacilities.length === 0) {
      return {
        academic: ['Libraries', 'Study rooms'],
        recreational: ['Sports facilities', 'Student center'],
        services: ['Cafeterias', 'Health services']
      }
    }

    const facilities = university.studentLife.campusFacilities
    
    return {
      academic: facilities.filter(f => 
        f.toLowerCase().includes('librar') || 
        f.toLowerCase().includes('study') || 
        f.toLowerCase().includes('lab') || 
        f.toLowerCase().includes('classroom')
      ),
      recreational: facilities.filter(f => 
        f.toLowerCase().includes('sport') || 
        f.toLowerCase().includes('gym') || 
        f.toLowerCase().includes('center') || 
        f.toLowerCase().includes('field') || 
        f.toLowerCase().includes('court')
      ),
      services: facilities.filter(f => 
        f.toLowerCase().includes('cafe') || 
        f.toLowerCase().includes('health') || 
        f.toLowerCase().includes('dining') || 
        f.toLowerCase().includes('service')
      )
    }
  }

  const campusAmenities = categorizeAmenities()

  return (
    <div className="flex flex-col gap-8">
      {/* Introduction section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">About {university.name}</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p>{university.description}</p>
        </div>
      </section>

      {/* Key facts grid */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Key Facts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-start gap-3">
              <Building className="h-5 w-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium text-sm">Institution Type</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {university.isPublic ? 'Public University' : 'Private University'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium text-sm">Location</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {university.location}, {university.countryName}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium text-sm">Founded</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {university.foundingYear}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-start gap-3">
              <Award className="h-5 w-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium text-sm">Ranking</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {university.ranking?.qs && (
                    <Badge variant="outline" className="bg-primary/5 text-xs">
                      QS: #{university.ranking.qs}
                    </Badge>
                  )}
                  {university.ranking?.the && (
                    <Badge variant="outline" className="bg-primary/5 text-xs">
                      THE: #{university.ranking.the}
                    </Badge>
                  )}
                  {university.ranking?.arwu && (
                    <Badge variant="outline" className="bg-primary/5 text-xs">
                      ARWU: #{university.ranking.arwu}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-start gap-3">
              <Users className="h-5 w-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium text-sm">Student Body</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {university.studentPopulation.toLocaleString()} students
                  {university.internationalStudentPercentage > 0 && (
                    <span> ({university.internationalStudentPercentage}% international)</span>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-start gap-3">
              <Waypoints className="h-5 w-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium text-sm">Popular Fields of Study</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {uniqueFields.map((field, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {field}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Campus facilities */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Campus Facilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-3 border-b pb-2">Academic Facilities</h4>
              <ul className="space-y-1">
                {campusAmenities.academic.map((facility, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70"></span>
                    {facility}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-3 border-b pb-2">Recreational Facilities</h4>
              <ul className="space-y-1">
                {campusAmenities.recreational.map((facility, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70"></span>
                    {facility}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-3 border-b pb-2">Student Services</h4>
              <ul className="space-y-1">
                {campusAmenities.services.map((facility, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70"></span>
                    {facility}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Housing section */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Student Housing</h3>
        <Card>
          <CardContent className="p-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p>{university.studentLife.housing}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* International support */}
      <section>
        <h3 className="text-xl font-semibold mb-4">International Student Support</h3>
        <Card>
          <CardContent className="p-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p>{university.studentLife.internationalSupport}</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
} 