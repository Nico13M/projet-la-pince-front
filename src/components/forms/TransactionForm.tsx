import { fetchCreateTransaction } from '@/app/_actions/transactions/fetchTransactions'
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
import {
  DEFAULT_TRANSACTION_TYPE,
  TransactionType,
} from '@/constants/transactions'
import { useToast } from '@/hooks/use-toast'
import { SavedBudget } from '@/types/budget'
import { Transaction } from '@/types/transaction'
import { transactionTypeIcons } from '@/utils/categoryIcons'
import {
  determineTransactionTypeFromCategory,
  getApiTransactionType,
  getTransactionTypeLabel,
} from '@/utils/transactionUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { BudgetSelect } from './BudgetSelect'
import { DatePickerField } from './DatePickerField'
import { MoneyInput } from './MoneyInput'

const formSchema = z.object({
  description: z.string().min(1, { message: 'La description est requise' }),
  amount: z
    .number({ invalid_type_error: 'Le montant doit être un nombre' })
    .positive({ message: 'Le montant doit être supérieur à 0' })
    .optional()
    .transform((v) => (v === undefined ? 0 : v)),
  date: z.date(),
  budget: z.object({
    id: z.string().min(1, { message: 'Le budget est requis' }),
    name: z.string(),
    categoryId: z.string().optional(),
  }),
  type: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function TransactionForm({
  onAddTransaction,
}: {
  onAddTransaction: (transaction: Transaction) => void
}) {
  const { showToast } = useToast()
  const [selectedBudget, setSelectedBudget] = useState<SavedBudget | null>(null)
  const [typeValue, setTypeValue] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)

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

  useEffect(() => {
    const checkFormValidity = async () => {
      const description = form.getValues('description')
      const budget = form.getValues('budget')
      const amount = form.getValues('amount')

      const valid =
        description &&
        description.length > 0 &&
        budget &&
        budget.id &&
        selectedBudget !== null &&
        amount !== undefined &&
        amount > 0

      setIsFormValid(!!valid)
    }

    checkFormValidity()

    const subscription = form.watch(() => {
      checkFormValidity()
    })

    return () => subscription.unsubscribe()
  }, [form, selectedBudget])

  const handleBudgetSelect = (budget: SavedBudget) => {
    setSelectedBudget(budget)

    let transactionType: TransactionType = DEFAULT_TRANSACTION_TYPE

    if (budget.category?.transactionType as TransactionType) {
      transactionType = budget.category.transactionType as TransactionType
    } else if (budget.category.name) {
      transactionType = determineTransactionTypeFromCategory(
        budget.category.name,
      )
    }

    const uiType = getTransactionTypeLabel(transactionType)

    setTypeValue(uiType)
    form.setValue('type', uiType, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })

    form.trigger()
  }

  const getTransactionTypeInfo = () => {
    if (!typeValue) {
      return transactionTypeIcons['expense'] || { label: 'Dépense', icon: null }
    }

    const apiTypeForIcon = getApiTransactionType(typeValue)

    return (
      transactionTypeIcons[apiTypeForIcon] || { label: typeValue, icon: null }
    )
  }

  useEffect(() => {
    if (selectedBudget?.category) {
      let transactionType: TransactionType = DEFAULT_TRANSACTION_TYPE

      if (selectedBudget.category.transactionType as TransactionType) {
        transactionType = selectedBudget.category
          .transactionType as TransactionType
      } else if (selectedBudget.category.name) {
        transactionType = determineTransactionTypeFromCategory(
          selectedBudget.category.name,
        )
      }

      const uiType = getTransactionTypeLabel(transactionType)
      setTypeValue(uiType)
      form.setValue('type', uiType)
    }
  }, [selectedBudget, form])

  async function onSubmit(values: FormValues) {
    if (!selectedBudget) {
      showToast({
        title: 'Erreur',
        description: 'Veuillez sélectionner un budget',
        variant: 'destructive',
      })
      return
    }

    const type = values.type || 'Dépense'

    const payload = {
      name: values.description,
      dateOfExpense: values.date.toISOString(),
      amount: values.amount || 0,
      categoryId: selectedBudget.category.id,
      budgetId: values.budget.id,
      budgetName: values.budget.name,
      transactionType: getApiTransactionType(type),
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
      setTypeValue('')
      setIsFormValid(false)
    } catch (e) {
      showToast({
        title: 'Erreur',
        description: e instanceof Error ? e.message : 'Erreur inconnue',
        variant: 'destructive',
      })
    }
  }

  const typeInfo = getTransactionTypeInfo()
  const TypeIcon = typeInfo.icon

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
                  <Input
                    placeholder="Ex : Courses, salaire..."
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

          <MoneyInput form={form} name="amount" label="Montant" />
          <DatePickerField form={form} name="date" label="Date" />
          <BudgetSelect
            form={form}
            name="budget"
            label="Budget"
            onBudgetSelect={handleBudgetSelect}
          />

          <FormItem className={`${selectedBudget ? 'flex' : 'hidden'}`}>
            <FormLabel>Type de transaction</FormLabel>
            <div className="flex h-10 items-center">
              {selectedBudget ? (
                <div
                  className={`flex w-full items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium ${
                    typeValue.toLowerCase().includes('revenu')
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : typeValue.toLowerCase().includes('invest')
                        ? 'border-blue-200 bg-blue-50 text-blue-700'
                        : 'border-red-200 bg-red-50 text-red-700'
                  }`}
                >
                  {TypeIcon && <TypeIcon className="h-5 w-5" />}
                  {typeInfo.label || 'Dépense'}
                </div>
              ) : (
                <div className="text-sm text-slate-500">
                  Sélectionnez un budget pour définir le type
                </div>
              )}
            </div>
            <input type="hidden" {...form.register('type')} value={typeValue} />
          </FormItem>
        </div>

        <Button type="submit" className="w-full" disabled={!isFormValid}>
          <span className="flex items-center justify-center">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter la transaction
          </span>
        </Button>
      </form>
    </Form>
  )
}
