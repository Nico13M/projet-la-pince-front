'use client'

import { fetchUserBudget } from '@/app/_actions/analytics/fetchUserBudget'
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
import { Cell, Pie, PieChart, PieLabelRenderProps } from 'recharts'
import AnalyticsSkeleton from '../ui/skeleton/skeleton-analytics'


function generateColors(count: number): string[] {
  const baseHues = [
    0,    // rouge clair
    210,  // gris froid (désaturé)
    220,  // bleu lavande    
    340,  // rose doux
    200,  // bleu doux
    20,   // saumon
    210,  // azur
    120,  //vert pastel
    0,    // gris chaud (désaturé)
    230,  // bleu pastel
    265,  //bleu violet
  ]

  return Array.from({ length: count }, (_, i) => {
    const hue = baseHues[i % baseHues.length] // cyclique si + de 9
    const saturation = 60                     // saturation moyenne
    const lightness = 50                     // luminosité douce

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  })
}

interface ChartData {
  name: string
  value: number
  fill: string
}

const chartConfig = {
}

export function BudgetDistribution() {
  const [isLoading, setIsLoading] = useState(true)
  const [budgetData, setBudgetData] = useState<ChartData[]>([])

  useEffect(() => {
  async function fetchData() {
    setIsLoading(true)
    try {
      const budgets = await fetchUserBudget(1, 10);
      console.log(budgets);
      const colors = generateColors(budgets?.data.length);

      if (Array.isArray(budgets?.data) && budgets.data.length > 0) {
        const chartData = budgets.data.map((budget: Budget, index: number) => ({
          name: `${budget.name}`,
          value: budget.threshold,
          fill: colors[index],
        }))
        setBudgetData(chartData)
      } else {
        setBudgetData([])
      }
    } catch (error) {
      console.error('Erreur de budget:', error)
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
              outerRadius={90}
              innerRadius={40}
              dataKey="value"
              nameKey="name"
              labelLine={false}
              label={({ name, percent }) =>
                percent > 0.03 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
              }
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
