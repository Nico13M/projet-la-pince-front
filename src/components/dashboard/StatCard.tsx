'use client'
import { fetchOneBudgetSummary } from '@/app/_actions/dashboard/fetchOneBudgetSummary'
import { fetchUserBudget } from '@/app/_actions/dashboard/fetchUserBudget'
import { fetchUser } from '@/app/_actions/user/fetchUser'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SavedBudget } from '@/types/budget'
import { User } from '@/types/user'
import { formatEuro } from '@/utils/format'
import { CreditCard, PieChart, PiggyBank } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CardSkeleton } from '../ui/skeleton/skeleton-card'

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
  const [userData, setUserData] = useState<User | null>(null)
  const [budgetUtilizationAverage, setBudgetUtilizationAverage] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const [budgetData, userData, userBudgets] = await Promise.all([
          fetchOneBudgetSummary(),
          fetchUser(),
          fetchUserBudget(),
        ])

        setBudgetSummaryData(budgetData)
        setUserData(userData)

        if (userBudgets?.data && userBudgets.data.length > 0) {
          const budgetsUtilization = userBudgets.data.map(
            (budget: SavedBudget) => {
              const used = budget.threshold - budget.availableAmount
              const percentage = (used / budget.threshold) * 100
              return Math.min(Math.max(percentage, 0), 100)
            },
          )

          const average =
            budgetsUtilization.reduce((acc, curr) => acc + curr, 0) /
            budgetsUtilization.length
          setBudgetUtilizationAverage(Math.round(average))
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

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
          <Card className="from-primary to-secondary relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br text-white shadow-lg backdrop-blur-sm">
            <div className="absolute inset-0 bg-white/5"></div>
            <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-black/10 blur-3xl"></div>
            <CardHeader className="z-10 flex flex-row items-center justify-between pt-6">
              <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
                <span className="font-semibold tracking-wide text-white uppercase">
                  Solde restant
                </span>
              </CardTitle>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <svg
                  viewBox="0 0 48 48"
                  height="24"
                  width="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="48"
                    height="48"
                    fill="white"
                    fillOpacity="0.01"
                  />
                  <path
                    d="M44 11H4V37H44V11Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 19H44"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 29H20"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 11L16 11"
                    stroke="#FFD666"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </CardHeader>
            <CardContent className="z-10 flex flex-col gap-5">
              <div className="text-3xl font-bold tracking-tight">
                {formatEuro(budgetSummaryData?.remainingBalance || 0)}
              </div>
              <div className="flex flex-col">
                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs tracking-wider text-white/60 uppercase">
                      Titulaire
                    </span>
                    <span className="mt-1 text-sm text-white">
                      {userData?.lastName} {userData?.firstName}
                    </span>
                  </div>
                  <span className="font-semibold tracking-wider text-white/80">
                    VISA
                  </span>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-light tracking-[0.25em] text-white">
                    •••• •••• •••• 3479
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden rounded-2xl border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <div className="from-primary/80 to-secondary/80 absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r"></div>
            <div className="bg-primary/5 absolute -right-10 -bottom-16 h-32 w-32 rounded-full blur-2xl"></div>

            <CardHeader className="flex flex-row items-center justify-between pt-6">
              <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
                <CreditCard className="text-primary h-4 w-4" />
                <span className="font-medium tracking-wide">
                  Dépenses mensuelles
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 pb-6">
              <div className="space-y-3">
                <div className="text-3xl font-bold tracking-tight">
                  {formatEuro(budgetSummaryData?.totalExpense || 0)}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center rounded-md bg-red-50 p-1 shadow-sm">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="#EF4444"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center text-xs">
                    <span className="font-semibold text-red-500">{4.3}%</span>
                    <span className="text-foreground/70 ml-1.5">
                      vs mois dernier
                    </span>
                  </div>
                </div>
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-red-400"
                    style={{ width: '60%' }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden rounded-2xl border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <div className="from-primary/70 to-secondary/70 absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r"></div>
            <div className="bg-primary/5 absolute -bottom-16 -left-10 h-32 w-32 rounded-full blur-2xl"></div>

            <CardHeader className="flex flex-row items-center justify-between pt-6">
              <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
                <PiggyBank className="text-primary h-4 w-4" />
                <span className="font-medium tracking-wide">
                  Économies mensuelles
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 pb-6">
              <div className="space-y-3">
                <div className="text-3xl font-bold tracking-tight">
                  {formatEuro(budgetSummaryData?.totalInvestment || 0)}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center rounded-md bg-green-50 p-1 shadow-sm">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 15L12 9L6 15"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center text-xs">
                    <span className="font-semibold text-green-500">
                      +{12.3}%
                    </span>
                    <span className="text-foreground/70 ml-1.5">
                      vs mois dernier
                    </span>
                  </div>
                </div>
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-green-400"
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden rounded-2xl border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <div className="from-primary/60 to-secondary/60 absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r"></div>
            <div className="bg-primary/5 absolute -top-16 -right-16 h-32 w-32 rounded-full blur-2xl"></div>

            <CardHeader className="flex flex-row items-center justify-between pt-6">
              <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
                <PieChart className="text-primary h-4 w-4" />
                <span className="font-medium tracking-wide">
                  État du budget
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-3xl font-bold tracking-tight">
                  {budgetUtilizationAverage}%
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${budgetUtilizationAverage > 80
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
        </>
      )}
    </div>
  )
}
