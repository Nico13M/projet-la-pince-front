'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface CategoryModalButtonProps {
  onAddCategory: (category: { name: string; transactionType: string }) => void
}

const CategoryModalButton = ({ onAddCategory }: CategoryModalButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [transactionType, setTransactionType] = useState<string | undefined>()

  const handleAddCategory = () => {
    if (!newCategory.trim() || !transactionType) return

    const payload = {
      name: newCategory.trim(),
      transactionType,
    }
    onAddCategory(payload)
    setNewCategory('')
    setTransactionType(undefined)
    setIsOpen(false)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center justify-center rounded-md border border-slate-400 p-0 hover:border-slate-400 hover:bg-white"
          title="Ajouter une catégorie"
        >
          <Plus className="h-2 w-2 text-slate-600" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Ajouter une nouvelle catégorie</DialogTitle>
        <DialogDescription>
          Entrez un nom et un type pour la nouvelle catégorie.
        </DialogDescription>
        <div className="mt-4">
          <label htmlFor="newCategory" className="block text-sm font-medium">
            Nom de la catégorie
          </label>
          <input
            id="newCategory"
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="mt-2 w-full rounded-md border border-slate-300 p-2"
          />
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium">
            Type de transaction
          </label>
          <Select
            value={transactionType}
            onValueChange={(value) => setTransactionType(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Revenu</SelectItem>
              <SelectItem value="investment">Investissement</SelectItem>
              <SelectItem value="expense">Dépense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button
            onClick={handleAddCategory}
            disabled={!newCategory.trim() || !transactionType}
          >
            Ajouter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CategoryModalButton
