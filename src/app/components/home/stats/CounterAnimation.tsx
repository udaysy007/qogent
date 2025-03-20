"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface CounterAnimationProps {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  easing?: "linear" | "easeOut" | "easeIn" | "easeInOut";
  bounce?: boolean;
  highlightColor?: string;
  ariaLabel?: string;
}

/**
 * CounterAnimation - An animated counter component that counts from a start value to an end value
 * when scrolled into view. Supports various animation options and formatting.
 */
export function CounterAnimation({
  start = 0,
  end,
  duration = 1.5,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  easing = "easeOut",
  bounce = false,
  highlightColor,
  ariaLabel
}: CounterAnimationProps) {
  const [count, setCount] = useState(start);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  // Easing functions
  const easingFunctions = {
    linear: (t: number) => t,
    easeIn: (t: number) => t * t,
    easeOut: (t: number) => t * (2 - t),
    easeInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  };

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        let progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // Apply easing function
        progress = easingFunctions[easing](progress);
        
        // Calculate current count
        let currentCount = progress * (end - start) + start;
        
        // Apply bounce effect at the end if enabled
        if (bounce && progress > 0.95) {
          const bounceAmount = Math.sin((progress - 0.95) * 20) * (end - start) * 0.03;
          currentCount += bounceAmount;
        }
        
        setCount(currentCount);
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          // Animation completed
          setIsHighlighted(true);
          setTimeout(() => setIsHighlighted(false), 700);
        }
      };
      
      // Apply delay if provided
      setTimeout(() => {
        window.requestAnimationFrame(step);
      }, delay * 1000);
    }
  }, [isInView, hasAnimated, start, end, duration, delay, easing, bounce, easingFunctions]);
  
  // Format the count with proper internationalization
  const formattedCount = typeof count === 'number' 
    ? new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(count)
    : count.toFixed(decimals);
  
  return (
    <span 
      ref={containerRef} 
      className={cn(
        "transition-colors duration-300 font-bold",
        isHighlighted && highlightColor ? highlightColor : "",
        className
      )}
      aria-label={ariaLabel || `${prefix}${end}${suffix}`}
      role="text"
    >
      {prefix}{formattedCount}{suffix}
    </span>
  );
} 