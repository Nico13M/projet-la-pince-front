import { Button } from '@/components/ui/button'
// import { Calendar } from '@/components/ui/calendar'
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
import { SavedBudget } from '@/types/budget'
import { BUDGET_CATEGORIES } from '@/utils/categoryBudget'
import { parseStringToDate } from '@/utils/format'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Edit } from 'lucide-react'
import { useState } from 'react'

interface GestionEditorProps {
  budget: SavedBudget
  onSave: (id: number, updatedBudget: Partial<SavedBudget>) => void
}

type EditableBudget = Omit<SavedBudget, 'date'> & {
  date: Date
}

export function BudgetEditor({ budget, onSave }: GestionEditorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editData, setEditData] = useState<EditableBudget | null>(null)

  const handleOpen = (open: boolean) => {
    setIsOpen(open)
    if (open && !editData) {
      setEditData({
        ...budget,
        date: parseStringToDate(budget.date),
      })
    }
  }

  const handleChange = (field: keyof EditableBudget, value: string | Date) => {
    if (!editData) return
    setEditData((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const handleCancel = () => {
    setIsOpen(false)
    setEditData(null)
  }

  const handleSave = () => {
    if (!editData) return

    const updatedBudget: Partial<SavedBudget> = {
      ...editData,
      date: format(editData.date, 'dd/MM/yyyy'),
    }

    onSave(budget.id, updatedBudget)
    setIsOpen(false)
    setEditData(null)
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Modifier</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        {editData && (
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">Modifier le budget</h4>
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <label>Budget</label>
                <Input
                  value={editData.budget}
                  onChange={(e) => handleChange('budget', e.target.value)}
                  className="col-span-2 h-8"
                />
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <label>Description</label>
                <Input
                  value={editData.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="col-span-2 h-8"
                />
              </div>

              {/* Date */}
              <div className="grid grid-cols-3 items-center gap-4">
                <label>Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="col-span-2 h-8 justify-start text-left font-normal"
                    >
                      {format(editData.date, 'PPP', { locale: fr })}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    {/* <Calendar
                      mode="single"
                      selected={editData.date}
                      onSelect={(date) => date && handleChange('date', date)}
                      initialFocus
                      locale={fr}
                    /> */}
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <label>Catégorie</label>
                <Select
                  value={editData.category}
                  onValueChange={(value) => handleChange('category', value)}
                >
                  <SelectTrigger className="col-span-2 h-8">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGET_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <label>Montant</label>
                <div className="relative col-span-2">
                  <Input
                    value={editData.amount.replace(/[^0-9.,]/g, '')}
                    onChange={(e) => {
                      const value = e.target.value
                      if (
                        /^[0-9]*[,.]?[0-9]{0,2}$/.test(value) ||
                        value === ''
                      ) {
                        handleChange('amount', value)
                      }
                    }}
                    className="h-8 pr-8"
                  />
                  <span className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2 transform text-sm">
                    €
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={handleCancel}>
                  Annuler
                </Button>
                <Button onClick={handleSave}>Enregistrer</Button>
              </div>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
