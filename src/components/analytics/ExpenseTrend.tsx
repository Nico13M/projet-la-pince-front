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
import { monthsLabels, timeframeOptions } from '@/constants/analytics'
import {
  ExpenseSummaryItem,
  ExpenseTrendPoint,
  Timeframe,
} from '@/types/analytics'
import {
  calculateTotalOfArray,
  createEmptyMonthsData,
  filterDataByTimeframe,
} from '@/utils/chartUtils'
import { formatEuro } from '@/utils/format'
import { ChartLine } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import AnalyticsSkeleton from '../ui/skeleton/skeleton-analytics'

const expenseChartConfig = {
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
  const [displayData, setDisplayData] = useState<ExpenseTrendPoint[]>([])
  const [timeframe, setTimeframe] = useState<Timeframe>('year')
  const [fullData, setFullData] = useState<ExpenseTrendPoint[]>([])

  const filterData = (data: ExpenseTrendPoint[] = fullData) => {
    setDisplayData(filterDataByTimeframe(data, timeframe, monthsLabels))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetData: ExpenseSummaryItem[] = await fetchAllBudgetSummaries()

        const monthsConfig = createEmptyMonthsData(['income', 'expense'])

        if (Array.isArray(budgetData)) {
          budgetData.forEach((element: ExpenseSummaryItem) => {
            if (element.updatedAt) {
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
            }
          })
        }

        const processedData = Object.entries(monthsConfig).map(
          ([_, config]) => {
            return {
              month: config.shortLabel,
              income: calculateTotalOfArray(config.data.income),
              expense: calculateTotalOfArray(config.data.expense),
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
    <Card className="border-accent/20 bg-white shadow-md">
      <CardHeader className="flex flex-col space-y-3 pb-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center gap-2">
          <ChartLine className="text-primary/80 h-5 w-5 shrink-0" />
          <CardTitle className="text-sm font-medium sm:text-base md:text-lg">
            Tendances des dépenses
          </CardTitle>
        </div>
        <Select
          value={timeframe}
          onValueChange={(value) => setTimeframe(value as Timeframe)}
        >
          <SelectTrigger className="h-8 w-full text-xs sm:h-9 sm:text-sm md:w-[180px]">
            <SelectValue placeholder="Sélectionner une période" />
          </SelectTrigger>
          <SelectContent>
            {timeframeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {displayData.length > 0 ? (
          <div className="h-[220px] w-full sm:h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer
                config={expenseChartConfig}
                className="h-full w-full"
              >
                <LineChart data={displayData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fill: 'var(--muted-foreground)' }}
                    fontSize={10}
                    dy={5}
                    height={35}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'var(--muted-foreground)' }}
                    tickMargin={5}
                    tickFormatter={(value) => formatEuro(value, true)}
                    fontSize={10}
                    width={45}
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="var(--color-expense)"
                    strokeWidth={2}
                    dot={{ r: 2, fill: 'var(--color-expense)' }}
                    activeDot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="var(--color-income)"
                    strokeWidth={2}
                    dot={{ r: 2, fill: 'var(--color-income)' }}
                    activeDot={{ r: 4 }}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value, name) => {
                          const label =
                            expenseChartConfig[
                              name as keyof typeof expenseChartConfig
                            ]?.label
                          return `${label} : ${formatEuro(value as number)}`
                        }}
                        className="w-full"
                      />
                    }
                  />
                </LineChart>
              </ChartContainer>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-primary/10 mb-3 rounded-full p-3">
              <ChartLine className="text-primary h-5 w-5" />
            </div>
            <h3 className="mb-1 text-sm font-medium sm:text-base">
              Aucune dépense
            </h3>
            <p className="text-foreground/60 mb-2 max-w-md text-xs sm:text-sm">
              Dépensez de l'argent pour visualiser les tendances.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
