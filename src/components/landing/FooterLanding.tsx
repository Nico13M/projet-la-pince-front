import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react'
import Image from 'next/image'
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
          label: 'Email',
          href: 'mailto:contact@lapince.fr',
          icon: <Mail className="mr-2 h-4 w-4" />,
          value: 'contact@lapince.fr',
        },
        {
          label: 'Téléphone',
          href: 'tel:0606060606',
          icon: <Phone className="mr-2 h-4 w-4" />,
          value: '06 06 06 06 06',
        },
        {
          label: 'Adresse',
          href: 'https://maps.google.com/?q=Paris',
          icon: <MapPin className="mr-2 h-4 w-4" />,
          value: '75 rue du Budget, Paris',
        },
      ],
    },
    {
      title: 'Légal',
      links: [
        { label: 'Mentions légales', href: '/legal/legal-mentions' },
        { label: 'Politique de confidentialité', href: '/legal/legal-privacy' },
        { label: 'CGU', href: '/legal/legal-conditions' },
      ],
    },
  ],
  socialLinks: [
    {
      href: 'https://twitter.com/lapince',
      label: 'Twitter',
      icon: <Twitter className="h-5 w-5" />,
    },
    {
      href: 'https://facebook.com/lapince',
      label: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
    },
    {
      href: 'https://instagram.com/lapince',
      label: 'Instagram',
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      href: 'https://linkedin.com/company/lapince',
      label: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
    },
  ],
}

export default function FooterLanding() {
  const { footerLinks, socialLinks } = footerData

  return (
    <footer className="bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center space-x-2"
              aria-label="LaPince"
            >
              <Image
                src="/logo.webp"
                alt="Logo La Pince"
                width={32}
                height={32}
              />
              <span className="text-primary text-xl font-bold">La Pince</span>
            </Link>
            <p className="text-muted-foreground mt-4 max-w-xs">
              Gérez votre budget, maîtrisez vos finances et prenez le contrôle
              de votre avenir financier.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="bg-primary/10 text-primary hover:bg-primary/20 h-9 w-9 rounded-full"
                  asChild
                >
                  <Link href={item.href} aria-label={item.label}>
                    {item.icon}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index} className="col-span-1">
              <h3 className="text-foreground font-medium">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary flex items-center"
                    >
                      {'icon' in link && link.icon}
                      <span>
                        {'value' in link ? (
                          <>
                            <span className="font-medium">{link.label}:</span>{' '}
                            {link.value}
                          </>
                        ) : (
                          link.label
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />
      </div>
    </footer>
  )
}
