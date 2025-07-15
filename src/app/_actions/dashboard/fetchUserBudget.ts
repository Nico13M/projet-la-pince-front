

import { cookies } from "next/headers";
import { Data, SavedBudget } from '@/types/budget'
const API_LINK = process.env.NEXT_PUBLIC_API_LINK
export async function fetchUserBudget(pageNumber = 1): Promise<Data<SavedBudget> | undefined> {
    try {
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, val] = cookie.trim().split('=');
        acc[key] = val;
        return acc;
      }, {} as Record<string, string>);
      if (!cookies) throw new Error('CSRF Token absent')

        const csrfToken = cookies['XSRF-TOKEN'];
        const response = await fetch(`${API_LINK}/budget/list?page=${pageNumber}`, {
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
interface CreateBudgetParams {
    categoryId: string;
}
export async function createBudget(budget: Partial<SavedBudget>, params: CreateBudgetParams): Promise<SavedBudget | undefined> {
    try {
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, val] = cookie.trim().split('=');
        acc[key] = val;
        return acc;
      }, {} as Record<string, string>);
      if (!cookies) throw new Error('CSRF Token absent')

        const csrfToken = cookies['XSRF-TOKEN'];

        const response = await fetch(`${API_LINK}/budget/create/${params.categoryId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': csrfToken,
            },
            body: JSON.stringify({ ...budget, ...params }),
        });


        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Erreur createBudget:", err);
    }
}


export async function updateBudget(id: string, budget: Partial<SavedBudget>): Promise<SavedBudget | undefined> {
    try {
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, val] = cookie.trim().split('=');
        acc[key] = val;
        return acc;
      }, {} as Record<string, string>);
      if (!cookies) throw new Error('CSRF Token absent')

        const csrfToken = cookies['XSRF-TOKEN'];

        

        const response = await fetch(`${API_LINK}/budget/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': csrfToken,
            },
            body: JSON.stringify(budget),
        })

        const data = await response.json()
        return data
    } catch (err) {
        console.error("Erreur updateBudget:", err)
    }
}

export async function deleteBudget(id: string) {
    try {
       const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, val] = cookie.trim().split('=');
        acc[key] = val;
        return acc;
      }, {} as Record<string, string>);
      if (!cookies) throw new Error('CSRF Token absent')

      const csrfToken = cookies['XSRF-TOKEN'];

        const response = await fetch(`${API_LINK}/budget/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': csrfToken
            },
        })
        const data = await response.json()
        return data
    } catch (err) {
        console.error("Erreur updateBudget:", err)
    }
}