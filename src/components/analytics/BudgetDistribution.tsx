'use client'

import { fetchUserBudget } from '@/app/_actions/dashbord/fetchUserBudget'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { formatEuro } from '@/utils/format'
import { PieChart as PieChartIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Cell, Pie, PieChart } from 'recharts'
import AnalyticsSkeleton from '../ui/skeleton/skeleton-analytics'

interface Budget {
  id: string | number
  name: string
  availableAmount: number
  threshold: number
}

interface ChartData {
  name: string
  value: number
  fill: string
}

const chartConfig = {
  chart1: { color: 'hsl(var(--chart-1))' },
  chart2: { color: 'hsl(var(--chart-2))' },
  chart3: { color: 'hsl(var(--chart-3))' },
  chart4: { color: 'hsl(var(--chart-4))' },
  chart5: { color: 'hsl(var(--chart-5))' },
  chart6: { color: 'hsl(var(--chart-6, 260 60% 50%))' },
  chart7: { color: 'hsl(var(--chart-7, 320 60% 50%))' },
  chart8: { color: 'hsl(var(--chart-8, 190 60% 50%))' },
}

export function BudgetDistribution() {
  const [isLoading, setIsLoading] = useState(true)
  const [budgetData, setBudgetData] = useState<ChartData[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const data = await fetchUserBudget()

        if (data && Array.isArray(data)) {
          const chartData = data.map((budget: Budget, index: number) => ({
            name: budget.name,
            value: budget.threshold,
            fill: `${Object.values(chartConfig)[index % Object.values(chartConfig).length].color}`,
          }))

          setBudgetData(chartData)
        } else {
          setBudgetData([])
        }
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des données de budget:',
          error,
        )
        setBudgetData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <AnalyticsSkeleton />
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <PieChartIcon className="text-primary/80 h-5 w-5" />
          <CardTitle>Distribution des Budgets</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {budgetData.length > 0 ? (
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <PieChart accessibilityLayer>
              <Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {budgetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => {
                      return `${name} : ${formatEuro(value as number)}`
                    }}
                    className="w-full"
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-primary/10 mb-4 rounded-full p-3">
              <PieChartIcon className="text-primary h-6 w-6" />
            </div>
            <h3 className="mb-2 text-base font-medium">Aucun budget défini</h3>
            <p className="text-foreground/60 mb-4 max-w-md text-sm">
              Créez des budgets pour visualiser leur répartition.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
