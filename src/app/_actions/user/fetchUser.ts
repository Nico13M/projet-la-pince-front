'use server'

import { cookies } from 'next/headers'
const API_LINK = process.env.API_LINK

export async function fetchUser() {
  try {
    const cookieStore = await cookies()
    const csrfToken = cookieStore.get('x-csrf-token')?.value
    const accessToken = cookieStore.get('access_token')?.value
    if (!csrfToken) throw new Error('CSRF Token absent')

    const cookieHeader = `x-csrf-token=${csrfToken}; access_token=${accessToken}`
    const response = await fetch(`${API_LINK}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
