'use client'

import { fetchUserBudget } from '@/app/_actions/dashbord/fetchUserBudget'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { formatEuro } from '@/utils/format'
import { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import AnalyticsSkeleton from '../ui/skeleton/skeleton-analytics'

interface Budget {
  id: string
  name: string
  description: string
  threshold: number
  availableAmount: number
  userId: string
  categoryId: string
  createdAt: Date
  updatedAt: Date
}

const chartConfig = {
  availableAmount: {
    label: 'Montant dépensé',
    color: 'hsl(var(--chart-1))',
  },
  threshold: {
    label: 'Plafond',
    color: 'hsl(var(--chart-2))',
  },
}

export function SavingsProgress() {
  const [isLoading, setIsLoading] = useState(true)
  const [budgetData, setBudgetData] = useState<Budget[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const data = await fetchUserBudget()
        setBudgetData(data)
      } catch (error) {
        console.error('Error fetching budget data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return <AnalyticsSkeleton />
  }

  const monthsConfig: Record<
    string,
    {
      shortLabel: string
      data: { threshold: number[]; availableAmount: number[] }
    }
  > = {
    January: {
      shortLabel: 'Jan',
      data: { threshold: [], availableAmount: [] },
    },
    February: {
      shortLabel: 'Fév',
      data: { threshold: [], availableAmount: [] },
    },
    March: { shortLabel: 'Mar', data: { threshold: [], availableAmount: [] } },
    April: { shortLabel: 'Avr', data: { threshold: [], availableAmount: [] } },
    May: { shortLabel: 'Mai', data: { threshold: [], availableAmount: [] } },
    June: { shortLabel: 'Juin', data: { threshold: [], availableAmount: [] } },
    July: { shortLabel: 'Juil', data: { threshold: [], availableAmount: [] } },
    August: { shortLabel: 'Aoû', data: { threshold: [], availableAmount: [] } },
    September: {
      shortLabel: 'Sep',
      data: { threshold: [], availableAmount: [] },
    },
    October: {
      shortLabel: 'Oct',
      data: { threshold: [], availableAmount: [] },
    },
    November: {
      shortLabel: 'Nov',
      data: { threshold: [], availableAmount: [] },
    },
    December: {
      shortLabel: 'Déc',
      data: { threshold: [], availableAmount: [] },
    },
  }

  budgetData.forEach((element) => {
    const monthIndex = new Date(element.updatedAt).getUTCMonth()
    const monthKey = Object.keys(monthsConfig)[monthIndex]

    if (monthsConfig[monthKey]) {
      monthsConfig[monthKey].data.threshold.push(element.threshold)
      monthsConfig[monthKey].data.availableAmount.push(
        element.threshold - element.availableAmount,
      )
    }
  })

  const savingsData = Object.entries(monthsConfig).map(([_, config]) => {
    const calculateTotal = (array: number[]) =>
      array.reduce((sum, value) => sum + value, 0)

    return {
      month: config.shortLabel,
      availableAmount: calculateTotal(config.data.availableAmount),
      threshold: calculateTotal(config.data.threshold),
    }
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Bilan budgétaire</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <AreaChart accessibilityLayer data={savingsData}>
            <defs>
              <linearGradient
                id="coloravailableAmount"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-availableAmount)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-availableAmount)"
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
              dataKey="availableAmount"
              stroke="var(--color-availableAmount)"
              fillOpacity={1}
              fill="url(#coloravailableAmount)"
            />
            <Area
              type="monotone"
              dataKey="threshold"
              stroke="var(--color-threshold)"
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
