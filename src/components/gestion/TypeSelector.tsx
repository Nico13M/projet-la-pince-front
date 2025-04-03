'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const types = ['Dépense', 'Revenu', 'Transfert']

function TypeSelector({
  type,
  setType,
}: {
  type: string
  setType: (type: string) => void
}) {
  return (
    <div>
      <label
        htmlFor="type"
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        Type
      </label>
      <Select value={type} onValueChange={setType}>
        <SelectTrigger className="w-full border-slate-300 text-slate-500">
          <SelectValue placeholder="Sélectionner un type" />
        </SelectTrigger>
        <SelectContent>
          {types.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default TypeSelector
