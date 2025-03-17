import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  testimonial: {
    id: number
    content: string
    author: string
    role?: string
    avatar?: string
    rating?: number
  }
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { content, author, role, avatar, rating } = testimonial
  
  return (
    <Card className="overflow-hidden hover-lift">
      <CardContent className="p-6">
        {rating && (
          <div className="flex mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        )}
        
        <p className="text-sm mb-6 italic">"{content}"</p>
        
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            {avatar ? (
              <AvatarImage src={avatar} alt={author} />
            ) : (
              <AvatarFallback>{author.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="text-sm font-medium">{author}</p>
            {role && <p className="text-xs text-muted-foreground">{role}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 