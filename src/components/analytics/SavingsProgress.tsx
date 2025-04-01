'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { formatEuro } from '@/utils/format'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const savingsData = [
  { month: 'Jan', savings: 200, goal: 250 },
  { month: 'Fév', savings: 300, goal: 300 },
  { month: 'Mar', savings: 250, goal: 300 },
  { month: 'Avr', savings: 400, goal: 350 },
  { month: 'Mai', savings: 350, goal: 400 },
  { month: 'Juin', savings: 500, goal: 450 },
]

const chartConfig = {
  savings: {
    label: 'Épargne Réelle',
    color: 'hsl(var(--chart-1))',
  },
  goal: {
    label: 'Objectif',
    color: 'hsl(var(--chart-2))',
  },
}

export function SavingsProgress() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Objectif d'épargne</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <AreaChart accessibilityLayer data={savingsData}>
            <defs>
              <linearGradient id="colorsavings" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-savings)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-savings)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)' }}
              tickFormatter={(value) => `${value}€`}
            />
            <Area
              type="monotone"
              dataKey="savings"
              stroke="var(--color-savings)"
              fillOpacity={1}
              fill="url(#colorsavings)"
            />
            <Area
              type="monotone"
              dataKey="goal"
              stroke="var(--color-goal)"
              fill="none"
              strokeDasharray="5 5"
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    const label =
                      chartConfig[name as keyof typeof chartConfig]?.label
                    return `${label} : ${formatEuro(value as number)}`
                  }}
                />
              }
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
