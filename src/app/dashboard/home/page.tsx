import { BudgetOverview } from '@/components/dashboard/BudgetOverview'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { RecentTransactions } from '@/components/dashboard/RecentTransactions'
import { StatCards } from '@/components/dashboard/StatCards'

export default async function HomePage() {
  return (
    <>
      <DashboardHeader title="Dashboard" />
      <div className="p-4 md:p-6">
        <div className="grid gap-6">
          <StatCards />
          <div className="grid gap-6 md:grid-cols-2">
            <RecentTransactions />
            <BudgetOverview />
          </div>
        </div>
      </div>
    </>
  )
}
