import { useEffect, useState } from 'react'
import {
  fetchCreateTransaction,
  fetchGetCategories,
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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { DatePickerField } from './DatePickerField'
import { CategorySelect } from './CategorySelect'
import { MoneyInput } from './MoneyInput'
import TypeSelector from '../gestion/TypeSelector'
import { Transaction } from '@/types/transaction'
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
type Category = {
  id: string
  name: string
  transactionType: string
  createdAt: string
  updatedAt: string
  userId: string
}

export default function TransactionForm({
  onAddTransaction,
}: {
  onAddTransaction: (transaction: Transaction) => void
}) {
  const { showToast } = useToast()
  const [categories, setCategories] = useState<Category[]>([])

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

  useEffect(() => {
    fetchGetCategories()
      .then((categories) => {
        console.log('Retour API /categories :', categories) // <= Ton log ici
        setCategories(categories)
      })
      .catch((e) => {
        showToast({
          title: 'Erreur chargement catégories',
          description: e.message,
          variant: 'destructive',
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onSubmit(values: FormValues) {
    const selectedCategory = categories.find(
      (cat) => cat.id === values.category || cat.name === values.category,
    )

    if (!selectedCategory) {
      showToast({
        title: 'Erreur',
        description: 'Catégorie invalide sélectionnée',
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
      amount: values.amount,
      categoryId: selectedCategory.id,
      transactionType: mapTypeToTransactionType(values.type),
    }
    console.log('🚀 🍒 ⛔ ☢️ ~ onSubmit ~ payload:', payload)

    try {
      const created = await fetchCreateTransaction(payload)
      showToast({
        title: 'Transaction ajoutée',
        description: 'La transaction a été enregistrée avec succès',
      })
      if (onAddTransaction) onAddTransaction(created)
      form.reset()
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
      >
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Gestion des Transactions
          </h2>
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
          <CategorySelect
            form={form}
            name="category"
            label="Catégorie"
            categories={categories}
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
