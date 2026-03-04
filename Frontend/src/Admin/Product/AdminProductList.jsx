import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Filter,
    MoreVertical,
    Package,
    CheckCircle,
    XCircle,
    X,
    Upload,
    ChevronDown
} from 'lucide-react';
import { api, API_BASE_URL } from '../../config/apiConfig';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const AdminProductList = () => {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        brand: '',
        price: '',
        discountedPrice: '',
        category: '',
        description: '',
        tag: '',
        quantity: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/product');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error(t('loadProductsError'));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm(t('deleteProductConfirm'))) {
            try {
                await api.delete(`/product/${id}`);
                toast.success(t('deleteProductSuccess'));
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                toast.error(t('deleteProductError'));
            }
        }
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                title: product.title || '',
                brand: product.brand || '',
                price: product.price || '',
                discountedPrice: product.discountedPrice || '',
                category: product.category?._id || product.category || '',
                description: product.description || '',
                tag: product.tag || '',
                quantity: product.quantity || ''
            });
            setPreviewUrl(product.image || product.imageUrl);
        } else {
            setEditingProduct(null);
            setFormData({
                title: '',
                brand: '',
                price: '',
                discountedPrice: '',
                category: '',
                description: '',
                tag: '',
                quantity: ''
            });
            setPreviewUrl(null);
        }
        setSelectedFile(null);
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        if (selectedFile) {
            data.append('image', selectedFile);
        }

        try {
            setLoading(true);
            if (editingProduct) {
                await api.put(`/product/${editingProduct._id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success(t('updateProductSuccess'));
            } else {
                await api.post('/product/create', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success(t('createProductSuccess'));
            }
            setIsModalOpen(false);
            fetchProducts();
        } catch (error) {
            console.error("Error saving product:", error);
            toast.error(error.response?.data?.message || t('saveProductError'));
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(product => {
        const title = product.title || '';
        const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || product.category?.name === filterCategory || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', ...new Set(products.map(p => p.category?.name || p.category).filter(Boolean))];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">{t('productManagement')}</h1>
                    <p className="text-slate-500 text-sm">{t('productManagementDesc')}</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 font-bold active:scale-95"
                >
                    <Plus size={18} />
                    {t('addNewProduct')}
                </button>
            </div>

            {/* Filters Section */}
            <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder={t('searchProducts')}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <select
                            className="pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none bg-white text-slate-700 font-semibold cursor-pointer"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase font-bold tracking-widest border-b border-slate-100">
                                <th className="px-6 py-4">{t('productInfo')}</th>
                                <th className="px-6 py-4">{t('category')}</th>
                                <th className="px-6 py-4">{t('productPricing')}</th>
                                <th className="px-6 py-4">{t('stock')}</th>
                                <th className="px-6 py-4">{t('status')}</th>
                                <th className="px-6 py-4 text-right">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading && products.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                                            <span className="text-slate-400 font-medium">{t('loadingItems')}</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredProducts.length > 0 ? filteredProducts.map((product) => (
                                <tr key={product._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0 shadow-sm transition-transform group-hover:scale-105">
                                                {product.image || product.imageUrl ? (
                                                    <img src={product.image || product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                        <Package size={24} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-sm font-bold text-slate-800 truncate leading-tight">{product.title}</span>
                                                <span className="text-xs text-slate-400 mt-0.5">{product.brand || 'Original Brand'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                                            {product.category?.name || product.category || 'General'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-extrabold text-slate-800">₹{product.discountedPrice}</span>
                                            <span className="text-xs text-slate-400 line-through">₹{product.price}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-sm font-bold ${product.quantity < 10 ? 'text-amber-600' : 'text-slate-600'}`}>
                                            {product.quantity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.quantity > 0 ? (
                                            <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px] uppercase tracking-wider">
                                                <CheckCircle size={14} className="animate-pulse" />
                                                {t('active')}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-red-500 font-bold text-[11px] uppercase tracking-wider">
                                                <XCircle size={14} />
                                                {t('out')}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform duration-300">
                                            <button
                                                onClick={() => handleOpenModal(product)}
                                                className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-20 text-center text-slate-400 font-medium">
                                        {t('noProductsFound')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal - Create/Update Product */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                            <h2 className="text-xl font-bold text-slate-800">
                                {editingProduct ? t('updateProduct') : t('addNewProduct')}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                            >
                                <X size={20} className="text-slate-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Image Upload */}
                                <div className="md:col-span-2 flex flex-col items-center gap-4 p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group relative">
                                    <input
                                        type="file"
                                        id="productImage"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                    {previewUrl ? (
                                        <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-md">
                                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Upload size={32} className="text-white" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-emerald-500 group-hover:scale-110 transition-transform">
                                                <Upload size={24} />
                                            </div>
                                            <p className="text-sm font-bold text-slate-700">{t('clickToUpload')}</p>
                                            <p className="text-xs text-slate-400">{t('uploadFormat')}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{t('productTitle')}</label>
                                    <input
                                        type="text" name="title" value={formData.title} onChange={handleInputChange} required
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{t('brandName')}</label>
                                    <input
                                        type="text" name="brand" value={formData.brand} onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{t('originalPrice')}</label>
                                    <input
                                        type="number" name="price" value={formData.price} onChange={handleInputChange} required
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{t('discountedPrice')}</label>
                                    <input
                                        type="number" name="discountedPrice" value={formData.discountedPrice} onChange={handleInputChange} required
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{t('category')}</label>
                                    <input
                                        type="text" name="category" value={formData.category} onChange={handleInputChange} required
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{t('productTag')}</label>
                                    <select
                                        name="tag" value={formData.tag} onChange={handleInputChange} required
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium bg-white"
                                    >
                                        <option value="">{t('selectTag')}</option>
                                        <option value="New">New</option>
                                        <option value="Hot">Hot</option>
                                        <option value="Sale">Sale</option>
                                        <option value="Popular">Popular</option>
                                        <option value="Organic">Organic</option>
                                        <option value="Premium">Premium</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{t('stockQuantity')}</label>
                                    <input
                                        type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{t('description')}</label>
                                    <textarea
                                        name="description" value={formData.description} onChange={handleInputChange} rows="3"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <button
                                    type="button" onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-colors"
                                >
                                    {t('cancel')}
                                </button>
                                <button
                                    type="submit" disabled={loading}
                                    className="flex-[2] px-6 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : editingProduct ? t('saveChanges') : t('createProduct')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProductList;
