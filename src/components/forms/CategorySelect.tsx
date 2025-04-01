import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BUDGET_CATEGORIES } from '@/types/budget'
import { Path, UseFormReturn } from 'react-hook-form'

interface CategorySelectProps<T extends Record<string, any>> {
  form: UseFormReturn<T>
  name: Path<T>
  label?: string
  placeholder?: string
  className?: string
}

export function CategorySelect<T extends Record<string, any>>({
  form,
  name,
  label = 'Catégorie',
  placeholder = 'Sélectionner une catégorie',
  className,
}: CategorySelectProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {BUDGET_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
