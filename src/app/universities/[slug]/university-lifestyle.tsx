'use client'

import { StudentLife } from '@/types/university'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, Home, Users, Lightbulb, Globe } from 'lucide-react'

interface UniversityLifestyleProps {
  studentLife: StudentLife
}

export function UniversityLifestyle({ studentLife }: UniversityLifestyleProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Student Life</h2>
        <p className="text-muted-foreground mb-6">
          Get to know what it's like to be a student, from housing options to campus facilities and student clubs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                Housing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{studentLife.housing}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Clubs & Organizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{studentLife.clubs}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Campus Facilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {studentLife.campusFacilities.map((facility, i) => (
                  <Badge key={i} variant="secondary" className="text-sm">
                    {facility}
                  </Badge>
                ))}
                
                {studentLife.campusFacilities.length === 0 && (
                  <p className="text-muted-foreground">No facilities information available.</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                International Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{studentLife.internationalSupport}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 