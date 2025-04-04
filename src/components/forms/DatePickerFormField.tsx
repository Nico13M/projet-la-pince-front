// import { Button } from '@/components/ui/button'
// import { Calendar } from '@/components/ui/calendar'
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import { cn } from '@/lib/utils'
// import { BudgetFormValues } from '@/types/budget'
// import { format } from 'date-fns'
// import { fr } from 'date-fns/locale/fr'
// import { CalendarIcon } from 'lucide-react'
// import { UseFormReturn } from 'react-hook-form'

// interface DatePickerFormFieldProps {
//   form: UseFormReturn<BudgetFormValues>
// }

// export function DatePickerFormField({ form }: DatePickerFormFieldProps) {
//   return (
//     <FormField
//       control={form.control}
//       name="date"
//       render={({ field }) => (
//         <FormItem className="flex flex-col">
//           <FormLabel>Date</FormLabel>
//           <Popover>
//             <PopoverTrigger asChild>
//               <FormControl>
//                 <Button
//                   variant={'outline'}
//                   className={cn(
//                     'w-full pl-3 text-left font-normal',
//                     !field.value && 'text-muted-foreground',
//                   )}
//                 >
//                   {field.value ? (
//                     format(field.value, 'dd/MM/yyyy', { locale: fr })
//                   ) : (
//                     <span>Choisir une date</span>
//                   )}
//                   <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                 </Button>
//               </FormControl>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="start">
//               <Calendar
//                 mode="single"
//                 selected={field.value}
//                 onSelect={field.onChange}
//                 disabled={(date) => date > new Date()}
//                 initialFocus
//                 locale={fr}
//                 fromYear={2020}
//                 toYear={new Date().getFullYear()}
//                 className="border-0"
//                 classNames={{
//                   day_selected: 'bg-primary text-primary-foreground',
//                   day_today: 'bg-accent text-accent-foreground',
//                 }}
//                 styles={{
//                   nav: {
//                     width: '100%',
//                     justifyContent: 'space-between',
//                     margin: 0,
//                     marginBottom: '-40px',
//                   },
//                   table: {
//                     width: '100%',
//                   },
//                   cell: {
//                     padding: '0.25rem',
//                   },
//                 }}
//               />
//             </PopoverContent>
//           </Popover>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   )
// }
