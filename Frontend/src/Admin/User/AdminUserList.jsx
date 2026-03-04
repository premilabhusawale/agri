import React, { useState, useEffect } from 'react';
import {
    Users,
    Search,
    Shield,
    User as UserIcon,
    Mail,
    Calendar,
    Trash2,
    X,
    UserPlus,
    ShieldCheck,
    ChevronRight,
    UserCheck
} from 'lucide-react';
import { api } from '../../config/apiConfig';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const AdminUserList = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        mobile: '',
        role: 'CUSTOMER'
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/all-users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error(t('loadUsersError'));
        } finally {
            setLoading(false);
        }
    };

    const handleToggleRole = async (userId, currentRole) => {
        const newRole = currentRole === 'ADMIN' ? 'CUSTOMER' : 'ADMIN';
        try {
            await api.put(`/update-role/${userId}`, { role: newRole });
            toast.success(t('updateRoleSuccess', { role: newRole }));
            setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
        } catch (error) {
            toast.error(t('updateRoleError'));
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm(t('deleteUserConfirm'))) {
            try {
                await api.delete(`/user/${userId}`);
                toast.success(t('deleteUserSuccess'));
                setUsers(prev => prev.filter(u => u._id !== userId));
            } catch (error) {
                toast.error(t('deleteUserError'));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await api.post('/auth/signup', formData);
            toast.success(t('createUserSuccess'));
            setIsModalOpen(false);
            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.message || t('createUserError'));
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        `${user.name || ''} ${user.surname || ''}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">{t('userManagement')}</h1>
                    <p className="text-slate-500 text-sm">{t('userManagementDesc')}</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 font-bold active:scale-95"
                >
                    <UserPlus size={18} />
                    {t('addNewAdmin')}
                </button>
            </div>

            <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder={t('searchUsersPlaceholder')}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white font-medium shadow-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden whitespace-nowrap">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/80 text-slate-500 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
                                <th className="px-6 py-4">{t('userDetails')}</th>
                                <th className="px-6 py-4">{t('accountRole')}</th>
                                <th className="px-6 py-4">{t('registration')}</th>
                                <th className="px-6 py-4 text-right">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading && users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-20 text-center">
                                        <div className="w-8 h-8 mx-auto border-3 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                                    </td>
                                </tr>
                            ) : filteredUsers.length > 0 ? filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center border border-white shadow-sm overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                                                {user.photo ? (
                                                    <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <UserIcon size={18} className="text-slate-400" />
                                                )}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-sm font-bold text-slate-800">{user.name} {user.surname}</span>
                                                <div className="flex items-center gap-1 text-xs text-slate-400">
                                                    <span className="truncate">{user.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${user.role === 'ADMIN'
                                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                            : 'bg-blue-50 text-blue-600 border border-blue-100'
                                            }`}>
                                            {user.role === 'ADMIN' ? <Shield size={12} /> : <UserCheck size={12} />}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-600">
                                                {new Date(user.createdAt || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-medium">{t('joinedPlatform')}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleToggleRole(user._id, user.role)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${user.role === 'ADMIN'
                                                    ? 'text-slate-500 hover:bg-slate-100'
                                                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100'
                                                    }`}
                                            >
                                                {user.role === 'ADMIN' ? t('setAsCustomer') : t('makeAdmin')}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-20 text-center text-slate-400 font-medium whitespace-normal">
                                        {t('noUsersFound')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal - Create User/Admin */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <UserPlus size={22} className="text-emerald-500" />
                                {t('addNewAccount')}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                            >
                                <X size={20} className="text-slate-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t('firstName')}</label>
                                    <input
                                        type="text" required
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t('surname')}</label>
                                    <input
                                        type="text" required
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                        value={formData.surname} onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t('emailAddress')}</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="email" required
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t('createPassword')}</label>
                                <input
                                    type="password" required
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                    value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t('selectRole')}</label>
                                <select
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold appearance-none bg-slate-50"
                                    value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="CUSTOMER">{t('customer')}</option>
                                    <option value="ADMIN">{t('administrator')}</option>
                                </select>
                            </div>

                            <div className="pt-4 flex gap-3">
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
                                    ) : t('addNewAccount')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUserList;
