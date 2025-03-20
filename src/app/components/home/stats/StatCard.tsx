"use client";

import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string | React.ReactNode;
  label: string;
  description?: string;
  chartColorClass?: string;
  className?: string;
}

export function StatCard({ 
  value, 
  label, 
  description, 
  chartColorClass = "text-primary bg-primary/10",
  className 
}: StatCardProps) {
  return (
    <div 
      className={cn(
        "card-modern hover-lift rounded-lg p-6 text-center h-full",
        "border border-[hsl(var(--border))] bg-[hsl(var(--card))]",
        "transition-all duration-300 ease-in-out",
        className
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <div className={cn("h-2 w-16 rounded-full mb-2", chartColorClass.includes("bg-") ? chartColorClass : `bg-${chartColorClass}`)}></div>
        <p className={cn("text-3xl font-bold", chartColorClass.includes("text-") ? chartColorClass : `text-${chartColorClass}`)}>
          {value}
        </p>
        <h3 className="text-lg font-medium">
          {label}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
} 