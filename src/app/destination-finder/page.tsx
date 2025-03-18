<Slider
  value={[tuitionBudget]}
  onValueChange={(newValue) => setTuitionBudget(newValue[0])}
  min={5000}
  max={50000}
  step={1000}
  className="mb-6"
/>

<Slider
  value={[livingExpensesBudget]}
  onValueChange={(newValue) => setLivingExpensesBudget(newValue[0])}
  min={800}
  max={3000}
  step={100}
  className="mb-6"
/> 