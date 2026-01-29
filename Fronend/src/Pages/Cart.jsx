import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching cart data
    fetchCart();
  }, []);

  const fetchCart = async () => {
    // Replace this with your actual API call
    // Example data structure:
    const sampleData = [
      {
        id: '1',
        quantity: 2,
        product: {
          id: '1',
          name: 'Fresh Organic Tomatoes',
          price: 50,
          unit: 'kg',
          image_url: 'https://i.pinimg.com/736x/b4/a8/7f/b4a87f01141685de432a7de9b3da60d2.jpg',
          farmer_id: '1',
          farmer: {
            farm_name: 'Green Valley Farm'
          }
        }
      },
      {
        id: '2',
        quantity: 1,
        product: {
          id: '2',
          name: 'Fresh Green Fenugreek',
          price: 30,
          unit: 'kg',
          image_url: 'https://i.pinimg.com/736x/51/11/e8/5111e836749b161be7d6360f7a902c69.jpg',
          farmer_id: '2',
          farmer: {
            farm_name: 'Organic Farms Co.'
          }
        }
      },
      {
        id: '3',
        quantity: 3,
        product: {
          id: '3',
          name: 'Red Fresh Apples',
          price: 120,
          unit: 'kg',
          image_url: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=100',
          farmer_id: '3',
          farmer: {
            farm_name: 'Hill View Orchards'
          }
        }
      }
    ];
    
    // Using sample data - remove this line when you connect to real API
    setCartItems(sampleData);
    setCartLoading(false);
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }
    
    // Replace with your API call
    setCartItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = async (itemId) => {
    // Replace with your API call
    setCartItems(items => items.filter(item => item.id !== itemId));
    alert('Item removed from cart');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryFee;

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <ShoppingCart className="h-8 w-8 text-green-600" />
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some fresh produce to get started!</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.product.image_url || 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=100'}
                    alt={item.product.name}
                    className="w-24 h-24 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => navigate(`/product/${item.product.id}`)}
                  />
                  <div className="flex-1">
                    <h3 
                      className="font-semibold text-gray-900 hover:text-green-600 cursor-pointer transition-colors"
                      onClick={() => navigate(`/product/${item.product.id}`)}
                    >
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.product.farmer?.farm_name || 'Local Farm'}
                    </p>
                    <p className="text-green-600 font-medium mt-1">
                      ₹{item.product.price}/{item.product.unit}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3 font-medium min-w-[40px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : 'font-medium'}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-gray-500 bg-green-50 p-2 rounded">
                      💡 Add ₹{(500 - subtotal).toFixed(2)} more for free delivery
                    </p>
                  )}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-green-600">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button 
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  🔒 Secure checkout powered by AgriConnect
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;