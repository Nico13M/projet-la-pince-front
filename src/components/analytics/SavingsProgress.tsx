'use client'

import { fetchUserBudget } from '@/app/_actions/dashboard/fetchUserBudget'
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
import { ChartLine, PieChartIcon } from 'lucide-react'
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
}

interface SavingsDataItem {
  month: string
  availableAmount: number
  threshold: number
}

// Configuration des mois pour le graphique
const monthsLabels = {
  January: { shortLabel: 'Jan' },
  February: { shortLabel: 'Fév' },
  March: { shortLabel: 'Mar' },
  April: { shortLabel: 'Avr' },
  May: { shortLabel: 'Mai' },
  June: { shortLabel: 'Juin' },
  July: { shortLabel: 'Juil' },
  August: { shortLabel: 'Aoû' },
  September: { shortLabel: 'Sep' },
  October: { shortLabel: 'Oct' },
  November: { shortLabel: 'Nov' },
  December: { shortLabel: 'Déc' },
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
  const [timeframe, setTimeframe] = useState<'year' | '6months' | '3months'>(
    'year',
  )
  const [savingsData, setSavingsData] = useState<SavingsDataItem[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const response = await fetchUserBudget()
        setBudgetData(response.data)

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
          March: {
            shortLabel: 'Mar',
            data: { threshold: [], availableAmount: [] },
          },
          April: {
            shortLabel: 'Avr',
            data: { threshold: [], availableAmount: [] },
          },
          May: {
            shortLabel: 'Mai',
            data: { threshold: [], availableAmount: [] },
          },
          June: {
            shortLabel: 'Juin',
            data: { threshold: [], availableAmount: [] },
          },
          July: {
            shortLabel: 'Juil',
            data: { threshold: [], availableAmount: [] },
          },
          August: {
            shortLabel: 'Aoû',
            data: { threshold: [], availableAmount: [] },
          },
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

        response.data.forEach((element: Budget) => {
          const monthIndex = new Date(element.createdAt).getUTCMonth()
          const monthKey = Object.keys(monthsConfig)[monthIndex]

          if (monthsConfig[monthKey]) {
            monthsConfig[monthKey].data.threshold.push(element.threshold)
            monthsConfig[monthKey].data.availableAmount.push(
              element.threshold - element.availableAmount,
            )
          }
        })

        const processedData = Object.entries(monthsConfig).map(
          ([_, config]) => {
            const calculateTotal = (array: number[]) =>
              array.reduce((sum, value) => sum + value, 0)

            return {
              month: config.shortLabel,
              availableAmount: calculateTotal(config.data.availableAmount),
              threshold: calculateTotal(config.data.threshold),
            }
          },
        )

        setSavingsData(processedData)
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
        {budgetData.length > 0 ? (
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
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
                        chartConfig[name as keyof typeof chartConfig]?.label
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
