'use client'

import { useVisibilityAnimation } from '@/hooks/useVisibilityAnimation'
import Section from './Section'
import SectionTitle from './SectionTitle'
import StatItem from './StatItem'
import TestimonialCard from './TestimonialCard'

// Données intégrées directement dans le composant
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
  const { visibilityClasses } = useVisibilityAnimation()

  return (
    <Section
      bgColor="from-primary/95 to-secondary/95 bg-gradient-to-br"
      className="text-white"
    >
      <SectionTitle title="Ce que notre communauté apprécie" light />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <TestimonialCard
            key={index}
            testimonial={item.testimonial}
            name={item.name}
            role={item.role}
            image={item.image}
            className={visibilityClasses(item.delay)}
          />
        ))}
      </div>

      <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
        {stats.map((stat, idx) => (
          <StatItem
            key={idx}
            number={stat.number}
            label={stat.label}
            className={visibilityClasses(stat.delay)}
          />
        ))}
      </div>
    </Section>
  )
}
