import BudgetList from '@/components/budget/BudgetList'
import { AppSidebar } from '@/components/dashboard/AppSidebar'
import BudgetForms from '@/components/forms/BudgetForms'
import { Pagination } from '@/components/Pagination'
import { Button } from '@/components/ui/button'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { BellIcon } from 'lucide-react'

export default function BudgetPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <header className="bg-background sticky top-0 z-10 flex h-16 items-center justify-between border-b px-4">
            <h1 className="text-xl font-semibold">Budget</h1>
            <div className="flex items-center gap-4">
              <SidebarTrigger className="flex md:hidden" />
              <Button variant="ghost" size="icon">
                <BellIcon className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-center text-xl font-semibold">
                Ajouter Budget
              </h2>
              <BudgetForms />

              <div className="mt-8">
                <h3 className="mb-4 text-lg font-medium">Tableau des Budget</h3>
                <div className="rounded-md">
                  <BudgetList />
                </div>
                <Pagination />
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
