import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination } from './Pagination'
import { vi } from 'vitest'
describe('Pagination', () => {


  it('affiche au bon format les pages dans l\'intervalle', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

it('appelle onPageChange avec la bonne valeur pour précédent, suivant et une page', () => {
  const onPageChange = vi.fn()
  render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />)

  
  fireEvent.click(screen.getByRole('button', { name: /page suivante/i }))
  expect(onPageChange).toHaveBeenCalledWith(4)

  
  fireEvent.click(screen.getByRole('button', { name: /page précédente/i }))
  expect(onPageChange).toHaveBeenCalledWith(2)

  
  fireEvent.click(screen.getByText('1'))
  expect(onPageChange).toHaveBeenCalledWith(1)
})

  it('désactive le bouton de la page courante', () => {
    render(<Pagination page={2} totalPages={5} onPageChange={() => {}} />)
    const current = screen.getByText('2')
    expect(current).toBeDisabled()
  })

  it('affiche le bon nombre de pages même si totalPages < 5', () => {
    render(<Pagination page={1} totalPages={3} onPageChange={() => {}} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.queryByText('4')).toBeNull()
  })
})
