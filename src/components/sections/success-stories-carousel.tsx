'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SuccessStory } from '@/lib/services/airtable'
import { Instagram } from 'lucide-react'

interface SuccessStoriesCarouselProps {
  stories: SuccessStory[]
}

const CARD_WIDTH = 360
const CARD_GAP = 20
const ANIMATION_DURATION = 1200

const Card = ({ story }: { story: SuccessStory }) => {
  return (
    <div
      className={cn(
        "flex-shrink-0 relative group",
        "w-[360px] h-[160px] rounded-lg p-6",
        "bg-card/50 backdrop-blur-sm border",
        "hover:bg-card/80 transition-colors duration-300"
      )}
    >
      <a 
        href={story.instagramUrl || '#'} 
        target="_blank" 
        rel="noopener noreferrer"
        className={cn(
          "absolute top-2 right-2 p-1.5 rounded-full",
          "bg-background/50 backdrop-blur-sm",
          "hover:bg-background/80 transition-colors duration-200",
          "text-muted-foreground hover:text-primary",
          !story.instagramUrl && "pointer-events-none opacity-50"
        )}
      >
        <Instagram size={16} />
      </a>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <img 
            src={story.imageUrl || '/images/success-stories/placeholder.jpg'} 
            alt={story.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base truncate mb-0.5">{story.name}</h3>
          <p className="text-sm text-muted-foreground truncate mb-0.5">{story.university}</p>
          <p className="text-sm text-muted-foreground mb-1">{story.course}</p>
          <p className="text-sm text-primary font-medium">{story.intake}</p>
        </div>
      </div>
    </div>
  )
}

const Row = ({ stories, direction = 'left' }: { 
  stories: SuccessStory[]
  direction?: 'left' | 'right'
}) => {
  // Calculate total width needed for animation
  const totalWidth = (CARD_WIDTH + CARD_GAP) * stories.length

  return (
    <motion.div 
      className="flex gap-[10px]"
      initial={{ x: direction === 'left' ? 0 : -totalWidth }}
      animate={{
        x: direction === 'left' ? -totalWidth : 0
      }}
      transition={{
        duration: ANIMATION_DURATION,
        repeat: Infinity,
        ease: "linear",
        repeatType: "reverse"
      }}
    >
      {/* First set of cards */}
      {stories.map((story) => (
        <Card key={`${story.id}-1`} story={story} />
      ))}
      {/* Duplicate set for seamless loop */}
      {stories.map((story) => (
        <Card key={`${story.id}-2`} story={story} />
      ))}
      {/* Third set to ensure smooth looping */}
      {stories.map((story) => (
        <Card key={`${story.id}-3`} story={story} />
      ))}
    </motion.div>
  )
}

export function SuccessStoriesCarousel({ stories }: SuccessStoriesCarouselProps) {
  // Create three different arrangements of stories for variety
  const row1Stories = [...stories]
  const row2Stories = [...stories].reverse()
  const row3Stories = [...stories].sort(() => Math.random() - 0.5)

  return (
    <section className="py-20 overflow-hidden">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            <span className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
              1000+ Success Stories
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from our satisfied students and see how we have transformed their academic journey. Our track record speaks for itself!
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="space-y-2">
          <Row stories={row1Stories} direction="left" />
          <Row stories={row2Stories} direction="right" />
          <Row stories={row3Stories} direction="left" />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <a 
          href="/success-stories" 
          className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
        >
          View All Success Stories →
        </a>
      </div>
    </section>
  )
} 