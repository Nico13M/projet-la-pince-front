import { getUserNotifications } from '@/app/_actions/user/notification'
import { BudgetOverview } from '@/components/dashboard/BudgetOverview'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { RecentTransactions } from '@/components/dashboard/RecentTransactions'
import { StatCards } from '@/components/dashboard/StatCards'

export default async function HomePage() {

  let notifications: Notification[] = []
  try {
    notifications = await getUserNotifications()
  } catch (err) {
    console.error('Impossible de charger les notifications :', err)
  }
  return (
    <>
      <DashboardHeader title="Dashboard" initialNotifications={notifications}/>
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
