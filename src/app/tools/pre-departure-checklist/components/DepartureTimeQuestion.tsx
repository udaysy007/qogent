import { CalendarClock, Clock, Timer } from "lucide-react"
import { QuestionCard } from "@/components/ui/question-card"
import { OptionButton } from "@/components/ui/option-button"

interface DepartureTimeQuestionProps {
  value: string
  onChange: (value: string) => void
  isActive: boolean
}

const departureTimeOptions = [
  {
    label: "Within 1 Month",
    sublabel: "Urgent preparation needed",
    icon: <Clock className="w-5 h-5" />,
    value: "1month"
  },
  {
    label: "1-3 Months",
    sublabel: "Standard preparation time",
    icon: <CalendarClock className="w-5 h-5" />,
    value: "3months"
  },
  {
    label: "3+ Months",
    sublabel: "Early preparation",
    icon: <Timer className="w-5 h-5" />,
    value: "6months"
  }
]

export function DepartureTimeQuestion({
  value,
  onChange,
  isActive
}: DepartureTimeQuestionProps) {
  return (
    <QuestionCard
      title="When are you planning to depart?"
      description="We'll prioritize your checklist based on your departure timeline."
      progress={100}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {departureTimeOptions.map((option) => (
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