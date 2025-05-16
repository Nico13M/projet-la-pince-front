'use client'

import { PieChartSegment } from '@/types/analytics'
import { formatEuro } from '@/utils/format'

interface LegendBudgetDetailsProps {
  budgetData: PieChartSegment[]
}

export function LegendBudgetDetails({ budgetData }: LegendBudgetDetailsProps) {
  return (
    <div className="w-full md:w-2/5">
      <h4 className="mb-2 text-xs font-medium text-gray-700 sm:text-sm">
        Détail des budgets
      </h4>
      <div className="max-h-[180px] overflow-y-auto pr-1 sm:max-h-[220px] md:max-h-[250px] md:pr-2">
        {[...budgetData]
          .sort((a, b) => b.value - a.value)
          .map((item, index) => (
            <div
              key={`legend-${index}`}
              className="mb-2 flex cursor-pointer items-center justify-between rounded-md p-1.5 transition-colors hover:bg-gray-50 sm:mb-3 sm:p-2"
            >
              <div className="flex items-center">
                <div
                  className="mr-1.5 h-2.5 w-2.5 rounded-full sm:mr-2 sm:h-3 sm:w-3"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="max-w-[100px] truncate text-xs font-medium sm:max-w-[120px] sm:text-sm md:max-w-[150px]">
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
                <span className="text-[10px] text-gray-500 sm:text-xs">
                  {formatEuro(item.value)}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
