import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Path, UseFormReturn } from 'react-hook-form'

interface MoneyInputProps<T extends Record<string, any>> {
  form: UseFormReturn<T>
  name: Path<T>
  label?: string
  placeholder?: string
  className?: string
  currency?: string
}

export function MoneyInput<T extends Record<string, any>>({
  form,
  name,
  label = 'Montant',
  placeholder = '0.00',
  className,
  currency = '€',
}: MoneyInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Input
                className="[appearance:textfield] pr-8 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                type="number"
                placeholder={placeholder}
                min={undefined}
                value={field.value || ''}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              <div className="text-muted-foreground absolute inset-y-0 right-3 flex items-center">
                {currency}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
