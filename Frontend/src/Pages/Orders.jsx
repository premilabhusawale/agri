import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders, cancelOrder } from '../States/Orders/Action';
import { toast } from 'react-toastify';

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders = [], loading } = useSelector((s) => s.orders ?? s.Orders ?? {});

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const handleCancel = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      await dispatch(cancelOrder(orderId));
      toast.success('Order cancelled successfully.');
    } catch {
      toast.error('Failed to cancel order.');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PLACED: 'bg-blue-100 text-blue-800',
      CONFIRMED: 'bg-indigo-100 text-indigo-800',
      SHIPPED: 'bg-purple-100 text-purple-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      PENDING: '⏱️', PLACED: '✅', CONFIRMED: '📋',
      SHIPPED: '🚚', DELIVERED: '📦', CANCELLED: '❌',
    };
    return icons[status] || '⏱️';
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 pt-6">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => window.history.back()}
            className="mb-6 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors inline-flex items-center gap-2">
            ← Back
          </button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <span className="text-green-600 text-4xl">🛍️</span>
              My Orders
            </h1>
            <p className="text-gray-600 mt-1">Track and manage your order history</p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && orders.length === 0 && (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">No orders yet</h3>
              <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
              <button onClick={() => navigate('/MarketPlace')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                Browse Products
              </button>
            </div>
          )}

          {/* Orders List */}
          {!loading && orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden">

                  {/* Order Header */}
                  <div className="bg-gray-50 py-3 px-4 border-b border-gray-200">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="text-sm">
                          <span className="text-gray-600">Order: </span>
                          <span className="font-mono font-medium text-gray-800">#{order._id.slice(-8).toUpperCase()}</span>
                        </div>
                        <span className={`${getStatusColor(order.orderStatus)} px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1`}>
                          {getStatusIcon(order.orderStatus)} {order.orderStatus}
                        </span>
                        {/* Payment status badge */}
                        {order.paymentDetails?.paymentStatus && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.paymentDetails.paymentStatus === 'SUCCESS'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                            }`}>
                            💳 {order.paymentDetails.paymentStatus === 'SUCCESS' ? 'Paid' : 'COD'}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">📅 {formatDate(order.createdAt)}</div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4">
                    <div className="space-y-3 mb-4">
                      {order.orderItems?.map((item) => (
                        <div key={item._id} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                            {item.image ? (
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-2xl">📦</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate text-gray-800">{item.title || item.product?.title}</p>
                            <p className="text-sm text-gray-600">
                              {item.quantity} × ₹{item.discountedPrice || item.price}
                            </p>
                          </div>
                          <p className="font-semibold text-gray-800">
                            ₹{((item.discountedPrice || item.price) * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      {order.shippingAddress && (
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <span>📍</span>
                          <span>
                            {order.shippingAddress.streetAddress}, {order.shippingAddress.city}
                            {order.shippingAddress.state ? `, ${order.shippingAddress.state}` : ''} - {order.shippingAddress.pinCode}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex gap-2">
                          {/* Cancel button — only for PENDING/PLACED */}
                          {['PENDING', 'PLACED'].includes(order.orderStatus) && (
                            <button onClick={() => handleCancel(order._id)}
                              className="px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                              Cancel Order
                            </button>
                          )}
                        </div>
                        <span className="text-xl font-bold text-green-600">
                          ₹{Number(order.totalDiscountPrice).toLocaleString()}
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
    </div>
  );
};

export default Orders;