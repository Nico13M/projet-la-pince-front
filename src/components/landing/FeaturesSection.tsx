import { useState, useEffect } from 'react'
import { Wallet, BarChart3, PieChart } from 'lucide-react'

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: <Wallet className="text-primary h-7 w-7" />,
      title: 'Suivi des Dépenses',
      description:
        'Visualisez et catégorisez automatiquement vos transactions pour identifier facilement où va votre argent.',
      delay: 100,
    },
    {
      icon: <BarChart3 className="text-primary h-7 w-7" />,
      title: 'Budgets Personnalisés',
      description:
        'Créez des budgets sur mesure pour chaque catégorie et recevez des alertes lorsque vous approchez de vos limites.',
      delay: 200,
    },
    {
      icon: <PieChart className="text-primary h-7 w-7" />,
      title: 'Analyses Visuelles',
      description:
        'Obtenez des insights pertinents grâce à des graphiques interactifs et des rapports personnalisés.',
      delay: 300,
    },
  ]

  return (
    <section id="features" className="bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className="mb-16 transform text-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          <h2 className="text-primary text-3xl font-bold md:text-4xl">
            Des outils conçus pour votre réussite financière
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Gardez le contrôle de vos finances grâce à des fonctionnalités
            intuitives et puissantes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${feature.delay}ms`,
              }}
            >
              <div className="bg-primary/10 mb-6 flex h-14 w-14 items-center justify-center rounded-xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground mt-3">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
