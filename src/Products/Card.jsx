import React from 'react'

const Card = ({ product }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        
        {/* Stock Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          product.stock 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {product.stock ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>
      
      {/* Content Container */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category Tag */}
        <div className="inline-block bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 w-fit">
          {product.category}
        </div>
        
        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 flex-grow leading-relaxed">
          {product.description}
        </p>
        
        {/* Footer */}
        <div className="border-t border-gray-200 pt-4 flex justify-between items-end gap-3">
          {/* Price & Rating */}
          <div className="flex flex-col gap-1">
            <div className="text-xl font-bold text-emerald-600">
              ₹{product.price} 
              <span className="text-xs font-medium text-gray-600"> {product.unit}</span>
            </div>
            <div className="text-sm font-semibold text-amber-500">⭐ {product.rating}</div>
          </div>
          
          {/* Add to Cart Button */}
          <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-transform duration-200 shadow-md hover:shadow-lg">
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
