'use client'

import { FAQ } from '@/types/university'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { MessageSquare } from 'lucide-react'

interface UniversityFAQProps {
  faq: FAQ[]
}

export function UniversityFAQ({ faq }: UniversityFAQProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mb-6">
          Find answers to common questions about admissions, programs, student life, and more.
        </p>
        
        {faq.length > 0 ? (
          <Card>
            <CardContent className="p-6 space-y-4">
              {faq.map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex gap-2 items-start">
                    <MessageSquare className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <h3 className="font-semibold text-lg">{item.question}</h3>
                  </div>
                  <p className="text-muted-foreground pl-7">{item.answer}</p>
                  {i < faq.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <div className="text-center p-8 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">No FAQs available at this time.</p>
          </div>
        )}
      </div>
    </div>
  )
} 