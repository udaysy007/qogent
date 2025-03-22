import { DollarSign, TrendingUp, Shield, HeartHandshake, Lightbulb, Globe2, LifeBuoy } from "lucide-react"
import { QuestionCard } from "@/components/ui/question-card"
import { OptionButton } from "@/components/ui/option-button"

interface CareerPrioritiesQuestionProps {
  value: string[]
  onChange: (value: string[]) => void
  isActive: boolean
}

interface PriorityOption {
  label: string
  sublabel: string
  icon: React.ReactNode
  value: string
}

const priorityOptions: PriorityOption[] = [
  {
    label: "High Salary",
    sublabel: "Strong earning potential and compensation",
    icon: <DollarSign className="h-5 w-5" />,
    value: "salary"
  },
  {
    label: "Growth Opportunities",
    sublabel: "Career advancement and skill development",
    icon: <TrendingUp className="h-5 w-5" />,
    value: "growth"
  },
  {
    label: "Job Security",
    sublabel: "Stable employment and industry demand",
    icon: <Shield className="h-5 w-5" />,
    value: "security"
  },
  {
    label: "Work-Life Balance",
    sublabel: "Flexible hours and personal time",
    icon: <HeartHandshake className="h-5 w-5" />,
    value: "balance"
  },
  {
    label: "Innovation",
    sublabel: "Working with new technologies and ideas",
    icon: <Lightbulb className="h-5 w-5" />,
    value: "innovation"
  },
  {
    label: "Global Opportunities",
    sublabel: "International work and travel",
    icon: <Globe2 className="h-5 w-5" />,
    value: "global"
  },
  {
    label: "Social Impact",
    sublabel: "Making a difference in society",
    icon: <LifeBuoy className="h-5 w-5" />,
    value: "impact"
  }
]

export function CareerPrioritiesQuestion({
  value,
  onChange,
  isActive
}: CareerPrioritiesQuestionProps) {
  const handleOptionClick = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue))
    } else if (value.length < 3) {
      onChange([...value, optionValue])
    }
  }

  return (
    <QuestionCard
      title="What are your career priorities?"
      description="Select up to 3 factors that matter most to you in your future career"
      progress={40}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {priorityOptions.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            sublabel={option.sublabel}
            icon={option.icon}
            isSelected={value.includes(option.value)}
            onClick={() => handleOptionClick(option.value)}
          />
        ))}
      </div>
    </QuestionCard>
  )
} 