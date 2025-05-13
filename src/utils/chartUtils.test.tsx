import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import  {filterDataByTimeframe}  from './chartUtils'


const monthsConfig = {
  jan: { shortLabel: 'Jan' },
  feb: { shortLabel: 'Feb' },
  mar: { shortLabel: 'Mar' },
  apr: { shortLabel: 'Apr' },
  may: { shortLabel: 'May' },
  jun: { shortLabel: 'Jun' },
  jul: { shortLabel: 'Jul' },
  aug: { shortLabel: 'Aug' },
  sep: { shortLabel: 'Sep' },
  oct: { shortLabel: 'Oct' },
  nov: { shortLabel: 'Nov' },
  dec: { shortLabel: 'Dec' },
}

const completeData = [
  { month: 'Jan', value: 1 },
  { month: 'Feb', value: 2 },
  { month: 'Mar', value: 3 },
  { month: 'Apr', value: 4 },
  { month: 'May', value: 5 },
  { month: 'Jun', value: 6 },
  { month: 'Jul', value: 7 },
  { month: 'Aug', value: 8 },
  { month: 'Sep', value: 9 },
  { month: 'Oct', value: 10 },
  { month: 'Nov', value: 11 },
  { month: 'Dec', value: 12 },
]

const partialData = [
  { month: 'Jan', value: 10 },
  { month: 'Mar', value: 20 },
  { month: 'May', value: 30 },
  { month: 'Sep', value: 40 }
]

describe('filterDataByTimeframe', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('filtre sur 3 derniers mois (Mars)', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2023-03-15'))

    const filtered = filterDataByTimeframe(completeData, '3months', monthsConfig)
    expect(filtered.map(d => d.month)).toEqual(['Jan', 'Feb', 'Mar'])
  })

  it('filtre sur 6 derniers mois (Décembre)', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2023-12-14'))

    const filtered = filterDataByTimeframe(completeData, '6months', monthsConfig)
    expect(filtered.map(d => d.month)).toEqual(['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
  })

  it('filtre sur l\'année complète', () => {
    const filtered = filterDataByTimeframe(completeData, 'year', monthsConfig)
    expect(filtered).toHaveLength(12)
    expect(filtered.map(d => d.month)).toEqual([
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ])
  })

  it('gère bien le passage décembre-janvier sur 3 mois', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2023-01-10')) 

    const filtered = filterDataByTimeframe(completeData, '3months', monthsConfig)
    expect(filtered.map(d => d.month)).toEqual(['Nov', 'Dec', 'Jan'])
  })

  it('ignore les mois manquants dans data', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2023-03-10')) 

    const filtered = filterDataByTimeframe(partialData, '3months', monthsConfig)
    
    expect(filtered.map(d => d.month)).toEqual(['Jan', 'Mar'])
  })


  it('retourne un tableau vide si aucun mois ne matche', () => {
    const emptyData = [{ month: '???', value: 999 }]
    const filtered = filterDataByTimeframe(emptyData, '3months', monthsConfig)
    expect(filtered).toEqual([])
  })
})
