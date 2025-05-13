import { describe, it, expect } from 'vitest'
import { formatDate, parseStringToDate, formatEuro, parseCurrencyToNumber, DATE_FORMAT } from './format'



describe('formatDate', () => {
  it('formate une date au format dd/MM/yyyy', () => {
    
    
    const date = new Date(2000, 1, 9) 
    expect(formatDate(date)).toBe('09/02/2000')
  })
})

describe('parseStringToDate', () => {
  it('parse une string au format dd/MM/yyyy en Date', () => {
    
    const d = parseStringToDate('28/06/2024')
    expect(d.getFullYear()).toBe(2024)
    expect(d.getMonth()).toBe(5)
    expect(d.getDate()).toBe(28)
  })

  it('donne une date invalide si le format est incorrect', () => {
    const d = parseStringToDate('2024-06-28')
    expect(isNaN(d.getTime())).toBe(true)
  })
})

describe('formatEuro', () => {
  it('formate un nombre au format euro', () => {
    expect(formatEuro(12345.67)).toBe('12 345,67 €')
    expect(formatEuro(12)).toBe('12,00 €')
  })

  it('arrondit si demandé et nombre entier', () => {
    expect(formatEuro(900, true)).toBe('900 €')
  })

  it('arrondit pas si nombre décimal', () => {
    expect(formatEuro(900.25, true)).toBe('900,25 €')
  })

  it('ajoute séparateur de milliers', () => {
    expect(formatEuro(1234567)).toBe('1 234 567,00 €')
  })
})


describe('parseCurrencyToNumber', () => {
  it('parse un format euro fr-FR vers un nombre', () => {
    expect(parseCurrencyToNumber('12 345,67 €')).toBeCloseTo(12345.67, 2)
    expect(parseCurrencyToNumber('1 500 €')).toBe(1500)
    expect(parseCurrencyToNumber('0,99 €')).toBeCloseTo(0.99, 2)
  })

  it('ignore les symboles et texte', () => {
    expect(parseCurrencyToNumber('Salut 999,99 € OK')).toBeCloseTo(999.99, 2)
  })

  it('retourne 0 en cas de string vide ou nonsense', () => {
    expect(parseCurrencyToNumber('nan')).toBe(0)
    expect(parseCurrencyToNumber('')).toBe(0)
  })
})
