"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedCTAButtonProps {
  href: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "xl";
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost";
  iconPosition?: "left" | "right";
  children: React.ReactNode;
  icon?: React.ReactNode;
  pulseEffect?: boolean;
  glowEffect?: boolean;
  hoverScale?: number;
}

export function AnimatedCTAButton({
  href,
  className,
  size = "lg",
  variant = "default",
  iconPosition = "right",
  children,
  icon,
  pulseEffect = false,
  glowEffect = true,
  hoverScale = 1.03
}: AnimatedCTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  
  // Only enable animations after component mounts
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  // Size classes based on the size prop
  const sizeClasses = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-9 rounded-md px-3 text-xs",
    lg: "h-11 md:h-12 rounded-xl px-8 text-base",
    xl: "h-14 rounded-xl px-10 text-lg"
  };
  
  // Variant classes based on the variant prop
  const variantClasses = {
    default: "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))] hover:opacity-90",
    primary: "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))] hover:opacity-90",
    secondary: "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))] hover:opacity-90",
    outline: "border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))/10] bg-transparent",
    ghost: "text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))/10] bg-transparent"
  };
  
  // Pulse animation for attracting attention
  const pulseAnimation = pulseEffect && hasMounted ? {
    animate: {
      scale: [1, 1.03, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  } : {};
  
  // Glow effect on hover
  const glowClasses = glowEffect && isHovered 
    ? "shadow-[0_0_20px_rgba(var(--primary-rgb)/0.5)]" 
    : "";
  
  return (
    <motion.div
      className="inline-block"
      whileHover={{ 
        scale: hoverScale 
      }}
      {...pulseAnimation}
    >
      <Button
        asChild
        className={cn(
          "font-medium transition-all duration-300",
          sizeClasses[size],
          variantClasses[variant],
          glowClasses,
          "relative overflow-hidden",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a href={href} className="flex items-center justify-center gap-2">
          {/* Left positioned icon */}
          {icon && iconPosition === "left" && (
            <motion.span
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.span>
          )}
          
          {/* Button text */}
          <span>{children}</span>
          
          {/* Right positioned icon */}
          {icon && iconPosition === "right" && (
            <motion.span
              animate={{ 
                x: isHovered ? 3 : 0,
                transition: { duration: 0.3 }
              }}
            >
              {icon}
            </motion.span>
          )}
          
          {/* Subtle hover effect - light sweep */}
          {hasMounted && (
            <motion.span
              className="absolute inset-0 w-full h-full bg-white dark:bg-white pointer-events-none"
              initial={{ x: "-100%", opacity: 0.3 }}
              animate={{ 
                x: isHovered ? "100%" : "-100%",
                opacity: isHovered ? 0.1 : 0
              }}
              transition={{ 
                duration: isHovered ? 0.5 : 0,
                ease: "easeInOut"
              }}
            />
          )}
        </a>
      </Button>
    </motion.div>
  );
} 