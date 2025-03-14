import Link from 'next/link'
import footerData from '../../app/data/footer.json'

export default function Footer() {
  const { footerLinks, socialLinks } = footerData

  return (
    <footer className="bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div className="grid gap-8 py-8 sm:grid-cols-12 md:py-12">
          {/* Branding */}
          <div className="sm:col-span-12 lg:col-span-4 lg:max-w-xs">
            <div className="mb-2">
              <Link
                href="/"
                className="inline-flex text-blue-600 transition duration-150 ease-in-out"
                aria-label="GestionBudget"
              >
                <svg
                  className="h-8 w-8 fill-current"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.25 4.116c.039..." />
                </svg>
              </Link>
            </div>
            <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Gérez votre budget, maîtrisez vos finances
            </div>
          </div>

          {/* Navigation blocks */}
          {footerLinks.map((section, index) => (
            <div
              key={index}
              className="sm:col-span-6 md:col-span-3 lg:col-span-2"
            >
              <h6 className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                {section.title}
              </h6>
              <ul className="space-y-2 text-sm">
                {section.links.map(({ label, href }, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={href}
                      className="text-slate-500 transition duration-150 ease-in-out hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom area */}
        <div className="border-t border-slate-200 py-6 md:flex md:items-center md:justify-between md:py-8 dark:border-slate-700">
          {/* Social links */}
          <ul className="mb-4 flex space-x-6 md:order-1 md:mb-0 md:ml-4">
            {socialLinks.map(({ href, label, iconPath }, index) => (
              <li key={index}>
                <a
                  href={href}
                  className="text-blue-500 transition duration-150 ease-in-out hover:text-blue-600"
                  aria-label={label}
                >
                  <svg
                    className="h-5 w-5 fill-current"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={iconPath} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="bg-foreground text-background py-8 text-center">
        <p>&copy; {new Date().getFullYear()} La Pince. Tous droits réservés.</p>
      </footer>
    </footer>
  )
}
