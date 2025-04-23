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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { DatePickerField } from './DatePickerField'
import { CategorySelect } from './CategorySelect'
import { MoneyInput } from './MoneyInput'
import TypeSelector from '../gestion/TypeSelector'
import { Transaction } from '@/types/transaction'
import { format } from 'date-fns'
import { Plus } from 'lucide-react'

const formSchema = z.object({
  description: z.string().min(1, { message: 'La description est requise' }),
  amount: z
    .number({ invalid_type_error: 'Le montant doit être un nombre' })
    .positive({ message: 'Le montant doit être supérieur à 0' }),
  date: z.date(),
  category: z.string().min(1, { message: 'La catégorie est requise' }),
  type: z.string().min(1, { message: 'Le type est requis' }),
})

type FormValues = z.infer<typeof formSchema>

export default function TransactionForm({
  onAddTransaction,
}: {
  onAddTransaction: (transaction: Transaction) => void
}) {
  const { showToast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      amount: 0,
      date: new Date(),
      category: '',
      type: '',
    },
  })

  function onSubmit(values: FormValues) {
    const newTransaction: Transaction = {
      id: Date.now(),
      description: values.description,
      montant: `${values.amount} €`,
      date: format(values.date, 'dd/MM/yyyy'),
      categorie: values.category,
      type: values.type,
    }

    onAddTransaction(newTransaction)
    showToast({
      title: 'Transaction ajoutée',
      description: 'La transaction a été ajoutée avec succès',
    })

    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6"
      >
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Gestion des Transactions</h2>
          <p className="text-sm text-slate-500">
            Ajoutez, modifiez ou supprimez vos transactions
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Ex : Courses, salaire..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <MoneyInput form={form} name="amount" label="Montant" />

          <DatePickerField form={form} name="date" label="Date" />

          <CategorySelect form={form} name="category" label="Catégorie" />

          <TypeSelector
            type={form.watch('type')}
            setType={(value) => form.setValue('type', value)}
          />
        </div>

        <Button type="submit" className="w-full">
          <span className="flex items-center justify-center">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter la transaction
          </span>
        </Button>
      </form>
    </Form>
  )
}
