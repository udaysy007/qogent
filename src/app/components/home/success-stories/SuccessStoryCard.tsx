"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SuccessStoryCardProps {
  name: string;
  image: string;
  university: string;
  country: string;
  countryFlag: string;
  quote: string;
  course: string;
  year: string;
  className?: string;
  onVideoClick?: () => void;
  hasVideo?: boolean;
}

export function SuccessStoryCard({
  name,
  image,
  university,
  country,
  countryFlag,
  quote,
  course,
  year,
  className,
  onVideoClick,
  hasVideo = false
}: SuccessStoryCardProps) {
  return (
    <div
      className={cn(
        "group card-modern rounded-xl overflow-hidden h-full",
        "bg-[hsl(var(--card))] shadow-md border border-[hsl(var(--border))]",
        "transition-all duration-300 hover-lift",
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Top section with image and info */}
        <div className="relative">
          <div className="relative h-60 overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 384px"
            />
            
            {/* Country flag badge */}
            <div className="absolute bottom-4 left-4 flex items-center bg-[hsl(var(--background))/75] backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md">
              <div className="relative h-5 w-7 mr-2 overflow-hidden rounded-sm">
                <Image
                  src={countryFlag}
                  alt={country}
                  fill
                  className="object-cover"
                  sizes="28px"
                />
              </div>
              <span className="text-xs font-medium">{country}</span>
            </div>
            
            {/* Video play button */}
            {hasVideo && (
              <button
                onClick={onVideoClick}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[hsl(var(--primary))/85] text-[hsl(var(--primary-foreground))] flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]"
                aria-label={`Watch ${name}'s story`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 ml-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        {/* Content section */}
        <div className="p-5 flex flex-col flex-grow">
          <div>
            <h3 className="text-lg font-bold mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{course}, {year}</p>
            <p className="text-sm font-medium mb-3">{university}</p>
          </div>
          
          <blockquote className="mt-auto">
            <p className="text-sm italic text-muted-foreground line-clamp-3">"{quote}"</p>
          </blockquote>
          
          {hasVideo && (
            <button
              onClick={onVideoClick}
              className="mt-4 text-sm font-medium text-[hsl(var(--primary))] flex items-center focus:outline-none focus-visible:underline"
            >
              Watch full story
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 