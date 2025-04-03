"use client";
import { createContext, useContext, useEffect, useState } from 'react'

interface CsrfContextType {
    csrfToken: string | null
    refreshCsrfToken: () => void
}

const CsrfContext = createContext<CsrfContextType | undefined>(undefined)

export function CsrfProvider({ children }: { children: React.ReactNode }) {
    const [csrfToken, setCsrfToken] = useState<string | null>(null)

    const fetchCsrfToken = async () => {
        try {
            const API_LINK = process.env.NEXT_PUBLIC_API_LINK;
            const url = `${API_LINK}/csrf/csrf-token`;
            const response = await fetch(url, { credentials: 'include' })
            const data = await response.json()
            setCsrfToken(data.csrfToken)
            console.log(data.csrfToken)
        } catch (error) {
            console.error('Erreur lors de la récupération du CSRF Token:', error)
        }
    }

    useEffect(() => {
        fetchCsrfToken()
    }, [])

    return (
        <CsrfContext.Provider value={{ csrfToken, refreshCsrfToken: fetchCsrfToken }}>
            {children}
        </CsrfContext.Provider>
    )
}

