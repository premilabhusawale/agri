import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../States/Auth/Action';
import { useTranslation } from 'react-i18next';

/* ─── Inline Toast ───────────────────────────────────────── */
const TOAST_COLORS = {
  success: { bg: '#f0fdf4', border: '#86efac', text: '#15803d', bar: '#16a34a', icon: '✅' },
  error: { bg: '#fef2f2', border: '#fecaca', text: '#dc2626', bar: '#ef4444', icon: '❌' },
  info: { bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8', bar: '#3b82f6', icon: 'ℹ️' },
  warning: { bg: '#fffbeb', border: '#fde68a', text: '#d97706', bar: '#f59e0b', icon: '⚠️' },
};
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  }, []);
  const toast = {
    success: (m) => show(m, 'success'),
    error: (m) => show(m, 'error'),
    info: (m) => show(m, 'info'),
    warning: (m) => show(m, 'warning'),
  };
  const ToastContainer = () => (
    <div style={{ position: 'fixed', top: '1.25rem', right: '1.25rem', zIndex: 99999, display: 'flex', flexDirection: 'column', gap: '0.6rem', pointerEvents: 'none' }}>
      {toasts.map(t => {
        const c = TOAST_COLORS[t.type];
        return (
          <div key={t.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderLeft: `4px solid ${c.bar}`, borderRadius: '0.875rem', padding: '0.85rem 1.1rem', minWidth: '280px', maxWidth: '340px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: '0.6rem', pointerEvents: 'all', animation: 'toastIn 0.25s ease', fontFamily: "'Segoe UI',sans-serif" }}>
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>{c.icon}</span>
            <span style={{ fontSize: '0.875rem', color: c.text, fontWeight: 600, flex: 1, lineHeight: 1.4 }}>{t.message}</span>
          </div>
        );
      })}
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </div>
  );
  return { toast, ToastContainer };
};

/* ─── Styles ─────────────────────────────────────────────── */
const S = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(145deg, #f0fdf4 0%, #dcfce7 60%, #bbf7d0 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },
  card: {
    background: '#ffffff',
    borderRadius: '1.75rem',
    boxShadow: '0 25px 70px rgba(0,0,0,0.13)',
    width: '100%',
    maxWidth: '460px',
    padding: '2.5rem',
    boxSizing: 'border-box',
  },
  logo: { textAlign: 'center', marginBottom: '1.75rem' },
  logoText: { fontSize: '2.2rem', fontWeight: '900', letterSpacing: '-1px', lineHeight: 1, marginBottom: '0.35rem', display: 'block' },
  logoGreen: { color: '#15803d' },
  logoOrange: { color: '#ea580c' },
  logoSub: { color: '#6b7280', fontSize: '0.9rem', fontFamily: "'Segoe UI', sans-serif" },
  roleHeading: { textAlign: 'center', fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.4rem', fontFamily: "'Segoe UI', sans-serif" },
  roleSubheading: { textAlign: 'center', color: '#9ca3af', fontSize: '0.85rem', marginBottom: '1.5rem', fontFamily: "'Segoe UI', sans-serif" },
  roleGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' },
  roleCard: (selected, accent) => ({
    border: `2.5px solid ${selected ? accent : '#e5e7eb'}`,
    borderRadius: '1.1rem',
    padding: '1.4rem 1rem',
    background: selected ? `${accent}12` : '#fafafa',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    boxShadow: selected ? `0 0 0 4px ${accent}25` : 'none',
    outline: 'none',
    userSelect: 'none',
    width: '100%',
  }),
  roleEmoji: { fontSize: '2.4rem', display: 'block', marginBottom: '0.5rem', lineHeight: 1 },
  roleLabel: (accent) => ({ fontWeight: '800', fontSize: '1rem', color: accent, fontFamily: "'Segoe UI', sans-serif", display: 'block' }),
  roleDesc: { fontSize: '0.72rem', color: '#9ca3af', marginTop: '0.25rem', fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.3 },
  continueBtn: (disabled) => ({
    width: '100%',
    padding: '0.8rem',
    background: disabled ? '#d1fae5' : 'linear-gradient(135deg, #16a34a, #15803d)',
    color: disabled ? '#86efac' : '#fff',
    border: 'none',
    borderRadius: '0.85rem',
    fontSize: '0.95rem',
    fontWeight: '700',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: "'Segoe UI', sans-serif",
    letterSpacing: '0.03em',
    transition: 'all 0.2s',
  }),
  roleBackBtn: { width: '100%', padding: '0.55rem', background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.85rem', cursor: 'pointer', marginTop: '0.5rem', fontFamily: "'Segoe UI', sans-serif" },
  form: { display: 'flex', flexDirection: 'column', gap: '0.9rem' },
  roleBadgeWrap: { display: 'flex', alignItems: 'center', marginBottom: '0.75rem', gap: '0.5rem' },
  roleBadge: (accent) => ({ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: `${accent}15`, color: accent, borderRadius: '2rem', padding: '0.3rem 0.85rem', fontSize: '0.8rem', fontWeight: '700', fontFamily: "'Segoe UI', sans-serif" }),
  changeBtn: { background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.78rem', cursor: 'pointer', fontFamily: "'Segoe UI', sans-serif", textDecoration: 'underline' },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.3rem' },
  label: { fontSize: '0.82rem', fontWeight: '600', color: '#374151', fontFamily: "'Segoe UI', sans-serif" },
  input: { width: '100%', padding: '0.6rem 0.85rem', border: '1.5px solid #e5e7eb', borderRadius: '0.65rem', fontSize: '0.9rem', color: '#111827', background: '#fafafa', outline: 'none', boxSizing: 'border-box', fontFamily: "'Segoe UI', sans-serif", transition: 'border-color 0.2s, box-shadow 0.2s' },
  select: { width: '100%', padding: '0.6rem 0.85rem', border: '1.5px solid #e5e7eb', borderRadius: '0.65rem', fontSize: '0.9rem', color: '#111827', background: '#fafafa', outline: 'none', boxSizing: 'border-box', fontFamily: "'Segoe UI', sans-serif", cursor: 'pointer' },
  photoHint: { fontSize: '0.72rem', color: '#16a34a', marginTop: '0.25rem', fontFamily: "'Segoe UI', sans-serif" },
  errorBox: { background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.65rem', padding: '0.75rem 1rem', color: '#dc2626', fontSize: '0.84rem', fontFamily: "'Segoe UI', sans-serif", marginBottom: '1rem' },
  infoBox: { background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.65rem', padding: '0.6rem 1rem', color: '#15803d', fontSize: '0.82rem', fontFamily: "'Segoe UI', sans-serif", marginBottom: '0.5rem' },
  submitBtn: (loading) => ({
    width: '100%', padding: '0.8rem',
    background: loading ? '#86efac' : 'linear-gradient(135deg, #16a34a, #15803d)',
    color: '#fff', border: 'none', borderRadius: '0.85rem', fontSize: '0.95rem', fontWeight: '700',
    cursor: loading ? 'not-allowed' : 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
    fontFamily: "'Segoe UI', sans-serif", letterSpacing: '0.03em', marginTop: '0.25rem', transition: 'opacity 0.2s',
  }),
  divider: { border: 'none', borderTop: '1px solid #f3f4f6', margin: '1rem 0 0' },
  footer: { textAlign: 'center', marginTop: '1rem' },
  footerBtn: { background: 'none', border: 'none', color: '#16a34a', fontWeight: '600', fontSize: '0.875rem', cursor: 'pointer', fontFamily: "'Segoe UI', sans-serif" },
  forgotBtn: { background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.82rem', cursor: 'pointer', marginTop: '0.75rem', display: 'block', width: '100%', textAlign: 'center', fontFamily: "'Segoe UI', sans-serif" },
};

/* ─── Auth Component ─────────────────────────────────────── */
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const authState = useSelector((s) => s.auth ?? s.Auth ?? {});
  const { loading = false, error: reduxError = null, user = null } = authState;

  const { toast, ToastContainer } = useToast();

  const [step, setStep] = useState('form');
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState(null);
  const [error, setError] = useState('');
  const [photo, setPhoto] = useState(null);

  const [formData, setFormData] = useState({
    name: '', surname: '', mobile: '',
    email: '', password: '', language: 'en',
  });

  useEffect(() => {
    if (reduxError) setError(reduxError);
  }, [reduxError]);

  // ── Navigate after successful login/register ──
  useEffect(() => {
    if (!user) return;

    // ✅ Get role and normalize to uppercase for comparison
    const userRole = (user.role || user?.user?.role || user?.data?.role || '').toUpperCase();
    const userName = user.name || user?.user?.name || user?.data?.name || 'there';

    console.log('Navigating for role:', userRole);

    if (userRole === 'ADMIN') {
      toast.success(t('welcomeUser', { name: userName }) + ' ' + t('redirectingToDashboard'));
      navigate('/admin', { replace: true });
    } else if (userRole === 'FARMER') {
      toast.success(t('welcomeUser', { name: userName }) + ' 🌾');
      navigate('/', { replace: true });
    } else if (userRole === 'CUSTOMER') {
      toast.success(t('welcomeUser', { name: userName }) + ' 🛒');
      navigate('/', { replace: true });
    } else {
      toast.success(t('welcomeUser', { name: userName }));
      navigate('/', { replace: true });
    }
  }, [user]);

  const onFocus = (e) => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.15)'; };
  const onBlur = (e) => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handlePhotoChange = (e) => {
    if (e.target.files?.[0]) setPhoto(e.target.files[0]);
  };

  const goToSignup = () => {
    setIsLogin(false); setStep('role'); setRole(null); setError(''); setPhoto(null);
    setFormData({ name: '', surname: '', mobile: '', email: '', password: '', language: 'en' });
  };

  const goToLogin = () => {
    setIsLogin(true); setStep('form'); setRole(null); setError(''); setPhoto(null);
    setFormData({ name: '', surname: '', mobile: '', email: '', password: '', language: 'en' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin) {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('surname', formData.surname);
      data.append('email', formData.email);
      data.append('mobile', formData.mobile);
      data.append('password', formData.password);
      data.append('language', formData.language);
      data.append('role', role);
      if (photo) data.append('photo', photo);
      await dispatch(registerUser(data));
    } else {
      await dispatch(loginUser({
        email: formData.email,
        password: formData.password,
      }));
    }
  };

  const roleAccent = role === 'farmer' ? '#15803d' : '#ea580c';

  /* ── Screen 1: Role Picker ───────────────────────────────── */
  if (!isLogin && step === 'role') {
    return (
      <div style={S.page}>
        <ToastContainer />
        <div style={S.card}>
          <div style={S.logo}>
            <span style={S.logoText}>
              <span style={S.logoGreen}>Agri</span><span style={S.logoOrange}>Connect</span>
            </span>
            <span style={S.logoSub}>{t('createAccount')}</span>
          </div>

          <p style={S.roleHeading}>{t('whoAreYou')}</p>
          <p style={S.roleSubheading}>{t('pickRole')}</p>

          <div style={S.roleGrid}>
            <button style={S.roleCard(role === 'farmer', '#15803d')} onClick={() => setRole('farmer')}
              onMouseEnter={e => { if (role !== 'farmer') e.currentTarget.style.borderColor = '#15803d'; }}
              onMouseLeave={e => { if (role !== 'farmer') e.currentTarget.style.borderColor = '#e5e7eb'; }}>
              <span style={S.roleEmoji}>🌾</span>
              <span style={S.roleLabel('#15803d')}>{t('farmer')}</span>
              <span style={S.roleDesc}>{t('farmerDesc')}</span>
            </button>
            <button style={S.roleCard(role === 'customer', '#ea580c')} onClick={() => setRole('customer')}
              onMouseEnter={e => { if (role !== 'customer') e.currentTarget.style.borderColor = '#ea580c'; }}
              onMouseLeave={e => { if (role !== 'customer') e.currentTarget.style.borderColor = '#e5e7eb'; }}>
              <span style={S.roleEmoji}>🛒</span>
              <span style={S.roleLabel('#ea580c')}>{t('customer')}</span>
              <span style={S.roleDesc}>{t('customerDesc')}</span>
            </button>
          </div>

          <button style={S.continueBtn(!role)} disabled={!role} onClick={() => role && setStep('form')}>
            {role ? t('continueAs', { role: role.charAt(0).toUpperCase() + role.slice(1) }) : t('selectRoleToContinue')}
          </button>
          <button style={S.roleBackBtn} onClick={goToLogin}>← {t('alreadyHaveAccount')}</button>
        </div>
      </div>
    );
  }

  /* ── Screen 2: Login / Signup Form ──────────────────────── */
  return (
    <div style={S.page}>
      <ToastContainer />
      <div style={S.card}>

        <div style={S.logo}>
          <span style={S.logoText}>
            <span style={S.logoGreen}>Agri</span><span style={S.logoOrange}>Connect</span>
          </span>
          <span style={S.logoSub}>{isLogin ? t('welcomeBack') : t('joinCommunity')}</span>
        </div>

        {!isLogin && role && (
          <div style={S.roleBadgeWrap}>
            <span style={S.roleBadge(roleAccent)}>
              {role === 'farmer' ? '🌾' : '🛒'}&nbsp;{role === 'farmer' ? t('farmer') : t('customer')}
            </span>
            <button style={S.changeBtn} onClick={() => setStep('role')}>{t('change')}</button>
          </div>
        )}

        {loading && <div style={S.infoBox}>⏳ {isLogin ? t('loggingIn') : t('creatingAccount')}</div>}
        {error && <div style={S.errorBox}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit} style={S.form} noValidate>
          {!isLogin && (
            <>
              <div style={S.twoCol}>
                <div style={S.field}>
                  <label style={S.label}>{t('firstNameLabel')}</label>
                  <input style={S.input} type="text" name="name" value={formData.name}
                    onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required placeholder={t('firstName')} />
                </div>
                <div style={S.field}>
                  <label style={S.label}>{t('surnameLabel')}</label>
                  <input style={S.input} type="text" name="surname" value={formData.surname}
                    onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required placeholder={t('lastName')} />
                </div>
              </div>
              <div style={S.field}>
                <label style={S.label}>{t('mobileLabel')}</label>
                <input style={S.input} type="tel" name="mobile" value={formData.mobile}
                  onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required placeholder={t('mobilePlaceholder')} />
              </div>
              <div style={S.field}>
                <label style={S.label}>{t('photoLabel')}</label>
                <input style={S.input} type="file" accept="image/*" onChange={handlePhotoChange} />
                {photo && <p style={S.photoHint}>✓ {photo.name}</p>}
              </div>
              <div style={S.field}>
                <label style={S.label}>{t('languageLabel')}</label>
                <select style={S.select} name="language" value={formData.language}
                  onChange={handleChange} onFocus={onFocus} onBlur={onBlur}>
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="mr">Marathi</option>
                </select>
              </div>
            </>
          )}

          <div style={S.field}>
            <label style={S.label}>{t('emailLabel')}</label>
            <input style={S.input} type="email" name="email" value={formData.email}
              onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required placeholder={t('email')} />
          </div>
          <div style={S.field}>
            <label style={S.label}>{t('passwordLabel')}</label>
            <input style={S.input} type="password" name="password" value={formData.password}
              onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required minLength={6} placeholder={t('password')} />
          </div>

          <button type="submit" style={S.submitBtn(loading)} disabled={loading}>
            {loading ? (
              <>
                <svg style={{ animation: 'spin 1s linear infinite', height: '1.1rem', width: '1.1rem' }}
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" opacity="0.25" />
                  <path fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {isLogin ? t('loggingIn') : t('creatingAccount')}
              </>
            ) : (
              isLogin ? t('login') : t('createAccount')
            )}
          </button>
        </form>

        <hr style={S.divider} />

        <div style={S.footer}>
          {isLogin
            ? <button style={S.footerBtn} onClick={goToSignup}>{t('signUpBtn')}</button>
            : <button style={S.footerBtn} onClick={goToLogin}>{isLogin ? t('signUpBtn') : t('alreadyHaveAccount').split('? ')[1] || t('login')}</button>
          }
        </div>

        {isLogin && (
          <button style={S.forgotBtn} onClick={() => navigate('/ForgotPassword')}>
            {t('forgotPasswordBtn')}
          </button>
        )}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Auth;