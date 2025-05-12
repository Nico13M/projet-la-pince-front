'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { zodResolver } from '@hookform/resolvers/zod'
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
  }),
  threshold: z.number({
    required_error: 'Le montant est requis',
    invalid_type_error: 'Le montant doit être un nombre',
  }),
  description: z.string().optional(),
})

type AddBudgetValues = z.infer<typeof formSchema>

interface AddBudgetModalProps {
  open: boolean
  onClose: () => void
  onAdded?: () => void
  onSave: (budgetData: AddBudgetValues) => Promise<void>
}

export function AddBudgetModal({
  open,
  onClose,
  onAdded,
  onSave,
}: AddBudgetModalProps) {
  const [loading, setLoading] = useState(false)

  const form = useForm<AddBudgetValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: { id: '', name: '' },
      threshold: 0,
      description: '',
    },
  })

  async function handleSubmit(values: AddBudgetValues) {
    setLoading(true)
    try {
      await onSave(values)
      if (onAdded) onAdded()
      onClose()
      form.reset()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nouveau budget</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid gap-5 md:grid-cols-2">
              {/* Nom du budget */}
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

              {/* Montant/plafond */}
              <MoneyInput form={form} name="threshold" label="Plafond" />

              {/* Catégorie */}
              <CategorySelect
                form={form}
                name="category"
                label="Catégorie"
                className="flex-1"
              />

              {/* Description */}
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

            {/* Boutons */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={onClose}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Ajout...' : 'Ajouter'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
