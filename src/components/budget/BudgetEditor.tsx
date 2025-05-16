'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SavedBudget } from '@/types/budget'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CategorySelect } from '../forms/CategorySelect'
import { MoneyInput } from '../forms/MoneyInput'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Le nom du budget doit contenir au moins 2 caractères',
  }),
  category: z.object({
    id: z.string(),
    name: z.string(),
    transactionType: z.enum(['income', 'investment', 'expense']),
  }),
  threshold: z.number({
    required_error: 'Le montant est requis',
    invalid_type_error: 'Le montant doit être un nombre',
  }),
  description: z.string().optional(),
})

export function BudgetEditor({
  budget,
  onSave,
}: {
  budget: SavedBudget
  onSave: (id: string, updatedBudget: Partial<SavedBudget>) => void
}) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: budget.name,
      category: budget.category,
      threshold: budget.threshold,
      description: budget.description || '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(budget.id, {
      name: values.name,
      category: values.category,
      threshold: values.threshold,
      description: values.description,
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-700 hover:bg-slate-100 hover:text-blue-700"
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Modifier</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-[600px] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Modifier le budget</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du budget</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom du budget" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <MoneyInput form={form} name="threshold" label="Plafond" />
                <CategorySelect
                  form={form}
                  name="category"
                  label="Catégorie"
                  className="flex-1"
                />
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
            </div>

            <div className="mt-4 flex flex-col gap-2 pt-2 sm:flex-row sm:justify-end sm:gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-full sm:w-auto"
              >
                Annuler
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                Enregistrer
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
