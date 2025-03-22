"use client"

import { motion } from "framer-motion"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ChecklistResultsProps {
  answers: {
    studyLevel: string
    country: string
    departureTime: string
  }
  onReset: () => void
}

interface ChecklistItem {
  title: string
  description: string
  priority: "high" | "medium" | "low"
  timeframe: string
}

interface ChecklistCategory {
  title: string
  description: string
  items: ChecklistItem[]
}

const getPreDepartureChecklist = (studyLevel: string, country: string, departureTime: string): ChecklistCategory[] => {
  const baseChecklist: ChecklistCategory[] = [
    {
      title: "Documentation",
      description: "Essential documents to prepare before departure",
      items: [
        {
          title: "Valid Passport",
          description: "Ensure your passport is valid for at least 6 months beyond your planned stay",
          priority: "high",
          timeframe: "3+ months before"
        },
        {
          title: "Student Visa",
          description: "Apply for and obtain your student visa",
          priority: "high",
          timeframe: "3+ months before"
        },
        {
          title: "Travel Insurance",
          description: "Purchase comprehensive travel insurance coverage",
          priority: "high",
          timeframe: "1-2 months before"
        }
      ]
    },
    {
      title: "Accommodation",
      description: "Housing arrangements and preparations",
      items: [
        {
          title: "Student Housing",
          description: "Secure your accommodation through university housing or private rentals",
          priority: "high",
          timeframe: "3+ months before"
        },
        {
          title: "Housing Contract",
          description: "Review and sign your housing contract",
          priority: "high",
          timeframe: "2-3 months before"
        },
        {
          title: "Initial Payment",
          description: "Arrange for deposit and first month's rent payment",
          priority: "high",
          timeframe: "1-2 months before"
        }
      ]
    },
    {
      title: "Health & Medical",
      description: "Health-related preparations and requirements",
      items: [
        {
          title: "Medical Check-up",
          description: "Get a general health check-up and required vaccinations",
          priority: "medium",
          timeframe: "2-3 months before"
        },
        {
          title: "Prescriptions",
          description: "Obtain necessary prescriptions and medication for your stay",
          priority: "medium",
          timeframe: "1-2 months before"
        },
        {
          title: "Health Insurance",
          description: "Arrange for health insurance coverage in your destination country",
          priority: "high",
          timeframe: "2-3 months before"
        }
      ]
    },
    {
      title: "Financial",
      description: "Financial preparations and arrangements",
      items: [
        {
          title: "Bank Account",
          description: "Research and plan for opening a bank account in your destination country",
          priority: "medium",
          timeframe: "1-2 months before"
        },
        {
          title: "Currency Exchange",
          description: "Exchange currency or arrange for international banking",
          priority: "medium",
          timeframe: "2-4 weeks before"
        },
        {
          title: "Budget Planning",
          description: "Create a detailed budget for your stay abroad",
          priority: "high",
          timeframe: "2-3 months before"
        }
      ]
    },
    {
      title: "Travel",
      description: "Travel arrangements and logistics",
      items: [
        {
          title: "Flight Tickets",
          description: "Book your flight tickets",
          priority: "high",
          timeframe: "2-3 months before"
        },
        {
          title: "Airport Transfer",
          description: "Arrange for airport pickup or transportation to accommodation",
          priority: "medium",
          timeframe: "2-4 weeks before"
        },
        {
          title: "Packing List",
          description: "Prepare a comprehensive packing list and start gathering items",
          priority: "medium",
          timeframe: "1-2 months before"
        }
      ]
    }
  ]

  // Add study level specific items
  if (studyLevel === "masters" || studyLevel === "phd") {
    baseChecklist.push({
      title: "Academic Preparations",
      description: "Additional preparations for postgraduate studies",
      items: [
        {
          title: "Research Proposal",
          description: "Prepare and review your research proposal if required",
          priority: "high",
          timeframe: "Before departure"
        },
        {
          title: "Academic References",
          description: "Collect and organize your academic references and research materials",
          priority: "medium",
          timeframe: "1-2 months before"
        },
        {
          title: "Department Contact",
          description: "Establish contact with your academic department or supervisor",
          priority: "high",
          timeframe: "2-3 months before"
        }
      ]
    })
  }

  // Add country-specific items
  switch (country) {
    case "germany":
      baseChecklist.push({
        title: "German Requirements",
        description: "Germany-specific preparations",
        items: [
          {
            title: "Blocked Account",
            description: "Open a blocked account (Sperrkonto) with required deposit",
            priority: "high",
            timeframe: "3+ months before"
          },
          {
            title: "Health Insurance",
            description: "Obtain German health insurance or proof of equivalent coverage",
            priority: "high",
            timeframe: "2-3 months before"
          },
          {
            title: "Registration",
            description: "Plan for Anmeldung (registration) within 2 weeks of arrival",
            priority: "high",
            timeframe: "Research before departure"
          }
        ]
      })
      break;
    
    case "ireland":
      baseChecklist.push({
        title: "Irish Requirements",
        description: "Ireland-specific preparations",
        items: [
          {
            title: "GNIB Registration",
            description: "Prepare for GNIB (Garda National Immigration Bureau) registration",
            priority: "high",
            timeframe: "Within 90 days of arrival"
          },
          {
            title: "PPS Number",
            description: "Research how to obtain a PPS (Personal Public Service) number",
            priority: "medium",
            timeframe: "After arrival"
          },
          {
            title: "Proof of Finances",
            description: "Prepare proof of sufficient funds for your stay",
            priority: "high",
            timeframe: "2-3 months before"
          }
        ]
      })
      break;
    
    case "poland":
      baseChecklist.push({
        title: "Polish Requirements",
        description: "Poland-specific preparations",
        items: [
          {
            title: "Temporary Residence Permit",
            description: "Prepare documents for temporary residence permit application",
            priority: "high",
            timeframe: "After arrival"
          },
          {
            title: "PESEL Number",
            description: "Research how to obtain a PESEL (national identification) number",
            priority: "medium",
            timeframe: "After arrival"
          },
          {
            title: "Apostille Documents",
            description: "Get important documents apostilled if required",
            priority: "high",
            timeframe: "2-3 months before"
          }
        ]
      })
      break;
  }

  // Adjust based on departure time
  switch (departureTime) {
    case "1month":
      return baseChecklist.map(category => ({
        ...category,
        items: category.items.map(item => ({
          ...item,
          priority: "high",
          timeframe: "As soon as possible"
        }))
      }));
    
    case "3months":
      return baseChecklist.map(category => ({
        ...category,
        items: category.items.map(item => {
          if (item.timeframe.includes("3+ months")) {
            return { ...item, priority: "high" };
          }
          return item;
        })
      }));
    
    case "6months":
      // Keep original priorities but add more detailed timeframes
      return baseChecklist.map(category => ({
        ...category,
        items: category.items.map(item => ({
          ...item,
          timeframe: item.timeframe.includes("3+ months") 
            ? "4-6 months before"
            : item.timeframe
        }))
      }));
    
    default:
      return baseChecklist;
  }
}

export function ChecklistResults({
  answers,
  onReset
}: ChecklistResultsProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const checklist = getPreDepartureChecklist(answers.studyLevel, answers.country, answers.departureTime)

  const toggleCategory = (title: string) => {
    setExpandedCategories(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto space-y-8 px-4 py-12"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold tracking-tight"
          >
            Your Pre-Departure Checklist
          </motion.h2>
          <Button
            variant="outline"
            onClick={onReset}
            className="ml-4"
          >
            Start Over
          </Button>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-muted-foreground"
        >
          Here's your personalized checklist based on your study level ({answers.studyLevel}), 
          destination ({answers.country}), and departure timeline ({answers.departureTime}).
          Items are prioritized to help you stay on track with your preparations.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        {checklist.map((category, index) => (
          <Card key={category.title} className="overflow-hidden">
            <Button
              variant="ghost"
              className="w-full px-8 py-8 flex items-center justify-between hover:bg-accent/50"
              onClick={() => toggleCategory(category.title)}
            >
              <div className="text-left">
                <h3 className="text-2xl font-semibold">{category.title}</h3>
              </div>
              {expandedCategories.includes(category.title) ? (
                <ChevronUp className="w-6 h-6 ml-4" />
              ) : (
                <ChevronDown className="w-6 h-6 ml-4" />
              )}
            </Button>

            {expandedCategories.includes(category.title) && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t"
              >
                <div className="px-8 py-10 space-y-6">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={item.title}
                      className={cn(
                        "flex items-start gap-6 p-6 rounded-xl",
                        item.priority === "high" ? "bg-destructive/10" :
                        item.priority === "medium" ? "bg-warning/10" :
                        "bg-success/10"
                      )}
                    >
                      <div className="flex-1 space-y-2">
                        <h4 className="text-lg font-medium">{item.title}</h4>
                        <p className="text-base text-muted-foreground">{item.description}</p>
                        <p className="text-sm font-medium">
                          Timeline: {item.timeframe}
                        </p>
                      </div>
                      <div
                        className={cn(
                          "px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap",
                          item.priority === "high" ? "bg-destructive/20 text-destructive" :
                          item.priority === "medium" ? "bg-warning/20 text-warning" :
                          "bg-success/20 text-success"
                        )}
                      >
                        {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </Card>
        ))}
      </motion.div>
    </motion.div>
  )
} 