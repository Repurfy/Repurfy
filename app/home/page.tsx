import DemoSection from '@/components/home/DemoSection'
import HeroSection from '@/components/home/HeroSection'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import ImpFeatures from '@/components/home/ImpFeatures'
import { PricingSection } from '@/components/home/PricingSection'
import TrustedBySection from '@/components/home/TrustedBySection'

const HomePage = () => {
  return (
    <div className="">
      <div className="container mx-auto px-4 sm:px-8 lg:px-20">
        <HeroSection />
      </div>
      <DemoSection />
      <div className="container mx-auto px-4 sm:px-8 lg:px-20">
        <HowItWorksSection />
      </div>
      <div className="container mx-auto px-4 sm:px-8 lg:px-20">
        <TrustedBySection />
        <ImpFeatures />
        <PricingSection />
      </div>
    </div>
  )
}

export default HomePage
