import Link from 'next/link'

export const BurgerMenu = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (mobileMenuOpen: boolean) => void
}) => {
  return (
    <div
      className={`absolute top-16 left-0 z-20 w-full bg-black/90 p-4 transition-all duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'block opacity-100' : 'pointer-events-none opacity-0'}`}
    >
      <div className="py-3">
        <ul className="space-y-4">
          <li>
            <Link
              href={'/dashboard'}
              className="text-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary block py-2 text-base font-medium transition duration-150 ease-in-out"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href={'mailto:contact@lapince.fr'}
              className="text-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary block py-2 text-base font-medium transition duration-150 ease-in-out"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li className="mt-4 border-t border-gray-700 pt-4">
            <Link
              href={'/sign-in'}
              className="text-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary block py-2 text-base font-medium transition duration-150 ease-in-out"
              onClick={() => setMobileMenuOpen(false)}
            >
              Se connecter
            </Link>
          </li>
          <li>
            <Link
              href={'/sign-up'}
              className="text-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary block py-2 text-base font-medium transition duration-150 ease-in-out"
              onClick={() => setMobileMenuOpen(false)}
            >
              Créer un compte
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
