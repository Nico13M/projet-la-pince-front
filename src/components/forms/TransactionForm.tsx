import {
  fetchCreateTransaction,
} from '@/app/_actions/transactions/fetchTransactions'
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
import { Transaction } from '@/types/transaction'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import TypeSelector from '../gestion/TypeSelector'
import { BudgetSelect } from './BudgetSelect'
import { DatePickerField } from './DatePickerField'
import { MoneyInput } from './MoneyInput'
import { SavedBudget } from '@/types/budget'

const formSchema = z.object({
  description: z.string().min(1, { message: 'La description est requise' }),
  amount: z
    .number({ invalid_type_error: 'Le montant doit être un nombre' })
    .positive({ message: 'Le montant doit être supérieur à 0' })
    .optional()
    .transform((v) => (v === undefined ? 0 : v)),
  date: z.date(),
  budget: z.object({
    id: z.string(),
    name: z.string(),
    categoryId: z.string().optional(),
  }),
  type: z.string().min(1, { message: 'Le type est requis' }),
})

type FormValues = z.infer<typeof formSchema>

export default function TransactionForm({
  onAddTransaction,
}: {
  onAddTransaction: (transaction: Transaction) => void
}) {
  const { showToast } = useToast()
  const [selectedBudget, setSelectedBudget] = useState<SavedBudget | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      amount: undefined,
      date: new Date(),
      budget: { id: '', name: '' },
      type: '',
    },
  })

  async function onSubmit(values: FormValues) {
    if (!selectedBudget) {
      showToast({
        title: 'Erreur',
        description: 'Veuillez sélectionner un budget',
        variant: 'destructive',
      })
      return
    }

    const mapTypeToTransactionType = (type: string) => {
      switch (type.toLowerCase()) {
        case 'dépense':
        case 'expense':
          return 'expense'
        case 'revenu':
        case 'income':
          return 'income'
        case 'investissement':
        case 'investment':
          return 'investment'
        default:
          return 'expense'
      }
    }

    const payload = {
      name: values.description,
      dateOfExpense: values.date.toISOString(),
      amount: values.amount || 0,
      categoryId: selectedBudget.category.id,
      budgetId: values.budget.id,
      transactionType: mapTypeToTransactionType(values.type),
    }
    try {
      const created = await fetchCreateTransaction(payload as any)
      showToast({
        title: 'Transaction ajoutée',
        description: 'La transaction a été enregistrée avec succès',
        variant: 'success',
      })
      if (onAddTransaction) onAddTransaction(created)
      form.reset({
        description: '',
        amount: undefined,
        date: new Date(),
        budget: { id: '', name: '' },
        type: '',
      })
      setSelectedBudget(null)
    } catch (e) {
      showToast({
        title: 'Erreur',
        description: e instanceof Error ? e.message : 'Erreur inconnue',
        variant: 'destructive',
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
            Gestion des Transactions
          </h2>
          <p className="text-sm text-slate-500">
            Ajoutez, modifiez ou supprimez vos transactions
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2" suppressHydrationWarning>
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
          <BudgetSelect 
            form={form} 
            name="budget" 
            label="Budget" 
            onBudgetSelect={(budget) => setSelectedBudget(budget)}
          />

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
