import { Transaction } from '@/types/transaction'

function TransactionList({
  transactions,
  onEditTransaction,
  onRemoveTransaction,
}: {
  transactions: Transaction[]
  onEditTransaction: (transaction: Transaction) => void
  onRemoveTransaction: (id: number) => void
}) {
  if (transactions.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500">
        Aucune transaction disponible.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-slate-200 text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Montant</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Catégorie</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-4 py-2">{transaction.description}</td>
              <td className="px-4 py-2">{transaction.montant}</td>
              <td className="px-4 py-2">{transaction.date}</td>
              <td className="px-4 py-2">{transaction.categorie}</td>
              <td className="flex space-x-2 px-4 py-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => onEditTransaction(transaction)}
                >
                  Éditer
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => onRemoveTransaction(transaction.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionList
