import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Linkedin, Mail } from "lucide-react"

interface TeamMemberCardProps {
  member: {
    id: number
    name: string
    role: string
    bio: string
    image?: string
    linkedin?: string
    email?: string
  }
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const { name, role, bio, image, linkedin, email } = member
  
  return (
    <Card className="overflow-hidden hover-lift">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="h-24 w-24 mb-4">
            {image ? (
              <AvatarImage src={image} alt={name} />
            ) : (
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
        
        <p className="text-sm mb-4">{bio}</p>
        
        {(linkedin || email) && (
          <div className="flex justify-center gap-4 mt-4">
            {linkedin && (
              <a 
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn profile</span>
              </a>
            )}
            {email && (
              <a 
                href={`mailto:${email}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 