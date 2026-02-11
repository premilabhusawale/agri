import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, ShoppingCart, Heart } from 'lucide-react';

const Card = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock !== false && onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle wishlist logic here
    console.log('Added to wishlist:', product.name);
  };

  const handleCardClick = () => {
    // Navigate to product details using the correct route
    navigate(`/ProductDetails/${product.id}`);
  };

  // Default stock to true if not specified
  const isInStock = product.stock !== false;

  return (
    <div 
      onClick={handleCardClick}
      className="cursor-pointer block group no-underline"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
    >
      <article className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col transform hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            {product.organic && (
              <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold shadow-md">
                🌿 Organic
              </span>
            )}
            {isInStock && (
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold shadow-md">
                In Stock
              </span>
            )}
            {!isInStock && (
              <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold shadow-md">
                Out of Stock
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button 
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors" />
          </button>

          {/* Price Badge */}
          <div className="absolute bottom-3 left-3">
            <div className="px-3 py-1.5 rounded-lg bg-white shadow-md">
              <span className="text-lg font-bold text-gray-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-gray-600">/{product.unit}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 flex-wrap">
            {product.farmer && (
              <>
                <span>by {product.farmer}</span>
                <span>•</span>
              </>
            )}
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{product.location || 'Local'}</span>
            </div>
          </div>

          {product.description && (
            <p className="text-sm text-gray-600 mb-3 flex-grow line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-gray-900">{product.rating || 4.5}</span>
              <span className="text-sm text-gray-500">
                ({product.reviews || 124} reviews)
              </span>
            </div>
            {product.available && (
              <span className="text-sm text-gray-500">
                {product.available} kg available
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!isInStock}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md ${
              isInStock
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-lg active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isInStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </article>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Card;