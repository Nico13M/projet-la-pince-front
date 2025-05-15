'use client'

import { fetchUserCompareMonthlyBudget } from '@/app/_actions/dashboard/fetchUserCompareMonthlyBudget'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { CategoryComparisonPoint, CategoryExpenseItem } from '@/types/analytics'
import { formatEuro } from '@/utils/format'
import { ChartColumnBig } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import AnalyticsSkeleton from '../ui/skeleton/skeleton-analytics'

const chartConfig = {
  lastMonthExpense: {
    label: 'Mois dernier',
    color: 'hsl(var(--chart-2))',
  },
  currentMonthExpense: {
    label: 'Mois actuel',
    color: 'hsl(var(--chart-1))',
  },
}

export function CategoryAnalysis() {
  const [isLoading, setIsLoading] = useState(false)
  const [categoryData, setCategoryData] = useState<CategoryComparisonPoint[]>(
    [],
  )

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const response = await fetchUserCompareMonthlyBudget()
  
        const currentItems = response.currentBudgetSummary.filter(
          (item: CategoryExpenseItem) =>
            item.category.transactionType !== 'income' &&
            item.category.transactionType !== 'investment'
        )
        const lastItems = response.lastMonthBudgetSummary.filter(
          (item: CategoryExpenseItem) =>
            item.category.transactionType !== 'income' &&
            item.category.transactionType !== 'investment'
        )
  
        const categories: Record<string, CategoryComparisonPoint> = {}
  
        currentItems.forEach((item: CategoryExpenseItem) => {
          const spent = item.threshold - item.availableAmount
          const name = item.category.name
  
          if (!categories[name]) {
            categories[name] = {
              categorie: name,
              currentMonthExpense: spent,
              lastMonthExpense: 0,
            }
          } else {
            categories[name].currentMonthExpense += spent
          }
        })
  
        lastItems.forEach((item: CategoryExpenseItem) => {
          const spent = item.threshold - item.availableAmount
          const name = item.category.name
  
          if (!categories[name]) {
            categories[name] = {
              categorie: name,
              currentMonthExpense: 0,
              lastMonthExpense: spent,
            }
          } else {
            categories[name].lastMonthExpense += spent
          }
        })
  
        setCategoryData(Object.values(categories))
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error)
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
        <div className="flex gap-2">
          <ChartColumnBig className="text-primary/80 h-5 w-5 shrink-0" />
          <CardTitle>
            Analyse des dépenses par catégorie par rapport au mois dernier
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {categoryData.length > 0 ? (
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart accessibilityLayer data={categoryData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="categorie"
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'var(--muted-foreground)' }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'var(--muted-foreground)' }}
                tickFormatter={(value) => formatEuro(value, true)}
              />
              <Bar
                dataKey="lastMonthExpense"
                fill={chartConfig.lastMonthExpense.color}
                fillOpacity={1}
                radius={[4, 4, 0, 0]}
                barSize={20}
                name="Mois dernier"
              />
              <Bar
                dataKey="currentMonthExpense"
                fill={chartConfig.currentMonthExpense.color}
                fillOpacity={1}
                radius={[4, 4, 0, 0]}
                barSize={20}
                name="Mois actuel"
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-full"
                    formatter={(value, name) => {
                      return value === 0
                        ? `${name} : N/A`
                        : `${name} : ${formatEuro(value as number)}`
                    }}
                  />
                }
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-primary/10 mb-4 rounded-full p-3">
              <ChartColumnBig className="text-primary h-6 w-6" />
            </div>
            <h3 className="mb-2 text-base font-medium">Aucune dépense</h3>
            <p className="text-foreground/60 mb-4 max-w-md text-sm">
              Dépensez de l'argent pour visualiser les tendances.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
