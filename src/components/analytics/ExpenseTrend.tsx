'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { formatEuro } from '@/utils/format'
import { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import AnalyticsSkeleton from '../ui/skeleton/skeleton-analytics'
import { fetchAllBudgetSummaries } from '@/app/_actions/analytics/fetchAllBudgetSummaries'

interface BudgetItem {
  threshold: number
  availableAmount: number
  updatedAt: string
  totalExpense: number
  totalInvestment: number
  remainingBalance: number
}

const monthsConfig: Record<
  string,
  {
    shortLabel: string
    data: { income: number[]; expense: number[] }
  }
> = {
  January: { shortLabel: 'Jan', data: { income: [], expense: [] } },
  February: { shortLabel: 'Fév', data: { income: [], expense: [] } },
  March: { shortLabel: 'Mar', data: { income: [], expense: [] } },
  April: { shortLabel: 'Avr', data: { income: [], expense: [] } },
  May: { shortLabel: 'Mai', data: { income: [], expense: [] } },
  June: { shortLabel: 'Juin', data: { income: [], expense: [] } },
  July: { shortLabel: 'Juil', data: { income: [], expense: [] } },
  August: { shortLabel: 'Aoû', data: { income: [], expense: [] } },
  September: { shortLabel: 'Sep', data: { income: [], expense: [] } },
  October: { shortLabel: 'Oct', data: { income: [], expense: [] } },
  November: { shortLabel: 'Nov', data: { income: [], expense: [] } },
  December: { shortLabel: 'Déc', data: { income: [], expense: [] } },
}

const chartConfig = {
  expense: {
    label: 'Dépenses',
    color: 'hsl(var(--chart-1))',
  },
  income: {
    label: 'Revenus',
    color: 'hsl(var(--chart-2))',
  },
}

export function ExpenseTrend() {
  const [isLoading, setIsLoading] = useState(true)
  const [displayData, setDisplayData] = useState<
    { month: string; income: number; expense: number }[]
  >([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetData: BudgetItem[] = await fetchAllBudgetSummaries()

        if (Array.isArray(budgetData)) {
          budgetData.forEach((element) => {
            const monthIndex = new Date(element.updatedAt).getUTCMonth()
            const monthKey = Object.keys(monthsConfig)[monthIndex]

            if (monthsConfig[monthKey]) {
              monthsConfig[monthKey].data.expense.push(
                element.totalExpense + element.totalInvestment,
              )

              monthsConfig[monthKey].data.income.push(
                element.remainingBalance +
                  element.totalExpense +
                  element.totalInvestment,
              )
            }
          })
        }

        const fullData = Object.entries(monthsConfig).map(([_, config]) => {
          const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0)

          return {
            month: config.shortLabel,
            income: sum(config.data.income),
            expense: sum(config.data.expense),
          }
        })

        const currentMonth = new Date().getMonth()

        const last6Months = Array.from({ length: 6 }, (_, i) => {
          const index = (currentMonth - 5 + i + 12) % 12
          return Object.values(monthsConfig)[index].shortLabel
        })

        const filtered = fullData.filter((entry) =>
          last6Months.includes(entry.month),
        )

        setDisplayData(filtered)
      } catch (error) {
        console.error('Error loading budget chart data:', error)
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
        <CardTitle>Tendance des Dépenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <LineChart data={displayData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: 'var(--muted-foreground)' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)' }}
              tickMargin={15}
              tickFormatter={(value) => formatEuro(value, true)}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="var(--color-expense)"
              strokeWidth={2}
              dot={{ r: 4, fill: 'var(--color-expense)' }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="var(--color-income)"
              strokeWidth={2}
              dot={{ r: 4, fill: 'var(--color-income)' }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    const label =
                      chartConfig[name as keyof typeof chartConfig]?.label
                    return `${label} : ${formatEuro(value as number)}`
                  }}
                  className="w-full"
                />
              }
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
