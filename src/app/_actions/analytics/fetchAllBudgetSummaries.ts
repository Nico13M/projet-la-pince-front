'use server'

import { cookies } from "next/headers";

export async function fetchAllBudgetSummaries() {
    try {
        const API_LINK = process.env.API_LINK;
        const cookieStore = await cookies();

        const csrfToken = cookieStore.get('x-csrf-token')?.value;
        const accessToken = cookieStore.get('access_token')?.value;

        if (!csrfToken || !accessToken) {
            throw new Error("Token CSRF ou Access Token non trouvé");
        }

        const cookieHeader = `x-csrf-token=${csrfToken}; access_token=${accessToken}`;

        const response = await fetch(`${API_LINK}/budget-summaries`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': csrfToken,
                'Cookie': cookieHeader
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Erreur lors de la récupération des budgets utilisateurs :', error);
        return null;
    }
}
