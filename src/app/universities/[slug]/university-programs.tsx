'use client'

import { UniversityProgram } from '@/types/university'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface UniversityProgramsProps {
  programs: UniversityProgram[]
}

export function UniversityPrograms({ programs }: UniversityProgramsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Featured Programs</h2>
        <p className="text-muted-foreground mb-6">
          Below are some of the most popular programs. This is not a complete list of all available programs.
        </p>
        
        <div className="space-y-6">
          {programs.map(program => (
            <ProgramCard key={program.id} program={program} />
          ))}
          
          {programs.length === 0 && (
            <div className="text-center p-8 bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">No programs listed yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Program Card Component
function ProgramCard({ program }: { program: UniversityProgram }) {
  return (
    <Card className={cn(
      "overflow-hidden transition-all",
      program.isPopular ? "border-primary/30" : ""
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{program.name}</CardTitle>
            <CardDescription>
              {program.degree} • {program.field}
            </CardDescription>
          </div>
          {program.isPopular && (
            <Badge variant="default">Popular</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="text-sm space-y-4">
        <p className="text-muted-foreground">{program.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Language:</p>
            <p className="font-medium">{program.language}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Duration:</p>
            <p className="font-medium">{program.duration}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Tuition Fee:</p>
            <p className="font-medium">{program.tuitionFee}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Application Deadlines:</p>
            <p className="font-medium">{program.applicationDeadlines}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Program Details
        </Button>
      </CardFooter>
    </Card>
  )
} 