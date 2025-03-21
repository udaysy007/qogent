"use client";

import { motion } from "framer-motion";
import { AnimatedCTAButton } from "./AnimatedCTAButton";

export function CTASection() {
  // Arrow icon for the CTA button
  const ArrowIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <section className="py-16 md:py-20 lg:py-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-radial from-[hsl(var(--chart-1))/15] to-transparent dark:from-[hsl(var(--chart-1))/10] blur-3xl" />
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-radial from-[hsl(var(--chart-4))/15] to-transparent dark:from-[hsl(var(--chart-4))/10] blur-3xl" />
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-[hsl(var(--card))] dark:bg-[hsl(var(--card))/50] backdrop-blur-sm rounded-2xl p-8 md:p-12 lg:p-16 border border-[hsl(var(--border))] shadow-xl"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight"
            >
              Ready to Begin Your International Education Journey?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Take the first step toward your academic future abroad. Our experts are ready to guide you through every stage of your journey.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <AnimatedCTAButton 
                href="/contact" 
                size="xl"
                variant="primary"
                icon={ArrowIcon}
                pulseEffect={true}
                className="rounded-full"
              >
                Schedule a Free Consultation
              </AnimatedCTAButton>
              
              <AnimatedCTAButton 
                href="/tools" 
                size="xl"
                variant="outline"
                icon={ArrowIcon}
                className="rounded-full"
              >
                Try Our Planning Tools
              </AnimatedCTAButton>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm text-muted-foreground mt-6"
            >
              No obligation, just personalized guidance for your education abroad
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 