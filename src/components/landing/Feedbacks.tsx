import Image from 'next/image'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    testimonial:
      "La Pince a transformé ma façon de gérer mon budget. Je comprends enfin où va mon argent et comment l'optimiser.",
    name: 'Sophie M.',
    role: 'Freelance',
    image: '/Sophie.webp',
    delay: 100,
  },
  {
    testimonial:
      "Interface élégante et fonctionnalités puissantes. J'ai économisé plus en 3 mois qu'en toute l'année dernière!",
    name: 'Marc D.',
    role: 'Entrepreneur',
    image: '/Marc.webp',
    delay: 300,
  },
  {
    testimonial:
      'Enfin une app qui rend la gestion de budget accessible et même agréable. Je la recommande à tous mes amis.',
    name: 'Léa K.',
    role: 'Étudiante',
    image: '/Lea.webp',
    delay: 500,
  },
]

const stats = [
  { number: '98%', label: 'Taux de satisfaction', delay: 200 },
  { number: '35%', label: "d'économies en moyenne", delay: 400 },
  { number: '15k+', label: 'Utilisateurs actifs', delay: 600 },
]

export default function CommunityFeedback() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  return (
    <section className="from-primary/95 to-secondary/95 bg-gradient-to-br py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
          Ce que notre communauté apprécie
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm transition-all duration-700 hover:bg-white/20"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${item.delay}ms`,
              }}
            >
              <p className="leading-relaxed text-white/90 italic">
                "{item.testimonial}"
              </p>
              <div className="mt-6 flex items-center">
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-white/70">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${stat.delay}ms`,
              }}
            >
              <p className="text-4xl font-bold md:text-5xl">{stat.number}</p>
              <p className="mt-2 text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
