import { Building2, Globe2, Map, Train } from "lucide-react"
import { QuestionCard } from "@/components/ui/question-card"
import { OptionButton } from "@/components/ui/option-button"

interface LocationPreferencesQuestionProps {
  value: string
  onChange: (value: string) => void
  isActive: boolean
}

interface LocationOption {
  label: string
  sublabel: string
  icon: React.ReactNode
  value: string
}

const locationOptions: LocationOption[] = [
  {
    label: "Major City",
    sublabel: "Urban centers with diverse opportunities",
    icon: <Building2 className="h-5 w-5" />,
    value: "city"
  },
  {
    label: "International",
    sublabel: "Global opportunities and travel",
    icon: <Globe2 className="h-5 w-5" />,
    value: "international"
  },
  {
    label: "Regional",
    sublabel: "Smaller cities and regional areas",
    icon: <Map className="h-5 w-5" />,
    value: "regional"
  },
  {
    label: "Flexible",
    sublabel: "Mix of remote and office work",
    icon: <Train className="h-5 w-5" />,
    value: "flexible"
  }
]

export function LocationPreferencesQuestion({
  value,
  onChange,
  isActive
}: LocationPreferencesQuestionProps) {
  return (
    <QuestionCard
      title="Where would you like to work?"
      description="Choose your preferred work location"
      progress={60}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {locationOptions.map((option) => (
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