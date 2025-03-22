import { Network, Building2, Stethoscope, Laptop, Lightbulb, Rocket, Leaf, Banknote } from "lucide-react"
import { QuestionCard } from "@/components/ui/question-card"
import { OptionButton } from "@/components/ui/option-button"

interface IndustryPreferencesQuestionProps {
  value: string[]
  onChange: (value: string[]) => void
  isActive: boolean
}

interface IndustryOption {
  label: string
  sublabel: string
  icon: React.ReactNode
  value: string
}

const industryOptions: IndustryOption[] = [
  {
    label: "Technology",
    sublabel: "Software, IT, Digital Services",
    icon: <Laptop className="h-5 w-5" />,
    value: "tech"
  },
  {
    label: "Finance",
    sublabel: "Banking, Investment, FinTech",
    icon: <Banknote className="h-5 w-5" />,
    value: "finance"
  },
  {
    label: "Healthcare",
    sublabel: "Medical, Biotech, Health Tech",
    icon: <Stethoscope className="h-5 w-5" />,
    value: "healthcare"
  },
  {
    label: "Consulting",
    sublabel: "Business, Technology, Strategy",
    icon: <Building2 className="h-5 w-5" />,
    value: "consulting"
  },
  {
    label: "Research",
    sublabel: "R&D, Academia, Think Tanks",
    icon: <Lightbulb className="h-5 w-5" />,
    value: "research"
  },
  {
    label: "Startups",
    sublabel: "Early-stage, High-growth Companies",
    icon: <Rocket className="h-5 w-5" />,
    value: "startups"
  },
  {
    label: "Sustainability",
    sublabel: "Green Tech, Environmental",
    icon: <Leaf className="h-5 w-5" />,
    value: "sustainability"
  },
  {
    label: "Telecommunications",
    sublabel: "Networks, Communications",
    icon: <Network className="h-5 w-5" />,
    value: "telecom"
  }
]

export function IndustryPreferencesQuestion({
  value,
  onChange,
  isActive
}: IndustryPreferencesQuestionProps) {
  const handleOptionClick = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue))
    } else if (value.length < 3) {
      onChange([...value, optionValue])
    }
  }

  return (
    <QuestionCard
      title="Which industries interest you?"
      description="Select up to 3 industries you'd like to work in"
      progress={100}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {industryOptions.map((option) => (
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