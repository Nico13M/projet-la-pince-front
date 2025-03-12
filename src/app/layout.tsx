import type { Metadata } from 'next'
import { Poppins, Roboto } from 'next/font/google'

import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'La Pince',
  description: 'Application pour améliorer la gestion de budget',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${poppins.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
