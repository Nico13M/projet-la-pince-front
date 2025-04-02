import React from 'react'
import { Input } from '../ui/input'

function Description({ description, setDescription }) {
  return (
    <div>
      <label
        htmlFor="description"
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        Description
      </label>
      <Input
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Exemple: Courses supermarché"
        className="w-full"
      />
    </div>
  )
}

export default Description
