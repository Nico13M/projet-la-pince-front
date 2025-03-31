'use client'

import { BarChart3, PieChart, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import features from '../../app/data/features_section.json'

const iconMap: Record<string, React.ReactNode> = {
  Wallet: <Wallet className="text-primary h-7 w-7" />,
  BarChart3: <BarChart3 className="text-primary h-7 w-7" />,
  PieChart: <PieChart className="text-primary h-7 w-7" />,
}

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
                {iconMap[feature.icon]}
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
