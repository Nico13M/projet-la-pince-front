'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { formatEuro } from '@/utils/format'
import { useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import AnalyticsSkeleton from '../ui/skeleton/skeleton-analytics'

const expenseData = [
  { month: 'Jan', expense: 1250, income: 2500 },
  { month: 'Fév', expense: 1400, income: 2450 },
  { month: 'Mar', expense: 1300, income: 2600 },
  { month: 'Avr', expense: 1450, income: 2700 },
  { month: 'Mai', expense: 1350, income: 2550 },
  { month: 'Juin', expense: 1200, income: 2800 },
]

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
  const [isLoading, setIsLoading] = useState(false)

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
          <LineChart accessibilityLayer data={expenseData}>
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
