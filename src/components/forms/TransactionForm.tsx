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
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { BudgetSelect } from './BudgetSelect'
import { DatePickerField } from './DatePickerField'
import { MoneyInput } from './MoneyInput'
import { SavedBudget } from '@/types/budget'
import { transactionTypeIcons } from '@/utils/categoryIcons'

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
  type: z.string().optional(), // Rendre le type optionnel
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

  // Vérifier manuellement si le formulaire est valide
  useEffect(() => {
    const checkFormValidity = async () => {
      const description = form.getValues('description')
      const budget = form.getValues('budget')
      const amount = form.getValues('amount')
      
      // Considérer le formulaire valide si description, budget ID et montant sont présents
      const valid = 
        description && 
        description.length > 0 && 
        budget && 
        budget.id && 
        selectedBudget !== null &&
        amount !== undefined && 
        amount > 0
      
      setIsFormValid(!!valid) // Conversion explicite en boolean
    }
    
    checkFormValidity()
    
    // S'abonner aux changements de formulaire
    const subscription = form.watch(() => {
      checkFormValidity()
    })
    
    return () => subscription.unsubscribe()
  }, [form, selectedBudget])

  // Détermine le type de transaction par défaut en fonction de la catégorie
  const determineDefaultType = (categoryName: string): string => {
    // Mapping des catégories vers des types par défaut
    const categoryToTypeMap: Record<string, string> = {
      'Logement': 'expense',
      'Alimentation': 'expense',
      'Transport': 'expense',
      'Loisirs': 'expense',
      'Santé': 'expense',
      'Études': 'expense',
      'Salaire': 'income',
      'Investissement': 'investment',
      // Ajouter d'autres mappings si nécessaire
    };
    
    return categoryToTypeMap[categoryName] || 'expense'; // Par défaut expense
  }

  // Map API transactionType to UI type
  const mapTransactionTypeToType = (transactionType?: string) => {
    if (!transactionType) return 'Dépense' // Valeur par défaut
    
    // Normaliser en minuscules pour la cohérence
    const type = transactionType.toLowerCase();
    console.log('Mapping transaction type:', type);
    
    switch (type) {
      case 'expense':
        return 'Dépense'
      case 'income':
        return 'Revenu'
      case 'investment':
        return 'Investissement'
      default:
        // Si le type n'est pas reconnu, essayer de vérifier s'il contient des mots-clés
        if (type.includes('revenu') || type.includes('income') || type.includes('salaire')) {
          return 'Revenu';
        } else if (type.includes('invest')) {
          return 'Investissement';
        } else {
          // Par défaut
          return 'Dépense'
        }
    }
  }

  // Handle budget selection
  const handleBudgetSelect = (budget: SavedBudget) => {
    console.log('Budget sélectionné:', budget);
    setSelectedBudget(budget)
    
    // Auto-set transaction type based on category's transactionType or category name
    let transactionType = budget.category?.transactionType;
    
    if (!transactionType && budget.category.name) {
      // Si pas de transactionType, utiliser le nom de catégorie pour déterminer un type par défaut
      transactionType = determineDefaultType(budget.category.name);
    }
    
    // S'assurer que transactionType est en minuscules pour la cohérence
    if (transactionType) {
      transactionType = transactionType.toLowerCase();
    }
    
    console.log('Transaction type déterminé:', transactionType);
    
    // Convertir le type API en type UI
    const uiType = mapTransactionTypeToType(transactionType);
    console.log('Type UI déterminé:', uiType, 'à partir de:', transactionType);
    
    // Mettre à jour immédiatement l'état et le formulaire
    setTypeValue(uiType);
    form.setValue('type', uiType, {
      shouldDirty: true,
      shouldTouch: true, 
      shouldValidate: true
    });
    
    // Forcer une vérification de validité
    form.trigger();
  }

  // Get icon for current transaction type
  const getTransactionTypeInfo = () => {
    // Si pas de type sélectionné, utiliser Dépense par défaut
    if (!typeValue) {
      return transactionTypeIcons['expense'] || { label: 'Dépense', icon: null };
    }
    
    // Convertir le type UI en type API
    const apiTypeForIcon = mapTypeToTransactionType(typeValue);
    console.log('Getting icon for type:', typeValue, '-> API type:', apiTypeForIcon);
    
    return transactionTypeIcons[apiTypeForIcon] || { label: typeValue, icon: null };
  };

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

  // Réagir aux changements de budget
  useEffect(() => {
    if (selectedBudget?.category) {
      // Auto-set transaction type based on category's transactionType
      let transactionType = selectedBudget.category.transactionType;
      
      if (!transactionType && selectedBudget.category.name) {
        // Si pas de transactionType, utiliser le nom de catégorie
        transactionType = determineDefaultType(selectedBudget.category.name);
      }
      
      if (transactionType) {
        transactionType = transactionType.toLowerCase();
        console.log('Effect: Setting transaction type to:', transactionType);
        
        // Convertir le type API en type UI
        const uiType = mapTransactionTypeToType(transactionType);
        setTypeValue(uiType);
        form.setValue('type', uiType);
      }
    }
  }, [selectedBudget, form]);

  async function onSubmit(values: FormValues) {
    if (!selectedBudget) {
      showToast({
        title: 'Erreur',
        description: 'Veuillez sélectionner un budget',
        variant: 'destructive',
      })
      return
    }

    // Assurer qu'il y a un type même si vide
    const type = values.type || 'Dépense';
    
    const payload = {
      name: values.description,
      dateOfExpense: values.date.toISOString(),
      amount: values.amount || 0,
      categoryId: selectedBudget.category.id,
      budgetId: values.budget.id,
      transactionType: mapTypeToTransactionType(type),
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

  const typeInfo = getTransactionTypeInfo();
  const TypeIcon = typeInfo.icon;

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
                      field.onChange(e);
                      // Forcer la validation
                      setTimeout(() => {
                        form.trigger();
                      }, 0);
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

          {/* Affichage du type de transaction automatique */}
          <FormItem>
            <FormLabel>Type de transaction</FormLabel>
            <div className="h-10 flex items-center">
              {selectedBudget ? (
                <div className={`w-full border rounded-md px-3 py-2 text-sm font-medium flex items-center gap-2 ${
                  typeValue.toLowerCase().includes('revenu') 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                    : typeValue.toLowerCase().includes('invest') 
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  {TypeIcon && <TypeIcon className="h-5 w-5" />}
                  {typeInfo.label || 'Dépense'}
                </div>
              ) : (
                <div className="text-sm text-slate-500">
                  Sélectionnez un budget pour définir le type
                </div>
              )}
            </div>
            {/* Input caché pour gérer la valeur dans le formulaire */}
            <input 
              type="hidden" 
              {...form.register('type')}
              value={typeValue} 
            />
          </FormItem>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={!isFormValid}
        >
          <span className="flex items-center justify-center">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter la transaction
          </span>
        </Button>
      </form>
    </Form>
  )
}
