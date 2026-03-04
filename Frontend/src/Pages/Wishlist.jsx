import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getWishlist, removeFromWishlist } from '../States/Wishlist/Action';
import { addToCart } from '../States/Cart/Action';

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pull real wishlist data from Redux
  const { items: wishlistItems, loading } = useSelector((state) => state.wishlist);

  const [copied, setCopied] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  // Fetch wishlist from backend on mount
  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
    showToast('Removed', 'Item removed from wishlist');
  };

  const handleAddToCart = (productId, productTitle) => {
    dispatch(addToCart(productId));
    showToast('Added to Cart', `${productTitle} has been added to your cart`);
  };

  const handleAddAllToCart = () => {
    const availableItems = wishlistItems.filter(item => item.product);
    availableItems.forEach(item => dispatch(addToCart(item.product._id)));
    showToast('Added All to Cart', `${availableItems.length} items added to your cart`);
  };

  const shareWishlist = () => {
    return `${window.location.origin}/wishlist?shared=true`;
  };

  const copyShareLink = async () => {
    const link = shareWishlist();
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('Link Copied!', 'Share this link with your friends');
  };

  const showToast = (title, description) => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm';
    toast.innerHTML = `
      <div class="font-semibold">${title}</div>
      <div class="text-sm text-gray-300">${description}</div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="container mx-auto px-4 py-8">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mb-6 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <span>←</span> Back
          </button>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-3xl">❤️</span>
              <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {wishlistItems?.length || 0} items
              </span>
            </div>

            {wishlistItems?.length > 0 && (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowShareDialog(true)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
                >
                  <span>🔗</span> Share
                </button>
                <button
                  onClick={handleAddAllToCart}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2"
                >
                  <span>🛒</span> Add All to Cart
                </button>
              </div>
            )}
          </div>

          {!wishlistItems?.length ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6 opacity-30">❤️</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Start adding products you love to your wishlist
              </p>
              <button
                onClick={() => navigate('/MarketPlace')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => {
                const product = item.product;
                if (!product) return null;

                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden group"
                  >
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                          🌾
                        </div>
                      )}
                      <button
                        onClick={() => handleRemove(product._id)}
                        className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-md"
                      >
                        <span className="text-red-600">🗑️</span>
                      </button>
                    </div>

                    <div className="p-4">
                      <h3
                        className="font-semibold text-gray-800 truncate cursor-pointer hover:text-green-700"
                        onClick={() => navigate(`/product/${product._id}`)}
                      >
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">{product.brand} · {product.category}</p>

                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <span className="text-lg font-bold text-green-600">
                            ₹{product.discountedPrice?.toFixed(2)}
                          </span>
                          {product.discount > 0 && (
                            <span className="text-xs text-gray-400 line-through ml-1">
                              ₹{product.price?.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToCart(product._id, product.title)}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium inline-flex items-center gap-1 bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                          <span className="text-xs">🛒</span> Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            © 2026 FarmConnect. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Share Dialog */}
      {showShareDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Share Your Wishlist</h2>
            <p className="text-gray-600 mb-4">Share your wishlist with friends and family</p>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                readOnly
                value={shareWishlist()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
              />
              <button
                onClick={copyShareLink}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                {copied ? '✓' : '📋'}
              </button>
            </div>
            <button
              onClick={() => setShowShareDialog(false)}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;