import {
  ArrowDownIcon,
  ArrowUpIcon,
  CreditCard,
  DollarSign,
  PiggyBank,
  PieChart,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function StatCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <DollarSign className="text-primary h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€3,580.45</div>
          <div className="text-muted-foreground flex items-center text-xs">
            <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
            <span className="text-green-500">+2.5%</span>
            <span className="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Monthly Expenses
          </CardTitle>
          <CreditCard className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€1,245.80</div>
          <div className="text-muted-foreground flex items-center text-xs">
            <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
            <span className="text-red-500">-4.3%</span>
            <span className="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
          <PiggyBank className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€850.00</div>
          <div className="text-muted-foreground flex items-center text-xs">
            <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
            <span className="text-green-500">+12.3%</span>
            <span className="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
          <PieChart className="h-4 w-4 text-blue-300" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">68%</div>
          <div className="bg-muted mt-2 h-2 w-full rounded-full">
            <div className="bg-primary h-full w-[68%] rounded-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
