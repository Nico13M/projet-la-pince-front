import { AppSidebar } from '@/components/dashboard/AppSidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

import { BudgetDistribution } from '@/components/analytics/BudgetDistribution'
import { CategoryAnalysis } from '@/components/analytics/CategoryAnalysis'
import { ExpenseTrend } from '@/components/analytics/ExpenseTrend'
import { SavingsProgress } from '@/components/analytics/SavingsProgress'
import { Button } from '@/components/ui/button'
import { BellIcon } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <header className="bg-background sticky top-0 z-10 flex h-16 items-center justify-between border-b px-4">
            <h1 className="text-xl font-semibold">Analyse Financière</h1>
            <div className="flex items-center gap-4">
              <SidebarTrigger className="flex md:hidden" />
              <Button variant="ghost" size="icon">
                <BellIcon className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">
            <div className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <ExpenseTrend />
                <BudgetDistribution />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <CategoryAnalysis />
                <SavingsProgress />
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
