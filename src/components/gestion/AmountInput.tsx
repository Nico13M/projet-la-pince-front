import { Input } from '../ui/input'

export default function AmountInput({
  amount,
  setAmount,
}: {
  amount: string
  setAmount: (amount: string) => void
}) {
  return (
    <div>
      <label
        htmlFor="montant"
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        Montant
      </label>
      <div className="relative">
        <Input
          id="montant"
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9.,]/g, ''))}
          placeholder="0,00"
          className="pr-8"
        />
        <span className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
          €
        </span>
      </div>
    </div>
  )
}
