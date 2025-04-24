'use client'

import { fetchAllBudgetSummaries } from '@/app/_actions/analytics/fetchAllBudgetSummaries'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { filterDataByTimeframe } from '@/utils/chartUtils'
import { formatEuro } from '@/utils/format'
import { ChartLine } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import AnalyticsSkeleton from '../ui/skeleton/skeleton-analytics'

interface BudgetItem {
  threshold: number
  availableAmount: number
  updatedAt: string
  totalExpense: number
  totalInvestment: number
  remainingBalance: number
}

interface ChartDataItem {
  month: string
  income: number
  expense: number
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
  const [displayData, setDisplayData] = useState<ChartDataItem[]>([])
  const [timeframe, setTimeframe] = useState<'year' | '6months' | '3months'>(
    'year',
  )
  const [fullData, setFullData] = useState<ChartDataItem[]>([])

  const filterData = (data: ChartDataItem[] = fullData) => {
    setDisplayData(filterDataByTimeframe(data, timeframe, monthsConfig))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetData: BudgetItem[] = await fetchAllBudgetSummaries()

        if (Array.isArray(budgetData)) {
          budgetData.forEach((element: BudgetItem) => {
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

        const processedData = Object.entries(monthsConfig).map(
          ([_, config]) => {
            const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0)

            return {
              month: config.shortLabel,
              income: sum(config.data.income),
              expense: sum(config.data.expense),
            }
          },
        )

        setFullData(processedData)
        filterData(processedData)
      } catch (error) {
        console.error('Error loading budget chart data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    filterData()
  }, [timeframe, fullData])

  if (isLoading) {
    return <AnalyticsSkeleton />
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex gap-2">
          <ChartLine className="text-primary/80 h-5 w-5 shrink-0" />
          <CardTitle>Tendances des dépenses</CardTitle>
        </div>
        <Select
          value={timeframe}
          onValueChange={(value) =>
            setTimeframe(value as 'year' | '6months' | '3months')
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner une période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="year">Année en cours</SelectItem>
            <SelectItem value="6months">6 derniers mois</SelectItem>
            <SelectItem value="3months">3 derniers mois</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {displayData.length > 0 ? (
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
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-primary/10 mb-4 rounded-full p-3">
              <ChartLine className="text-primary h-6 w-6" />
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
