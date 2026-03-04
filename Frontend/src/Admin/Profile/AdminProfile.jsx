import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Camera,
    Save,
    Shield,
    Calendar,
    Key,
    LogOut,
    ChevronRight,
    Loader2,
    CheckCircle2
} from 'lucide-react';
import { updateUserProfile } from '../../States/Auth/Action';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const AdminProfile = () => {
    const { t } = useTranslation();
    const { user, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        surname: user?.surname || '',
        email: user?.email || '',
        mobile: user?.mobile || '',
        photo: user?.photo || null
    });

    const [isEditing, setIsEditing] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(user?.photo || null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, photo: file });
            const reader = new FileReader();
            reader.onloadend = () => setPhotoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('surname', formData.surname);
        data.append('mobile', formData.mobile);
        if (formData.photo instanceof File) {
            data.append('photo', formData.photo);
        }

        try {
            await dispatch(updateUserProfile(data));
            setIsEditing(false);
            toast.success(t('profileUpdated'));
        } catch (err) {
            toast.error(t('profileUpdateError'));
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-[2.5rem] bg-linear-to-br from-emerald-400 to-teal-600 p-1 shadow-2xl shadow-emerald-500/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                            <div className="w-full h-full rounded-[2.2rem] bg-white overflow-hidden relative">
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                                        <User size={48} />
                                    </div>
                                )}
                                {isEditing && (
                                    <button
                                        onClick={() => fileInputRef.current.click()}
                                        className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Camera size={24} />
                                    </button>
                                )}
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                                {user?.name} {user?.surname}
                            </h1>
                            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                <Shield size={12} strokeWidth={3} />
                                {t('adminRole')}
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm font-medium">
                            <div className="flex items-center gap-1.5"><Mail size={14} /> {user?.email}</div>
                            <div className="flex items-center gap-1.5"><Phone size={14} /> {user?.mobile || t('noResults')}</div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-6 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${isEditing
                        ? 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-500/20'
                        }`}
                >
                    {isEditing ? t('cancelEdit') : t('editProfile')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                                <User size={20} />
                            </div>
                            {t('personalIntelligence')}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t('firstName')}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-700 disabled:opacity-60"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t('lastName')}</label>
                                    <input
                                        type="text"
                                        name="surname"
                                        value={formData.surname}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-700 disabled:opacity-60"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t('emailAddress')}</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-400 cursor-not-allowed"
                                />
                                <p className="text-[10px] text-slate-400 font-medium mt-1 ml-1">{t('emailSecurityNote')}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t('mobileNumber')}</label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">+91</div>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder={t('mobilePlaceholder')}
                                        className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-700 disabled:opacity-60"
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <div className="pt-4 animate-in fade-in slide-in-from-top-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group"
                                    >
                                        {loading ? (
                                            <Loader2 className="animate-spin" size={18} />
                                        ) : (
                                            <>
                                                <Save size={18} />
                                                {t('saveDeployment')}
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="bg-linear-to-br from-slate-800 to-black p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-black mb-1">{t('securityStatus')}</h3>
                                <p className="text-slate-400 text-xs font-medium">{t('twoFactorNote')}</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                                <Key size={24} className="text-emerald-400" />
                            </div>
                        </div>
                        <div className="mt-6 flex items-center gap-3">
                            <button className="px-4 py-2 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors">
                                {t('changePassword')}
                            </button>
                            <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                                <CheckCircle2 size={14} />
                                {t('identityVerified')}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats/Info */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">{t('activityAudit')}</h3>
                        <div className="space-y-6">
                            {[
                                { label: t('totalSalesManaged'), value: '1,284', icon: Calendar, color: 'text-blue-500' },
                                { label: t('systemAccessLevel'), value: `Level 10 (${t('adminRole')})`, icon: Shield, color: 'text-emerald-500' },
                                { label: t('lastLoginLocation'), value: 'Mumbai, IN', icon: MapPin, color: 'text-rose-500' }
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl bg-slate-50 ${stat.color} flex items-center justify-center`}>
                                        <stat.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">{stat.label}</p>
                                        <p className="text-sm font-black text-slate-800">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100 group cursor-pointer hover:bg-rose-100 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-200">
                                <LogOut size={20} />
                            </div>
                            <ChevronRight size={18} className="text-rose-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <h3 className="text-sm font-black text-rose-900 uppercase tracking-widest">{t('terminateSession')}</h3>
                        <p className="text-xs text-rose-600/70 font-medium mt-1">{t('terminateSessionDesc')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
