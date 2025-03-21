"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/services/blog";

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
}

export function BlogCard({ post, priority = false }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="flex flex-col space-y-4">
        <div className="relative aspect-[1.5] overflow-hidden rounded-xl">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "object-cover transition-transform duration-300",
              "group-hover:scale-105"
            )}
            priority={priority}
          />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0",
            "transition-opacity duration-300 group-hover:opacity-100"
          )} />
        </div>
        
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{post.category}</Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {post.read_time} min read
            </div>
          </div>
          <h3 className={cn(
            "text-xl font-semibold",
            "transition-colors group-hover:text-primary"
          )}>
            {post.title}
          </h3>
          <p className="text-muted-foreground line-clamp-2">
            {post.description}
          </p>
        </div>
      </article>
    </Link>
  );
} 