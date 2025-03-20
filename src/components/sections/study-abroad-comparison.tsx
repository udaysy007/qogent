import { cn } from "@/lib/utils"
import { X, Check } from "lucide-react"

export function StudyAbroadComparison() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Study Abroad Consulting is Usually Focused on
        </h2>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="text-destructive">Private Universities</span>, not{" "}
          <span className="text-primary">Merit-Based Admissions</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Traditional Process */}
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <X className="text-destructive" />
              <h3 className="text-xl font-semibold text-destructive">
                Other Consultants
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-2">
                • Focus on expensive private universities
              </li>
              <li className="flex gap-2">
                • Push universities that pay them commission
              </li>
              <li className="flex gap-2">
                • Hide actual admission requirements
              </li>
              <li className="flex gap-2">
                • Charge huge fees regardless of outcome
              </li>
              <li className="flex gap-2">
                • No real success metrics or data
              </li>
            </ul>
          </div>

          {/* With Qogent */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Check className="text-primary" />
              <h3 className="text-xl font-semibold text-primary">
                With Qogent
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-2">
                • Specialize in merit-based public universities
              </li>
              <li className="flex gap-2">
                • 88% success rate in German public universities
              </li>
              <li className="flex gap-2">
                • Transparent admission requirements
              </li>
              <li className="flex gap-2">
                • Pay only after successful admission
              </li>
              <li className="flex gap-2">
                • Data-driven university selection
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
} 