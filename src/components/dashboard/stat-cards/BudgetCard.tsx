'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart } from 'lucide-react'

interface BudgetCardProps {
  budgetUtilizationAverage: number
  isLoading: boolean
}

export function BudgetCard({
  budgetUtilizationAverage,
  isLoading,
}: BudgetCardProps) {
  if (isLoading) return null

  return (
    <Card className="relative overflow-hidden rounded-2xl border-0 bg-white/80 shadow-lg backdrop-blur-sm">
      <div className="from-primary/60 to-secondary/60 absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r"></div>
      <div className="bg-primary/5 absolute -top-16 -right-16 h-32 w-32 rounded-full blur-2xl"></div>

      <CardHeader className="flex flex-row items-center justify-between pt-6">
        <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
          <PieChart className="text-primary h-4 w-4" />
          <span className="font-medium tracking-wide">État des budgets</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-3xl font-bold tracking-tight">
            {budgetUtilizationAverage}%
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                budgetUtilizationAverage > 80
                  ? 'bg-gradient-to-r from-red-400 to-red-500'
                  : budgetUtilizationAverage > 60
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                    : 'from-primary/80 to-primary bg-gradient-to-r'
              }`}
              style={{ width: `${budgetUtilizationAverage}%` }}
            />
          </div>
          <div className="text-foreground/70 flex justify-between text-xs font-medium">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
