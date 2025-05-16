'use client'

import { Trash2 } from 'lucide-react'
import { ReactNode } from 'react'
import { Badge } from './badge'
import { Button } from './button'
import { Card, CardContent } from './card'

interface ItemCardProps {
  id: string
  title: string
  badge: {
    icon: ReactNode
    label: string
    className: string
  }
  details: Array<{
    id: string
    label?: string
    content: ReactNode
  }>
  onDelete: (id: string) => void
  editButton: ReactNode
}

export function ItemCard({
  id,
  title,
  badge,
  details,
  onDelete,
  editButton,
}: ItemCardProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium">{title}</h3>
            <Badge
              variant="outline"
              className={`flex items-center gap-0.5 px-1.5 py-0.5 text-xs whitespace-nowrap ${badge.className}`}
            >
              {badge.icon}
              <span>{badge.label}</span>
            </Badge>
          </div>

          {details.map((detail) => (
            <div key={detail.id} className={'mt-1'}>
              {detail.label && (
                <span className={`mb-1 block text-sm text-slate-500`}>
                  {detail.label}:
                </span>
              )}
              {detail.content}
            </div>
          ))}

          <div className="mt-2 flex justify-end gap-2 border-t border-slate-100 pt-2">
            {editButton}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-600 opacity-70 transition-opacity hover:bg-red-50 hover:text-red-600"
              onClick={() => onDelete(id)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Supprimer</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
