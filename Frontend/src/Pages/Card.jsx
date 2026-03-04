import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MapPin, Star, ShoppingCart, Heart } from 'lucide-react';
import { addToCart } from '../States/Cart/Action';
import { addToWishlist, removeFromWishlist } from '../States/Wishlist/Action';

// ── Inline Toast ──────────────────────────────────────────
const TOASTS = {
  cart: { bg: 'linear-gradient(135deg,#f0fdf4,#d1fae5)', border: '#6ee7b7', bar: '#059669', text: '#064e3b', icon: '🛒', label: 'Added to Cart' },
  wishlist: { bg: 'linear-gradient(135deg,#fff1f2,#ffe4e6)', border: '#fca5a5', bar: '#ef4444', text: '#7f1d1d', icon: '❤️', label: 'Wishlist' },
  error: { bg: 'linear-gradient(135deg,#fef2f2,#fee2e2)', border: '#fca5a5', bar: '#ef4444', text: '#7f1d1d', icon: '🚫', label: 'Error' },
};

const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((message, type = 'cart') => {
    const id = Date.now() + Math.random();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  }, []);
  const dismiss = useCallback((id) => setToasts(p => p.filter(t => t.id !== id)), []);
  const toast = {
    cart: (m) => show(m, 'cart'),
    wishlist: (m) => show(m, 'wishlist'),
    error: (m) => show(m, 'error'),
  };

  const ToastContainer = () => (
    <>
      <style>{`
        @keyframes toastSlideIn { from{opacity:0;transform:translateX(110%) scale(0.9)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes toastShrink  { from{width:100%} to{width:0%} }
        .agri-toast     { animation:toastSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .agri-toast-bar { animation:toastShrink 3.5s linear forwards; }
        .agri-toast-close:hover { opacity:1 !important; }
      `}</style>
      <div style={{ position: 'fixed', top: '1.25rem', right: '1.25rem', zIndex: 99999, display: 'flex', flexDirection: 'column', gap: '0.65rem', pointerEvents: 'none' }}>
        {toasts.map(t => {
          const c = TOASTS[t.type] || TOASTS.cart;
          return (
            <div key={t.id} className="agri-toast" style={{ background: c.bg, border: `1.5px solid ${c.border}`, borderRadius: '1.1rem', boxShadow: `0 12px 40px rgba(0,0,0,0.12),0 0 0 1px ${c.border}33`, minWidth: '300px', maxWidth: '360px', overflow: 'hidden', fontFamily: "'Segoe UI',system-ui,sans-serif", pointerEvents: 'all' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem 0.65rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${c.bar}22`, border: `1.5px solid ${c.bar}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                  {c.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: c.bar, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.15rem' }}>{c.label}</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: c.text, lineHeight: 1.4 }}>{t.message}</div>
                </div>
                <button className="agri-toast-close" onClick={() => dismiss(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: c.text, opacity: 0.4, padding: '0.25rem', lineHeight: 1, flexShrink: 0, transition: 'opacity 0.2s' }}>✕</button>
              </div>
              <div style={{ height: '3px', background: `${c.bar}22` }}>
                <div className="agri-toast-bar" style={{ height: '100%', background: `linear-gradient(90deg,${c.bar},${c.border})`, borderRadius: '2px' }} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  return { toast, ToastContainer };
};

// ── Card ──────────────────────────────────────────────────
const Card = ({ product }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast, ToastContainer } = useToast();

  // Check if this product is already in the wishlist
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const isWishlisted = wishlistItems?.some(item => item.product?._id === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock !== false) {
      dispatch(addToCart(product._id));
      toast.cart(t('addedToCartMsg', { name: product.title }) || `${product.title} added to cart!`);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      toast.wishlist(t('removedFromWishlistMsg', { name: product.title }) || `${product.title} removed from wishlist`);
    } else {
      dispatch(addToWishlist(product._id));
      toast.wishlist(t('addedToWishlistMsg', { name: product.title }) || `${product.title} added to wishlist!`);
    }
  };

  const handleCardClick = () => {
    navigate(`/ProductDetails/${product._id}`);
  };

  const isInStock = product.stock !== false;

  return (
    <>
      <ToastContainer />
      <div
        onClick={handleCardClick}
        className="cursor-pointer block group no-underline"
        role="button"
        tabIndex={0}
        aria-label={`View details for ${product.title}`}
      >
        <article className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col transform hover:-translate-y-1">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
              {product.tag === 'organic' && (
                <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold shadow-md">
                  🌿 {t('organic')}
                </span>
              )}
              {product.discount > 0 && (
                <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold shadow-md">
                  {product.discount}% OFF
                </span>
              )}
              {isInStock ? (
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold shadow-md">
                  {t('inStock')}
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold shadow-md">
                  {t('outOfStock')}
                </span>
              )}
            </div>

            {/* Heart button - now connected to Redux */}
            <button
              onClick={handleWishlist}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md"
              aria-label={isWishlisted ? t('removeFromWishlist') : t('addToWishlist')}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700 hover:text-red-500'
                  }`}
              />
            </button>

            <div className="absolute bottom-3 left-3">
              <div className="px-3 py-1.5 rounded-lg bg-white shadow-md">
                <span className="text-lg font-bold text-gray-900">
                  ₹{product.discountedPrice?.toLocaleString('en-IN')}
                </span>
                {product.price !== product.discountedPrice && (
                  <span className="text-xs text-gray-400 line-through ml-1">
                    ₹{product.price?.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
              {product.title}
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 flex-wrap">
              {product.brand && (
                <>
                  <span>{t('by')} {product.brand}</span>
                  <span>•</span>
                </>
              )}
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{product.category || 'Local'}</span>
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
                <span className="font-semibold text-gray-900">{product.numRatings || 0}</span>
                <span className="text-sm text-gray-500">
                  ({product.reviews?.length ?? product.numReviews ?? 0} {t('reviews')})
                </span>
              </div>
              {product.tag && (
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  {product.tag}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!isInStock}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md ${isInStock
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-lg active:scale-95'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              aria-label={`Add ${product.title} to cart`}
            >
              <ShoppingCart className="w-4 h-4" />
              {isInStock ? t('addToCart') : t('outOfStock')}
            </button>
          </div>
        </article>

        <style>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </>
  );
};

export default Card;