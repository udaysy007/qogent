"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BlogPostCardProps {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  date: string;
  readTime: number;
  category: {
    name: string;
    slug: string;
  };
  className?: string;
}

export function BlogPostCard({
  title,
  slug,
  excerpt,
  coverImage,
  date,
  readTime,
  category,
  className
}: BlogPostCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Format the date
  const formattedDate = format(new Date(date), "MMM d, yyyy");
  
  // Use a fallback image if the original image fails to load
  const imageSrc = imageError 
    ? `/images/blog/default-blog-image.jpg` 
    : coverImage;
  
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "group block overflow-hidden rounded-xl hover-lift transition-all duration-300",
        "bg-[hsl(var(--card))] border border-[hsl(var(--border))]",
        "h-full",
        className
      )}
    >
      <article className="flex flex-col h-full">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            onError={() => setImageError(true)}
            priority
          />
        </div>
        
        <div className="flex flex-col flex-grow p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-full">
              {category.name}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {readTime} min read
            </div>
          </div>
          
          <h3 className="text-xl font-semibold line-clamp-2 transition-colors group-hover:text-primary">
            {title}
          </h3>
          
          <p className="text-muted-foreground line-clamp-2">
            {excerpt}
          </p>
          
          <div className="mt-auto pt-4 text-sm text-muted-foreground">
            {formattedDate}
          </div>
        </div>
      </article>
    </Link>
  );
} 