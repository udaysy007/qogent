import { FC } from 'react';
import { 
  Wallet, 
  BadgeDollarSign, 
  DollarSign, 
  Crown
} from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { OptionButton } from './OptionButton';

interface BudgetRangeQuestionProps {
  value: number;
  onChange: (value: number) => void;
  isActive: boolean;
}

const budgetOptions = [
  {
    label: 'Under €5,000',
    sublabel: 'Budget friendly',
    Icon: Wallet,
    value: 5000
  },
  {
    label: '€5,000-15,000',
    sublabel: 'Mid range',
    Icon: BadgeDollarSign,
    value: 15000
  },
  {
    label: '€15,000-30,000',
    sublabel: 'Premium',
    Icon: DollarSign,
    value: 30000
  },
  {
    label: '€30,000+',
    sublabel: 'Luxury',
    Icon: Crown,
    value: 40000
  }
];

export const BudgetRangeQuestion: FC<BudgetRangeQuestionProps> = ({
  value,
  onChange,
  isActive
}) => {
  return (
    <QuestionCard
      title="Let's talk about your yearly budget"
      description="What would you be comfortable investing in tuition per year?"
      progress={56}
      isActive={isActive}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {budgetOptions.map((option) => {
          const IconComponent = option.Icon;
          return (
            <OptionButton
              key={option.value}
              label={option.label}
              sublabel={option.sublabel}
              icon={<IconComponent className="w-6 h-6" />}
              isSelected={value === option.value}
              onClick={() => onChange(option.value)}
            />
          );
        })}
      </div>
    </QuestionCard>
  );
}; 