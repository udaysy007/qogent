import Link from 'next/link'
import { GraduationCap } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export default function UniversityNotFound() {
  return (
    <div className="py-20">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">University Not Found</h1>
          
          <p className="text-muted-foreground mb-8">
            We couldn't find the university you're looking for. It may have been removed or the URL might be incorrect.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/universities">
                View All Universities
              </Link>
            </Button>
            
            <Button variant="outline" asChild>
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
} 