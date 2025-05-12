'use server'

import { SavedBudget } from '@/types/budget'
import { TransactionDisplayRow } from '@/types/transaction'

import { cookies } from 'next/headers'
const API_LINK = process.env.API_LINK

export async function fetchGetTransactions(pageNumber = 1) {
  try {
    const cookieStore = await cookies()
    const csrfToken = cookieStore.get('x-csrf-token')?.value
    const accessToken = cookieStore.get('access_token')?.value
    if (!csrfToken) throw new Error('CSRF Token absent')

    const cookieHeader = `x-csrf-token=${csrfToken}; access_token=${accessToken}`
    const response = await fetch(
      `${API_LINK}/transaction/list?page=${pageNumber}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
          Cookie: cookieHeader,
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
    const cookieStore = await cookies()
    const csrfToken = cookieStore.get('x-csrf-token')?.value
    const accessToken = cookieStore.get('access_token')?.value
    if (!csrfToken) throw new Error('CSRF Token absent')

    const cookieHeader = `x-csrf-token=${csrfToken}; access_token=${accessToken}`
    const response = await fetch(`${API_LINK}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
        Cookie: cookieHeader,
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
    const cookieStore = await cookies()
    const csrfSecret = cookieStore.get('x-csrf-token')?.value
    const csrfToken = cookieStore.get('XSRF-TOKEN')?.value
    const accessToken = cookieStore.get('access_token')?.value
    if (!csrfToken) throw new Error('CSRF Token absent')

    const cookieHeader = `x-csrf-token=${csrfSecret}; access_token=${accessToken}`
    const response = await fetch(`${API_LINK}/transaction/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'x-csrf-token': csrfToken,
        Cookie: cookieHeader,
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
    const cookieStore = await cookies()
    const csrfSecret = cookieStore.get('x-csrf-token')?.value
    const csrfToken = cookieStore.get('XSRF-TOKEN')?.value
    const accessToken = cookieStore.get('access_token')?.value
    if (!csrfToken) throw new Error('CSRF Token absent')

    const cookieHeader = `x-csrf-token=${csrfSecret}; access_token=${accessToken}`
    const response = await fetch(`${API_LINK}/transaction/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
        Cookie: cookieHeader,
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
    console.log('data', data)
    const cookieStore = await cookies()
    const csrfSecret = cookieStore.get('x-csrf-token')?.value
    const csrfToken = cookieStore.get('XSRF-TOKEN')?.value
    const accessToken = cookieStore.get('access_token')?.value
    if (!csrfToken) throw new Error('CSRF Token absent')

    const cookieHeader = `x-csrf-token=${csrfSecret}; access_token=${accessToken}`
    const response = await fetch(`${API_LINK}/transaction/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
        Cookie: cookieHeader,
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  } catch (error) {
    console.error('Erreur lors du fetch:', error)
    throw error
  }
}
