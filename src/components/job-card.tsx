import Link from "next/link"
import { Calendar, MapPin, Briefcase, Building } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface JobCardProps {
  job: {
    id: number
    title: string
    company: string
    location: string
    country: string
    type: string
    hours: string
    posted: string
    description: string
    skills: string[]
  }
}

export function JobCard({ job }: JobCardProps) {
  const {
    id,
    title,
    company,
    location,
    type,
    hours,
    posted,
    description,
    skills,
  } = job

  return (
    <Card className="overflow-hidden hover-lift">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant={
                type === "part-time" ? "default" : 
                type === "internship" ? "secondary" : 
                type === "seasonal" ? "outline" : "destructive"
              }>
                {type}
              </Badge>
              <span className="text-sm text-muted-foreground">Posted {posted}</span>
            </div>
            
            <h3 className="text-xl font-medium">{title}</h3>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <div className="flex items-center gap-1.5">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{company}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{hours}</span>
              </div>
            </div>
            
            <p className="text-muted-foreground">{description}</p>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button asChild>
              <Link href={`/jobs/${id}`}>
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
} 