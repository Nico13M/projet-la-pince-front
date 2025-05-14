import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Eye } from 'lucide-react'

interface DescriptionPopoverProps {
  description: string
  maxLength?: number
}

export function DescriptionPopover({
  description,
  maxLength = 40,
}: DescriptionPopoverProps) {
  if (!description) {
    return <span>Aucune description</span>
  }

  const needsTruncation = description.length > maxLength

  if (!needsTruncation) {
    return <span>{description}</span>
  }

  return (
    <div className="flex items-center gap-2">
      <span className="line-clamp-1">{description.slice(0, maxLength)}…</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Eye className="h-4 w-4" />
            <span className="sr-only">Voir description complète</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <p className="text-sm">{description}</p>
        </PopoverContent>
      </Popover>
    </div>
  )
}
