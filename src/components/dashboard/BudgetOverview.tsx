'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { TableSkeleton } from '../ui/skeleton/skeleton-table'
import { BudgetItem } from './BudgetItem'

export function BudgetOverview() {
  const [isLoading, setIsLoading] = useState(false)

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
          <BudgetItem name="Loisirs" currentAmount={350} totalAmount={500} />
          <BudgetItem
            name="Restaurants"
            currentAmount={180}
            totalAmount={200}
          />
          <BudgetItem name="Transport" currentAmount={110} totalAmount={150} />
        </div>
      </CardContent>
    </Card>
  )
}
