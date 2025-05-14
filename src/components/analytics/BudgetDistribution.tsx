'use client'

import { fetchUserBudget } from '@/app/_actions/analytics/fetchUserBudget'
import { LegendBudgetDetails } from '@/components/analytics/LegendBudgetDetails'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { BudgetDistributionItem, PieChartSegment } from '@/types/analytics'
import { generateColors } from '@/utils/chartUtils'
import { formatEuro } from '@/utils/format'
import { PieChart as PieChartIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Cell, Pie, PieChart } from 'recharts'
import AnalyticsSkeleton from '../ui/skeleton/skeleton-analytics'

const chartConfig = {}

export function BudgetDistribution() {
  const [isLoading, setIsLoading] = useState(true)
  const [budgetData, setBudgetData] = useState<PieChartSegment[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)

        const response = await fetchUserBudget(1, 10)
        const colors = generateColors(response?.data?.length || 0)

        if (response?.data && Array.isArray(response?.data)) {
          const chartData = response.data.map(
            (budget: BudgetDistributionItem, index: number) => ({
              name: budget.name,
              value: budget.threshold,
              fill: colors[index % colors.length],
            }),
          )

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
    <Card className="border-accent/20 bg-white shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <PieChartIcon className="text-primary/80 h-5 w-5" />
          <CardTitle>Distribution des Budgets</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {budgetData.length > 0 ? (
          <div className="mt-12 flex flex-col items-start justify-center gap-4 md:flex-row">
            <div className="w-full md:w-3/5">
              <ChartContainer
                config={chartConfig}
                className="min-h-[300px] w-full"
              >
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    dataKey="value"
                    nameKey="name"
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
                </PieChart>
              </ChartContainer>
            </div>
            <LegendBudgetDetails budgetData={budgetData} />
          </div>
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
