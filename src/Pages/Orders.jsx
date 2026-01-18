import { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setOrders([
        {
          id: 'ord_12345678',
          total_amount: 2500,
          status: 'delivered',
          delivery_address: '123 Main Street, Latur, Maharashtra, India',
          created_at: '2026-01-15T10:30:00',
          farmer: {
            full_name: 'Ramesh Kumar',
            farm_name: 'Green Valley Farm'
          },
          order_items: [
            {
              id: 'item_1',
              quantity: 5,
              price: 300,
              product: {
                name: 'Organic Tomatoes',
                image_url: null,
                unit: 'kg'
              }
            },
            {
              id: 'item_2',
              quantity: 10,
              price: 100,
              product: {
                name: 'Fresh Potatoes',
                image_url: null,
                unit: 'kg'
              }
            }
          ]
        },
        {
          id: 'ord_87654321',
          total_amount: 1800,
          status: 'shipped',
          delivery_address: '456 Park Road, Latur, Maharashtra, India',
          created_at: '2026-01-16T14:20:00',
          farmer: {
            full_name: 'Sunita Patil',
            farm_name: 'Sunrise Organic Farm'
          },
          order_items: [
            {
              id: 'item_3',
              quantity: 3,
              price: 600,
              product: {
                name: 'Fresh Carrots',
                image_url: null,
                unit: 'kg'
              }
            }
          ]
        },
        {
          id: 'ord_11223344',
          total_amount: 3200,
          status: 'pending',
          delivery_address: '789 Garden Avenue, Latur, Maharashtra, India',
          created_at: '2026-01-17T09:15:00',
          farmer: {
            full_name: 'Vijay Deshmukh',
            farm_name: null
          },
          order_items: [
            {
              id: 'item_4',
              quantity: 8,
              price: 400,
              product: {
                name: 'Fresh Spinach',
                image_url: null,
                unit: 'kg'
              }
            }
          ]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏱️',
      confirmed: '✅',
      shipped: '🚚',
      delivered: '📦',
      cancelled: '❌'
    };
    return icons[status] || '⏱️';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">FarmConnect</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => window.history.back()}
            className="mb-6 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <span>←</span> Back
          </button>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <span className="text-green-600 text-4xl">🛍️</span>
              My Orders
            </h1>
            <p className="text-gray-600 mt-1">
              Track and manage your order history
            </p>
          </div>

          {/* Orders List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">No orders yet</h3>
              <p className="text-gray-600 mb-6">
                Start shopping to see your orders here
              </p>
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="bg-gray-50 py-3 px-4 border-b border-gray-200">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="text-sm">
                          <span className="text-gray-600">Order ID: </span>
                          <span className="font-mono font-medium text-gray-800">
                            {order.id.slice(0, 8)}...
                          </span>
                        </div>
                        <span
                          className={`${getStatusColor(order.status)} px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1`}
                        >
                          <span>{getStatusIcon(order.status)}</span>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <span>📅</span>
                        {formatDate(order.created_at)}
                      </div>
                    </div>
                  </div>

                  {/* Order Content */}
                  <div className="p-4">
                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.order_items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                            {item.product?.image_url ? (
                              <img
                                src={item.product.image_url}
                                alt={item.product?.name || 'Product'}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-2xl">📦</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate text-gray-800">
                              {item.product?.name || 'Unknown Product'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {item.quantity} {item.product?.unit || 'units'} × ₹{item.price}
                            </p>
                          </div>
                          <p className="font-semibold text-gray-800">
                            ₹{(item.quantity * item.price).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Order Details */}
                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-gray-600 mt-0.5">📍</span>
                        <span className="text-gray-600">{order.delivery_address}</span>
                      </div>
                      {order.farmer && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-600">🌾</span>
                          <span className="text-gray-600">
                            From: {order.farmer.farm_name || order.farmer.full_name}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-gray-600 font-medium">Total Amount</span>
                        <span className="text-xl font-bold text-green-600">
                          ₹{Number(order.total_amount).toLocaleString()}
                        </span>
                      </div>
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
    </div>
  );
};

export default Orders;