'use client'

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
import { fetchUserBudget } from '@/app/_actions/dashbord/fetchUserBudget'

interface Budget {
  id: string;
  name: string;
  description: string;
  threshold: number;
  availableAmount: number;
  userId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
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
        const data = await fetchUserBudget();
        setBudgetData(data as Budget[]);
      } catch (error) {
        console.error("Error fetching budget data:", error);
      } finally {
        setIsLoading(false)
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <AnalyticsSkeleton />
  }

  type MonthName =
  | "January" | "February" | "March" | "April"
  | "May" | "June" | "July" | "August"
  | "September" | "October" | "November" | "December";

  type MonthlyData = {
    threshold: number[];
    availableAmount: number[];
  };

  const months: Record<MonthName, MonthlyData> = {
    January: { threshold: [], availableAmount: [] },
    February: { threshold: [], availableAmount: [] },
    March: { threshold: [], availableAmount: [] },
    April: { threshold: [], availableAmount: [] },
    May: { threshold: [], availableAmount: [] },
    June: { threshold: [], availableAmount: [] },
    July: { threshold: [], availableAmount: [] },
    August: { threshold: [], availableAmount: [] },
    September: { threshold: [], availableAmount: [] },
    October: { threshold: [], availableAmount: [] },
    November: { threshold: [], availableAmount: [] },
    December: { threshold: [], availableAmount: [] }
  };

  const monthNames: MonthName[] = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  //et ici on type pour avoir l'affichage des mois de manière plus compacte
  const monthLabels: Record<MonthName, string> = {
    January: "Jan",
    February: "Fév",
    March: "Mar",
    April: "Avr",
    May: "Mai",
    June: "Juin",
    July: "Juil",
    August: "Aoû",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Déc"
  };

  budgetData.forEach(element => {
    const monthIndex = new Date(element.updatedAt).getUTCMonth(); // 0-11
    const monthName = monthNames[monthIndex];
  
    if (months[monthName]) {
      months[monthName].threshold.push(element.threshold);
      months[monthName].availableAmount.push(element.threshold - element.availableAmount);
    }
  });

  const savingsData = Object.entries(months).map(([fullMonth, data]) => {
    const totalThreshold = data.threshold.reduce((sum, val) => sum + val, 0);
    const totalAvailable = data.availableAmount.reduce((sum, val) => sum + val, 0);
  
    return {
      month: monthLabels[fullMonth as MonthName],
      availableAmount: totalAvailable,
      threshold: totalThreshold
    };
  });

  console.log(savingsData);

  const oldsavingsData = [
    { month: 'Jan', savings: 200, goal: 250 },
    { month: 'Fév', savings: 300, goal: 300 },
    { month: 'Mar', savings: 250, goal: 300 },
    { month: 'Avr', savings: 400, goal: 350 },
    { month: 'Mai', savings: 350, goal: 400 },
    { month: 'Juin', savings: 500, goal: 450 },
  ]

  // console.log("Voici le budget global", budgetData);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Bilan budgétaire</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <AreaChart accessibilityLayer data={savingsData}>
            <defs>
              <linearGradient id="coloravailableAmount" x1="0" y1="0" x2="0" y2="1">
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
