'use client'

import { University } from '@/types/university'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, Users } from 'lucide-react'

interface UniversityOverviewProps {
  university: University
}

export function UniversityOverview({ university }: UniversityOverviewProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">About {university.name}</h2>
        <p className="text-muted-foreground">{university.description}</p>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Popular Fields of Study</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(university.featuredPrograms.map(p => p.field))).map((field, i) => (
            <Badge key={i} variant="secondary" className="text-sm py-1">
              {field}
            </Badge>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Student Life</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Housing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{university.studentLife.housing}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Campus Life
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{university.studentLife.clubs}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {university.studentLife.campusFacilities.slice(0, 4).map((facility, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {facility}
                  </Badge>
                ))}
                {university.studentLife.campusFacilities.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{university.studentLife.campusFacilities.length - 4} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 