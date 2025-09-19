import React from 'react'
import Navbar from '../Component/Navbar '
import HeroSection from './HeroSection '
import FeaturesSection from './FeaturesSection '
import StatsSection from './StatsSection '
import PricingSection from './PricingSection '
import CTASection from './CTASection '
import Footer from '../Component/Footer'

const LandingPage  = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default LandingPage 
