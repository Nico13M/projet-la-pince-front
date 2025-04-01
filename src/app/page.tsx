import FooterLanding from '@/components/landing/FooterLanding'
import Header from '@/components/layouts/Header'
import '../app/globals.css'
import DiscoverSection from '../components/landing/DiscoverSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import CommunityFeedback from '../components/landing/Feedbacks'
import Hero from '../components/landing/Hero'
import PricingSection from '../components/landing/PricingSection'
export default function Home() {
  return (
    <main className="font-inter bg-background text-foreground min-h-screen antialiased">
      <Header />
      <Hero />
      <FeaturesSection />
      <DiscoverSection />
      <CommunityFeedback />
      <PricingSection />
      <FooterLanding />
    </main>
  )
}
