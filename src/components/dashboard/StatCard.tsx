'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, DollarSign, PieChart, PiggyBank } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CardSkeleton } from '../ui/skeleton/skeleton-card'
import { StatCardContent } from './StatCardContent'
import { fetchOneBudgetSummary } from '@/app/_actions/dashbord/fetchOneBudgetSummary'
import { set } from 'date-fns'

export function StatCards() {
  const [isLoading, setIsLoading] = useState(false)
  const [budgetSummaryData, setBudgetSummaryData] = useState([])
  
  useEffect(() => {
    async function fetchData() {
      const data = await fetchOneBudgetSummary();
      setBudgetSummaryData(data);
    }
    fetchData();
  }, []);

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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Solde total</CardTitle>
              <DollarSign className="text-primary h-4 w-4" />
            </CardHeader>
            <CardContent>
              <StatCardContent value={budgetSummaryData?.remainingBalance} percentage={2.5} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Dépenses mensuelles
              </CardTitle>
              <CreditCard className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <StatCardContent
                value={budgetSummaryData?.totalExpense}
                percentage={4.3}
                isPositive={false}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Économies mensuelles
              </CardTitle>
              <PiggyBank className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <StatCardContent value={budgetSummaryData?.totalInvestment} percentage={12.3} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                État du budget
              </CardTitle>
              <PieChart className="h-4 w-4 text-blue-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <div className="bg-muted mt-2 h-2 w-full rounded-full">
                <div className="bg-primary h-full w-[68%] rounded-full" />
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
