"use client";

import { Check, FileText, GraduationCap, Languages, TestTube } from "lucide-react";
import { QuestionCard } from "@/components/ui/question-card";
import { OptionButton } from "@/components/ui/option-button";

interface CurrentStatusQuestionProps {
  value?: string[];
  onChange: (value: string[]) => void;
  isActive: boolean;
}

const statusOptions = [
  {
    label: "Language Test",
    sublabel: "IELTS/TOEFL score ready",
    value: "language-test",
    icon: <Languages className="w-5 h-5" />,
  },
  {
    label: "Standardized Tests",
    sublabel: "GRE/GMAT completed",
    value: "standardized-tests",
    icon: <TestTube className="w-5 h-5" />,
  },
  {
    label: "Academic Documents",
    sublabel: "Transcripts & certificates ready",
    value: "academic-docs",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    label: "University Shortlist",
    sublabel: "Target universities selected",
    value: "university-shortlist",
    icon: <GraduationCap className="w-5 h-5" />,
  },
];

export function CurrentStatusQuestion({ value = [], onChange, isActive }: CurrentStatusQuestionProps) {
  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const allSelected = statusOptions.length === value.length;

  return (
    <QuestionCard
      isActive={isActive}
      icon={<Check className="h-6 w-6" />}
      title="What have you already prepared?"
      description="Select all items that you have already completed. This helps us customize your timeline."
      progress={100}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statusOptions.map((option) => (
            <OptionButton
              key={option.value}
              icon={option.icon}
              label={option.label}
              sublabel={option.sublabel}
              isSelected={value.includes(option.value)}
              onClick={() => toggleOption(option.value)}
              multiSelect
            />
          ))}
        </div>

        <button
          onClick={() => onChange(allSelected ? [] : statusOptions.map(opt => opt.value))}
          className="flex items-center justify-center w-full mt-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <Check className="w-4 h-4 mr-2" />
          {allSelected ? "Unselect All" : "Select All"}
        </button>
      </div>
    </QuestionCard>
  );
} 