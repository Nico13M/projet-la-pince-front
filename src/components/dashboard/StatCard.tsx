'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  CreditCard,
  DollarSign,
  PieChart,
  PiggyBank,
  TrendingUp,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { CardSkeleton } from '../ui/skeleton/skeleton-card'
import { StatCardContent } from './StatCardContent'
import { fetchOneBudgetSummary } from '@/app/_actions/dashboard/fetchOneBudgetSummary'

interface BudgetSummary {
  remainingBalance: number
  totalExpense: number
  totalInvestment: number
  budgetUtilization: number
}

export function StatCards() {
  const [isLoading, setIsLoading] = useState(true)
  const [budgetSummaryData, setBudgetSummaryData] =
    useState<BudgetSummary | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const data = await fetchOneBudgetSummary()
        setBudgetSummaryData(data as BudgetSummary)
      } catch (error) {
        console.error('Error fetching budget summary:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const budgetUtilization = budgetSummaryData?.budgetUtilization || 68

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {isLoading ? (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      ) : (
        <>
          <Card className="border-accent/20 overflow-hidden bg-white shadow-md">
            <div className="from-primary to-primary/50 absolute top-0 right-0 left-0 h-2 bg-gradient-to-r"></div>
            <CardHeader className="flex flex-row items-center justify-between pt-6">
              <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
                <DollarSign className="text-primary h-4 w-4" />
                Solde total
              </CardTitle>
              <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                <TrendingUp className="text-primary h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <StatCardContent
                value={budgetSummaryData?.remainingBalance || 0}
                percentage={2.5}
              />
            </CardContent>
          </Card>

          <Card className="border-accent/20 overflow-hidden bg-white shadow-md">
            <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-blue-400 to-blue-300"></div>
            <CardHeader className="flex flex-row items-center justify-between pt-6">
              <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
                <CreditCard className="h-4 w-4 text-blue-400" />
                Dépenses mensuelles
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                <CreditCard className="h-4 w-4 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <StatCardContent
                value={budgetSummaryData?.totalExpense || 0}
                percentage={4.3}
                isPositive={false}
              />
            </CardContent>
          </Card>

          <Card className="border-accent/20 overflow-hidden bg-white shadow-md">
            <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-purple-500 to-purple-400"></div>
            <CardHeader className="flex flex-row items-center justify-between pt-6">
              <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
                <PiggyBank className="h-4 w-4 text-purple-500" />
                Économies mensuelles
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50">
                <PiggyBank className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <StatCardContent
                value={budgetSummaryData?.totalInvestment || 0}
                percentage={12.3}
              />
            </CardContent>
          </Card>

          <Card className="border-accent/20 overflow-hidden bg-white shadow-md">
            <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-blue-300 to-cyan-300"></div>
            <CardHeader className="flex flex-row items-center justify-between pt-6">
              <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
                <PieChart className="h-4 w-4 text-blue-300" />
                État du budget
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                <PieChart className="h-4 w-4 text-blue-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-2xl font-bold tracking-tight">
                  {budgetUtilization}%
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      budgetUtilization > 80
                        ? 'bg-red-500'
                        : budgetUtilization > 60
                          ? 'bg-amber-500'
                          : 'bg-primary'
                    }`}
                    style={{ width: `${budgetUtilization}%` }}
                  />
                </div>
                <div className="text-foreground/60 flex justify-between text-xs">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
