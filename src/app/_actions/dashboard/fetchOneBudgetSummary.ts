
import { cookies } from 'next/headers'

export async function fetchOneBudgetSummary() {
  try {
    const API_LINK = process.env.NEXT_PUBLIC_API_LINK
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, val] = cookie.trim().split('=');
        acc[key] = val;
        return acc;
      }, {} as Record<string, string>);
      if (!cookies) throw new Error('CSRF Token absent')

      const csrfToken = cookies['XSRF-TOKEN'];
    const response = await fetch(API_LINK + '/budget-summaries/user', {
      method: 'GET',
       credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
  }
}