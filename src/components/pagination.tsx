import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []
    
    // Always show first page
    pageNumbers.push(1)
    
    // Calculate range around current page
    const leftSibling = Math.max(2, currentPage - siblingCount)
    const rightSibling = Math.min(totalPages - 1, currentPage + siblingCount)
    
    // Add dots if needed before current page range
    if (leftSibling > 2) {
      pageNumbers.push("dots-1")
    }
    
    // Add pages around current page
    for (let i = leftSibling; i <= rightSibling; i++) {
      pageNumbers.push(i)
    }
    
    // Add dots if needed after current page range
    if (rightSibling < totalPages - 1) {
      pageNumbers.push("dots-2")
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }
    
    return pageNumbers
  }
  
  const pageNumbers = getPageNumbers()
  
  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
      
      {pageNumbers.map((page, index) => {
        if (page === "dots-1" || page === "dots-2") {
          return (
            <span key={page} className="px-2">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </span>
          )
        }
        
        return (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(page as number)}
            className="h-8 w-8"
          >
            {page}
          </Button>
        )
      })}
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  )
}