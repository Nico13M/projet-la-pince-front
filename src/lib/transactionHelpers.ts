import { Transaction } from '@/types/transaction'

export const calculateTotal = (transactions: Transaction[]) =>
  transactions.reduce((total, transaction) => total + parseFloat(transaction.montant), 0);
