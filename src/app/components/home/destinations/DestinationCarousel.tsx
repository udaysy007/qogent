"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export function DestinationCarousel({
  children,
  autoPlay = true,
  interval = 5000,
  className
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = children.length;
  
  // Direction detection for swipe gesture
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };
  
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setTranslateX(diff);
  };
  
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(translateX) > 100) {
      if (translateX > 0) {
        // Swiped right, go to previous slide
        handlePrevSlide();
      } else {
        // Swiped left, go to next slide
        handleNextSlide();
      }
    }
    
    setTranslateX(0);
  };
  
  // Navigation handlers
  const handleNextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };
  
  const handlePrevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  
  // Auto play logic
  useEffect(() => {
    const resetTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    
    if (autoPlay) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        handleNextSlide();
      }, interval);
    }
    
    return () => {
      resetTimeout();
    };
  }, [activeIndex, autoPlay, interval]);
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden touch-pan-y",
        className
      )}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <div className="relative">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: translateX }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {children[activeIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(var(--primary))]",
              activeIndex === index
                ? "bg-[hsl(var(--primary))] w-4"
                : "bg-[hsl(var(--muted))]"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[hsl(var(--background))/75] text-[hsl(var(--foreground))] shadow-md backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]"
        onClick={handlePrevSlide}
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[hsl(var(--background))/75] text-[hsl(var(--foreground))] shadow-md backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]"
        onClick={handleNextSlide}
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
} 