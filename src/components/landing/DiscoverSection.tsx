import { useState } from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const DiscoverLaPince = () => {
  const [activeTab, setActiveTab] = useState(0)

  const features = [
    {
      title: 'Suivez vos dépenses en temps réel',
      description:
        'Connectez vos comptes bancaires pour un suivi automatique ou ajoutez manuellement vos transactions. Catégorisation intelligente pour comprendre où va votre argent.',
      items: [
        'Synchronisation bancaire sécurisée',
        'Catégorisation automatique',
        'Notifications de dépenses inhabituelles',
      ],
      image: '/dashboard-expenses.png',
    },
    {
      title: 'Créez des budgets qui fonctionnent',
      description:
        'Établissez des budgets mensuels adaptés à vos objectifs et à votre style de vie. Suivez votre progression et recevez des alertes avant de dépasser vos limites.',
      items: [
        'Budgets personnalisables par catégorie',
        'Alertes de dépassement',
        'Suivi visuel de progression',
      ],
      image: '/dashboard-budget.png',
    },
    {
      title: 'Analysez et optimisez vos finances',
      description:
        'Visualisez vos tendances de dépenses, identifiez les opportunités d’économie et suivez votre progression vers vos objectifs financiers.',
      items: [
        'Graphiques interactifs et personnalisables',
        'Comparaisons mensuelles et annuelles',
        'Rapports détaillés exportables',
      ],
      image: '/dashboard-analytics.png',
    },
  ]

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-primary text-3xl font-bold md:text-4xl">
            Découvrez La Pince en action
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Une interface intuitive qui s’adapte à vos besoins
          </p>
        </div>

        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="mb-6 flex space-x-2">
                {['Suivi', 'Budget', 'Analyse'].map((tab, idx) => (
                  <Button
                    variant="default"
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-5 py-2 transition-all ${
                      activeTab === idx
                        ? 'bg-primary text-white'
                        : 'text-muted-foreground hover:bg-muted/80 bg-white'
                    }`}
                  >
                    {tab}
                  </Button>
                ))}
              </div>

              <div className="relative h-[400px] overflow-hidden rounded-xl bg-white shadow-lg">
                {features.map((feature, idx) => (
                  <Image
                    key={idx}
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className={`absolute inset-0 object-cover transition-opacity duration-500 ${
                      activeTab === idx ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
                  {[0, 1, 2].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTab(idx)}
                      className={`h-3 w-3 rounded-full transition-all ${
                        activeTab === idx
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
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 ${
                  activeTab === idx
                    ? 'relative translate-y-0 opacity-100'
                    : 'absolute translate-y-4 opacity-0'
                }`}
              >
                <h3 className="text-primary mb-4 text-2xl font-bold">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start">
                      <span className="bg-primary/10 mt-1 mr-3 rounded-full p-1">
                        <Check className="text-primary h-4 w-4" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DiscoverLaPince
