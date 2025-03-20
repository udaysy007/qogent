import { FC, useState, useEffect } from 'react';
import { 
  GraduationCap, 
  PiggyBank, 
  Briefcase, 
  FileCheck, 
  Shield, 
  Smile
} from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { OptionButton } from './OptionButton';
import { Button } from '@/components/ui/button';

interface PrioritiesQuestionProps {
  value: string[];
  onChange: (value: string[]) => void;
  isActive: boolean;
  onComplete?: () => void;
}

const priorityOptions = [
  {
    label: 'Education Quality',
    sublabel: 'Learn from the best',
    Icon: GraduationCap,
    value: 'Education Quality'
  },
  {
    label: 'Cost',
    sublabel: 'Smart investment',
    Icon: PiggyBank,
    value: 'Cost'
  },
  {
    label: 'Job Market',
    sublabel: 'Career opportunities',
    Icon: Briefcase,
    value: 'Job Market'
  },
  {
    label: 'Visa Process',
    sublabel: 'Smooth paperwork',
    Icon: FileCheck,
    value: 'Visa Process'
  },
  {
    label: 'Safety',
    sublabel: 'Peace of mind',
    Icon: Shield,
    value: 'Safety'
  },
  {
    label: 'Lifestyle',
    sublabel: 'Quality of life',
    Icon: Smile,
    value: 'Lifestyle'
  }
];

export const PrioritiesQuestion: FC<PrioritiesQuestionProps> = ({
  value = [],
  onChange,
  isActive,
  onComplete
}) => {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(value);
  
  // Sync with external value when it changes
  useEffect(() => {
    setSelectedPriorities(value);
  }, [value]);
  
  const togglePriority = (priority: string) => {
    setSelectedPriorities(prev => {
      if (prev.includes(priority)) {
        return prev.filter(p => p !== priority);
      } else {
        // Only allow up to 3 selections
        if (prev.length < 3) {
          return [...prev, priority];
        }
        return prev;
      }
    });
  };
  
  const handleSubmit = () => {
    onChange(selectedPriorities);
    if (onComplete) {
      onComplete();
    }
  };
  
  return (
    <QuestionCard
      title="Pick your top 3 must-haves"
      description="What matters most to you when choosing a study destination?"
      progress={98}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {priorityOptions.map((option) => {
          const IconComponent = option.Icon;
          return (
            <OptionButton
              key={option.value}
              label={option.label}
              sublabel={option.sublabel}
              icon={<IconComponent className="w-6 h-6" />}
              isSelected={selectedPriorities.includes(option.value)}
              onClick={() => togglePriority(option.value)}
            />
          );
        })}
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button 
          size="lg" 
          className="px-8 py-6 rounded-full text-lg"
          onClick={handleSubmit}
          disabled={selectedPriorities.length === 0}
        >
          {selectedPriorities.length === 0 
            ? "Select at least one priority" 
            : "Find My Perfect Destinations"}
        </Button>
      </div>
      
      <p className="text-center text-muted-foreground mt-4">
        {selectedPriorities.length}/3 priorities selected
      </p>
    </QuestionCard>
  );
}; 