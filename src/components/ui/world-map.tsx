"use client";

import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import DottedMap from "dotted-map";
import Image from "next/image";
import { useTheme } from "next-themes";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

interface PointType {
  x: number;
  y: number;
}

interface CountryType {
  lat: number;
  lng: number;
  label?: string;
}

interface PathType {
  path: string;
  start: PointType;
  end: PointType;
  country: CountryType;
}

// Change to default export for proper lazy loading
export default function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  
  // State to track loading stages for progressive enhancement
  const [loadingStage, setLoadingStage] = useState<'initial' | 'map' | 'dots' | 'paths' | 'complete'>('initial');
  
  // Memoize the map generation to prevent recalculation on re-renders
  const { svgMap, uniqueStudyCountries, projectedPaths } = useMemo(() => {
    // Create map with reduced configuration
    const map = new DottedMap({ 
      height: 80, // Reduced from 100
      grid: "diagonal" 
    });
    
    const svgMap = map.getSVG({
      radius: 0.22,
      color: theme === "dark" ? "#FFFFFF40" : "#00000040",
      shape: "circle",
      backgroundColor: "transparent",
    });
    
    // Project points function - simplified calculation
    const projectPoint = (lat: number, lng: number): PointType => {
      const x = (lng + 180) * (800 / 360);
      const y = (90 - lat) * (400 / 180);
      return { x, y };
    };
    
    // Create curved path - simplified to reduce calculations
    const createCurvedPath = (
      start: PointType,
      end: PointType
    ): string => {
      // Simpler arc calculation
      const midX = (start.x + end.x) / 2;
      const midY = Math.min(start.y, end.y) - 40; // Reduced arc height
      return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
    };
    
    // Extract and process study countries (pre-compute data)
    const studyCountries = dots.map(dot => dot.start);
    // Use Set to help with deduplication
    const uniqueKeys = new Set();
    const uniqueStudyCountries = studyCountries.filter(country => {
      const key = `${country.lat}-${country.lng}`;
      if (uniqueKeys.has(key)) return false;
      uniqueKeys.add(key);
      return true;
    });
    
    // Pre-calculate paths - limit to first 10 for performance
    const limitedDots = dots.slice(0, 10);
    const projectedPaths = limitedDots.map(dot => {
      const startPoint = projectPoint(dot.start.lat, dot.start.lng);
      const endPoint = projectPoint(dot.end.lat, dot.end.lng);
      return {
        path: createCurvedPath(startPoint, endPoint),
        start: startPoint,
        end: endPoint,
        country: dot.start
      };
    });
    
    return { svgMap, uniqueStudyCountries, projectedPaths };
  }, [dots, theme]);

  // Use simpler animation if reduced motion is preferred
  const simplifiedAnimation = prefersReducedMotion || true;
  
  // Optimize animation by using a smaller set of them
  const animationVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: {
        duration: simplifiedAnimation ? 0.5 : 1,
        ease: "easeOut"
      }
    }
  };

  // Memoize point calculations for countries
  const countryPoints = useMemo(() => {
    return uniqueStudyCountries.map(country => ({
      point: {
        x: (country.lng + 180) * (800 / 360),
        y: (90 - country.lat) * (400 / 180)
      },
      country
    }));
  }, [uniqueStudyCountries]);

  // Implement progressive loading using requestIdleCallback
  useEffect(() => {
    // Use requestIdleCallback to defer non-critical work
    const requestIdleCallbackCompat = 
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? window.requestIdleCallback
        : (cb: IdleRequestCallback) => setTimeout(cb, 1);
    
    // First step - load the map
    setLoadingStage('map');
    
    // Then load the dots when the browser is idle
    const dotTimeout = requestIdleCallbackCompat(() => {
      setLoadingStage('dots');
      
      // Finally load the paths
      const pathTimeout = requestIdleCallbackCompat(() => {
        setLoadingStage('paths');
        
        // Mark as complete after a small delay
        setTimeout(() => {
          setLoadingStage('complete');
        }, 100);
      });
      
      return () => {
        if ('cancelIdleCallback' in window) {
          window.cancelIdleCallback(pathTimeout as any);
        } else {
          clearTimeout(pathTimeout);
        }
      };
    });
    
    return () => {
      if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(dotTimeout as any);
      } else {
        clearTimeout(dotTimeout);
      }
    };
  }, []);

  // Use passive listeners for touch events
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    
    // Add passive touch handlers 
    const options = { passive: true };
    const noopHandler = () => {};
    
    svg.addEventListener('touchstart', noopHandler, options);
    svg.addEventListener('touchmove', noopHandler, options);
    
    return () => {
      svg.removeEventListener('touchstart', noopHandler);
      svg.removeEventListener('touchmove', noopHandler);
    };
  }, []);

  // Prevent excessive re-renders
  const renderedDots = useMemo(() => {
    // Only render dots if we're at that stage
    if (loadingStage === 'initial' || loadingStage === 'map') return null;
    
    return countryPoints.map(({ point, country }, i) => (
      <g key={`country-${i}`}>
        {/* Static dot */}
        <circle
          cx={point.x}
          cy={point.y}
          r="5"
          fill={lineColor}
          stroke={theme === "dark" ? "#ffffff" : "#000000"}
          strokeWidth="1"
        />
        
        {/* Pulsing dot - use reference instead of duplicating animation */}
        <use 
          href="#pulse-circle" 
          x={point.x} 
          y={point.y}
          stroke={theme === "dark" ? "#ffffff50" : "#00000050"}
          strokeWidth="0.5"
        />
        
        {/* Country label - only render if we have a label */}
        {country.label && (
          <text
            x={point.x + 10}
            y={point.y + 5}
            fontSize="12"
            fontWeight="bold"
            fill={theme === "dark" ? "white" : "black"}
            stroke={theme === "dark" ? "#00000050" : "#ffffff50"}
            strokeWidth="0.5"
            paintOrder="stroke"
          >
            {country.label}
          </text>
        )}
      </g>
    ));
  }, [countryPoints, lineColor, theme, loadingStage]);

  // Optimize path animations
  const renderedPaths = useMemo(() => {
    // Only render paths if we're at that stage
    if (loadingStage === 'initial' || loadingStage === 'map' || loadingStage === 'dots') return null;
    
    // Stagger delays by distributing evenly and capping
    return projectedPaths.map((item, i) => (
      <motion.path
        key={`path-${i}`}
        d={item.path}
        fill="none"
        stroke="url(#path-gradient)"
        strokeWidth="1.5"
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        transition={{
          duration: simplifiedAnimation ? 0.3 : 1,
          delay: simplifiedAnimation ? 0.1 * Math.min(i, 3) : 0.2 + (Math.min(i, 5) * 0.2),
          ease: "easeOut",
        }}
      />
    ));
  }, [projectedPaths, animationVariants, simplifiedAnimation, loadingStage]);

  return (
    <div className="w-full h-full absolute inset-0">
      {/* Map background - render immediately */}
      {loadingStage !== 'initial' && (
        <Image
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="h-full w-full opacity-70 pointer-events-none select-none"
          alt="world map"
          fill
          draggable={false}
          priority={true}
          unoptimized={true} // Skip image optimization for SVG
        />
      )}
      
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
        style={{ willChange: 'transform' }} // Hint to browser for optimization
      >
        {/* Reduce complexity by using a single defs section */}
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          
          {/* Define reusable animation - simplified */}
          <circle id="pulse-circle" r="5" fill={lineColor} opacity="0.7">
            {!simplifiedAnimation && (
              <>
                <animate
                  attributeName="r"
                  from="5"
                  to="15" // Smaller max size
                  dur="2.5s" // Longer duration for smoother animation
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.7"
                  to="0"
                  dur="2.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </>
            )}
          </circle>
        </defs>

        {/* Draw connection lines - with optimized rendering */}
        <g>{renderedPaths}</g>

        {/* Country dots - with optimized rendering */}
        <g>{renderedDots}</g>
      </svg>
    </div>
  );
} 