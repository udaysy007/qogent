import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  homeHref?: string
  showHome?: boolean
}

export function Breadcrumbs({
  items,
  homeHref = "/",
  showHome = true
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {showHome && (
          <>
            <li>
              <Link
                href={homeHref}
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </Link>
            </li>
            <li className="text-muted-foreground">
              <ChevronRight className="h-4 w-4" />
            </li>
          </>
        )}
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          
          return (
            <li key={index} className="flex items-center">
              {isLast ? (
                <span className="font-medium">{item.label}</span>
              ) : (
                <>
                  <Link
                    href={item.href || "#"}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                  <span className="ml-2 text-muted-foreground">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
} 