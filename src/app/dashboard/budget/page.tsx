import BudgetList from '@/components/budget/BudgetList'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import BudgetForms from '@/components/forms/BudgetForms'
import { Pagination } from '@/components/Pagination'

export default function BudgetPage() {
  return (
    <>
      <DashboardHeader title="Budget" />
      <div className="p-4 md:p-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-xl font-semibold">
            Ajouter Budget
          </h2>
          <BudgetForms />

          <div className="mt-8">
            <h3 className="mb-4 text-lg font-medium">Tableau des Budget</h3>
            <div>
              <BudgetList />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
