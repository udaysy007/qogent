import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ToolCardProps {
  tool: {
    id: number
    name: string
    description: string
    icon: React.ElementType
    category: string
    link: string
  }
}

export function ToolCard({ tool }: ToolCardProps) {
  const { name, description, icon: Icon, link } = tool

  return (
    <Card className="overflow-hidden hover-lift">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium">{name}</h3>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">
          {description}
        </p>
        
        <div className="mt-auto">
          <Button variant="outline" asChild className="w-full">
            <Link href={link}>
              Use Tool
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
} 