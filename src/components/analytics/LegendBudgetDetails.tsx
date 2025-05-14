'use client'

import { PieChartSegment } from '@/types/analytics'
import { formatEuro } from '@/utils/format'

interface LegendBudgetDetailsProps {
  budgetData: PieChartSegment[]
}

export function LegendBudgetDetails({ budgetData }: LegendBudgetDetailsProps) {
  return (
    <div className="w-full md:w-2/5">
      <h4 className="mb-2 text-sm font-medium text-gray-700">
        Détail des budgets
      </h4>
      <div className="max-h-[250px] overflow-y-auto pr-2">
        {[...budgetData]
          .sort((a, b) => b.value - a.value)
          .map((item, index) => (
            <div
              key={`legend-${index}`}
              className="mb-3 flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div
                  className="mr-2 h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="max-w-[150px] truncate text-sm font-medium">
                  {item.name}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold">
                  {(
                    (item.value /
                      budgetData.reduce((sum, i) => sum + i.value, 0)) *
                    100
                  ).toFixed(0)}
                  %
                </span>
                <span className="text-xs text-gray-500">
                  {formatEuro(item.value)}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
