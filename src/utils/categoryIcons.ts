import {
  Building,
  Car,
  Gamepad2,
  Plane,
  Receipt,
  ShoppingBag,
  Stethoscope,
  Utensils,
} from 'lucide-react'
import React from 'react'

export const categoryIcons: Record<
  string,
  { label: string; icon: React.ElementType }
> = {
  shopping: {
    label: 'Shopping',
    icon: ShoppingBag,
  },
  restaurant: {
    label: 'Restaurant',
    icon: Utensils,
  },
  salary: {
    label: 'Salaire',
    icon: Building,
  },
  transport: {
    label: 'Transport',
    icon: Car,
  },
  entertainment: {
    label: 'Divertissement',
    icon: Gamepad2,
  },
  health: {
    label: 'Santé',
    icon: Stethoscope,
  },
  utilities: {
    label: 'Facture',
    icon: Receipt,
  },
  travel: {
    label: 'Voyage',
    icon: Plane,
  },
}
