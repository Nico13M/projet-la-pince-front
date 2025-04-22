'use server'

import { cookies } from "next/headers";

export async function fetchOneBudgetSummary() {
    try {
        
        const API_LINK = "http://backend-la-pince:3000"
        const cookieStore = await cookies();
        const csrfToken = cookieStore.get('x-csrf-token')?.value;
        const accessToken = cookieStore.get('access_token')?.value;

        const cookieHeader = `x-csrf-token=${csrfToken}; access_token=${accessToken}`;
    
        if (!csrfToken) {
            throw new Error("CSRF Token non trouvé");
        }
        // redondance j'envoie token 2 fois
        const response = await fetch(API_LINK + '/budget-summaries/3d379624-07ce-4a32-9f0e-16e6d18ae7d1', {
            method: 'GET',
            headers:{
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