'use client'

import { fetchGetCategories, fetchCreateTransaction } from '@/app/_actions/transactions/fetchTransactions'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale/fr'
import { CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createFormSchema = z.object({
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

type CreateFormValues = z.infer<typeof createFormSchema>

type CategoryOption = {
  id: string
  name: string
  transactionType: string
}

interface AddTransactionModalProps {
  open: boolean
  onClose: () => void
  onAdded?: () => void 
}

export function AddTransactionModal({ open, onClose, onAdded }: AddTransactionModalProps) {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const { showToast } = useToast()

  const form = useForm<CreateFormValues>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: '',
      amount: "",
      date: new Date(),
      category: { id: '', name: '' },
      transactionType: 'expense',
    }
  })

  
  useEffect(() => {
    if (open) {
      form.reset() 
      fetchGetCategories().then((data) => setCategories(data))
        .catch(() => showToast({
          title: 'Erreur',
          description: 'Impossible de charger les catégories',
        }))
    }
  
  }, [open])

  
  const onSubmit = async (values: CreateFormValues) => {
    setLoading(true)
    try {
      const newTx = {
        name: values.name,
        transactionType: values.transactionType,
        categoryId: values.category.id,
        dateOfExpense: values.date.toISOString(),
        amount: values.amount,
      }
      await fetchCreateTransaction(newTx as any)
      showToast({
        title: 'Succès',
        description: 'Transaction ajoutée',
      })
      onClose()
      onAdded?.() 
    } catch (error) {
      showToast({
        title: 'Erreur',
        description: 'Impossible d\'ajouter la transaction',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nouvelle transaction</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-5 md:grid-cols-2">
              {/* Nom */}
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
              {/* Type */}
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
              {/* Catégorie */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <Select
                      value={field.value.id}
                      onValueChange={(value) => {
                        const selectedCategory = categories.find((cat) => cat.id === value)
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
              {/* Date */}
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
              {/* Montant */}
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
                          placeholder="0.00"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value
                            field.onChange(parseFloat(value) || 0)
                          }}
                        />
                      </FormControl>
                      <div className="absolute top-1/2 right-10 -translate-y-1/2">
                        €
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Boutons */}
            <div className="flex justify-end space-x-4 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
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
