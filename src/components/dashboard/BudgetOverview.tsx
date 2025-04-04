'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { TableSkeleton } from '../ui/skeleton/skeleton-table'
import { BudgetItem } from './BudgetItem'
import { fetchUserBudget } from '@/app/_actions/dashbord/fetchUserBudget'
import { BarChart3, ChevronRight, Plus } from 'lucide-react'

interface Budget {
  id: string | number
  name: string
  availableAmount: number
  threshold: number
}

export function BudgetOverview() {
  const [isLoading, setIsLoading] = useState(true)
  const [budgetData, setBudgetData] = useState<Budget[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const data = await fetchUserBudget();
        setBudgetData(data as Budget[]);
      } catch (error) {
        console.error("Error fetching budget data:", error);
      } finally {
        setIsLoading(false)
      }
    }
    fetchData();
  }, []);

  const budgetColors = [
    'bg-primary',
    'bg-blue-500',
    'bg-purple-500',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-indigo-500',
  ]

  return (
    <Card className="border-accent/20 shadow-md bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-accent/10">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary/80" />
          <CardTitle>Vue d'ensemble des budgets</CardTitle>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1 h-8 border-accent/20 text-sm font-medium">
            <Plus className="h-3.5 w-3.5" />
            Nouveau
          </Button>
          <Button variant="link" className="h-8 cursor-pointer p-0 text-sm font-medium flex items-center gap-1 text-primary">
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
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-base font-medium mb-2">Aucun budget défini</h3>
            <p className="text-sm text-foreground/60 max-w-md mb-4">
              Créez des budgets pour suivre vos dépenses et optimiser votre gestion financière.
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
