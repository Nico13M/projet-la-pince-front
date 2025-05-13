'use client'

import { fetchUserBudget } from '@/app/_actions/analytics/fetchUserBudget'
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
import { BudgetSummary, SavingsChartPoint, Timeframe } from '@/types/analytics'
import {
  calculateTotalOfArray,
  createEmptyMonthsData,
  filterDataByTimeframe,
} from '@/utils/chartUtils'
import { formatEuro } from '@/utils/format'
import { ChartLine, PieChartIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import AnalyticsSkeleton from '../ui/skeleton/skeleton-analytics'

const savingsChartConfig = {
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
  const [budgetData, setBudgetData] = useState<BudgetSummary[]>([])
  const [timeframe, setTimeframe] = useState<Timeframe>('year')
  const [savingsData, setSavingsData] = useState<SavingsChartPoint[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const response = await fetchUserBudget()
        if (response) {
          setBudgetData(response.data as unknown as BudgetSummary[])

          const monthsConfig = createEmptyMonthsData([
            'threshold',
            'availableAmount',
          ])

          response.data.forEach((element) => {
            if (element.createdAt) {
              const monthIndex = new Date(element.createdAt).getUTCMonth()
              const monthKey = Object.keys(monthsConfig)[monthIndex]

              if (monthsConfig[monthKey]) {
                monthsConfig[monthKey].data.threshold.push(element.threshold)
                monthsConfig[monthKey].data.availableAmount.push(
                  element.threshold - element.availableAmount,
                )
              }
            }
          })

          const processedData = Object.entries(monthsConfig).map(
            ([_, config]) => {
              return {
                month: config.shortLabel,
                availableAmount: calculateTotalOfArray(
                  config.data.availableAmount,
                ),
                threshold: calculateTotalOfArray(config.data.threshold),
              }
            },
          )

          setSavingsData(processedData)
        }
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

  const displayData = filterDataByTimeframe(
    savingsData,
    timeframe,
    monthsLabels,
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex gap-2">
          <ChartLine className="text-primary/80 h-5 w-5 shrink-0" />
          <CardTitle>Bilan budgétaire</CardTitle>
        </div>
        <Select
          value={timeframe}
          onValueChange={(value) => setTimeframe(value as Timeframe)}
        >
          <SelectTrigger className="w-[180px]">
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
        {budgetData.length > 0 ? (
          <ChartContainer
            config={savingsChartConfig}
            className="min-h-[300px] w-full"
          >
            <AreaChart accessibilityLayer data={displayData}>
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
                dataKey="threshold"
                stroke="var(--color-threshold)"
                fill="none"
                strokeDasharray="5 5"
              />
              <Area
                type="monotone"
                dataKey="availableAmount"
                stroke="var(--color-availableAmount)"
                fillOpacity={1}
                fill="url(#coloravailableAmount)"
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => {
                      const label =
                        savingsChartConfig[
                          name as keyof typeof savingsChartConfig
                        ]?.label
                      return `${label} : ${formatEuro(value as number)}`
                    }}
                  />
                }
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-primary/10 mb-4 rounded-full p-3">
              <PieChartIcon className="text-primary h-6 w-6" />
            </div>
            <h3 className="mb-2 text-base font-medium">Aucun budget défini</h3>
            <p className="text-foreground/60 mb-4 max-w-md text-sm">
              Créez des budgets pour visualiser leur répartition.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
