import React from 'react'
import Hero from '../HeroSction/Hero'
import PriceTicker from '../HeroSction/PriceTicker'
import Products from '../Products/Products'
import products from '../Data/Products'


const Home = () => {
  return (
    <div>
      <Hero />
      <PriceTicker />
      <Products products={products} />
    </div>
  )
}

export default Home