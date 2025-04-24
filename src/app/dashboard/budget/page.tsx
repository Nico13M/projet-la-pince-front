'use client'

import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import BudgetList from '@/components/budget/BudgetList'
import BudgetForm from '@/components/forms/BudgetForms'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileTextIcon, PlusCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { SavedBudget } from '@/types/budget'

export default function BudgetPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleBudgetAdded = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <>
      <DashboardHeader title="Budget" />
      <div className="p-4 md:p-6">
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-accent/20 col-span-4 bg-white shadow-md">
              <CardHeader className="border-accent/10 flex flex-row items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <PlusCircleIcon className="text-primary/80 h-5 w-5" />
                  <CardTitle>Ajouter un budget</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <BudgetForm onBudgetAdded={handleBudgetAdded} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6">
            <Card className="border-accent/20 bg-white shadow-md">
              <CardHeader className="border-accent/10 flex flex-row items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <FileTextIcon className="text-primary/80 h-5 w-5" />
                  <CardTitle>Tableau des Budgets</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="rounded-md">
                  <BudgetList refreshTrigger={refreshTrigger} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
