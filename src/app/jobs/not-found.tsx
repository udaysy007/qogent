'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function JobNotFound() {
  return (
    <main className="container py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <Button variant="ghost" className="-ml-4 rounded-full" asChild>
          <Link href="/jobs" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Link>
        </Button>

        <div className="rounded-lg border bg-card p-8 text-center">
          <div className="mb-6">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">Job Not Found</h1>
            <p className="text-muted-foreground">
              We couldn't find the job position you're looking for. It may have been removed or the URL might be incorrect.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Here are a few things you can try:
            </p>
            <ul className="mx-auto max-w-md space-y-2 text-sm text-muted-foreground">
              <li>• Check the URL for any typos</li>
              <li>• Browse our current job openings</li>
              <li>• Use the search function to find similar positions</li>
            </ul>
          </div>

          <div className="mt-8">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/jobs">View All Job Openings</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
} 