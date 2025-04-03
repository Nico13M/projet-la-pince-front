'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { BudgetFormValues, SavedBudget } from '@/types/budget'
import { formatDate, formatEuro } from '@/utils/format'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CategorySelect } from './CategorySelect'
// import { DatePickerField } from './DatePickerField'
import { MoneyInput } from './MoneyInput'

// Schéma de validation du formulaire
const formSchema = z.object({
  budget: z.string().min(2, {
    message: 'Le nom du budget doit contenir au moins 2 caractères',
  }),
  date: z.date(),
  category: z
    .string()
    .min(1, { message: 'Veuillez sélectionner une catégorie' }),
  amount: z
    .number({
      required_error: 'Le montant est requis',
      invalid_type_error: 'Le montant doit être un nombre',
    })
    .nonnegative({ message: 'Le montant doit être positif' }),
  description: z.string().optional(),
})
export default function BudgetForm() {
  const { showToast } = useToast()

  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: '',
      date: new Date(),
      category: '',
      amount: 0,
      description: '',
    },
  })

  function onSubmit(values: BudgetFormValues) {
    const newBudget: SavedBudget = {
      id: Date.now(),
      budget: values.budget,
      date: formatDate(values.date),
      category: values.category,
      amount: formatEuro(values.amount),
      description: values.description,
    }

    window.dispatchEvent(new CustomEvent('budget-added', { detail: newBudget }))
    form.reset()

    showToast({
      title: 'Budget ajouté',
      description: 'Le budget a été ajouté avec succès',
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-lg border p-6"
      >

        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <Input placeholder="Nom du budget" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <DatePickerField form={form} name="date" label="Date" /> */}
        </div>


        <div className="flex space-x-4">
          <CategorySelect form={form} name="category" label="Catégorie" className="flex-1" />
          <MoneyInput form={form} name="amount" label="Objectif" className="flex-1" />
        </div>


        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Notes supplémentaires (optionnel)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit" className="w-full">
          Ajouter le budget
        </Button>
      </form>
    </Form>
  )
}
