

import { cookies } from 'next/headers'

export async function updateCategory(data:any) {
  const API_LINK = process.env.NEXT_PUBLIC_API_LINK
  try {

     const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, val] = cookie.trim().split('=');
        acc[key] = val;
        return acc;
      }, {} as Record<string, string>);
      if (!cookies) throw new Error('CSRF Token absent')

      const csrfToken = cookies['XSRF-TOKEN'];

    const response = await fetch(API_LINK + `/categories/update/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
  }
}