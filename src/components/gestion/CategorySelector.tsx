'use client'

import { fetchUserBudget } from '@/app/_actions/dashboard/fetchUserBudget'
import { Input } from '@/components/ui/input'
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

function BudgetSelector({
  budgetId,
  setBudgetId,
  onBudgetChange,
}: {
  budgetId: string
  setBudgetId: (budgetId: string) => void
  onBudgetChange?: (budget: { id: string; name: string }) => void
}) {
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

  const handleBudgetChange = (value: string) => {
    setBudgetId(value)
    if (onBudgetChange) {
      const selectedBudget = budgets.find((b) => b.id === value)
      if (selectedBudget) {
        onBudgetChange({ id: selectedBudget.id, name: selectedBudget.name })
      }
    }
  }

  return (
    <div>
      <label
        htmlFor="budget"
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        Budget
      </label>
      <div className="flex flex-col space-y-2">
        <Select value={budgetId} onValueChange={handleBudgetChange}>
          <SelectTrigger className="w-full border-slate-300 text-slate-500">
            <SelectValue placeholder="Sélectionner un budget" />
          </SelectTrigger>
          <SelectContent>
            <div className="sticky top-0 z-10 bg-white px-2 py-2">
              <div className="relative">
                <Search className="absolute top-3 left-2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Rechercher un budget..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            {isLoading ? (
              <div className="text-muted-foreground px-2 py-1.5 text-sm">
                Chargement des budgets...
              </div>
            ) : filteredBudgets.length > 0 ? (
              filteredBudgets.map((budget) => (
                <SelectItem
                  key={budget.id}
                  value={budget.id}
                  className="flex-1"
                >
                  <div className="flex flex-col">
                    <span>{budget.name}</span>
                    <span className="text-xs text-slate-500">
                      {budget.category.name} - {budget.threshold}€
                    </span>
                  </div>
                </SelectItem>
              ))
            ) : (
              <div className="text-muted-foreground px-2 py-1.5 text-sm">
                Aucun budget disponible
              </div>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default BudgetSelector
