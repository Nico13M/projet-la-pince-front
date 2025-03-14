'use client'

import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import plans from '../../app/data/pricing.json'

export default function PricingSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  return (
    <section className="bg-background relative overflow-hidden py-24">
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div
          className="transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          <h2 className="text-primary text-3xl font-bold md:text-4xl">
            Prêt à transformer votre relation avec l'argent?
          </h2>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
            Rejoignez des milliers d'utilisateurs qui ont pris le contrôle de
            leurs finances personnelles avec La Pince.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-8 text-left shadow-lg transition-all hover:-translate-y-1 ${
                  plan.isPremium
                    ? 'bg-primary text-white shadow-2xl'
                    : 'border-primary/20 border bg-white'
                }`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <h3
                    className={`text-lg font-bold ${plan.isPremium ? 'text-white' : 'text-primary'}`}
                  >
                    {plan.title}
                  </h3>
                  {plan.isPopular && (
                    <span className="text-primary rounded-full bg-white px-2 py-1 text-xs font-bold">
                      POPULAIRE
                    </span>
                  )}
                </div>
                {plan.price && (
                  <p className="mb-4">
                    <span className="text-3xl font-bold">
                      {plan.price.split('/')[0]}
                    </span>
                    <span className="text-white/70">
                      /{plan.price.split('/')[1]}
                    </span>
                  </p>
                )}
                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span
                        className={`mr-2 ${plan.isPremium ? 'text-white' : 'text-primary'}`}
                      >
                        ✓
                      </span>
                      <span
                        className={
                          plan.isPremium
                            ? 'text-white/90'
                            : 'text-muted-foreground'
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.buttonLink}
                  className={`group flex w-full items-center justify-center rounded-lg px-6 py-3 font-medium transition-all ${
                    plan.isPremium
                      ? 'text-primary hover:bg-secondary-foreground bg-white'
                      : 'bg-primary hover:bg-primary/90 text-white'
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
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
    </section>
  )
}
