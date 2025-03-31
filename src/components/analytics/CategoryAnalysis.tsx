'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { formatEuro } from '@/utils/formatEuro'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const categoryData = [
  {
    categorie: 'Alimentation',
    lastMonthExpense: 450,
    currentMonthExpense: 500,
  },
  {
    categorie: 'Logement',
    lastMonthExpense: 800,
    currentMonthExpense: 800,
  },
  {
    categorie: 'Transport',
    lastMonthExpense: 320,
    currentMonthExpense: 300,
  },
  {
    categorie: 'Loisirs',
    lastMonthExpense: 180,
    currentMonthExpense: 200,
  },
  {
    categorie: 'Divers',
    lastMonthExpense: 170,
    currentMonthExpense: 150,
  },
]

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
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>
          Analyse des dépenses par catégorie par rapport au mois dernier
        </CardTitle>
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
                    return `${name} : ${formatEuro(value as number)}`
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
