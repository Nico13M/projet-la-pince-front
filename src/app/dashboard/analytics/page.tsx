import { BudgetDistribution } from '@/components/analytics/BudgetDistribution'
import { CategoryAnalysis } from '@/components/analytics/CategoryAnalysis'
import { ExpenseTrend } from '@/components/analytics/ExpenseTrend'
import { SavingsProgress } from '@/components/analytics/SavingsProgress'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'

export default function AnalyticsPage() {
  return (
    <>
      <DashboardHeader title="Analyse Financière" />
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <ExpenseTrend />
          <BudgetDistribution />
          <CategoryAnalysis />
          <SavingsProgress />
        </div>
      </div>
    </>
  )
}
