'use server'

import { cookies } from 'next/headers'

export async function addCategories(data:any) {
  const API_LINK = process.env.API_LINK
  try {

     const cookieStore = await cookies();
        const csrfSecret = cookieStore.get('x-csrf-token')?.value;
        const csrfToken = cookieStore.get('XSRF-TOKEN')?.value;
        const accessToken = cookieStore.get('access_token')?.value;

    const cookieHeader = `x-csrf-token=${csrfSecret}; access_token=${accessToken}`;
    if (!csrfToken) {
      throw new Error("CSRF Token non trouvé");
    }

    const response = await fetch(API_LINK + '/categories/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
        'Cookie': cookieHeader
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
  }
}