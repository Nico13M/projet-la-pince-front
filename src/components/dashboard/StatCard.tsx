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
import { formatEuro } from '@/utils/format'

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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {isLoading ? (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      ) : (
        <>
          <Card className="relative border-0 overflow-hidden bg-gradient-to-br from-primary to-secondary text-white shadow-lg rounded-2xl backdrop-blur-sm">
            <div className="absolute inset-0 bg-white/5"></div>
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-black/10 blur-3xl"></div>
            <CardHeader className="flex flex-row items-center justify-between pt-6 z-10">
              <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
                <span className="text-white font-semibold uppercase tracking-wide">Solde restant</span>
              </CardTitle>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <svg viewBox="0 0 48 48" height="24" width="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" fill="white" fillOpacity="0.01"/>
                  <path d="M44 11H4V37H44V11Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M4 19H44" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M10 29H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 11L16 11" stroke="#FFD666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 z-10">
              <div className="text-3xl font-bold tracking-tight">{formatEuro(budgetSummaryData?.remainingBalance || 0)}</div>
              <div className="flex flex-col">
                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <span className="text-white/60 text-xs uppercase tracking-wider">Titulaire</span>
                    <span className="text-white text-sm mt-1">M. Palermo</span>
                  </div>
                  <span className="text-white/80 tracking-wider font-semibold">VISA</span>
                </div>
                <div className="mt-4">
                  <div className="text-white text-sm tracking-[0.25em] font-light">
                    •••• •••• •••• 3479
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative border-0 overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl">
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-primary/80 to-secondary/80"></div>
            <div className="absolute -right-10 -bottom-16 h-32 w-32 rounded-full bg-primary/5 blur-2xl"></div>

            <CardHeader className="flex flex-row items-center justify-between pt-6">
              <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
                <CreditCard className="h-4 w-4 text-primary" />
                <span className="font-medium tracking-wide">Dépenses mensuelles</span>
              </CardTitle>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm shadow-sm">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="pt-4 pb-6">
              <div className="space-y-3">
                <div className="text-3xl font-bold tracking-tight">{formatEuro(budgetSummaryData?.totalExpense || 0)}</div>
                <div className="flex items-center gap-1.5">
                  <div className="bg-red-50 rounded-md p-1 flex items-center shadow-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex items-center text-xs">
                    <span className="text-red-500 font-semibold">
                      {4.3}%
                    </span>
                    <span className="ml-1.5 text-foreground/60">vs mois dernier</span>
                  </div>
                </div>
                <div className="h-1 w-full mt-3 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative border-0 overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl">
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-primary/70 to-secondary/70"></div>
            <div className="absolute -left-10 -bottom-16 h-32 w-32 rounded-full bg-primary/5 blur-2xl"></div>

            <CardHeader className="flex flex-row items-center justify-between pt-6">
              <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
                <PiggyBank className="h-4 w-4 text-primary" />
                <span className="font-medium tracking-wide">Économies mensuelles</span>
              </CardTitle>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm shadow-sm">
                <PiggyBank className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="pt-4 pb-6">
              <div className="space-y-3">
                <div className="text-3xl font-bold tracking-tight">{formatEuro(budgetSummaryData?.totalInvestment || 0)}</div>
                <div className="flex items-center gap-1.5">
                  <div className="bg-green-50 rounded-md p-1 flex items-center shadow-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 15L12 9L6 15" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex items-center text-xs">
                    <span className="text-green-500 font-semibold">
                      +{12.3}%
                    </span>
                    <span className="ml-1.5 text-foreground/60">vs mois dernier</span>
                  </div>
                </div>
                <div className="h-1 w-full mt-3 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full bg-green-400 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative border-0 overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl">
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-primary/60 to-secondary/60"></div>
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/5 blur-2xl"></div>

            <CardHeader className="flex flex-row items-center justify-between pt-6">
              <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
                <PieChart className="h-4 w-4 text-primary" />
                <span className="font-medium tracking-wide">État du budget</span>
              </CardTitle>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm shadow-sm">
                <PieChart className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-3xl font-bold tracking-tight">
                  {budgetUtilization}%
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      budgetUtilization > 80
                        ? 'bg-gradient-to-r from-red-400 to-red-500'
                        : budgetUtilization > 60
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                          : 'bg-gradient-to-r from-primary/80 to-primary'
                    }`}

                    style={{ width: `${budgetUtilization}%` }}
                  />
                </div>
                <div className="text-foreground/60 flex justify-between text-xs font-medium">
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
