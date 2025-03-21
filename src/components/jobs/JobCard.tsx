'use client'

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Building2, MapPin, Clock } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Job } from '@/types/job'

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="group transition-all hover:border-primary">
      <CardHeader>
        <CardTitle className="line-clamp-2 text-xl">
          <Link href={`/jobs/${job.slug}`} className="hover:text-primary">
            {job.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span>{job.department}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{job.type}</span>
          </div>
        </div>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {job.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Posted {formatDistanceToNow(new Date(job.posted_date))} ago
        </span>
        <Button asChild className="rounded-full">
          <Link href={`/jobs/${job.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 