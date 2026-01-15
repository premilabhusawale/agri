import React from 'react'
import Hero from '../HeroSection/Hero'
import PriceTicker from '../HeroSection/PriceTicker'

import LivePricesSection from '../HeroSection/LivePriceSection'
import MarketplaceSection from './MarketplaceSection'
import HowItWorks from '../Components/HowItWorks'

const Home = () => {
  return (
    <div>
      <Hero />
      <PriceTicker />
      <LivePricesSection />
      <MarketplaceSection />
      <HowItWorks/>
      
    </div>
  )
}

export default Home