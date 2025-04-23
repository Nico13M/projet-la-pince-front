'use client'

import { fetchUserCompareMonthlyBudget } from '@/app/_actions/dashbord/fetchUserCompareMonthlyBudget'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { formatEuro } from '@/utils/format'
import { ChartColumnBig } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import AnalyticsSkeleton from '../ui/skeleton/skeleton-analytics'

interface BudgetItem {
  id: string
  name: string
  description: string
  threshold: number
  availableAmount: number
  userId: string
  categoryId: string
  createdAt: string
  updatedAt: string
  category: {
    id: string
    name: string
    createdAt: string
    updatedAt: string
    transactionType: string
    userId: string
  }
}
interface CategoryData {
  categorie: string
  lastMonthExpense: number
  currentMonthExpense: number
}

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
  const [categoryData, setCategoryData] = useState<CategoryData[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const response = await fetchUserCompareMonthlyBudget()
        const categories: Record<string, CategoryData> = {}

        response.currentBudgetSummary.forEach((item: BudgetItem) => {
          const categoryName = item.category.name
          if (!categories[categoryName]) {
            categories[categoryName] = {
              categorie: categoryName,
              currentMonthExpense: item.availableAmount,
              lastMonthExpense: 0,
            }
          } else {
            categories[categoryName] = {
              ...categories[categoryName],
              currentMonthExpense:
                categories[categoryName].currentMonthExpense +
                item.availableAmount,
            }
          }
        })

        response.lastMonthBudgetSummary.forEach((item: BudgetItem) => {
          const categoryName = item.category.name
          if (!categories[categoryName]) {
            categories[categoryName] = {
              categorie: categoryName,
              lastMonthExpense: item.availableAmount,
              currentMonthExpense: 0,
            }
          } else {
            categories[categoryName] = {
              ...categories[categoryName],
              lastMonthExpense:
                categories[categoryName].lastMonthExpense +
                item.availableAmount,
            }
          }
        })
        const formattedData = Object.values(categories)
        setCategoryData(formattedData)
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex gap-2">
          <ChartColumnBig className="text-primary/80 h-5 w-5 shrink-0" />
          <CardTitle>
            Analyse des dépenses par catégorie par rapport au mois dernier
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  )
}
