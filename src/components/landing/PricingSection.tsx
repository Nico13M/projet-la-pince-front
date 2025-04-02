'use client'

import { useVisibilityAnimation } from '@/hooks/useVisibilityAnimation'
import PricingCard from './PricingCard'
import Section from './Section'
import SectionTitle from './SectionTitle'

const plans = [
  {
    title: 'Essai gratuit',
    features: [
      'Accès à toutes les fonctionnalités',
      "14 jours d'essai",
      'Pas de carte de crédit',
    ],
    buttonText: 'Commencer gratuitement',
    buttonLink: '/register',
    isPopular: false,
    isPremium: false,
  },
  {
    title: 'Abonnement Premium',
    price: '€4.99/mois',
    features: [
      'Toutes les fonctionnalités standard',
      'Synchronisation multi-comptes',
      'Prévisions financières avancées',
      'Support prioritaire',
    ],
    buttonText: "S'abonner maintenant",
    buttonLink: '/premium',
    isPopular: true,
    isPremium: true,
  },
]

export default function PricingSection() {
  const { visibilityClasses } = useVisibilityAnimation()

  return (
    <Section className="relative overflow-hidden" bgColor="bg-background">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className={visibilityClasses()}>
          <SectionTitle
            title="Prêt à transformer votre relation avec l'argent?"
            subtitle="Rejoignez des milliers d'utilisateurs qui ont pris le contrôle de leurs finances personnelles avec La Pince."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {plans.map((plan, idx) => (
              <PricingCard
                key={idx}
                title={plan.title}
                price={plan.price}
                features={plan.features}
                buttonText={plan.buttonText}
                buttonLink={plan.buttonLink}
                isPremium={plan.isPremium}
                isPopular={plan.isPopular}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-primary/5 animate-float-slow absolute top-10 left-10 h-40 w-40 rounded-full"></div>
        <div className="bg-secondary/5 animate-float-delay absolute right-10 bottom-10 h-60 w-60 rounded-full"></div>
        <div className="bg-primary/10 animate-float absolute top-1/3 right-1/4 h-20 w-20 rounded-full"></div>
      </div>
    </Section>
  )
}
