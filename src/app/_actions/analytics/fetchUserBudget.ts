'use server'

import { cookies } from "next/headers";
import { Data, SavedBudget } from '@/types/budget'
const API_LINK = process.env.API_LINK
export async function fetchUserBudget(pageNumber = 1, limit = 12): Promise<Data<SavedBudget> | undefined> {
    try {
        const cookieStore = await cookies();
        const csrfToken = cookieStore.get('x-csrf-token')?.value;
        const accessToken = cookieStore.get('access_token')?.value;
        const cookieHeader = `x-csrf-token=${csrfToken}; access_token=${accessToken}`;

        if (!csrfToken) {
            throw new Error("CSRF Token non trouvé");
        }

        const response = await fetch(`${API_LINK}/budget/list?page=${pageNumber}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': csrfToken,
                'Cookie': cookieHeader
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error)
        return undefined
    }
}