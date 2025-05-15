'use client'

import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Trash2, Pencil, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { SavedBudget } from '@/types/budget'
import { fetchUserBudget } from '@/app/_actions/dashboard/fetchUserBudget'

function BudgetSelector({
  budgetId,
  setBudgetId,
  onBudgetChange,
}: {
  budgetId: string
  setBudgetId: (budgetId: string) => void
  onBudgetChange?: (budget: SavedBudget) => void
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
      const filtered = budgets.filter(budget => 
        budget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        budget.category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredBudgets(filtered)
    } else {
      setFilteredBudgets(budgets)
    }
  }, [searchTerm, budgets])

  const handleBudgetChange = (value: string) => {
    setBudgetId(value)
    if (onBudgetChange) {
      const selectedBudget = budgets.find(b => b.id === value)
      if (selectedBudget) {
        onBudgetChange(selectedBudget)
      }
    }
  }

  return (
    <div>
      <div className="flex flex-col space-y-2">
        <Select value={budgetId} onValueChange={handleBudgetChange}>
          <SelectTrigger className="w-full border-slate-300 text-slate-500">
            <SelectValue placeholder="Sélectionner un budget" />
          </SelectTrigger>
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
                <SelectItem key={budget.id} value={budget.id} className="flex-1">
                  <div className="flex flex-col">
                    <span>{budget.name}</span>
                    <span className="text-xs text-slate-500">
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
    </div>
  )
}

export default BudgetSelector
