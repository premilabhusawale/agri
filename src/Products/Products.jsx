import React from 'react'
import Card from './Card'

const Products = ({ products }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-gray-100 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-black mb-3 bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
          Featured Products
        </h2>
        <p className="text-lg text-gray-600 font-medium">
          Fresh from our farmers to your table
        </p>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {
          products.map((product) => <Card key={product.id} product={product} />)
        }
      </div>
    </section>
  )
}

export default Products