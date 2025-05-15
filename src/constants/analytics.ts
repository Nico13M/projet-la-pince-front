import { Timeframe } from '@/types/analytics'

export const monthsLabels = {
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

export const timeframeOptions: { value: Timeframe; label: string }[] = [
  { value: 'year', label: 'Année en cours' },
  { value: '6months', label: '6 derniers mois' },
  { value: '3months', label: '3 derniers mois' },
]
