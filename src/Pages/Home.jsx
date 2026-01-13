import React from 'react'
import Hero from '../HeroSection/Hero'
import PriceTicker from '../HeroSection/PriceTicker'

import LivePricesSection from '../HeroSection/LivePriceSection'
import MarketplaceSection from './MarketplaceSection'

const Home = () => {
  return (
    <div>
      <Hero />
      <PriceTicker />
      <LivePricesSection />
      <MarketplaceSection />
      
    </div>
  )
}

export default Home