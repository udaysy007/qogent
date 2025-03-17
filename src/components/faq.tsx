import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heading } from "@/components/ui/heading"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"

interface FAQProps {
  title?: string
  description?: string
  faqs: {
    question: string
    answer: string
  }[]
}

export function FAQ({ title = "Frequently Asked Questions", description, faqs }: FAQProps) {
  return (
    <Section>
      <Container>
        <div className="text-center mb-10">
          <Heading level={2} className="mb-3">{title}</Heading>
          {description && <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>}
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </Section>
  )
} 