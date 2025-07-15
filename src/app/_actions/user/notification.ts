

import { cookies } from 'next/headers'
const API_LINK = process.env.NEXT_PUBLIC_API_LINK

export async function userNotification() {
  try {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, val] = cookie.trim().split('=');
        acc[key] = val;
        return acc;
      }, {} as Record<string, string>);
      if (!cookies) throw new Error('CSRF Token absent')

      const csrfToken = cookies['XSRF-TOKEN'];
    const response = await fetch(API_LINK + '/budgets/mark-all-read', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
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
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, val] = cookie.trim().split('=');
        acc[key] = val;
        return acc;
      }, {} as Record<string, string>);
      if (!cookies) throw new Error('CSRF Token absent')

      const csrfToken = cookies['XSRF-TOKEN'];

  const res = await fetch(`${API_LINK}/budgets/user/notifications`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': csrfToken,
    },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Erreur fetch notifications: ${res.status} – ${text}`)
  }

  return (await res.json()) as Notification[]
}
