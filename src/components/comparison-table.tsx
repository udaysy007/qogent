import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Check, X } from "lucide-react"

interface ComparisonItem {
  feature: string
  description?: string
  items: {
    [key: string]: boolean | string | number | null
  }
}

interface ComparisonTableProps {
  title?: string
  description?: string
  columns: string[]
  items: ComparisonItem[]
  background?: "default" | "muted" | "primary"
}

export function ComparisonTable({
  title,
  description,
  columns,
  items,
  background = "default"
}: ComparisonTableProps) {
  return (
    <Section background={background}>
      <Container>
        {(title || description) && (
          <div className="text-center mb-12">
            {title && <Heading level={2} className="mb-3">{title}</Heading>}
            {description && <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>}
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Feature</th>
                {columns.map((column, index) => (
                  <th key={index} className="text-center p-4 font-medium">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">
                    <div className="font-medium">{item.feature}</div>
                    {item.description && (
                      <div className="text-sm text-muted-foreground mt-1">{item.description}</div>
                    )}
                  </td>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="text-center p-4">
                      {renderValue(item.items[column])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  )
}

function renderValue(value: boolean | string | number | null) {
  if (value === true) {
    return <Check className="h-5 w-5 text-green-500 mx-auto" />
  }
  
  if (value === false) {
    return <X className="h-5 w-5 text-red-500 mx-auto" />
  }
  
  if (value === null || value === undefined) {
    return <span className="text-muted-foreground">-</span>
  }
  
  return <span>{value}</span>
} 