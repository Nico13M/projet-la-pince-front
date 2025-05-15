import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'
import React from 'react'

export const transactionTypeIcons: Record<
  string,
  { label: string; icon: React.ElementType }
> = {
  income: {
    label: 'Revenu',
    icon: ArrowDownCircle,
  },
  expense: {
    label: 'Dépense',
    icon: ArrowUpCircle,
  },
  investment: {
    label: 'Investissement',
    icon: DollarSign,
  },
}