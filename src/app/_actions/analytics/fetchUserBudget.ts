

import { cookies } from "next/headers";
import { Data, SavedBudget } from '@/types/budget'
const API_LINK = process.env.NEXT_PUBLIC_API_LINK
export async function fetchUserBudget(pageNumber = 1, limit = 12): Promise<Data<SavedBudget> | undefined> {
    try {
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, val] = cookie.trim().split('=');
        acc[key] = val;
        return acc;
      }, {} as Record<string, string>);
      if (!cookies) throw new Error('CSRF Token absent')

      const csrfToken = cookies['XSRF-TOKEN'];

        const response = await fetch(`${API_LINK}/budget/list?page=${pageNumber}&limit=${limit}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'x-csrf-token': csrfToken,
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error)
        return undefined
    }
}