import { Transaction } from '@/types/transaction'

export const calculateTotal = (transactions: Transaction[]) =>
  transactions.reduce((total, transaction) => total + transaction.amount, 0)
