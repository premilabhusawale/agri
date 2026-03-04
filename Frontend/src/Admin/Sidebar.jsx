import { useState, useEffect } from 'react';
import {
  Users, Menu, X, LayoutDashboard, LogOut,
  ClipboardList, Carrot, Apple, Milk, ChevronRight, UserRound, Package
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, logoutUser } from '../States/Auth/Action';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function Sidebar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt && !user) dispatch(getUserProfile());
  }, [dispatch, user]);

  const handleLogout = () => {
    toast.success(t('logoutSuccess'), {
      position: 'top-right',
      autoClose: 2000,
      theme: 'dark',
    });
    dispatch(logoutUser());
    navigate('/Auth');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboard'), path: '/admin/dashboard', color: 'from-violet-400 to-purple-400' },
    { icon: Carrot, label: t('crops'), path: '/admin/crop', color: 'from-orange-400 to-amber-400' },
    { icon: ClipboardList, label: t('orders'), path: '/admin/orders', color: 'from-amber-400 to-orange-400' },
    { icon: Users, label: t('users'), path: '/admin/users', color: 'from-emerald-400 to-teal-400' },
    { icon: Package, label: t('allProducts'), path: '/admin/products', color: 'from-blue-400 to-indigo-400' },
  ];

  const isActiveRoute = (path) => location.pathname === path;

  if (loading && !user) {
    return (
      <aside
        style={{ backgroundColor: '#133928' }}
        className="fixed lg:relative top-0 left-0 h-screen w-72 z-40 flex items-center justify-center shadow-2xl border-r border-white/5"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-white/10 border-t-white/60 rounded-full animate-spin" />
          <span className="text-sm text-white/50 font-medium">{t('loadingDashboard')}</span>
        </div>
      </aside>
    );
  }

  if (!user) {
    return (
      <aside
        style={{ backgroundColor: '#133928' }}
        className="fixed lg:relative top-0 left-0 h-screen w-72 z-40 flex items-center justify-center shadow-2xl border-r border-white/5"
      >
        <div className="text-center px-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <X className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-white/50 text-sm mb-4">{t('unableLoadProfile')}</p>
          <button
            onClick={() => navigate('/Auth')}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-semibold transition-all duration-300"
          >
            {t('goToLogin')}
          </button>
        </div>
      </aside>
    );
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        style={{ backgroundColor: '#133928' }}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-2xl shadow-2xl"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
      </button>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{ backgroundColor: '#133928' }}
        className={`
          fixed lg:relative top-0 left-0 h-screen
          z-40 flex flex-col shadow-2xl border-r border-white/5
          transition-all duration-500 ease-out
          ${isOpen ? 'w-72' : 'w-24'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Subtle overlay tint */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-white/10" />

        {/* ── Header ── */}
        <div
          className={`relative flex items-center px-4 py-4 border-b border-white/10 shrink-0 transition-all duration-500 ${isOpen ? 'justify-between' : 'justify-center'
            }`}
        >
          <div className={`flex items-center gap-3.5 overflow-hidden transition-all duration-500 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
            <div className="relative w-11 h-11 bg-white/15 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xl font-extrabold text-white">{t('dashboard')}</p>
              <p className="flex items-center gap-2 text-white/40 text-sm">
                <span className="w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-emerald-400/20" />
                {t('adminRole')}
              </p>
            </div>
          </div>

          {/* Toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-xl transition-all duration-300 ${isOpen
              ? 'bg-white/10 hover:bg-white/20 text-white/70 border border-white/10'
              : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
              }`}
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <Menu size={20} className={`transition-transform duration-500 ${!isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* ── Navigation ── */}
        <nav className="relative flex-1 py-6 px-3 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.path);
            const isHovered = hoveredItem === index;

            return (
              <Link
                key={index}
                to={item.path}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  group relative flex items-center gap-3 px-3.5 py-3 rounded-2xl
                  transition-all duration-300 cursor-pointer overflow-visible
                `}
              >
                {/* Active left indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg shadow-white/20" />
                )}

                {/* Icon box */}
                <div
                  className={`
                    relative shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                    transition-all duration-300
                    ${isActive ? `bg-gradient-to-br ${item.color} shadow-lg` : 'bg-white/10'}
                    ${isHovered && !isActive ? 'scale-110 bg-white/15' : ''}
                  `}
                >
                  <Icon
                    size={20}
                    className={`transition-all duration-300 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
                      }`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`
                    font-semibold text-[15px] whitespace-nowrap transition-all duration-500
                    ${isActive ? 'text-white' : 'text-white/55 group-hover:text-white'}
                    ${isOpen ? 'opacity-100 w-auto translate-x-0' : 'opacity-0 w-0 -translate-x-4 overflow-hidden'}
                  `}
                >
                  {item.label}
                </span>

                {/* Chevron for active */}
                {isActive && isOpen && (
                  <ChevronRight size={16} className="ml-auto text-white/50" />
                )}

                {/* Tooltip (collapsed) */}
                <div
                  className={`
                    absolute left-full top-1/2 -translate-y-1/2 ml-4 px-4 py-2.5
                    text-white text-sm font-semibold rounded-xl shadow-2xl
                    whitespace-nowrap pointer-events-none z-50
                    transition-all duration-300
                    ${!isOpen
                      ? 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 visible'
                      : 'opacity-0 invisible'
                    }
                  `}
                  style={{ backgroundColor: '#0d2a1c', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {item.label}
                  <div
                    className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rotate-45"
                    style={{ backgroundColor: '#0d2a1c', borderLeft: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                  />
                </div>
              </Link>
            );
          })}
        </nav>

        {/* ── User info + Logout ── */}
        <div className="relative p-4 border-t border-white/10 shrink-0">
          {/* User pill */}
          {isOpen && (
            <div className="flex items-center gap-3 px-3 py-2.5 mb-3 rounded-2xl bg-white/8 border border-white/10">
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0 overflow-hidden">
                {user?.photo
                  ? <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                  : <UserRound size={16} className="text-white/70" />
                }
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold truncate leading-tight">{user?.name || 'Admin'}</p>
                <p className="text-white/40 text-xs truncate">{user?.email || 'admin@example.com'}</p>
              </div>
            </div>
          )}

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className={`group relative w-full flex items-center overflow-hidden rounded-2xl transition-all duration-500 ${!isOpen ? 'justify-center' : ''
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 opacity-0 blur-md group-hover:opacity-60 transition duration-500" />
            <div
              className={`relative flex items-center bg-white/8 hover:bg-white/12 border border-white/10 rounded-2xl transition-all duration-500 w-full ${isOpen ? 'px-4 py-2.5 gap-3' : 'w-11 h-11 justify-center'
                }`}
            >
              <LogOut size={18} className="text-white/50 group-hover:text-rose-400 transition-colors duration-300 shrink-0" />
              <span
                className={`font-semibold text-[15px] text-white/60 group-hover:text-white transition-all duration-500 whitespace-nowrap ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0 overflow-hidden'
                  }`}
              >
                {t('logout')}
              </span>
            </div>

            {/* Tooltip when collapsed */}
            {!isOpen && (
              <div
                className="absolute left-14 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap z-50"
                style={{ backgroundColor: '#0d2a1c', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {t('logout')}
              </div>
            )}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
      </aside>
    </>
  );
}