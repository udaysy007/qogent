"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function DestinationFinder() {
  const [tuitionBudget, setTuitionBudget] = useState(15000);
  const [livingExpensesBudget, setLivingExpensesBudget] = useState(1500);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Destination Finder</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-medium mb-2">Tuition Budget: €{tuitionBudget}</h2>
          <Slider
            value={[tuitionBudget]}
            onValueChange={(newValue) => setTuitionBudget(newValue[0])}
            min={5000}
            max={50000}
            step={1000}
            className="mb-6"
          />
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Monthly Living Expenses Budget: €{livingExpensesBudget}</h2>
          <Slider
            value={[livingExpensesBudget]}
            onValueChange={(newValue) => setLivingExpensesBudget(newValue[0])}
            min={800}
            max={3000}
            step={100}
            className="mb-6"
          />
        </div>
      </div>
    </div>
  );
} 