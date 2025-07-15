

import { cookies } from 'next/headers'
const API_LINK = process.env.NEXT_PUBLIC_API_LINK

export async function fetchUser() {
  try {
   
    

     const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, val] = cookie.trim().split('=');
        acc[key] = val;
        return acc;
      }, {} as Record<string, string>);
      if (!cookies) throw new Error('CSRF Token absent')

      const csrfToken = cookies['XSRF-TOKEN'];
      const response = await fetch(`${API_LINK}/users/me`, {
        method: 'GET',
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
