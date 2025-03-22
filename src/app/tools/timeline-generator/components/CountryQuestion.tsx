import { Globe } from "lucide-react"
import { QuestionCard } from "@/components/ui/question-card"
import { OptionButton } from "@/components/ui/option-button"

interface CountryQuestionProps {
  value?: string
  onChange: (value: string) => void
  isActive: boolean
}

const countryOptions = [
  {
    value: "germany",
    label: "Germany",
    sublabel: "Study in Europe's leading economy with excellent research opportunities",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    value: "ireland",
    label: "Ireland",
    sublabel: "Experience world-class education in an English-speaking European country",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    value: "poland",
    label: "Poland",
    sublabel: "High-quality education with affordable living costs in Central Europe",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    value: "netherlands",
    label: "Netherlands",
    sublabel: "Innovation-focused education with many English-taught programs",
    icon: <Globe className="w-5 h-5" />,
  }
]

export function CountryQuestion({ value, onChange, isActive }: CountryQuestionProps) {
  return (
    <QuestionCard
      isActive={isActive}
      icon={<Globe className="h-6 w-6" />}
      title="Which country would you like to study in?"
      description="Choose your study destination to get a customized timeline."
      progress={75}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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