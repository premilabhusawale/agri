// Inside your current MarketPlace.jsx file
import React, { useState } from 'react';
import Card from './Card'; // Rename the card component
import { products } from '../Data/Products'; // Your product data

const MarketPlacePage = () => {
  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    // Add your cart logic
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Marketplace</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPlacePage;