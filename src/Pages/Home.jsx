import React from 'react'
import Hero from '../HeroSction/Hero'
import PriceTicker from '../HeroSction/PriceTicker'
import Products from './Products'
import products from '../Data/Products'
import LivePricesSection from '../HeroSction/LivePriceSection'


const Home = () => {
  return (
    <div>
      <Hero />
      <PriceTicker />
      <LivePricesSection />
      <Products products={products} />
    </div>
  )
}

export default Home