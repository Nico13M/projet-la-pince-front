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
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
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
          <CardTitle className="text-sm font-medium sm:text-base md:text-lg">
            Distribution des Budgets
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {budgetData.length > 0 ? (
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="w-full md:w-3/5">
              <div className="mx-auto h-[200px] w-[200px] sm:h-[220px] sm:w-[220px] md:h-[250px] md:w-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ChartContainer
                    config={chartConfig}
                    className="h-full w-full"
                  >
                    <PieChart>
                      <Pie
                        data={budgetData}
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        innerRadius="50%"
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
                </ResponsiveContainer>
              </div>
            </div>
            <LegendBudgetDetails budgetData={budgetData} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-primary/10 mb-3 rounded-full p-3">
              <PieChartIcon className="text-primary h-5 w-5" />
            </div>
            <h3 className="mb-1 text-sm font-medium sm:text-base">
              Aucun budget défini
            </h3>
            <p className="text-foreground/60 mb-2 max-w-md text-xs sm:text-sm">
              Créez des budgets pour visualiser leur répartition.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
