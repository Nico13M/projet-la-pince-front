

import { SavedBudget } from '@/types/budget'
import { TransactionDisplayRow } from '@/types/transaction'

import { cookies } from 'next/headers'
const API_LINK = process.env.NEXT_PUBLIC_API_LINK

export async function fetchGetTransactions(pageNumber = 1) {
  try {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, val] = cookie.trim().split('=');
        acc[key] = val;
        return acc;
      }, {} as Record<string, string>);
      if (!cookies) throw new Error('CSRF Token absent')

      const csrfToken = cookies['XSRF-TOKEN'];
    const response = await fetch(
      `${API_LINK}/transaction/list?page=${pageNumber}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
      },
    )
    return await response.json()
  } catch (error) {
    console.error('Erreur lors du fetch:', error)
    throw error
  }
}

export async function fetchGetCategories() {
  try {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, val] = cookie.trim().split('=');
        acc[key] = val;
        return acc;
      }, {} as Record<string, string>);
      if (!cookies) throw new Error('CSRF Token absent')

      const csrfToken = cookies['XSRF-TOKEN'];
    const response = await fetch(`${API_LINK}/categories`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
      },
    })

    return await response.json()
  } catch (error) {
    console.error('Erreur lors du fetchGetCategories:', error)
    throw error
  }
}

export async function fetchDeleteTransactions(id: string) {
  try {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, val] = cookie.trim().split('=');
        acc[key] = val;
        return acc;
      }, {} as Record<string, string>);
      if (!cookies) throw new Error('CSRF Token absent')

      const csrfToken = cookies['XSRF-TOKEN'];
    const response = await fetch(`${API_LINK}/transaction/delete/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'x-csrf-token': csrfToken,
      },
    })
    return await response.json()
  } catch (error) {
    console.error('Erreur lors du fetch:', error)
    throw error
  }
}

export async function fetchUpdateTransaction(
  id: string,
  data: TransactionDisplayRow,
) {
  try {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, val] = cookie.trim().split('=');
        acc[key] = val;
        return acc;
      }, {} as Record<string, string>);
      if (!cookies) throw new Error('CSRF Token absent')

      const csrfToken = cookies['XSRF-TOKEN'];
    const response = await fetch(`${API_LINK}/transaction/update/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  } catch (error) {
    console.error('Erreur lors du fetch:', error)
    throw error
  }
}

export async function fetchCreateTransaction(data: SavedBudget) {
  try {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, val] = cookie.trim().split('=');
        acc[key] = val;
        return acc;
      }, {} as Record<string, string>);
      if (!cookies) throw new Error('CSRF Token absent')

      const csrfToken = cookies['XSRF-TOKEN'];
    const response = await fetch(`${API_LINK}/transaction/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  } catch (error) {
    console.error('Erreur lors du fetch:', error)
    throw error
  }
}
