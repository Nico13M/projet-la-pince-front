'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BurgerMenu } from './BurgerMenu'
import { BurgerMenuButton } from './BurgerMenuButton'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      className={`dark absolute z-30 h-[75px] md:h-auto w-full bg-black/70 transition duration-300`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link className="hidden md:block" href="/">
            <Image
              className="mr-8"
              src="/logo-white.webp"
              alt="Logo"
              width={70}
              height={70}
            />
          </Link>
          <nav className="hidden md:flex md:grow justify-end">
            <ul className="flex flex-wrap items-center justify-end space-x-5 lg:space-x-8">
              <li>
                <Link
                  href={'/dashboard'}
                  className="text-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary flex items-center px-3 py-2 text-base font-medium transition duration-150 ease-in-out lg:px-5"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href={'mailto:contact@lapince.fr'}
                  className="text-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary flex items-center px-3 py-2 text-base font-medium transition duration-150 ease-in-out lg:px-5"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href={'/sign-in'}
                  className="text-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary flex items-center px-3 py-2 text-base font-medium transition duration-150 ease-in-out lg:px-5"
                >
                  Se connecter
                </Link>
              </li>
              <li>
                <Link
                  href={'/sign-up'}
                  className="text-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary flex items-center px-3 py-2 text-base font-medium transition duration-150 ease-in-out lg:px-5"
                >
                  Créer un compte
                </Link>
              </li>
            </ul>
          </nav>


          <div className="relative flex w-full items-center justify-end md:hidden">
            <Link
              href="/"
              className="absolute left-1/2 pt-3 -translate-x-1/2"
            >
              <Image
                src="/logo-white.webp"
                alt="Logo"
                width={80}
                height={80}
              />
            </Link>

            <BurgerMenuButton
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </div>
          <BurgerMenu
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </div>
      </div>
    </header>
  )
}
