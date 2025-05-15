'use server'

import { cookies } from 'next/headers'
const API_LINK = process.env.API_LINK

export async function userNotification() {
  try {
    const cookieStore = await cookies()
    const csrfSecret = cookieStore.get('x-csrf-token')?.value
    const csrfToken = cookieStore.get('XSRF-TOKEN')?.value
    const accessToken = cookieStore.get('access_token')?.value

    const cookieHeader = `x-csrf-token=${csrfSecret}; access_token=${accessToken}`
    if (!csrfToken) {
      throw new Error('CSRF Token non trouvé')
    }

    const response = await fetch(API_LINK + '/budgets/mark-all-read', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
        Cookie: cookieHeader,
      },
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Échec du mark-all-read : ${response.status} – ${text}`)
    }
    return true
  } catch (error) {
    console.error('Erreur lors du fetch:', error)
    throw error
  }
}

export async function getUserNotifications() {
  const cookieStore = await cookies()
  const csrfSecret = cookieStore.get('x-csrf-token')?.value
  const csrfToken = cookieStore.get('XSRF-TOKEN')?.value
  const accessToken = cookieStore.get('access_token')?.value

  const cookieHeader = `x-csrf-token=${csrfSecret}; access_token=${accessToken}`
  if (!csrfToken) {
    throw new Error('CSRF Token non trouvé')
  }

  const res = await fetch(`${API_LINK}/budgets/user/notifications`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': csrfToken,
      Cookie: cookieHeader,
    },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Erreur fetch notifications: ${res.status} – ${text}`)
  }

  return (await res.json()) as Notification[]
}
