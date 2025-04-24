import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Transaction } from '@/types/transaction'
import { BUDGET_CATEGORIES } from '@/utils/categoryBudget'
import { format, isValid, parseISO } from 'date-fns'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import { fetchUpdateTransaction } from '@/app/_actions/transactions/fetchTransactions'

function frToIsoFull(str: string): undefined | string | Date {
  const [day, month, year] = str.split('/')
  if (day && month && year) {
    const d = new Date(Number(year), Number(month) - 1, Number(day))
    return d.toISOString()
  }

  return new Date().toISOString()
}

interface TransactionEditorProps {
  transaction: Transaction
  onSave: (id: string, updatedTransaction: Partial<Transaction>) => void
}

type EditableTransaction = {
  name: string
  transactionType: string
  dateOfExpense?: string | Date
  amount: string
  categoryId: string
}

function toEditable(transaction: Transaction): EditableTransaction {
  let date: Date
  if (!transaction.dateOfExpense) {
    date = new Date()
  } else if (transaction.dateOfExpense instanceof Date) {
    date = transaction.dateOfExpense
  } else {
    const d = parseISO(transaction.dateOfExpense)
    date = isValid(d) ? d : new Date()
  }

  return {
    name: transaction.name ?? '',
    transactionType: transaction.transactionType ?? '',
    dateOfExpense: frToIsoFull(transaction.dateOfExpense),
    amount:
      transaction.amount !== undefined && transaction.amount !== null
        ? String(transaction.amount).replace('.', ',')
        : '',
    categoryId: transaction.categoryId ?? '',
  }
}

export function TransactionEditor({
  transaction,
  onSave,
}: TransactionEditorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editData, setEditData] = useState<EditableTransaction>(
    toEditable(transaction),
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleOpen = (open: boolean) => {
    setIsOpen(open)
    setError(null)
    if (open) {
      setEditData(toEditable(transaction))
    }
  }

  const handleChange = <K extends keyof EditableTransaction>(
    field: K,
    value: EditableTransaction[K],
  ) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCancel = () => {
    setIsOpen(false)
    setError(null)
  }

  const handleSave = async () => {
    if (!editData) return
    setLoading(true)
    setError(null)
    try {
      const patch = {
        name: editData.name,
        transactionType: editData.transactionType,
        dateOfExpense: editData.dateOfExpense,
        amount:
          editData.amount !== ''
            ? Number((editData.amount ?? '').replace(',', '.'))
            : undefined,
        categoryId:
          editData.categoryId !== '' ? editData.categoryId : undefined,
      }
      console.log('🚀 🍒 ⛔ ☢️ ~ handleSave ~ patch:', patch)
      await fetchUpdateTransaction(transaction.id, patch)
      onSave(transaction.id, patch)
      setIsOpen(false)
    } catch (err) {
      setError('Erreur lors de la mise à jour de la transaction.')
    }
    setLoading(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2">
          <Edit size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px]">
        <div className="flex flex-col gap-4">
          {/* Nom */}
          <div>
            <label htmlFor="edit-name">Nom</label>
            <Input
              id="edit-name"
              value={editData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              disabled={loading}
              className="h-8"
            />
          </div>
          {/* Type */}
          <div>
            <label htmlFor="edit-type">Type</label>
            <Select
              value={editData.transactionType}
              onValueChange={(value) => handleChange('transactionType', value)}
              disabled={loading}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Dépense</SelectItem>
                <SelectItem value="income">Revenu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Catégorie */}
          <div>
            <label htmlFor="edit-category">Catégorie</label>
            <Input
              id="edit-category"
              value={editData.categoryId}
              onChange={(e) => handleChange('categoryId', e.target.value)}
              disabled={loading}
              className="h-8"
            />
          </div>
          {/* Date */}
          <div>
            <label htmlFor="edit-date">Date</label>
            <Input
              id="edit-date"
              type="text"
              placeholder="jj/mm/aaaa"
              value={editData.dateOfExpense}
              onChange={(e) => {
                if (
                  /^[0-9]{0,2}\/?[0-9]{0,2}\/?[0-9]{0,4}$/.test(
                    e.target.value,
                  ) ||
                  e.target.value === ''
                ) {
                  handleChange('dateOfExpense', e.target.value)
                }
              }}
              disabled={loading}
              className="h-8"
              maxLength={10}
            />
          </div>
          {/* Montant */}
          <div>
            <label htmlFor="edit-amount">Montant</label>
            <div className="relative">
              <Input
                id="edit-amount"
                value={editData.amount}
                onChange={(e) => {
                  const value = e.target.value
                  if (/^[0-9]*[,.]?[0-9]{0,2}$/.test(value) || value === '') {
                    handleChange('amount', value)
                  }
                }}
                className="h-8 pr-8"
                disabled={loading}
              />
              <span className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2 text-sm">
                €
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel} disabled={loading}>
              Annuler
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
          {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
        </div>
      </PopoverContent>
    </Popover>
  )
}
