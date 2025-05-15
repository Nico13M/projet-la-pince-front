'use client'

import { fetchUserBudget } from '@/app/_actions/dashboard/fetchUserBudget'
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

import { SavedBudget } from '@/types/budget'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Path, UseFormReturn } from 'react-hook-form'
import { Input } from '../ui/input'

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
      const filtered = budgets.filter(
        (budget) =>
          budget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          budget.category.name.toLowerCase().includes(searchTerm.toLowerCase()),
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

          <div className="flex w-full justify-start">
            <Select
              onValueChange={(value) => {
                const selectedBudget = budgets.find((b) => b.id === value)
                if (selectedBudget) {
                  field.onChange({
                    id: selectedBudget.id,
                    name: selectedBudget.name,
                    categoryId: selectedBudget.category.id,
                  })
                  if (onBudgetSelect) {
                    onBudgetSelect(selectedBudget)
                  }
                }
              }}
              value={field.value.id}
            >
              <FormControl>
                <SelectTrigger className="text-muted-foreground w-full text-left">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent align="start" className="flex w-full">
                <div className="bg-background sticky top-0 z-10 px-2 py-2">
                  <div className="relative">
                    <Search className="text-muted-foreground absolute top-3 left-2 h-4 w-4 opacity-50" />
                    <Input
                      placeholder="Rechercher un budget..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                {isLoading ? (
                  <div className="text-muted-foreground px-2 py-1.5 text-left text-sm">
                    Chargement des budgets...
                  </div>
                ) : filteredBudgets.length > 0 ? (
                  filteredBudgets.map((budget) => (
                    <SelectItem key={budget.id} value={budget.id}>
                      <div className="flex flex-col">
                        <span>{budget.name}</span>
                        <span className="text-xs">
                          {budget.category.name} - {budget.threshold}€
                        </span>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <div className="text-muted-foreground px-2 py-1.5 text-left text-sm">
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
