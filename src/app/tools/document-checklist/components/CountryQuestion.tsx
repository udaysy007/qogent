import { Flag } from "lucide-react"
import { QuestionCard } from "@/components/ui/question-card"
import { OptionButton } from "@/components/ui/option-button"

interface CountryQuestionProps {
  value: string
  onChange: (value: string) => void
  isActive: boolean
}

const countryOptions = [
  // European Countries
  {
    label: "Germany",
    sublabel: "Study in Deutschland",
    icon: <Flag className="w-5 h-5" />,
    value: "germany"
  },
  {
    label: "Ireland",
    sublabel: "Study in Ireland",
    icon: <Flag className="w-5 h-5" />,
    value: "ireland"
  },
  {
    label: "France",
    sublabel: "Study in France",
    icon: <Flag className="w-5 h-5" />,
    value: "france"
  },
  {
    label: "Italy",
    sublabel: "Study in Italia",
    icon: <Flag className="w-5 h-5" />,
    value: "italy"
  },
  {
    label: "Netherlands",
    sublabel: "Study in Nederland",
    icon: <Flag className="w-5 h-5" />,
    value: "netherlands"
  },
  {
    label: "Poland",
    sublabel: "Study in Polska",
    icon: <Flag className="w-5 h-5" />,
    value: "poland"
  },
  // English Speaking Countries
  {
    label: "United Kingdom",
    sublabel: "Study in the UK",
    icon: <Flag className="w-5 h-5" />,
    value: "uk"
  },
  {
    label: "Australia",
    sublabel: "Study in Australia",
    icon: <Flag className="w-5 h-5" />,
    value: "australia"
  },
  {
    label: "Canada",
    sublabel: "Study in Canada",
    icon: <Flag className="w-5 h-5" />,
    value: "canada"
  },
  {
    label: "United States",
    sublabel: "Study in the USA",
    icon: <Flag className="w-5 h-5" />,
    value: "usa"
  },
  // Asian Countries
  {
    label: "Japan",
    sublabel: "Study in 日本",
    icon: <Flag className="w-5 h-5" />,
    value: "japan"
  },
  {
    label: "Singapore",
    sublabel: "Study in Singapore",
    icon: <Flag className="w-5 h-5" />,
    value: "singapore"
  }
]

export function CountryQuestion({
  value,
  onChange,
  isActive
}: CountryQuestionProps) {
  return (
    <QuestionCard
      title="Where would you like to study?"
      description="Select your destination country to get specific document requirements."
      progress={66}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countryOptions.map((option) => (
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