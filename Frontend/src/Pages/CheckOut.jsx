import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createOrder, createPayment } from '../States/Orders/Action';
import { getUserCart } from '../States/Cart/Action';

const CheckOut = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((s) => s.auth ?? s.Auth ?? {});
  const { items: cartItems = [] } = useSelector((s) => s.cart ?? s.Cart ?? {});
  const { loading: orderLoading } = useSelector((s) => s.orders ?? s.Orders ?? {});

  // ✅ Check if this is a Buy Now flow
  const isBuyNow = location.state?.buyNow === true;
  const buyNowItem = location.state?.buyNowItem;

  // ✅ Use buyNow item or full cart depending on flow
  const checkoutItems = isBuyNow && buyNowItem ? [buyNowItem] : cartItems;

  const [pageLoading, setPageLoading] = useState(true);
  const [address, setAddress] = useState({
    name: '', surname: '', email: '', mobile: '',
    landmark: '', city: '', state: '', pincode: '', country: 'India',
  });
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) { navigate('/Auth'); return; }
    if (isBuyNow) {
      // Buy Now — no need to fetch cart
      setPageLoading(false);
    } else {
      dispatch(getUserCart()).finally(() => setPageLoading(false));
    }
  }, [user, dispatch, navigate, isBuyNow]);

  useEffect(() => {
    if (user) {
      setAddress(prev => ({
        ...prev,
        name: user.firstName || user.name || '',
        surname: user.lastName || user.surname || '',
        email: user.email || '',
        mobile: String(user.mobile || user.phone || ''),
      }));
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    if (!address.name.trim()) newErrors.name = 'First name is required';
    if (!address.surname.trim()) newErrors.surname = 'Surname is required';
    if (!address.email.trim()) newErrors.email = 'Email is required';
    if (!String(address.mobile).trim()) newErrors.mobile = 'Mobile is required';
    if (address.mobile && !/^[0-9]{10}$/.test(String(address.mobile).replace(/[^0-9]/g, '')))
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    if (!address.landmark.trim()) newErrors.landmark = 'Landmark is required';
    if (!address.city.trim()) newErrors.city = 'City is required';
    if (!address.state.trim()) newErrors.state = 'State is required';
    if (!String(address.pincode).trim()) newErrors.pincode = 'PIN code is required';
    if (address.pincode && !/^[0-9]{6}$/.test(String(address.pincode)))
      newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    if (!address.country.trim()) newErrors.country = 'Country is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const subtotal = checkoutItems.reduce((sum, item) => sum + ((item.discountedPrice || item.price) * (isBuyNow ? 1 : item.quantity)), 0);
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      toast.error('Please fill all required fields correctly.');
      return;
    }

    try {
      if (isBuyNow) {
        // ✅ Buy Now — add to cart first, then create order, then clear that item
        await dispatch({ type: 'ADD_TO_CART_REQUEST' });
        const { api } = await import('../config/apiConfig');

        // Add the buy now product to cart temporarily
        await api.put('/cart/add', { productId: buyNowItem.product._id });
      }

      // Create order (uses DB cart)
      const order = await dispatch(createOrder({
        name: address.name,
        surname: address.surname,
        email: address.email,
        mobile: String(address.mobile),
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
      }));

      console.log('✅ Order:', order);
      if (!order?._id) throw new Error('Order creation failed');

      if (paymentMethod === 'razorpay') {
        const payment = await dispatch(createPayment(order._id));
        console.log('💳 Payment:', payment);
        if (!payment?.paymentUrl) throw new Error('Payment link creation failed');
        toast.info('Redirecting to payment...');
        window.location.href = payment.paymentUrl;
      } else {
        toast.success('Order placed successfully!');
        navigate('/Orders');
      }

    } catch (error) {
      console.error('❌ Checkout error:', error);
      toast.error(error.message || 'Something went wrong. Please try again.');
    }
  };

  const field = (key, value) => setAddress(prev => ({ ...prev, [key]: value }));
  const clearErr = (key) => setErrors(prev => ({ ...prev, [key]: '' }));

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some fresh products to get started!</p>
          <button onClick={() => navigate('/MarketPlace')}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group">
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back</span>
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order in a few simple steps</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { key: 'name', label: 'First Name', placeholder: 'John' },
                  { key: 'surname', label: 'Surname', placeholder: 'Doe' },
                  { key: 'email', label: 'Email', placeholder: 'john@example.com', type: 'email' },
                  { key: 'mobile', label: 'Mobile', placeholder: '9876543210', type: 'tel' },
                ].map(({ key, label, placeholder, type = 'text' }) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{label} <span className="text-red-500">*</span></label>
                    <input type={type} value={address[key]} placeholder={placeholder}
                      onChange={(e) => { field(key, e.target.value); clearErr(key); }}
                      className={`w-full px-4 py-3 border ${errors[key] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`} />
                    {errors[key] && <p className="text-xs text-red-500">{errors[key]}</p>}
                  </div>
                ))}

                <div className="sm:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Landmark <span className="text-red-500">*</span></label>
                  <input type="text" value={address.landmark} placeholder="Near City Mall, MG Road"
                    onChange={(e) => { field('landmark', e.target.value); clearErr('landmark'); }}
                    className={`w-full px-4 py-3 border ${errors.landmark ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`} />
                  {errors.landmark && <p className="text-xs text-red-500">{errors.landmark}</p>}
                </div>

                {[
                  { key: 'city', label: 'City', placeholder: 'Mumbai' },
                  { key: 'state', label: 'State', placeholder: 'Maharashtra' },
                  { key: 'pincode', label: 'PIN Code', placeholder: '400001', maxLength: 6 },
                  { key: 'country', label: 'Country', placeholder: 'India' },
                ].map(({ key, label, placeholder, maxLength }) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{label} <span className="text-red-500">*</span></label>
                    <input type="text" value={address[key]} placeholder={placeholder} maxLength={maxLength}
                      onChange={(e) => { field(key, e.target.value); clearErr(key); }}
                      className={`w-full px-4 py-3 border ${errors[key] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`} />
                    {errors[key] && <p className="text-xs text-red-500">{errors[key]}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
              </div>
              <div className="space-y-3">
                {[
                  { value: 'razorpay', label: 'Pay Online', badge: 'Razorpay', sub: 'UPI, Cards, Net Banking, Wallets' },
                  { value: 'cod', label: 'Cash on Delivery', sub: 'Pay when you receive your order' },
                ].map(({ value, label, badge, sub }) => (
                  <div key={value} onClick={() => setPaymentMethod(value)}
                    className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === value ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                    <input type="radio" checked={paymentMethod === value} onChange={() => setPaymentMethod(value)} className="w-5 h-5 text-green-600" />
                    <label className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{label}</span>
                        {badge && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{badge}</span>}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{sub}</p>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Summary</h2>
              {isBuyNow && (
                <p className="text-xs text-orange-500 font-medium mb-4">⚡ Buy Now — cart items not included</p>
              )}

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {checkoutItems.map((item) => (
                  <div key={item._id} className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3 flex-1">
                      {(item.image || item.product?.image) && (
                        <img src={item.image || item.product.image} alt={item.product?.title || 'Product'}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{item.product?.title || item.title || 'Product'}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900 ml-2">
                      ₹{(item.discountedPrice || item.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Fee</span>
                  <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                {subtotal < 500 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-700">Add ₹{(500 - subtotal).toFixed(2)} more for free delivery!</p>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-green-600">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button onClick={handlePlaceOrder} disabled={orderLoading}
                className="w-full mt-6 px-6 py-4 bg-green-600 hover:bg-green-700 active:scale-95 text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-600/30">
                {orderLoading ? (
                  <><div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div> Processing...</>
                ) : (
                  <>{paymentMethod === 'razorpay' ? `Proceed to Pay ₹${total.toFixed(2)}` : 'Place Order'}</>
                )}
              </button>

              <p className="mt-4 text-xs text-gray-500 text-center">🔒 Secured by Razorpay</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckOut;