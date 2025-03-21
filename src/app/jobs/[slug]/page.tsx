'use client'

import { notFound } from 'next/navigation'
import { ArrowLeft, Building2, MapPin, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useJobBySlug } from '@/hooks/use-jobs'
import Link from 'next/link'
import * as React from 'react'

export default function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  // Use React.use() to unwrap params
  const { slug } = React.use(params)
  const { data: job, isLoading, error } = useJobBySlug(slug)

  if (error) {
    return notFound()
  }

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="space-y-4">
            <div className="h-8 w-96 animate-pulse rounded bg-muted" />
            <div className="h-4 w-72 animate-pulse rounded bg-muted" />
          </div>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 animate-pulse rounded bg-muted" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return notFound()
  }

  if (!job.is_active) {
    return (
      <main className="container py-12">
        <div className="mx-auto max-w-3xl space-y-8">
          <Button variant="ghost" className="-ml-4 rounded-full" asChild>
            <Link href="/jobs" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Jobs
            </Link>
          </Button>

          <div className="rounded-lg border border-destructive bg-destructive/10 p-8 text-center">
            <h1 className="mb-4 text-2xl font-bold text-destructive">Position No Longer Available</h1>
            <p className="mb-6 text-muted-foreground">
              We're sorry, but this position is no longer accepting applications. Please check our other open positions.
            </p>
            <Button asChild className="rounded-full">
              <Link href="/jobs">View Open Positions</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <Button variant="ghost" className="-ml-4 rounded-full" asChild>
          <Link href="/jobs" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Link>
        </Button>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter">{job.title}</h1>
          <div className="flex flex-wrap gap-4 text-muted-foreground">
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
            <div className="text-sm">
              Posted {formatDistanceToNow(new Date(job.posted_date))} ago
            </div>
          </div>
        </div>

        <Separator />

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>About the Role</h2>
          <p>{job.description}</p>

          <h2>Key Responsibilities</h2>
          <ul>
            {job.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>

          <h2>Requirements</h2>
          <ul>
            {job.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>

          {job.nice_to_have && job.nice_to_have.length > 0 && (
            <>
              <h2>Nice to Have</h2>
              <ul>
                {job.nice_to_have.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <Separator />

        <div className="rounded-lg border bg-card p-6">
          <div className="mb-6 space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Apply Now</h2>
            <p className="text-muted-foreground">
              Ready to join our mission? Fill out the application form below.
            </p>
          </div>
          
          {/* Tally Form Embed */}
          <iframe
            src={job.application_url}
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Job Application Form"
          />
        </div>
      </div>
    </main>
  )
} 