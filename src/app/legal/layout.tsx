import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales - La Pince',
  description:
    "Consultez nos mentions légales, politique de confidentialité et conditions générales d'utilisation.",
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="bg-background min-h-screen">{children}</div>
}
