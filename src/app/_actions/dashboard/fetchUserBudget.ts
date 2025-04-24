'use server'

import { cookies } from "next/headers";
import { Data, SavedBudget } from '@/types/budget'
const API_LINK = process.env.API_LINK
export async function fetchUserBudget(pageNumber = 1): Promise<Data<SavedBudget>> {
    try {
        const cookieStore = await cookies();
        const csrfToken = cookieStore.get('x-csrf-token')?.value;
        const accessToken = cookieStore.get('access_token')?.value;
        const cookieHeader = `x-csrf-token=${csrfToken}; access_token=${accessToken}`;

        if (!csrfToken) {
            throw new Error("CSRF Token non trouvé");
        }

        const response = await fetch(API_LINK + '/budget/list', {
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
    }
}
interface CreateBudgetParams {
    categoryId: string;
}
export async function createBudget(budget: Partial<SavedBudget>, params: CreateBudgetParams): Promise<SavedBudget | undefined> {
    try {
        const cookieStore = await cookies();
        const csrfSecret = cookieStore.get('x-csrf-token')?.value;
        const csrfToken = cookieStore.get('XSRF-TOKEN')?.value;
        const accessToken = cookieStore.get('access_token')?.value;

        if (!csrfToken || !accessToken) throw new Error("Tokens manquants");

        const cookieHeader = `x-csrf-token=${csrfSecret}; access_token=${accessToken}`;

        const response = await fetch(`${API_LINK}/budget/create/${params.categoryId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': csrfToken,
                'Cookie': cookieHeader
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
        const cookieStore = await cookies()
        const csrfSecret = cookieStore.get('x-csrf-token')?.value;
        const csrfToken = cookieStore.get('XSRF-TOKEN')?.value;
        const accessToken = cookieStore.get('access_token')?.value;

        if (!csrfToken || !accessToken) throw new Error("Tokens manquants")

        const cookieHeader = `x-csrf-token=${csrfSecret}; access_token=${accessToken}`;

        const response = await fetch(`${API_LINK}/budget/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': csrfToken,
                'Cookie': cookieHeader
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
        const cookieStore = await cookies()
        const csrfSecret = cookieStore.get('x-csrf-token')?.value;
        const csrfToken = cookieStore.get('XSRF-TOKEN')?.value;
        const accessToken = cookieStore.get('access_token')?.value;

        if (!csrfToken || !accessToken) throw new Error("Tokens manquants")

        const cookieHeader = `x-csrf-token=${csrfSecret}; access_token=${accessToken}`;

        const response = await fetch(`${API_LINK}/budget/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': csrfToken,
                'Cookie': cookieHeader
            },
        })
        const data = await response.json()
        return data
    } catch (err) {
        console.error("Erreur updateBudget:", err)
    }
}