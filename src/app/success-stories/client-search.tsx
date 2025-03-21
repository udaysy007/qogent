'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Grid } from '@/components/ui/grid'
import { SuccessStoryCard } from '@/components/success-story-card'
import { SuccessStory } from '@/lib/services/airtable'
import { cn } from '@/lib/utils'

interface ClientSearchProps {
  initialStories: SuccessStory[]
}

export function ClientSearch({ initialStories }: ClientSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStories = initialStories.filter(story => 
    story.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.intake.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (story.course && story.course.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="container px-4 md:px-6">
      <div className="space-y-10">
        {/* Search bar */}
        <div className={cn(
          "group relative w-full max-w-2xl mx-auto",
          "transition-all duration-300"
        )}>
          <div className={cn(
            "absolute inset-0 -z-10",
            "bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5",
            "rounded-full blur-xl",
            "opacity-0 group-hover:opacity-100",
            "transition-all duration-500"
          )} />
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search by name, university, course or intake..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full py-3 pl-11 pr-4",
                "bg-background/50 backdrop-blur-xl",
                "border border-border/50",
                "rounded-full",
                "text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary/20",
                "transition-all duration-300"
              )}
            />
          </div>
        </div>

        {/* Success stories grid */}
        <div className="relative">
          {filteredStories.length > 0 ? (
            <Grid cols={{ default: 1, sm: 2, md: 3 }} gap="lg">
              {filteredStories.map(story => (
                <SuccessStoryCard
                  key={story.id}
                  name={story.name}
                  university={story.university}
                  course={story.course}
                  intake={story.intake}
                  imageUrl={story.imageUrl || '/images/success-stories/placeholder.jpg'}
                  instagramUrl={story.instagramUrl}
                />
              ))}
            </Grid>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No success stories found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 