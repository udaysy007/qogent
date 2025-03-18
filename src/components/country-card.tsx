import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { HeroImage } from "@/components/shared/optimized-image"
import { getCountryHero } from "@/lib/image-helpers"

interface CountryCardProps {
  country: {
    id: number
    name: string
    code?: string
    flagUrl?: string
    description: string
    slug?: string
  }
  variant?: "default" | "featured"
}

// Map of country names to their flag emojis
const countryFlagEmojis: Record<string, string> = {
  "ireland": "🇮🇪",
  "poland": "🇵🇱",
  "canada": "🇨🇦",
  "germany": "🇩🇪",
  "australia": "🇦🇺",
  "usa": "🇺🇸",
  "netherlands": "🇳🇱",
  "japan": "🇯🇵",
  "singapore": "🇸🇬",
  // Add more as needed
}

export function CountryCard({
  country,
  variant = "default",
}: CountryCardProps) {
  const { name, flagUrl, description, slug } = country
  const countrySlug = slug || name.toLowerCase()
  
  // Get flag emoji for the country
  const flagEmoji = countryFlagEmojis[countrySlug] || ""
  
  // Use hero image with helper function for proper fallback
  const heroImageUrl = getCountryHero(countrySlug)
  const fallbackImageUrl = "/images/placeholders/hero-placeholder.jpg"

  return (
    <Link href={`/destinations/${countrySlug}`} className="block group">
      <Card className={`relative overflow-hidden h-[400px] ${variant === "featured" ? "border-primary/50" : ""} transition-transform duration-300 group-hover:scale-[1.02]`}>
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <HeroImage
            src={heroImageUrl}
            alt={`${name} landscape`}
            fallbackSrc={fallbackImageUrl}
            className="object-cover h-full w-full"
            priority
          />
          {/* Vignette overlay - stronger dark gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
        </div>

        {/* Content positioned at the bottom with the vignette making text readable */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 flex flex-col h-full justify-end">
          <CardContent className="p-0 mb-3">
            <h3 className="text-xl font-bold text-white">
              <span className="mr-2">{flagEmoji}</span>{name}
            </h3>
            <p className="mt-1.5 text-sm line-clamp-3 text-white/90">{description}</p>
          </CardContent>
          
          <div className="flex items-center text-white text-sm font-medium mt-2">
            <span>Learn More</span>
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  )
} 