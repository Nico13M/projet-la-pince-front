import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const getPages = () => {
    const pages = []
    const min = Math.max(1, Math.min(page - 2, totalPages - 4))
    const max = Math.min(totalPages, min + 4)
    for (let i = min; i <= max; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="mt-4 flex items-center justify-center space-x-6">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Page précédente</span>
      </Button>
      <div className="flex items-center space-x-2">
        {getPages().map((p) => (
          <Button
            key={p}
            variant="outline"
            size="sm"
            className={`h-8 w-8 ${p === page ? 'bg-primary text-primary-foreground' : ''}`}
            onClick={() => onPageChange(p)}
            disabled={p === page}
          >
            {p}
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Page suivante</span>
      </Button>
    </div>
  )
}
