import Link from 'next/link'

const footerData = {
  footerLinks: [
    {
      title: 'Informations',
      links: [
        { label: 'Tarifs', href: '#pricing' },
        { label: 'Fonctionnalités', href: '#features' },
      ],
    },
    {
      title: 'Contact',
      links: [
        {
          label: 'Email: contact@lapince.fr',
          href: 'mailto:contact@lapince.fr',
        },
        { label: 'Téléphone: 06 06 06 06 06', href: 'tel:0606060606' },
        {
          label: 'Adresse: 75 rue du Budget, Paris',
          href: 'https://maps.google.com/?q=Paris',
        },
      ],
    },
    {
      title: 'Légal',
      links: [
        { label: 'Mentions légales', href: '/legal-mentions' },
        { label: 'Politique de confidentialité', href: '/legal-privacy' },
        { label: 'CGU', href: '/legal-conditions' },
      ],
    },
  ],
  socialLinks: [
    {
      href: 'https://twitter.com/lapince',
      label: 'Twitter',
      iconPath: 'M6.329 1l4.369 5...',
    },
    {
      href: 'https://facebook.com/lapince',
      label: 'Facebook',
      iconPath: 'M20 10.025C20 4.491...',
    },
    {
      href: 'https://instagram.com/lapince',
      label: 'Instagram',
      iconPath: 'M19.96 2.336a.421...',
    },
    {
      href: 'https://linkedin.com/company/lapince',
      label: 'LinkedIn',
      iconPath: 'M10.041 0C4.52 0...',
    },
  ],
}

export default function FooterLanding() {
  const { footerLinks, socialLinks } = footerData

  return (
    <footer className="bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 py-8 sm:grid-cols-12 md:py-12">
          <div className="sm:col-span-12 lg:col-span-4 lg:max-w-xs">
            <div className="mb-2">
              <Link
                href="/"
                className="inline-flex text-blue-600 transition duration-150 ease-in-out"
                aria-label="LaPince"
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
                    <Link
                      href={href}
                      className="text-slate-500 transition duration-150 ease-in-out hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 py-6 md:flex md:items-center md:justify-between md:py-8 dark:border-slate-700">
          <ul className="mb-4 flex space-x-6 md:order-1 md:mb-0 md:ml-4">
            {socialLinks.map(({ href, label, iconPath }, index) => (
              <li key={index}>
                <Link
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
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
