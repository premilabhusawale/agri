import React from 'react';
import {
    Settings as SettingsIcon,
    Bell,
    Shield,
    Globe,
    Database,
    Cpu,
    Zap,
    ChevronRight,
    Eye,
    Lock,
    Cloud,
    Moon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdminSettings = () => {
    const { t } = useTranslation();
    const settingsSections = [
        {
            title: t('globalConfiguration'),
            icon: Cpu,
            color: 'bg-emerald-500',
            items: [
                { label: t('platformLanguage'), value: 'English (US)', icon: Globe },
                { label: t('systemTheme'), value: 'Dark Mode (Auto)', icon: Moon },
                { label: t('regionalMarket'), value: 'Global (Multi-currency)', icon: Globe }
            ]
        },
        {
            title: t('securityAuth'),
            icon: Shield,
            color: 'bg-blue-500',
            items: [
                { label: t('twoFactorAuth'), value: 'Active', icon: Lock },
                { label: t('sessionTimeout'), value: '45 Minutes', icon: Zap },
                { label: t('ipWhitelisting'), value: 'Disabled', icon: Shield }
            ]
        },
        {
            title: t('notifications'),
            icon: Bell,
            color: 'bg-violet-500',
            items: [
                { label: t('orderAlerts'), value: 'Email + Push', icon: Bell },
                { label: t('systemLogs'), value: 'Critical Only', icon: Eye },
                { label: t('supportInquiries'), value: 'Real-time', icon: Zap }
            ]
        }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">{t('coreInfrastructure')}</h1>
                    <p className="text-slate-500 font-medium">{t('infrastructureDesc')}</p>
                </div>
                <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl">
                    <button className="px-4 py-2 bg-white shadow-sm rounded-xl text-xs font-bold text-slate-800">{t('operational')}</button>
                    <button className="px-4 py-2 text-xs font-bold text-slate-400">{t('experimental')}</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {settingsSections.map((section, idx) => (
                    <div key={idx} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl ${section.color} text-white flex items-center justify-center shadow-lg ${section.color.replace('bg-', 'shadow-')}/20`}>
                                    <section.icon size={24} />
                                </div>
                                <h2 className="text-xl font-black text-slate-800">{section.title}</h2>
                            </div>
                            <button className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest hover:bg-emerald-100 transition-all">
                                {t('update')}
                            </button>
                        </div>

                        <div className="p-2">
                            {section.items.map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-6 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-white group-hover:text-slate-600 group-hover:shadow-sm transition-all">
                                            <item.icon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-800">{item.label}</p>
                                            <p className="text-xs text-slate-400 font-medium">{item.value}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Database Stats Card */}
                <div className="bg-linear-to-br from-slate-900 via-slate-800 to-black rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700" />
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                                <Database size={28} className="text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black">{t('clusterHealth')}</h3>
                                <p className="text-emerald-400/70 text-[10px] font-black uppercase tracking-widest">Region: ap-south-1</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-10">
                            <div>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{t('storageUsage')}</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-black">42.8</span>
                                    <span className="text-sm font-bold text-slate-500 mb-1.5">GB / 100 GB</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                                    <div className="w-[42%] h-full bg-emerald-500" />
                                </div>
                            </div>
                            <div>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{t('latency')}</p>
                                <div className="flex items-end gap-1.5">
                                    <span className="text-3xl font-black text-emerald-400">14</span>
                                    <span className="text-sm font-bold text-slate-500 mb-1.5">ms</span>
                                </div>
                                <p className="text-[10px] font-bold text-emerald-400/60 mt-2 flex items-center gap-1">
                                    <Zap size={10} /> {t('optimized')}
                                </p>
                            </div>
                        </div>

                        <div className="mt-auto flex items-center gap-4">
                            <button className="flex-1 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors">
                                {t('backups')}
                            </button>
                            <button className="flex-1 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/15 transition-colors">
                                {t('maintenance')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer System Info */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-10 opacity-40">
                <div className="flex items-center gap-2 text-xs font-bold">
                    <Cloud size={14} />
                    AgriConnect v2.4.8-stable
                </div>
                <div className="flex items-center gap-2 text-xs font-bold">
                    <Cpu size={14} />
                    Node Engine 20.x
                </div>
                <div className="flex items-center gap-2 text-xs font-bold">
                    <Shield size={14} />
                    SSL Encrypted (TLS 1.3)
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
