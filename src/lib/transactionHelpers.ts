import { Transaction } from '@/app/types/transactionTypes'

export const calculateTotal = (transactions: Transaction[]) =>
  transactions.reduce((total, transaction) => total + transaction.amount, 0)
