import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UniversityCardProps {
  university: {
    id: number
    name: string
    countryId: number
    website: string
    isPublic: boolean
    ranking?: number
    description: string
  }
  country: {
    name: string
    code: string
    slug?: string
  }
}

export function UniversityCard({ university, country }: UniversityCardProps) {
  const { name, website, isPublic, ranking, description } = university
  const countrySlug = country.slug || country.name.toLowerCase()

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-bold">{name}</h3>
          {isPublic ? (
            <Badge variant="outline">Public</Badge>
          ) : (
            <Badge variant="outline">Private</Badge>
          )}
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>{country.name}</span>
          {ranking && (
            <>
              <span>•</span>
              <span>Ranking: #{ranking}</span>
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>

      <CardFooter className="border-t pt-4">
        <div className="flex w-full justify-between">
          <Link
            href={`/destinations/${countrySlug}/universities/${university.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View Details
          </Link>

          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-medium text-primary hover:underline"
          >
            Website <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </CardFooter>
    </Card>
  )
} 