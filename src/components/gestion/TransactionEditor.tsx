'use client'

import { fetchUserBudget } from '@/app/_actions/dashboard/fetchUserBudget'
import { fetchUpdateTransaction } from '@/app/_actions/transactions/fetchTransactions'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  DEFAULT_TRANSACTION_TYPE,
  TransactionType,
} from '@/constants/transactions'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { SavedBudget } from '@/types/budget'
import { Transaction } from '@/types/transaction'
import { transactionTypeIcons } from '@/utils/categoryIcons'
import {
  determineTransactionTypeFromCategory,
  getTransactionTypeLabel,
} from '@/utils/transactionUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale/fr'
import { CalendarIcon, Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const editFormSchema = z.object({
  name: z.string().min(1, { message: 'Le nom est requis' }),
  amount: z
    .number({ invalid_type_error: 'Le montant doit être un nombre' })
    .positive({ message: 'Le montant doit être supérieur à 0' }),
  date: z.date(),
  budget: z.object({
    id: z.string().min(1, { message: 'Le budget est requis' }),
    name: z.string(),
  }),
  transactionType: z.enum(['expense', 'income', 'investment'] as const),
})

type EditFormValues = z.infer<typeof editFormSchema>

interface TransactionEditorProps {
  transaction: Transaction
  onSave: (id: string, updatedTransaction: Partial<Transaction>) => void
}

export function TransactionEditor({
  transaction,
  onSave,
}: TransactionEditorProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState<SavedBudget | null>(null)
  const { showToast } = useToast()

  const getDefaultValues = (): EditFormValues => {
    let date: Date

    try {
      if (transaction.dateOfExpense) {
        if (typeof transaction.dateOfExpense === 'string') {
          date = parseISO(transaction.dateOfExpense)
        } else {
          date = transaction.dateOfExpense
        }
      } else {
        date = new Date()
      }
    } catch (error) {
      date = new Date()
    }

    const defaultBudget = {
      id: transaction.budgetId || '',
      name: transaction.budget?.name || '',
    }

    return {
      name: transaction.name || '',
      amount:
        typeof transaction.amount === 'number'
          ? transaction.amount
          : typeof transaction.amount === 'string'
            ? parseFloat(transaction.amount.replace(',', '.'))
            : 0,
      date,
      budget: defaultBudget,
      transactionType:
        (transaction.transactionType?.toLowerCase() as TransactionType) ||
        DEFAULT_TRANSACTION_TYPE,
    }
  }

  const form = useForm<EditFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues: getDefaultValues(),
  })

  useEffect(() => {
    if (open) {
      form.reset(getDefaultValues())
    }
  }, [open, form, transaction])

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

      form.setValue('transactionType', transactionType, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    }
  }, [selectedBudget, form])

  const onSubmit = async (values: EditFormValues) => {
    setLoading(true)
    try {
      if (!selectedBudget && values.budget.id) {
        const response = await fetchUserBudget()
        if (response && response.data) {
          const foundBudget = response.data.find(
            (b) => b.id === values.budget.id,
          )
          if (foundBudget) {
            setSelectedBudget(foundBudget)
          }
        }
      }

      const categoryId = selectedBudget?.category?.id

      if (!categoryId) {
        showToast({
          title: 'Erreur',
          description:
            'Impossible de déterminer la catégorie du budget. Veuillez réessayer.',
        })
        setLoading(false)
        return
      }

      const updateData = {
        name: values.name,
        transactionType: values.transactionType,
        budgetId: values.budget.id,
        categoryId: categoryId,
        dateOfExpense: values.date.toISOString(),
        amount: values.amount,
      }

      await fetchUpdateTransaction(transaction.id, updateData as any)

      onSave(transaction.id, {
        ...updateData,
        budget: { id: values.budget.id, name: values.budget.name },
      })

      showToast({
        title: 'Succès',
        description: 'Transaction mise à jour',
      })

      setOpen(false)
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
      showToast({
        title: 'Erreur',
        description:
          error instanceof Error
            ? error.message
            : 'Impossible de mettre à jour la transaction',
      })
    } finally {
      setLoading(false)
    }
  }

  const transactionType =
    form.watch('transactionType') || DEFAULT_TRANSACTION_TYPE
  const typeInfo = transactionTypeIcons[transactionType] || {
    label: 'Dépense',
    icon: null,
  }
  const TypeIcon = typeInfo?.icon

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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier la transaction</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom de la transaction" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transactionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <div className="flex h-10 items-center rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5">
                      {TypeIcon && <TypeIcon className="mr-2 h-4 w-4" />}
                      {getTransactionTypeLabel(field.value)}
                      <input type="hidden" {...field} />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'dd/MM/yyyy', { locale: fr })
                            ) : (
                              <span>Choisir une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={fr}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Montant</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value
                            field.onChange(parseFloat(value) || 0)
                          }}
                        />
                      </FormControl>
                      <div className="absolute top-1/2 right-3 -translate-y-1/2">
                        €
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
