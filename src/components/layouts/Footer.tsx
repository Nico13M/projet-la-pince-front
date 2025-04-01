'use client'

export default function Footer() {
  return (
    <footer className="bg-foreground text-background relative z-20 w-full py-8 text-center">
      <div>
        <p>&copy; {new Date().getFullYear()} La Pince. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
