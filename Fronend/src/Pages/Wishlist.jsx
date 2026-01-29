import { useState, useEffect } from 'react';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    setTimeout(() => {
      setWishlistItems([
        {
          id: 'wish_1',
          product_id: 'prod_1',
          created_at: '2026-01-15T10:30:00',
          product: {
            id: 'prod_1',
            name: 'Organic Tomatoes',
            price: 60,
            unit: 'kg',
            image_url: 'https://t4.ftcdn.net/jpg/03/54/24/17/360_F_354241708_IrEvwS6AeMei4ZZJHTSOC1xqtl79rS10.jpg',
            is_available: true,
            farmer: {
              full_name: 'Ramesh Kumar',
              farm_name: 'Green Valley Farm'
            }
          }
        },
        {
          id: 'wish_2',
          product_id: 'prod_2',
          created_at: '2026-01-16T14:20:00',
          product: {
            id: 'prod_2',
            name: 'Fresh Carrots',
            price: 40,
            unit: 'kg',
            image_url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop',
            is_available: true,
            farmer: {
              full_name: 'Sunita Patil',
              farm_name: 'Sunrise Organic Farm'
            }
          }
        },
        {
          id: 'wish_3',
          product_id: 'prod_3',
          created_at: '2026-01-17T09:15:00',
          product: {
            id: 'prod_3',
            name: 'Premium Cauliflower',
            price: 50,
            unit: 'kg',
            image_url: 'https://media.istockphoto.com/id/1190388298/photo/cauliflower-grows-in-organic-soil-in-the-garden-on-the-vegetable-area-cauliflower-head-in.jpg?s=612x612&w=0&k=20&c=_tQs1zCuBBZYiJQdrG6jmX7NAe1zEOrd0wd9DijLQNQ=',
            is_available: false,
            farmer: {
              full_name: 'Vijay Deshmukh',
              farm_name: null
            }
          }
        },
        {
          id: 'wish_4',
          product_id: 'prod_4',
          created_at: '2026-01-17T11:30:00',
          product: {
            id: 'prod_4',
            name: 'Fresh Spinach',
            price: 30,
            unit: 'kg',
            image_url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop',
            is_available: true,
            farmer: {
              full_name: 'Priya Sharma',
              farm_name: 'Healthy Greens Farm'
            }
          }
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const removeFromWishlist = (wishlistId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== wishlistId));
    showToast('Removed', 'Item removed from wishlist');
  };

  const addToCart = (productId, productName) => {
    showToast('Added to Cart', `${productName} has been added to your cart`);
  };

  const addAllToCart = () => {
    const availableItems = wishlistItems.filter(item => item.product.is_available);
    showToast('Added All to Cart', `${availableItems.length} items added to your cart`);
  };

  const shareWishlist = () => {
    return `${window.location.origin}/wishlist?shared=user_123`;
  };

  const copyShareLink = async () => {
    const link = shareWishlist();
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('Link Copied!', 'Share this link with your friends');
  };

  const showToast = (title, description) => {
    // Simple toast notification
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
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-800">FarmConnect</h1>
          </div>
        </header>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
        <footer className="bg-white border-t mt-12">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-gray-600">© 2026 FarmConnect. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div>
          <button
            onClick={() => window.history.back()}
            className="mb-6 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <span>←</span> Back
          </button>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-3xl">❤️</span>
              <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {wishlistItems.length} items
              </span>
            </div>

            {wishlistItems.length > 0 && (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowShareDialog(true)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
                >
                  <span>🔗</span> Share
                </button>

                <button
                  onClick={addAllToCart}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2"
                >
                  <span>🛒</span> Add All to Cart
                </button>
              </div>
            )}
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6 opacity-30">❤️</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Start adding products you love to your wishlist
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden group"
                >
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    {item.product.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
                        🌾
                      </div>
                    )}
                    {!item.product.is_available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-md"
                    >
                      <span className="text-red-600">🗑️</span>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {item.product.farmer.farm_name || item.product.farmer.full_name}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-green-600">
                        ₹{item.product.price}/{item.product.unit}
                      </span>
                      <button
                        onClick={() => addToCart(item.product_id, item.product.name)}
                        disabled={!item.product.is_available}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium inline-flex items-center gap-1 transition-colors ${
                          item.product.is_available
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <span className="text-xs">🛒</span> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
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