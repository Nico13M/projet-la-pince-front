'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { formatEuro } from '@/utils/format'
import { Cell, Pie, PieChart } from 'recharts'

const budgetData = [
  { name: 'Alimentation', value: 500, fill: 'var(--color-alimentation)' },
  { name: 'Logement', value: 800, fill: 'var(--color-logement)' },
  { name: 'Transport', value: 300, fill: 'var(--color-transport)' },
  { name: 'Loisirs', value: 200, fill: 'var(--color-loisirs)' },
  { name: 'Divers', value: 150, fill: 'var(--color-divers)' },
]

const chartConfig = {
  alimentation: {
    label: 'Alimentation',
    color: 'hsl(var(--chart-1))',
  },
  logement: {
    label: 'Logement',
    color: 'hsl(var(--chart-2))',
  },
  transport: {
    label: 'Transport',
    color: 'hsl(var(--chart-3))',
  },
  loisirs: {
    label: 'Loisirs',
    color: 'hsl(var(--chart-4))',
  },
  divers: {
    label: 'Divers',
    color: 'hsl(var(--chart-5))',
  },
}

export function BudgetDistribution() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Distribution du Budget</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <PieChart accessibilityLayer>
            <Pie
              data={budgetData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
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
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
