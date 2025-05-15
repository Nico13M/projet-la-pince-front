'use client'

import { createBudget } from '@/app/_actions/dashboard/fetchUserBudget'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CategorySelect } from './CategorySelect'
import { MoneyInput } from './MoneyInput'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Le nom du budget doit contenir au moins 2 caractères',
  }),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }),
  threshold: z.number({
    required_error: 'Le montant est requis',
    invalid_type_error: 'Le montant doit être un nombre',
  }),
  description: z.string().optional(),
})

export default function BudgetForm({
  onBudgetAdded,
}: {
  onBudgetAdded?: () => void
}) {
  const { showToast } = useToast()
  const [date, setDate] = useState<Date | null>(null)
  const [isFormValid, setIsFormValid] = useState(false)

  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: { id: '', name: '' },
      threshold: 0,
      description: '',
    },
  })

  useEffect(() => {
    const checkFormValidity = async () => {
      const name = form.getValues('name')
      const category = form.getValues('category')
      const threshold = form.getValues('threshold')

      const valid =
        name &&
        name.length >= 2 &&
        category &&
        category.id &&
        threshold !== undefined &&
        threshold > 0

      setIsFormValid(!!valid)
    }

    checkFormValidity()

    const subscription = form.watch(() => {
      checkFormValidity()
    })

    return () => subscription.unsubscribe()
  }, [form])

  async function onSubmit(values: BudgetFormValues) {
    const newBudget: Partial<SavedBudget> = {
      name: values.name,
      category: {
        ...values.category,
        transactionType: 'expense', // Par défaut, les budgets sont considérés comme des dépenses
      },
      threshold: values.threshold,
      description: values.description,
    }
    const params = {
      categoryId: values.category.id,
    }
    try {
      await createBudget(newBudget, params)
      showToast({
        title: 'Budget ajouté',
        description: 'Le budget a été ajouté avec succès',
      })
      form.reset()

      if (onBudgetAdded) {
        onBudgetAdded()
      }
    } catch (err) {
      showToast({
        title: 'Erreur',
        description: "Une erreur est survenue lors de l'ajout du budget",
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        suppressHydrationWarning
      >
        <div suppressHydrationWarning>
          <h2 className="text-xl font-semibold text-slate-800">
            Gestion des Budgets
          </h2>
          <p className="text-sm text-slate-500">
            Ajoutez, modifiez ou supprimez vos budgets
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2" suppressHydrationWarning>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du budget</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex : Budget alimentation, voyage..."
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      setTimeout(() => {
                        form.trigger()
                      }, 0)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <MoneyInput form={form} name="threshold" label="Plafond" />
          <CategorySelect
            form={form}
            name="category"
            label="Catégorie"
            className="flex-1"
          />

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
        </div>

        <Button type="submit" className="w-full" disabled={!isFormValid}>
          <span className="flex items-center justify-center">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter le budget
          </span>
        </Button>
      </form>
    </Form>
  )
}
