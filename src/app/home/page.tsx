'use client'

import Head from 'next/head'

import '../globals.css'
import Hero from '../components/hero'
import FeaturesSection from '../components/featuresSection'
import DiscoverSection from '../components/discoverSection'
import CommunityFeedback from '../components/feedbacks'
import PricingSection from '../components/pricingSection'

export default function Home() {
  return (
    <>
      <Head>
        <title>La Pince - Simplifiez Vos Finances</title>
        <meta
          name="description"
          content="Maîtrisez vos finances avec La Pince. Une application intuitive pour gérer vos dépenses, créer des budgets, et suivre vos objectifs financiers."
        />
      </Head>

      <main className="font-inter bg-background text-foreground min-h-screen antialiased">
        <Hero />
        <FeaturesSection />
        <DiscoverSection />
        <CommunityFeedback />
        <PricingSection />
      </main>
    </>
  )
}
