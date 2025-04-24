'use client'
import { fetchUserBudget } from '@/app/_actions/dashboard/fetchUserBudget'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, ChevronRight, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { TableSkeleton } from '../ui/skeleton/skeleton-table'
import { BudgetItem } from './BudgetItem'



interface Budget {
  id: string | number
  name: string
  availableAmount: number
  threshold: number
  category: {
    id: string
    name: string
  }
}

export function BudgetOverview() {
  const [isLoading, setIsLoading] = useState(true)
  const [budgetData, setBudgetData] = useState<Budget[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const response = await fetchUserBudget()
        setBudgetData(response.data)
      } catch (error) {
        console.error('Error fetching budget data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const budgetColors = [
    'bg-primary',
    'bg-blue-500',
    'bg-purple-500',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-indigo-500',
  ]

  return (
    <Card className="border-accent/20 bg-white shadow-md">
      <CardHeader className="border-accent/10 flex flex-row items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-primary/80 h-5 w-5" />
          <CardTitle>Vue d'ensemble des budgets</CardTitle>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-accent/20 h-8 gap-1 text-sm font-medium"
          >
            <Plus className="h-3.5 w-3.5" />
            Nouveau
          </Button>
          <Button
            variant="link"
            className="text-primary flex h-8 cursor-pointer items-center gap-1 p-0 text-sm font-medium"
          >
            Gérer les budgets
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <TableSkeleton />
        ) : budgetData && budgetData.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {budgetData.map((budget, index) => (
              <BudgetItem
                key={budget.id}
                name={budget.name}
                currentAmount={budget.availableAmount}
                totalAmount={budget.threshold}
                color={budgetColors[index % budgetColors.length]}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-primary/10 mb-4 rounded-full p-3">
              <BarChart3 className="text-primary h-6 w-6" />
            </div>
            <h3 className="mb-2 text-base font-medium">Aucun budget défini</h3>
            <p className="text-foreground/60 mb-4 max-w-md text-sm">
              Créez des budgets pour suivre vos dépenses et optimiser votre
              gestion financière.
            </p>
            <Button size="sm" className="gap-1">
              <Plus className="h-3.5 w-3.5" />
              Créer un budget
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
