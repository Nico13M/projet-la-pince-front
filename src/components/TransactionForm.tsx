'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import Montant from './Montant'
import Description from './Description'
import DatePicker from './DatePicker'
import CategorySelector from './CategorySelector'
import TypeSelector from './TypeSelector'

export const categories = [
  'Alimentation',
  'Transport',
  'Logement',
  'Loisirs',
  'Santé',
  'Éducation',
  'Revenus',
]

function TransactionForm({ onAddTransaction }) {
  const [date, setDate] = useState(new Date())
  const [description, setDescription] = useState('')
  const [montant, setMontant] = useState('')
  const [categorie, setCategorie] = useState('')
  const [type, setType] = useState('')

  const ajouterTransaction = () => {
    if (description && montant) {
      const newTransaction = {
        id: Date.now(),
        description,
        montant: `${montant} €`,
        date: format(date, 'dd/MM/yyyy'),
        categorie: categorie || 'Non catégorisé',
        type: type || 'Dépense',
      }
      onAddTransaction(newTransaction)
      setDescription('')
      setMontant('')
      setDate(new Date())
      setCategorie('')
      setType('')
    }
  }
  return (
    <div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-xl font-semibold text-slate-800">
          Gestion des Transactions
        </h2>
        <p className="mb-6 text-sm text-slate-500">
          Ajoutez, modifiez ou supprimez vos transactions
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <Description
            description={description}
            setDescription={setDescription}
          />
          <Montant value={montant} setMontant={setMontant} />

          <DatePicker date={date} setDate={setDate} />

          <CategorySelector categorie={categorie} setCategorie={setCategorie} />

          <TypeSelector type={type} setType={setType} />

          <div className="md:col-span-2">
            <Button
              onClick={ajouterTransaction}
              className="bg-primary hover:bg-primary/90 mt-4 w-full text-white"
              size="lg"
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter la transaction
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionForm
