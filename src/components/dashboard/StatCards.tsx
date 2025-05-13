'use client'
import { fetchOneBudgetSummary } from '@/app/_actions/dashboard/fetchOneBudgetSummary'
import { fetchUserBudget } from '@/app/_actions/dashboard/fetchUserBudget'
import { fetchUserCompareMonthlyBudget } from '@/app/_actions/dashboard/fetchUserCompareMonthlyBudget'
import { fetchUser } from '@/app/_actions/user/fetchUser'
import { SavedBudget } from '@/types/budget'
import { User } from '@/types/user'
import { CreditCard, PiggyBank } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CardSkeleton } from '../ui/skeleton/skeleton-card'
import { BalanceCard } from './stat-cards/BalanceCard'
import { BudgetCard } from './stat-cards/BudgetCard'
import CompareCard from './stat-cards/CompareCard'

interface BudgetSummary {
  remainingBalance: number
  totalExpense: number
  totalInvestment: number
  budgetUtilization: number
}

export function StatCards() {
  const [isLoading, setIsLoading] = useState(true)
  const [budgetSummary, setBudgetSummary] = useState<BudgetSummary | null>(null)
  const [userData, setUserData] = useState<User | null>(null)
  const [budgetUtilizationAverage, setBudgetUtilizationAverage] = useState(0)
  const [expenseComparePercentage, setExpenseComparePercentage] = useState(0)
  const [investmentComparePercentage, setInvestmentComparePercentage] =
    useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const [budgetData, userData, userBudgets, compareMonthlyBudget] =
          await Promise.all([
            fetchOneBudgetSummary(),
            fetchUser(),
            fetchUserBudget(),
            fetchUserCompareMonthlyBudget(),
          ])

        console.log(compareMonthlyBudget)

        setBudgetSummary(budgetData)
        setUserData(userData)

        // Calcul des pourcentages de comparaison entre mois
        if (compareMonthlyBudget) {
          const { currentBudgetSummary, lastMonthBudgetSummary } =
            compareMonthlyBudget

          // Calcul pour les dépenses
          const currentExpenseTotal = currentBudgetSummary
            .filter(
              (budget: any) => budget.category.transactionType === 'expense',
            )
            .reduce(
              (sum: number, budget: any) =>
                sum + (budget.threshold - budget.availableAmount),
              0,
            )

          const lastMonthExpenseTotal =
            lastMonthBudgetSummary?.length > 0
              ? lastMonthBudgetSummary
                  .filter(
                    (budget: any) =>
                      budget.category.transactionType === 'expense',
                  )
                  .reduce(
                    (sum: number, budget: any) =>
                      sum + (budget.threshold - budget.availableAmount),
                    0,
                  )
              : 0

          // Calcul pour les investissements/économies
          const currentInvestmentTotal = currentBudgetSummary
            .filter(
              (budget: any) =>
                budget.category.transactionType === 'income' ||
                budget.category.transactionType === 'investment',
            )
            .reduce(
              (sum: number, budget: any) =>
                sum + (budget.threshold - budget.availableAmount),
              0,
            )

          const lastMonthInvestmentTotal =
            lastMonthBudgetSummary?.length > 0
              ? lastMonthBudgetSummary
                  .filter(
                    (budget: any) =>
                      budget.category.transactionType === 'income' ||
                      budget.category.transactionType === 'investment',
                  )
                  .reduce(
                    (sum: number, budget: any) =>
                      sum + (budget.threshold - budget.availableAmount),
                    0,
                  )
              : 0

          // Calcul des pourcentages
          if (lastMonthExpenseTotal > 0) {
            setExpenseComparePercentage(
              Number(
                (
                  ((currentExpenseTotal - lastMonthExpenseTotal) /
                    lastMonthExpenseTotal) *
                  100
                ).toFixed(1),
              ),
            )
          }

          if (lastMonthInvestmentTotal > 0) {
            setInvestmentComparePercentage(
              Number(
                (
                  ((currentInvestmentTotal - lastMonthInvestmentTotal) /
                    lastMonthInvestmentTotal) *
                  100
                ).toFixed(1),
              ),
            )
          }
        }

        // Calcul de l'utilisation moyenne du budget
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
          <BalanceCard
            remainingBalance={budgetSummary?.remainingBalance || 0}
            userData={userData}
            isLoading={isLoading}
          />

          <CompareCard
            totalAmount={budgetSummary?.totalExpense || 0}
            comparePercentage={expenseComparePercentage}
            title="Dépenses mensuelles"
            icon={<CreditCard className="text-primary h-4 w-4" />}
            type="expense"
            isLoading={isLoading}
          />

          <CompareCard
            totalAmount={budgetSummary?.totalInvestment || 0}
            comparePercentage={investmentComparePercentage}
            title="Investissements mensuels"
            icon={<PiggyBank className="text-primary h-4 w-4" />}
            type="investment"
            isLoading={isLoading}
          />

          <BudgetCard
            budgetUtilizationAverage={budgetUtilizationAverage}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  )
}
