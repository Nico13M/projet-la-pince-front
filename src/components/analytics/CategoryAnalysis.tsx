"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const categoryData = [
  { 
    categorie: 'Alimentation', 
    moisDernier: 450, 
    moisActuel: 500 
  },
  { 
    categorie: 'Logement', 
    moisDernier: 800, 
    moisActuel: 800 
  },
  { 
    categorie: 'Transport', 
    moisDernier: 320, 
    moisActuel: 300 
  },
  { 
    categorie: 'Loisirs', 
    moisDernier: 180, 
    moisActuel: 200 
  },
  { 
    categorie: 'Divers', 
    moisDernier: 170, 
    moisActuel: 150 
  },
]

const chartConfig = {
  moisDernier: {
    label: 'Mois Dernier',
    color: 'hsl(var(--chart-2))',
  },
  moisActuel: {
    label: 'Mois Actuel',
    color: 'hsl(var(--chart-1))',
  },
}

export function CategoryAnalysis() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Analyse par Catégorie</CardTitle>
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
              tickFormatter={(value) => `${value}€`}
            />
            <Bar 
              dataKey="moisDernier" 
              fill="var(--color-moisDernier)" 
              radius={[4, 4, 0, 0]}
              barSize={20}
              name="Mois Dernier"
            />
            <Bar 
              dataKey="moisActuel" 
              fill="var(--color-moisActuel)" 
              radius={[4, 4, 0, 0]}
              barSize={20}
              name="Mois Actuel"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 