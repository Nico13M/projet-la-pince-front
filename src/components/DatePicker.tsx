'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

function DatePicker({ date, setDate }) {
  return (
    <div>
      <label
        htmlFor="date"
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        Date
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start border-slate-300 text-left font-normal text-slate-500"
          >
            <Calendar className="mr-2 h-4 w-4" />
            {date
              ? format(date, 'dd MMMM yyyy', { locale: fr })
              : 'Sélectionner une date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={(day) => {
              if (day) {
                setDate(day)
              }
            }}
            initialFocus
            locale={fr}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePicker
