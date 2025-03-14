import '../app/globals.css'
import Hero from '../components/landing/Hero'
import FeaturesSection from '../components/landing/FeaturesSection'
import DiscoverSection from '../components/landing/DiscoverSection'
import CommunityFeedback from '../components/landing/Feedbacks'
import PricingSection from '../components/landing/PricingSection'
import Header from '@/components/layouts/Header'

export default function Home() {
  return (
    <main className="font-inter bg-background text-foreground min-h-screen antialiased">
      <Header />
      <Hero />
      <FeaturesSection />
      <DiscoverSection />
      <CommunityFeedback />
      <PricingSection />
    </main>
  )
}
