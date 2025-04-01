import { format, parse } from 'date-fns'

export const DATE_FORMAT = 'dd/MM/yyyy'

export function formatDate(date: Date): string {
  return format(date, DATE_FORMAT)
}

export function parseStringToDate(dateString: string): Date {
  return parse(dateString, DATE_FORMAT, new Date())
}

export const formatEuro = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function parseCurrencyToNumber(currencyString: string): number {
  const cleaned = currencyString.replace(/[^0-9.,]/g, '')
  const normalized = cleaned.replace(',', '.')
  return parseFloat(normalized) || 0
}
