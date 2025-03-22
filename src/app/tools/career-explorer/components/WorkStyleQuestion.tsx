import { Building2, Home, Users2, Timer, Laptop } from "lucide-react"
import { QuestionCard } from "@/components/ui/question-card"
import { OptionButton } from "@/components/ui/option-button"

interface WorkStyleQuestionProps {
  value: string
  onChange: (value: string) => void
  isActive: boolean
}

interface WorkStyleOption {
  label: string
  sublabel: string
  icon: React.ReactNode
  value: string
}

const workStyleOptions: WorkStyleOption[] = [
  {
    label: "Office-Based",
    sublabel: "Traditional office environment",
    icon: <Building2 className="h-5 w-5" />,
    value: "office"
  },
  {
    label: "Remote",
    sublabel: "Work from home or anywhere",
    icon: <Home className="h-5 w-5" />,
    value: "remote"
  },
  {
    label: "Hybrid",
    sublabel: "Mix of office and remote work",
    icon: <Laptop className="h-5 w-5" />,
    value: "hybrid"
  },
  {
    label: "Team-Based",
    sublabel: "Collaborative environment",
    icon: <Users2 className="h-5 w-5" />,
    value: "team"
  },
  {
    label: "Flexible Hours",
    sublabel: "Non-traditional work hours",
    icon: <Timer className="h-5 w-5" />,
    value: "flexible"
  }
]

export function WorkStyleQuestion({
  value,
  onChange,
  isActive
}: WorkStyleQuestionProps) {
  return (
    <QuestionCard
      title="What's your preferred work style?"
      description="Choose the work environment that best suits you"
      progress={80}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workStyleOptions.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            sublabel={option.sublabel}
            icon={option.icon}
            isSelected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </QuestionCard>
  )
} 