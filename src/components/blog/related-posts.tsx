'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export interface RelatedPost {
  id: string
  slug: string
  title: string
  category: string
  image: string
}

export function RelatedPosts({ posts }: { posts?: RelatedPost[] }) {
  if (!posts || posts.length === 0) {
    return null
  }
  
  return (
    <section className="py-12 not-prose">
      <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
      
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-md dark:hover:shadow-primary/10 border-border/60">
            <Link href={post.slug} className="block h-full">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="px-2 py-1 text-xs font-medium rounded-full">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardFooter className="p-4 pt-0 mt-auto flex justify-end items-center">
                <div className="text-sm text-primary flex items-center gap-1 font-medium hover:underline">
                  Read article <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </div>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  )
} 