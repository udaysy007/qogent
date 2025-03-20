"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedHeadlineProps {
  text: string;
  className?: string;
  cursorClassName?: string;
  typingSpeed?: number;
}

export function AnimatedHeadline({
  text,
  className = "text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
  cursorClassName = "inline-block w-[4px] h-[1em] bg-[hsl(var(--primary))] ml-1 animate-pulse-subtle",
  typingSpeed = 100
}: AnimatedHeadlineProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, typingSpeed]);

  return (
    <motion.h1 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
      <span 
        className={cursorClassName}
        style={{ opacity: currentIndex >= text.length ? 0 : 1 }}
      />
    </motion.h1>
  );
} 