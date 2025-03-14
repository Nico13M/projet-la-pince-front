import Link from 'next/link'
import Logo from '../../components/Logo'

export default function Header() {
  return (
    <header
      className={`dark absolute z-30 w-full bg-black/70 transition duration-300`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Site branding */}
          <div className="mr-4 shrink-0">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop menu links */}
            <ul className="flex grow flex-wrap items-center justify-start space-x-5 lg:space-x-8">
              {[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Budgets', href: '/budgets' },
                { label: 'Fonctionnalités', href: '/fonctionnalities' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }, index) => (
                <li key={index}>
                  <Link
                    href={href}
                    className="text-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary flex items-center px-3 py-2 text-base font-medium transition duration-150 ease-in-out lg:px-5"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop sign-in links */}
            <ul className="flex grow flex-wrap items-center justify-end space-x-5 lg:space-x-8">
              {[
                { label: 'Se connecter', href: '/sign-in' },
                { label: 'Créer un compte', href: '/sign-up' },
              ].map(({ label, href }, index) => (
                <li key={index}>
                  <Link
                    href={href}
                    className="text-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary flex items-center px-3 py-2 text-base font-medium transition duration-150 ease-in-out lg:px-5"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
