import React, { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    Eye,
    Trash2,
    Clock,
    Package,
    Calendar,
    CheckCircle,
    XCircle,
    TrendingDown,
    ShoppingBag,
    ExternalLink
} from 'lucide-react';
import { api } from '../../config/apiConfig';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const AdminOrderList = () => {
    const { t } = useTranslation();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/orders/all');
            if (response.data.success) {
                setOrders(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error(t('loadOrdersError'));
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await api.put(`/orders/status/${orderId}`, { status: newStatus });
            if (response.data.success) {
                toast.success(t('updateStatusSuccess', { status: newStatus }));
                setOrders(prev => prev.map(o => o._id === orderId ? response.data.data : o));
            }
        } catch (error) {
            toast.error(t('updateStatusError'));
        }
    };

    const handleDelete = async (orderId) => {
        if (window.confirm(t('deleteOrderConfirm'))) {
            try {
                await api.delete(`/orders/delete/${orderId}`);
                toast.success(t('deleteOrderSuccess'));
                setOrders(prev => prev.filter(o => o._id !== orderId));
            } catch (error) {
                toast.error(t('deleteOrderError'));
            }
        }
    };

    const filteredOrders = orders.filter(order => {
        const id = order._id || '';
        const name = `${order.user?.name || ''} ${order.user?.surname || ''}`;
        const matchesSearch = id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || order.orderStatus === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const orderStatuses = ["All", "PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">{t('orderManagement')}</h1>
                    <p className="text-slate-500 text-sm">{t('orderManagementDesc')}</p>
                </div>
            </div>

            <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder={t('searchOrdersPlaceholder')}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <select
                        className="pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none bg-white text-slate-700 font-bold cursor-pointer"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        {orderStatuses.map(status => (
                            <option key={status} value={status}>{status === 'All' ? t('all') : status}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden border-collapse">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/80 text-slate-500 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
                                <th className="px-6 py-4">{t('invoiceDate')}</th>
                                <th className="px-6 py-4">{t('customer')}</th>
                                <th className="px-6 py-4">{t('pricing')}</th>
                                <th className="px-6 py-4">{t('lifecycle')}</th>
                                <th className="px-6 py-4 text-right">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading && orders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-20 text-center">
                                        <div className="w-8 h-8 mx-auto border-3 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                                    </td>
                                </tr>
                            ) : filteredOrders.length > 0 ? filteredOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                                                <ShoppingBag size={20} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-extrabold text-slate-800">#{order._id.slice(-8).toUpperCase()}</span>
                                                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                                    <Calendar size={10} />
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-700 leading-tight">{order.user?.name} {order.user?.surname}</span>
                                            <span className="text-[11px] text-slate-400 font-medium">{order.user?.email || t('guestUser')}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-800">₹{order.totalPrice}</span>
                                            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded w-fit mt-1">
                                                {t('itemsCount', { count: order.totalItem })}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.orderStatus}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border-2 focus:ring-4 focus:ring-emerald-500/10 cursor-pointer transition-all ${order.orderStatus === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                order.orderStatus === 'CANCELLED' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                                    order.orderStatus === 'SHIPPED' ? 'bg-violet-50 text-violet-700 border-violet-100' :
                                                        'bg-blue-50 text-blue-700 border-blue-100'
                                                }`}
                                        >
                                            {orderStatuses.slice(1).map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all" title="View Order Items">
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(order._id)}
                                                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all" title="Delete Order"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-20 text-center text-slate-400 font-bold text-sm">
                                        {t('noOrdersFound')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderList;
