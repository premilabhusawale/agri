import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Package, ShoppingBag, TrendingUp, 
  Edit, Trash2, Eye, EyeOff, MessageSquare 
} from 'lucide-react';

const FarmerDashboard = () => {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Mock profile data
  const profile = {
    id: '123',
    full_name: 'John Farmer',
    farm_name: 'Green Valley Farm',
    role: 'farmer'
  };
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    unit: 'kg',
    category: '',
    image_url: '',
  });

  const showToast = (title, description) => {
    alert(`${title}: ${description}`);
  };

  const fetchProducts = () => {
    // Mock data - replace with actual API call later
    setProducts([
      {
        id: '1',
        name: 'Fresh Tomatoes',
        description: 'Organic tomatoes',
        price: 50,
        quantity: 100,
        unit: 'kg',
        category: 'vegetables',
        image_url: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400',
        is_available: true
      },
      {
        id: '2',
        name: 'Green Apples',
        description: 'Fresh green apples',
        price: 120,
        quantity: 50,
        unit: 'kg',
        category: 'fruits',
        image_url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
        is_available: true
      }
    ]);
  };

  const fetchOrders = () => {
    // Mock data - replace with actual API call later
    setOrders([
      {
        id: '1',
        status: 'pending',
        total_amount: 500,
        delivery_address: '123 Main St, City',
        created_at: new Date().toISOString(),
        buyer: {
          full_name: 'Jane Buyer'
        }
      },
      {
        id: '2',
        status: 'confirmed',
        total_amount: 800,
        delivery_address: '456 Park Ave, Town',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        buyer: {
          full_name: 'Bob Customer'
        }
      }
    ]);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      farmer_id: profile?.id,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      unit: formData.unit,
      category: formData.category,
      image_url: formData.image_url || 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400',
      is_available: true
    };

    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
      showToast('Success', 'Product updated successfully!');
      setEditingProduct(null);
    } else {
      // Add new product
      setProducts([productData, ...products]);
      showToast('Success', 'Product added successfully!');
    }
    
    setFormData({ name: '', description: '', price: '', quantity: '', unit: 'kg', category: '', image_url: '' });
    setIsAddDialogOpen(false);
  };

  const toggleAvailability = (product) => {
    setProducts(products.map(p => 
      p.id === product.id ? { ...p, is_available: !p.is_available } : p
    ));
    showToast('Success', `Product ${!product.is_available ? 'enabled' : 'disabled'}`);
  };

  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      showToast('Deleted', 'Product removed successfully.');
    }
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status } : o
    ));
    showToast('Updated', `Order status changed to ${status}`);
  };

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.is_available).length,
    totalOrders: orders.length,
    revenue: orders.reduce((sum, o) => sum + Number(o.total_amount), 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {profile?.full_name}
            </h1>
            <p className="text-gray-600">{profile?.farm_name || 'Your Farm Dashboard'}</p>
          </div>
          
          <button 
            onClick={() => setIsAddDialogOpen(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Active Listings', value: stats.activeProducts, icon: Eye, color: 'text-green-500', bg: 'bg-green-50' },
            { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-50' },
            { label: 'Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-50' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Products */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Products</h2>
            <div className="space-y-3">
              {products.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No products yet. Add your first product!</p>
              ) : (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4"
                  >
                    <img
                      src={product.image_url || 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=100'}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        ₹{product.price}/{product.unit} • {product.quantity} available
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleAvailability(product)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                        title={product.is_available ? 'Hide product' : 'Show product'}
                      >
                        {product.is_available ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setFormData({
                            name: product.name,
                            description: product.description || '',
                            price: product.price.toString(),
                            quantity: product.quantity.toString(),
                            unit: product.unit,
                            category: product.category || '',
                            image_url: product.image_url || '',
                          });
                          setIsAddDialogOpen(true);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                        title="Edit product"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                        title="Delete product"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Orders */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {orders.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No orders yet.</p>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-gray-200 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">₹{order.total_amount}</span>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                    <p className="text-sm text-gray-600">
                      From: {order.buyer?.full_name || 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      Deliver to: {order.delivery_address}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => navigate(`/messages`)}
                        className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 transition"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Chat
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Product Modal */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Fresh Tomatoes"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Organic, hand-picked..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows="3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="50"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="100"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="g">Gram (g)</option>
                    <option value="piece">Piece</option>
                    <option value="dozen">Dozen</option>
                    <option value="bunch">Bunch</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="">Select</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="grains">Grains</option>
                    <option value="dairy">Dairy</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Image URL</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setEditingProduct(null);
                    setFormData({ name: '', description: '', price: '', quantity: '', unit: 'kg', category: '', image_url: '' });
                  }}
                  className="px-6 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;