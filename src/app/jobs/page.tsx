import { Metadata } from 'next'
import { JobList } from '@/components/jobs/JobList'

export const metadata: Metadata = {
  title: 'Careers at Qogent',
  description:
    'Join our mission to democratize access to international education. Explore career opportunities at Qogent.',
}

export default function JobsPage() {
  return (
    <main className="container space-y-12 py-12 md:py-16">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Join Our Mission
        </h1>
        <p className="text-xl text-muted-foreground">
          Help us democratize access to international education and shape the future
          of global learning.
        </p>
      </div>

      <div className="mx-auto max-w-5xl">
        <JobList />
      </div>
    </main>
  )
} 