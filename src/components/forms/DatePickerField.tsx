import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale/fr'
import { CalendarIcon } from 'lucide-react'
import { ControllerRenderProps, Path, UseFormReturn } from 'react-hook-form'

interface DatePickerFieldProps<T extends Record<string, any>> {
  form: UseFormReturn<T>
  name: Path<T>
  label?: string
  placeholder?: string
}

export function DatePickerField<T extends Record<string, any>>({
  form,
  name,
  label,
  placeholder = 'Choisir une date',
}: DatePickerFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && <FormLabel>{label}</FormLabel>}
          <DatePickerInput
            field={field as ControllerRenderProps<any, any>}
            placeholder={placeholder}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

interface DatePickerInputProps {
  field: ControllerRenderProps<any, any>
  placeholder: string
}

function DatePickerInput({ field, placeholder }: DatePickerInputProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn(
              'w-full pl-3 text-left font-normal',
              !field.value && 'text-muted-foreground',
            )}
          >
            {field.value ? (
              format(field.value, 'PPP', { locale: fr })
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) => date > new Date()}
          initialFocus
          locale={fr}
          captionLayout="dropdown-buttons"
          fromYear={2020}
          toYear={new Date().getFullYear()}
        />
      </PopoverContent>
    </Popover>
  )
}
