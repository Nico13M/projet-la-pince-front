'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { TableSkeleton } from '../ui/skeleton/skeleton-table'
import { BudgetItem } from './BudgetItem'
import { fetchUserBudget } from '@/app/_actions/dashbord/fetchUserBudget'

export function BudgetOverview() {
  const [isLoading, setIsLoading] = useState(false)
  const [budgetData, setBudgetData] = useState([])

  useEffect(() => {
        async function fetchData() {
          const data = await fetchUserBudget();
          console.log(data, "ddd")
          setBudgetData(data);
        }
        fetchData();
      }, []);

  if (isLoading) {
    return <TableSkeleton />
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Vue d'ensemble des budgets</CardTitle>

        <Button variant="link" className="h-auto cursor-pointer p-0 text-sm">
          Gérer les budgets
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
        {budgetData &&
          budgetData.map((budget) => (
            <BudgetItem
              key={budget.id}
              name={budget.name}
              currentAmount={budget.availableAmount}
              totalAmount={budget.threshold}
            />
          ))
        }
        </div>
      </CardContent>
    </Card>
  )
}
