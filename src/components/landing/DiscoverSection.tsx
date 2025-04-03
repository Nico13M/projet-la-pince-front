'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState } from 'react'
import AnalyticsPreview from '../../../public/analytics-preview.webp'
import BudgetPreview from '../../../public/budget-preview.webp'
import DashboardPreview from '../../../public/dashboard-preview.webp'
import FeatureItem from './FeatureItem'
import Section from './Section'
import SectionTitle from './SectionTitle'

const features = [
  {
    title: 'Suivez vos dépenses en temps réel',
    description:
      'Ajoutez vos transactions manuellement pour un suivi automatique. Catégorisation intelligente pour comprendre où va votre argent.',
    items: [
      'Catégorisation automatique et personnalisée',
      'Notifications de dépenses inhabituelles',
      'Suivi visuel de progression',
    ],
    image: DashboardPreview,
  },
  {
    title: 'Créez des budgets personnalisés',
    description:
      'Établissez des budgets mensuels adaptés à vos objectifs et à votre style de vie. Suivez votre progression et recevez des alertes avant de dépasser vos limites.',
    items: [
      'Budgets personnalisables par catégorie',
      'Alertes de dépassement',
      'Suivi visuel de progression',
    ],
    image: BudgetPreview,
  },
  {
    title: 'Analysez et optimisez vos finances',
    description:
      "Visualisez vos tendances de dépenses, identifiez les opportunités d'économie et suivez votre progression vers vos objectifs financiers.",
    items: [
      'Graphiques interactifs',
      'Analyse des dépenses',
      'Comparaisons mensuelles',
      'Suivi des dépenses par catégorie',
    ],
    image: AnalyticsPreview,
  },
]

const DiscoverSection = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Section bgColor="bg-background">
      <SectionTitle
        title="Découvrez La Pince en action"
        subtitle="Une interface intuitive qui s'adapte à vos besoins"
      />

      <div className="flex flex-col items-center gap-12 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <div className="bg-muted/50 rounded-xl p-4">
            <div className="mb-6 flex space-x-2">
              {['Suivi', 'Budget', 'Analyse'].map((tab, index) => (
                <Button
                  variant="default"
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-5 py-2 transition-all ${
                    activeTab === index
                      ? 'bg-primary text-white'
                      : 'text-muted-foreground hover:bg-muted/80 bg-white'
                  }`}
                >
                  {tab}
                </Button>
              ))}
            </div>

            <div className="relative h-[400px] overflow-hidden rounded-xl bg-white shadow-lg">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeTab === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
                {[0, 1, 2].map((index) => (
                  <Button
                    key={index}
                    size="sm"
                    onClick={() => setActiveTab(index)}
                    className={`h-3 w-3 rounded-full transition-all ${
                      activeTab === index
                        ? 'bg-primary w-6'
                        : 'bg-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full space-y-8 lg:w-1/2">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              title={feature.title}
              description={feature.description}
              items={feature.items}
              className={`transition-all duration-500 ${
                activeTab === index
                  ? 'relative translate-y-0 opacity-100'
                  : 'absolute translate-y-4 opacity-0'
              }`}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

export default DiscoverSection
