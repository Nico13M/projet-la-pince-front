import { AppSidebar } from '@/components/AppSidebar'
import { BudgetOverview } from '@/components/BudgetOverview'
import { RecentTransactions } from '@/components/RecentTransactions'
import { StatCards } from '@/components/StatCard'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { BellIcon } from 'lucide-react'
//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'

export function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <header className="bg-background sticky top-0 z-10 flex h-16 items-center justify-between border-b px-4">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <SidebarTrigger className="flex md:hidden" />
              <Button variant="ghost" size="icon">
                <BellIcon className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              {/* <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar> */}
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">
            <div className="grid gap-6">
              <StatCards />
              <div className="grid gap-6 md:grid-cols-2">
                <RecentTransactions />
                <BudgetOverview />
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
export default DashboardPage
