import { Data, SavedBudget } from '@/types/budget'

export async function fetchGetTransactions(pageNumber = 1): Promise<Data<SavedBudget>> {
  const API_LINK = process.env.NEXT_PUBLIC_API_LINK
  const response = await fetch(`${API_LINK}/transaction/list?page=${pageNumber}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }

  return response.json();
}
