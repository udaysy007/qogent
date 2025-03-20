"use client";

import { motion } from "framer-motion";
import { CounterAnimation } from "./CounterAnimation";
import { StatCard } from "./StatCard";
import { useState } from "react";

export function StatsSection() {
  const [animatedStats, setAnimatedStats] = useState(false);
  
  const stats = [
    {
      startValue: 0,
      endValue: 1000,
      suffix: "+",
      label: "Students Placed",
      description: "Successfully placed in top universities",
      chartColorClass: "text-[hsl(var(--chart-1))] bg-[hsl(var(--chart-1))]/20",
      easing: "easeOut" as const,
      bounce: true
    },
    {
      startValue: 0,
      endValue: 95,
      suffix: "%",
      label: "Visa Success Rate",
      description: "Approved visa applications",
      chartColorClass: "text-[hsl(var(--chart-2))] bg-[hsl(var(--chart-2))]/20",
      easing: "easeOut" as const,
      bounce: true
    },
    {
      startValue: 0,
      endValue: 7,
      suffix: "+",
      label: "Destination Countries",
      description: "Germany, Ireland, Poland, Canada, US, UK, Australia",
      chartColorClass: "text-[hsl(var(--chart-3))] bg-[hsl(var(--chart-3))]/20",
      easing: "easeInOut" as const
    },
    {
      startValue: 0,
      endValue: 500,
      suffix: "+",
      label: "Partner Universities",
      description: "Worldwide university network",
      chartColorClass: "text-[hsl(var(--chart-4))] bg-[hsl(var(--chart-4))]/20",
      easing: "easeInOut" as const
    }
  ];
  
  return (
    <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-10 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-radial from-[hsl(var(--chart-1))] to-transparent blur-3xl"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-radial from-[hsl(var(--chart-3))] to-transparent blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, onComplete: () => setAnimatedStats(true) }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real results that speak louder than promises. Here's how we've helped students achieve their dreams.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StatCard
                value={
                  <CounterAnimation
                    start={stat.startValue}
                    end={stat.endValue}
                    duration={2}
                    delay={index * 0.1}
                    suffix={stat.suffix}
                    decimals={0}
                    easing={stat.easing}
                    bounce={stat.bounce}
                    highlightColor={stat.chartColorClass.split(' ')[0]}
                    ariaLabel={`${stat.endValue}${stat.suffix} ${stat.label}`}
                  />
                }
                label={stat.label}
                description={stat.description}
                chartColorClass={stat.chartColorClass}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mt-16 bg-[hsl(var(--card))] rounded-lg p-6 md:p-8 shadow-md border border-[hsl(var(--border))] bg-card/60 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2 text-center md:text-left">
              <CounterAnimation 
                start={0}
                end={9.2} 
                duration={2}
                decimals={1}
                suffix="/10"
                className="text-3xl md:text-4xl font-bold text-[hsl(var(--chart-5))]"
                easing="easeOut"
                bounce={true}
                ariaLabel="9.2 out of 10 average student satisfaction"
              />
              <p className="text-lg font-medium">Average Student Satisfaction</p>
            </div>
            <div className="space-y-2 text-center md:text-left">
              <CounterAnimation 
                start={0}
                end={87} 
                duration={2}
                suffix="%"
                className="text-3xl md:text-4xl font-bold text-[hsl(var(--chart-6))]"
                easing="easeOut"
                bounce={true}
                ariaLabel="87 percent university acceptance rate"
              />
              <p className="text-lg font-medium">University Acceptance Rate</p>
            </div>
            <div className="space-y-2 text-center md:text-left">
              <CounterAnimation 
                start={0}
                end={45} 
                duration={2}
                prefix="~"
                suffix=" days"
                className="text-3xl md:text-4xl font-bold text-[hsl(var(--chart-7))]"
                easing="easeInOut"
                ariaLabel="Approximately 45 days average application timeline"
              />
              <p className="text-lg font-medium">Average Application Timeline</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 