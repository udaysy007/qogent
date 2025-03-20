'use client'

import { useState } from 'react'
import { University } from '@/types/university'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, HelpCircle, ThumbsUp, ThumbsDown } from 'lucide-react'

interface UniversityFAQProps {
  university: University
}

export function UniversityFAQ({ university }: UniversityFAQProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [helpfulRatings, setHelpfulRatings] = useState<{[key: string]: 'helpful' | 'unhelpful' | null}>({})

  // Filter FAQs based on search query
  const filteredFAQs = university.faq.filter(faq => {
    if (!searchQuery) return true
    
    const query = searchQuery.toLowerCase()
    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    )
  })

  // Expand all matching items when searching
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    
    // If there's a query, expand all filtered items
    if (query) {
      const filteredIds = university.faq
        .filter(faq => 
          faq.question.toLowerCase().includes(query.toLowerCase()) ||
          faq.answer.toLowerCase().includes(query.toLowerCase())
        )
        .map((_, index) => `question-${index}`)
      
      setExpandedItems(filteredIds)
    } else {
      // If query is cleared, collapse all
      setExpandedItems([])
    }
  }

  // Mark answer as helpful or unhelpful
  const rateAnswer = (index: number, rating: 'helpful' | 'unhelpful') => {
    setHelpfulRatings(prev => ({
      ...prev,
      [`question-${index}`]: prev[`question-${index}`] === rating ? null : rating
    }))
  }

  // Highlight search terms in text
  const highlightText = (text: string) => {
    if (!searchQuery) return text
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'))
    return parts.map((part, i) => 
      part.toLowerCase() === searchQuery.toLowerCase() 
        ? <span key={i} className="bg-primary/20 text-primary-foreground px-1 rounded">{part}</span>
        : part
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Introduction section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            Find answers to common questions about {university.name}. If you don't see your question answered here, 
            feel free to contact us for more information.
          </p>
        </div>
      </section>

      {/* Search */}
      <section>
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search questions..." 
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </section>

      {/* FAQ Accordion */}
      <section>
        {filteredFAQs.length === 0 ? (
          <Card>
            <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px]">
              <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground mb-2">No questions found matching your search.</p>
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Accordion 
            type="multiple"
            value={expandedItems}
            onValueChange={setExpandedItems}
            className="w-full space-y-4"
          >
            {filteredFAQs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`question-${index}`}
                className="border rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30 data-[state=open]:bg-primary/5">
                  <div className="text-left font-medium">{highlightText(faq.question)}</div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="pt-2 pb-4 text-sm">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p>{highlightText(faq.answer)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
                    <span>Was this answer helpful?</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-7 px-2 ${helpfulRatings[`question-${index}`] === 'helpful' ? 'bg-green-500/10 text-green-500' : ''}`}
                      onClick={() => rateAnswer(index, 'helpful')}
                    >
                      <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                      Yes
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-7 px-2 ${helpfulRatings[`question-${index}`] === 'unhelpful' ? 'bg-red-500/10 text-red-500' : ''}`}
                      onClick={() => rateAnswer(index, 'unhelpful')}
                    >
                      <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                      No
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </section>

      {/* Contact section */}
      <section>
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg mb-1">Still have questions?</h3>
                <p className="text-sm text-muted-foreground">
                  Contact us for more information about {university.name}.
                </p>
              </div>
              <div className="flex gap-3">
                <Button>
                  Contact Qogent
                </Button>
                <Button variant="outline" asChild>
                  <a href={university.website} target="_blank" rel="noopener noreferrer">
                    Visit University Website
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
} 