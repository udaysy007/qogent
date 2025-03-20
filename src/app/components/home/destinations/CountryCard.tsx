"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CountryCardProps {
  name: string;
  slug: string;
  flagSrc: string;
  imageSrc: string;
  universityCount: number;
  description: string;
  className?: string;
  index?: number;
}

export function CountryCard({
  name,
  slug,
  flagSrc,
  imageSrc,
  universityCount,
  description,
  className,
  index = 0
}: CountryCardProps) {
  return (
    <Link 
      href={`/destinations/${slug}`}
      className={cn(
        "group block relative overflow-hidden rounded-xl card-modern hover-lift transition-all", 
        "bg-[hsl(var(--card))] shadow-md border border-[hsl(var(--border))]",
        "h-full",
        className
      )}
    >
      {/* Card Image */}
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <Image
          src={imageSrc}
          alt={`${name} universities`}
          fill
          className="object-cover transform transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Flag */}
        <div className="absolute top-4 right-4 h-8 w-12 rounded-md overflow-hidden shadow-lg">
          <Image
            src={flagSrc}
            alt={`${name} flag`}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-5 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">{name}</h3>
          <span className="text-sm font-medium px-2 py-1 rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]">
            {universityCount}+ universities
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {description}
        </p>
        
        <span className="mt-auto inline-flex items-center text-sm font-medium text-[hsl(var(--primary))]">
          Explore universities
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
} 