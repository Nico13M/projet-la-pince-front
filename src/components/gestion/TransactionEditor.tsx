'use client'

import {
  fetchGetCategories,
  fetchUpdateTransaction,
} from '@/app/_actions/transactions/fetchTransactions'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { Transaction } from '@/types/transaction'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale/fr'
import { CalendarIcon, Edit, Pencil, Save, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const editFormSchema = z.object({
  name: z.string().min(1, { message: 'Le nom est requis' }),
  amount: z
    .number({ invalid_type_error: 'Le montant doit être un nombre' })
    .positive({ message: 'Le montant doit être supérieur à 0' }),
  date: z.date(),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }),
  transactionType: z.string().min(1, { message: 'Le type est requis' }),
})

type EditFormValues = z.infer<typeof editFormSchema>

type CategoryOption = {
  id: string
  name: string
  transactionType: string
}

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
  const [categories, setCategories] = useState<CategoryOption[]>([])
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

    const defaultCategory = {
      id: transaction.categoryId || '',
      name: transaction.category?.name || '',
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
      category: defaultCategory,
      transactionType: transaction.transactionType || 'expense',
    }
  }

  const form = useForm<EditFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues: getDefaultValues(),
  })

  useEffect(() => {
    if (open) {
      fetchGetCategories()
        .then((data) => {
          setCategories(data)
        })
        .catch((error) => {
          showToast({
            title: 'Erreur',
            description: 'Impossible de charger les catégories',
          })
        })
    }
  }, [open])

  useEffect(() => {
    if (open) {
      form.reset(getDefaultValues())
    }
  }, [open, form, transaction])

  const onSubmit = async (values: EditFormValues) => {
    setLoading(true)
    try {
      const updateData = {
        name: values.name,
        transactionType: values.transactionType,
        categoryId: values.category.id,
        dateOfExpense: values.date.toISOString(),
        amount: values.amount,
      }

      await fetchUpdateTransaction(transaction.id, updateData as any)

      onSave(transaction.id, {
        ...updateData,
        category: { name: values.category.name },
      })

      showToast({
        title: 'Succès',
        description: 'Transaction mise à jour',
      })

      setOpen(false)
    } catch (error) {
      showToast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour la transaction',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-700 hover:bg-slate-100"
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="expense">Dépense</SelectItem>
                        <SelectItem value="income">Revenu</SelectItem>
                        <SelectItem value="investment">Investissement</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <Select
                      value={field.value.id}
                      onValueChange={(value) => {
                        const selectedCategory = categories.find(
                          (cat) => cat.id === value,
                        )
                        field.onChange({
                          id: value,
                          name: selectedCategory?.name || '',
                        })
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie">
                            {field.value.name}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
