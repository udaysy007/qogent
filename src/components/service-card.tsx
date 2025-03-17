import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ServiceCardProps {
  service: {
    id: number
    title: string
    description: string
    icon: React.ElementType
    link: string
    features?: string[]
  }
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { title, description, icon: Icon, link, features } = service

  return (
    <Card className="overflow-hidden hover-lift">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        
        {features && features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="text-sm flex items-start">
                <span className="text-primary mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button variant="outline" asChild className="w-full">
          <Link href={link}>
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 