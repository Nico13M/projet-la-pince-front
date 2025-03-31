'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const savingsData = [
  { month: 'Jan', epargne: 200, objectif: 250 },
  { month: 'Fév', epargne: 300, objectif: 300 },
  { month: 'Mar', epargne: 250, objectif: 300 },
  { month: 'Avr', epargne: 400, objectif: 350 },
  { month: 'Mai', epargne: 350, objectif: 400 },
  { month: 'Juin', epargne: 500, objectif: 450 },
]

const chartConfig = {
  epargne: {
    label: 'Épargne Réelle',
    color: 'hsl(var(--chart-1))',
  },
  objectif: {
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
              <linearGradient id="colorEpargne" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-epargne)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-epargne)"
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
              dataKey="epargne"
              stroke="var(--color-epargne)"
              fillOpacity={1}
              fill="url(#colorEpargne)"
            />
            <Area
              type="monotone"
              dataKey="objectif"
              stroke="var(--color-objectif)"
              fill="none"
              strokeDasharray="5 5"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
