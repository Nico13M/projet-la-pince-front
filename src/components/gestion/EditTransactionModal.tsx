'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogOverlay,
} from '@/components/ui/dialog'

import { Calendar } from 'lucide-react'

import { useState, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { categories } from '../forms/TransactionForm'

export default function EditTransactionModal({ transaction, onSave, onClose }) {
  const [formData, setFormData] = useState(transaction || {})
  const [date, setDate] = useState(
    transaction?.date ? new Date(transaction.date) : null,
  )
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  useEffect(() => {
    if (transaction?.date) {
      setDate(new Date(transaction.date))
    }
  }, [transaction])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate)
      setFormData((prev) => ({
        ...prev,
        date: format(selectedDate, 'dd/MM/yyyy'),
      }))
      setIsCalendarOpen(false)
    }
  }

  const saveChanges = () => {
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Éditer la transaction</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label
              className="mb-1 block text-sm font-medium text-slate-700"
              htmlFor="description"
            >
              Description
            </label>
            <input
              id="description"
              name="description"
              className="w-full rounded-md border border-slate-300 p-2 text-sm shadow-sm"
              value={formData.description || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-slate-700"
              htmlFor="date"
            >
              Date
            </label>
            <Popover
              open={isCalendarOpen}
              onOpenChange={(open) => setIsCalendarOpen(open)}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                >
                  {date ? format(date, 'dd/MM/yyyy') : 'Sélectionnez une date'}
                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Montant
            </label>
            <input
              id="montant"
              name="montant"
              className="w-full rounded-md border border-slate-300 p-2 text-sm shadow-sm"
              value={formData.montant || ''}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium text-slate-700"
              htmlFor="categorie"
            >
              Catégorie
            </label>
            <select
              id="categorie"
              name="categorie"
              className="w-full rounded-md border border-slate-300 p-2 text-sm shadow-sm"
              value={formData.categorie || ''}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Sélectionnez une catégorie
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium text-slate-700"
              htmlFor="type"
            >
              Type
            </label>
            <select
              id="type"
              name="type"
              className="w-full rounded-md border border-slate-300 p-2 text-sm shadow-sm"
              value={formData.type || ''}
              onChange={handleInputChange}
            >
              <option value="Dépense">Dépense</option>
              <option value="Revenu">Revenu</option>
            </select>
          </div>
        </div>
        <DialogFooter className="mt-6">
          <button
            className="mr-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            onClick={saveChanges}
          >
            Enregistrer
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
