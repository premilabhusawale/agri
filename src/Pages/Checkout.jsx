import React, { useState, useEffect } from 'react';

// Icon Components
const MapPin = ({ style }) => (
  <svg style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CreditCard = ({ style }) => (
  <svg style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="1" y1="10" x2="23" y2="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const Truck = ({ style }) => (
  <svg style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8h5l-1.5 5H16V8zM16 8V5a2 2 0 00-2-2H2v13h2m12-8v8m0 0a2 2 0 104 0m-4 0a2 2 0 11-4 0m-6 0a2 2 0 104 0m-4 0a2 2 0 11-4 0" />
  </svg>
);

const CheckCircle = ({ style }) => (
  <svg style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowLeft = ({ style }) => (
  <svg style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const Checkout = () => {
  // NOTE: You'll need to implement these yourself or pass as props
  // const { profile, user, loading } = useAuth();
  // const navigate = useNavigate();
  // const { supabase } = supabase;
  
  const [cartItems, setCartItems] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Mock data for demonstration
  const profile = { id: '123', full_name: '', phone: '' };
  const user = { id: '123' };
  const loading = false;

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const navigate = (path) => {
    console.log('Navigate to:', path);
    // Implement your navigation logic here
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading]);

  useEffect(() => {
    if (profile) {
      setAddress(prev => ({
        ...prev,
        fullName: profile.full_name || '',
        phone: profile.phone || '',
      }));
      fetchCart();
    }
  }, [profile]);

  const fetchCart = async () => {
    // Mock fetch - replace with your actual API call
    // const { data, error } = await supabase
    //   .from('cart_items')
    //   .select(`
    //     id,
    //     quantity,
    //     product:products(id, name, price, unit, farmer_id)
    //   `)
    //   .eq('buyer_id', profile?.id);
    
    // Mock data
    const data = [];
    
    if (data) {
      setCartItems(data);
    }
    setPageLoading(false);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!address.street || !address.city || !address.pincode) {
      showToast('Please fill in all address fields.', 'error');
      return;
    }

    setProcessing(true);

    const fullAddress = `${address.fullName}, ${address.phone}, ${address.street}, ${address.city}, ${address.state} - ${address.pincode}`;

    // Group items by farmer
    const itemsByFarmer = cartItems.reduce((acc, item) => {
      const farmerId = item.product.farmer_id;
      if (!acc[farmerId]) acc[farmerId] = [];
      acc[farmerId].push(item);
      return acc;
    }, {});

    try {
      // Replace with your actual API calls
      for (const [farmerId, items] of Object.entries(itemsByFarmer)) {
        const orderTotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        
        // Mock order creation
        console.log('Creating order for farmer:', farmerId, 'Total:', orderTotal);
        
        // const { data: order, error: orderError } = await supabase
        //   .from('orders')
        //   .insert({
        //     buyer_id: profile?.id,
        //     farmer_id: farmerId,
        //     total_amount: orderTotal,
        //     delivery_address: fullAddress,
        //     status: 'pending',
        //   })
        //   .select()
        //   .single();

        // Mock order items
        const orderItems = items.map(item => ({
          order_id: 'mock_order_id',
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        }));

        console.log('Order items:', orderItems);
      }

      // Mock clear cart
      console.log('Clearing cart');

      setOrderPlaced(true);
      showToast('Your order has been placed successfully!');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setProcessing(false);
    }
  };

  if (loading || pageLoading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '384px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '2px solid #22c55e',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '64px 16px', 
          textAlign: 'center' 
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 24px',
            borderRadius: '50%',
            backgroundColor: '#dcfce7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CheckCircle style={{ width: '40px', height: '40px', color: '#16a34a' }} />
          </div>
          <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '16px' }}>Order Confirmed!</h1>
          <p style={{ color: '#6b7280', marginBottom: '32px', maxWidth: '448px', margin: '0 auto 32px' }}>
            Thank you for your order. The farmer will confirm your order shortly. 
            You can track your order status in your profile.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
            <button 
              onClick={() => navigate('/')}
              style={{
                padding: '12px 24px',
                backgroundColor: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Continue Shopping
            </button>
            <button 
              onClick={() => navigate('/messages')}
              style={{
                padding: '12px 24px',
                backgroundColor: 'white',
                color: '#22c55e',
                border: '1px solid #22c55e',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Contact Farmer
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Your cart is empty</h1>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Toast Notification */}
      {toast.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '16px 24px',
          backgroundColor: toast.type === 'error' ? '#fee2e2' : '#dcfce7',
          color: toast.type === 'error' ? '#991b1b' : '#166534',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          {toast.message}
        </div>
      )}

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <button
          onClick={() => navigate('/cart')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '24px',
            fontSize: '14px'
          }}
        >
          <ArrowLeft style={{ width: '16px', height: '16px' }} />
          Back to Cart
        </button>

        <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '32px' }}>Checkout</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
          {/* Checkout Form */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Delivery Address */}
              <div style={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <MapPin style={{ width: '20px', height: '20px', color: '#22c55e' }} />
                  Delivery Address
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      placeholder="John Doe"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                      required
                    />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                      Street Address
                    </label>
                    <textarea
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      placeholder="House/Flat No., Street Name, Landmark"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px',
                        minHeight: '80px',
                        resize: 'vertical'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                      City
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="Mumbai"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                      State
                    </label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      placeholder="Maharashtra"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                      PIN Code
                    </label>
                    <input
                      type="text"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      placeholder="400001"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div style={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <CreditCard style={{ width: '20px', height: '20px', color: '#22c55e' }} />
                  Payment Method
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="radio"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500' }}>Cash on Delivery</div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>Pay when you receive your order</div>
                    </div>
                  </label>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    opacity: 0.5
                  }}>
                    <input
                      type="radio"
                      value="online"
                      disabled
                      style={{ width: '18px', height: '18px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500' }}>Online Payment</div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>Coming soon - UPI, Cards, Net Banking</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div style={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '24px',
              position: 'sticky',
              top: '96px'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Order Summary</h2>
              
              <div style={{ marginBottom: '16px' }}>
                {cartItems.map((item) => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    marginBottom: '12px'
                  }}>
                    <span style={{ color: '#6b7280' }}>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                  <span style={{ color: '#6b7280' }}>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                  <span style={{ color: '#6b7280' }}>Delivery</span>
                  <span style={{ color: deliveryFee === 0 ? '#22c55e' : '#000' }}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: '600',
                  fontSize: '18px',
                  paddingTop: '8px',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <span>Total</span>
                  <span style={{ color: '#22c55e' }}>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={processing}
                style={{
                  width: '100%',
                  marginTop: '24px',
                  padding: '14px',
                  backgroundColor: processing ? '#9ca3af' : '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: processing ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {processing ? 'Processing...' : (
                  <>
                    <Truck style={{ width: '16px', height: '16px' }} />
                    Place Order
                  </>
                )}
              </button>

              <p style={{ fontSize: '12px', textAlign: 'center', color: '#6b7280', marginTop: '16px' }}>
                By placing this order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;