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
import { DatePickerField } from './DatePickerField'
import { MoneyInput } from './MoneyInput'
import { useState } from "react"
import { createBudget } from '@/app/_actions/dashboard/fetchUserBudget'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Le nom du budget doit contenir au moins 2 caractères',
  }),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }),
  threshold: z
    .number({
      required_error: 'Le montant est requis',
      invalid_type_error: 'Le montant doit être un nombre',
    }),
  description: z.string().optional(),
})

export default function BudgetForm({ userId }: { userId: string }) {
  const { showToast } = useToast()
  const [date, setDate] = useState<Date | null>(null)

  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: { id: '', name: '' },
      threshold: 0,
      description: '',
    },
  })

  async function onSubmit(values: BudgetFormValues) {
    console.log('values', values)
    const newBudget: SavedBudget = {
      name: values.name,
      category: values.category,
      threshold: values.threshold,
      description: values.description,
    }
    const params = {
      categoryId: values.category.id,
    }
    console.log(params)
    try {
      console.log('test')
      await createBudget(newBudget, params);
      showToast({
        title: 'Budget ajouté',
        description: 'Le budget a été ajouté avec succès',
      })
      form.reset()
    } catch (err) {
      showToast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'ajout du budget',

      })
    }
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
            name="name"
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
          <MoneyInput form={form} name="threshold" label="Plafond" className="flex-1" />
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
