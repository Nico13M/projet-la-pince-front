'use client'

import { useEffect, useState } from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Path, UseFormReturn } from 'react-hook-form'
import { Input } from '../ui/input'
import { SavedBudget } from '@/types/budget'
import { fetchUserBudget } from '@/app/_actions/dashboard/fetchUserBudget'
import { Search } from 'lucide-react'

interface BudgetSelectProps<T extends Record<string, any>> {
  form: UseFormReturn<T>
  name: Path<T>
  label?: string
  placeholder?: string
  className?: string
  onBudgetSelect?: (budget: SavedBudget) => void
}

export function BudgetSelect<T extends Record<string, any>>({
  form,
  name,
  label = 'Budget',
  placeholder = 'Sélectionner un budget',
  className,
  onBudgetSelect,
}: BudgetSelectProps<T>) {
  const [budgets, setBudgets] = useState<SavedBudget[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBudgets, setFilteredBudgets] = useState<SavedBudget[]>([])

  useEffect(() => {
    const fetchBudgets = async () => {
      setIsLoading(true)
      try {
        const response = await fetchUserBudget()
        if (response && response.data) {
          setBudgets(response.data)
          setFilteredBudgets(response.data)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des budgets:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBudgets()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = budgets.filter(budget =>
        budget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        budget.category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredBudgets(filtered)
    } else {
      setFilteredBudgets(budgets)
    }
  }, [searchTerm, budgets])

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}

          <div className="flex w-full">
            <Select
              onValueChange={(value) => {
                const selectedBudget = budgets.find(b => b.id === value)
                if (selectedBudget) {
                  field.onChange({ id: selectedBudget.id, name: selectedBudget.name, categoryId: selectedBudget.category.id })
                  if (onBudgetSelect) {
                    onBudgetSelect(selectedBudget)
                  }
                }
              }}
              value={field.value.id}
            >
              <FormControl>
                <SelectTrigger className="w-full text-slate-500">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <div className="py-2 px-2 sticky top-0 bg-white z-10">
                  <div className="relative">
                    <Search className="absolute left-2 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Rechercher un budget..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                {isLoading ? (
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    Chargement des budgets...
                  </div>
                ) : filteredBudgets.length > 0 ? (
                  filteredBudgets.map((budget) => (
                    <SelectItem key={budget.id} value={budget.id}>
                      <div className="flex flex-col">
                        <span>{budget.name}</span>
                        <span className="text-xs text-slate-500 group-hover:text-white group-data-[highlighted]:text-white group-data-[state=checked]:text-white">
                          {budget.category.name} - {budget.threshold}€
                        </span>
                      </div>
                    </SelectItem>


                  ))
                ) : (
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    Aucun budget disponible
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
