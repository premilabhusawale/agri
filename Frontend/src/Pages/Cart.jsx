import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { getUserCart, updateCartItem, removeCartItem } from '../States/Cart/Action';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, items, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeCartItem(itemId));
      return;
    }
    dispatch(updateCartItem(itemId, newQuantity));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeCartItem(itemId));
  };

  const subtotal = cart?.totalPrice || 0;
  const totalPayable = cart?.totalPayable || 0;
  const discount = cart?.discount || 0;
  const deliveryFee = totalPayable > 500 ? 0 : 50;
  const total = totalPayable + deliveryFee;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">⚠️ {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <ShoppingCart className="h-8 w-8 text-green-600" />
          Your Cart
          {items.length > 0 && (
            <span className="text-sm font-normal text-gray-500">({items.length} items)</span>
          )}
        </h1>

        {items.length === 0 ? (
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
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.image || item.product?.image || 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=100'}
                    alt={item.product?.title || 'Product'}
                    className="w-24 h-24 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => navigate(`/ProductDetails/${item.product?._id}`)}
                  />
                  <div className="flex-1">
                    <h3
                      className="font-semibold text-gray-900 hover:text-green-600 cursor-pointer transition-colors"
                      onClick={() => navigate(`/ProductDetails/${item.product?._id}`)}
                    >
                      {item.product?.title || 'Product'}
                    </h3>
                    <p className="text-sm text-gray-600">{item.product?.brand}</p>
                    <p className="text-green-600 font-medium mt-1">
                      ₹{item.discountedPrice / item.quantity} per unit
                    </p>
                    {item.discount > 0 && (
                      <span className="text-xs text-green-500">{item.discount}% off</span>
                    )}
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3 font-medium min-w-[40px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{item.discountedPrice?.toFixed(2)}</p>
                      {item.price !== item.discountedPrice && (
                        <p className="text-xs text-gray-400 line-through">₹{item.price?.toFixed(2)}</p>
                      )}
                    </div>
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
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600 font-medium">- ₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : 'font-medium'}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-gray-500 bg-green-50 p-2 rounded">
                      💡 Add ₹{(500 - totalPayable).toFixed(2)} more for free delivery
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