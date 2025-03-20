"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { FloatingElements } from "./FloatingElements";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-[hsl(var(--background))] opacity-80 z-0">
        <div className="absolute inset-0 bg-grid-primary opacity-[0.2]" />
      </div>
      
      <div className="container relative z-10 py-12 md:py-20 lg:py-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Content Column */}
          <div className="flex flex-col gap-6 lg:w-1/2">
            <div className="space-y-4">
              <AnimatedHeadline text="Your Gateway to Global Education" />
              
              <motion.p 
                className="text-lg text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                From applications to admits in weeks, not months. Democratizing access to international education with merit-based admissions guidance.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col gap-4 sm:flex-row mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-5))] hover:opacity-90 shadow-lg"
                asChild
              >
                <Link href="/tools/country-selector">
                  Find Your Perfect Country
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]"
                asChild
              >
                <Link href="/destinations">
                  Explore Destinations
                </Link>
              </Button>
            </motion.div>

            {/* Instagram Badge */}
            <motion.div
              className="flex items-center gap-3 p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:bg-[hsl(var(--card))]/80 mt-4 max-w-xs animate-pulse-subtle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Image 
                src="/images/instagram-logo.png"
                alt="Instagram"
                width={30}
                height={30}
                className="rounded-md"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Follow @msingermany</span>
                <span className="text-xs text-muted-foreground">Daily success stories and tips</span>
              </div>
            </motion.div>
          </div>
          
          {/* Image/Visual Column */}
          <div className="lg:w-1/2 h-[400px] md:h-[500px]">
            <FloatingElements />
          </div>
        </div>
      </div>
    </section>
  );
} 