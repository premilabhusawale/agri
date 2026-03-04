import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Clock,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';
import { api } from '../../config/apiConfig';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/admin/stats');
      if (response.data.success) {
        setStats(response.data.stats);
        setRecentOrders(response.data.recentOrders);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">{t('loading')}</span>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: t('totalUsers'),
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      trend: '+12%',
      isUp: true
    },
    {
      title: t('activeProducts'),
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      trend: '+5%',
      isUp: true
    },
    {
      title: t('totalOrders'),
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      trend: '+18%',
      isUp: true
    },
    {
      title: t('totalRevenue'),
      value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      trend: '+24%',
      isUp: true
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">{t('analyticsOverview')}</h1>
          <p className="text-slate-500 font-medium">{t('analyticsDesc')}</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full uppercase tracking-tighter">
          <Clock size={14} />
          {t('lastSynced')}: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 ${card.bg} rounded-full -mr-12 -mt-12 opacity-50 group-hover:scale-110 transition-transform`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${card.bg} ${card.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon size={22} strokeWidth={2.5} />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${card.isUp ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                  {card.isUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {card.trend}
                </div>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{card.title}</p>
              <h3 className="text-2xl font-black text-slate-800 mt-1 tracking-tight">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-7 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Activity size={20} />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-800">{t('freshTransactions')}</h2>
                <p className="text-xs text-slate-400 font-medium">{t('latestActivity')}</p>
              </div>
            </div>
            <Link to="/admin/orders" className="text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-1.5 transition-all">
              {t('viewAll')} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-50">
                  <th className="px-7 py-4">{t('customer')}</th>
                  <th className="px-7 py-4">{t('status')}</th>
                  <th className="px-7 py-4">{t('total')}</th>
                  <th className="px-7 py-4 text-right">{t('reference')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders.length > 0 ? recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-7 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-linear-to-tr from-slate-100 to-slate-200 border border-white shadow-sm flex items-center justify-center text-xs font-bold text-slate-600">
                          {order.user?.name?.[0]}{order.user?.surname?.[0]}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-bold text-slate-700 truncate">{order.user?.name} {order.user?.surname}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-7 py-5">
                      <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-1 ${order.orderStatus === 'DELIVERED' ? 'bg-emerald-100 text-emerald-700' :
                        order.orderStatus === 'CANCELLED' ? 'bg-rose-100 text-rose-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                        <div className={`w-1 h-1 rounded-full animate-pulse ${order.orderStatus === 'DELIVERED' ? 'bg-emerald-500' :
                          order.orderStatus === 'CANCELLED' ? 'bg-rose-500' : 'bg-blue-500'
                          }`} />
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-7 py-5">
                      <span className="text-sm font-black text-slate-800">₹{order.totalPrice}</span>
                    </td>
                    <td className="px-7 py-5 text-right">
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">#{order._id.slice(-6).toUpperCase()}</span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="px-7 py-10 text-center text-slate-400 font-medium">{t('noRecentOrders')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Charts */}
        <div className="space-y-8">
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
            <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
              <Layers size={18} className="text-emerald-500" />
              {t('managerial')}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <Link to="/admin/products" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 text-slate-700 hover:bg-emerald-600 hover:text-white transition-all duration-300 group/btn">
                <span className="font-bold text-xs uppercase tracking-wider">{t('inventoryAudit')}</span>
                <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <Link to="/admin/users" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-300 group/btn">
                <span className="font-bold text-xs uppercase tracking-wider">{t('userCustody')}</span>
                <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <Link to="/admin/orders" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 text-slate-700 hover:bg-violet-600 hover:text-white transition-all duration-300 group/btn">
                <span className="font-bold text-xs uppercase tracking-wider">{t('orderLogistics')}</span>
                <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-all" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <TrendingUp size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">{t('growthFactor')}</span>
              </div>
              <h2 className="text-2xl font-black mb-1">+24.8%</h2>
              <p className="text-slate-400 text-xs font-medium mb-6">{t('performanceBenchmark')}</p>

              <div className="flex items-end gap-1.5 h-24">
                {[35, 65, 45, 85, 55, 75, 95, 60, 80, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-emerald-500/80 rounded-t-sm group-hover:bg-emerald-400 transition-all duration-500"
                    style={{
                      height: `${h}%`,
                      transitionDelay: `${i * 50}ms`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;