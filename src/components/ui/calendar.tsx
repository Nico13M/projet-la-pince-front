'use client'

import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon } from "lucide-react"
import { DayPicker } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 flex', className)}
      classNames={{
        months: 'flex flex-col space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        month_caption: ' text-center ',
        caption: 'flex justify-center pt-1 relative items-center m-auto',
        caption_label: 'text-sm font-medium',
        nav: ' mt-1 flex items-center absolute w-9/10 justify-between',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-10 w-10 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'text-cent²er text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
        ),
        weekdays: 'flex justify-around',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ ...props }) => <Chevron {...props} />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }


function Chevron({ orientation = "left", ...props }) {
  switch (orientation) {
    case "left":
      return <ChevronLeftIcon className="h-4 w-4" />;
    case "right":
      return <ChevronRightIcon className="h-4 w-4" />;
    case "up":
      return <ChevronUpIcon className="h-4 w-4" />;
    case "down":
      return <ChevronDownIcon className="h-4 w-4" />;
    default:
      return null;
  }
}