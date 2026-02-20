import CTASection from '@/components/home/CtaSection'
import DemoSection from '@/components/home/DemoSection'
import HeroSection from '@/components/home/HeroSection'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import ImpFeatures from '@/components/home/ImpFeatures'
import { PricingSection } from '@/components/home/PricingSection'
import TrustedBySection from '@/components/home/TrustedBySection'

const HomePage = () => {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8 lg:px-0">
        <div className="px-4 sm:px-8 lg:px-20">
          <HeroSection />
          <div className="hidden md:block">
            <DemoSection />
          </div>
        </div>
      </div>
      <TrustedBySection />
      <div className="container mx-auto">
        {/* <div className="px-4 sm:px-8 lg:px-20"> */}
        <HowItWorksSection />
        <ImpFeatures />
        <PricingSection />
        {/* </div> */}
      </div>
      <CTASection />
    </>
  )
}

export default HomePage
