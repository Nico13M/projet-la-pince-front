'use client'

import { useVisibilityAnimation } from '@/hooks/useVisibilityAnimation'
import FeatureCard from './FeatureCard'
import Section from './Section'
import SectionTitle from './SectionTitle'

const features = [
  {
    icon: 'Wallet',
    title: 'Suivi des Dépenses',
    description:
      'Visualisez et catégorisez automatiquement vos transactions pour identifier facilement où va votre argent.',
    delay: 100,
  },
  {
    icon: 'BarChart3',
    title: 'Budgets Personnalisés',
    description:
      'Créez des budgets sur mesure pour chaque catégorie et recevez des alertes lorsque vous approchez de vos limites.',
    delay: 200,
  },
  {
    icon: 'PieChart',
    title: 'Analyses Visuelles',
    description:
      'Obtenez des insights pertinents grâce à des graphiques interactifs et des rapports personnalisés.',
    delay: 300,
  },
]

const FeaturesSection = () => {
  const { visibilityClasses } = useVisibilityAnimation()

  return (
    <Section id="features" bgColor="bg-muted/30">
      <SectionTitle
        title="Des outils conçus pour votre réussite financière"
        subtitle="Gardez le contrôle de vos finances grâce à des fonctionnalités intuitives et puissantes."
        className={visibilityClasses()}
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            className={visibilityClasses(feature.delay)}
          />
        ))}
      </div>
    </Section>
  )
}

export default FeaturesSection
