import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── Inline Toast ───────────────────────────────────────── */
const TOAST_COLORS = {
  success: { bg:'#f0fdf4', border:'#86efac', text:'#15803d', bar:'#16a34a', icon:'✅' },
  error:   { bg:'#fef2f2', border:'#fecaca', text:'#dc2626', bar:'#ef4444', icon:'❌' },
  info:    { bg:'#eff6ff', border:'#bfdbfe', text:'#1d4ed8', bar:'#3b82f6', icon:'ℹ️' },
  warning: { bg:'#fffbeb', border:'#fde68a', text:'#d97706', bar:'#f59e0b', icon:'⚠️' },
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
    error:   (m) => show(m, 'error'),
    info:    (m) => show(m, 'info'),
    warning: (m) => show(m, 'warning'),
  };
  const ToastContainer = () => (
    <div style={{ position:'fixed', top:'1.25rem', right:'1.25rem', zIndex:99999, display:'flex', flexDirection:'column', gap:'0.6rem', pointerEvents:'none' }}>
      {toasts.map(t => {
        const c = TOAST_COLORS[t.type];
        return (
          <div key={t.id} style={{ background:c.bg, border:`1px solid ${c.border}`, borderLeft:`4px solid ${c.bar}`, borderRadius:'0.875rem', padding:'0.85rem 1.1rem', minWidth:'280px', maxWidth:'340px', boxShadow:'0 8px 30px rgba(0,0,0,0.12)', display:'flex', alignItems:'center', gap:'0.6rem', pointerEvents:'all', animation:'toastIn 0.25s ease', fontFamily:"'Segoe UI',sans-serif" }}>
            <span style={{ fontSize:'1rem', flexShrink:0 }}>{c.icon}</span>
            <span style={{ fontSize:'0.875rem', color:c.text, fontWeight:600, flex:1, lineHeight:1.4 }}>{t.message}</span>
          </div>
        );
      })}
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </div>
  );
  return { toast, ToastContainer };
};

/* ─── Fake user "database" ───────────────────────────────── */
const FAKE_USERS = [
  { _id:'user_001', name:'Ravi',   surname:'Patil',   email:'ravi@test.com',   password:'123456', mobile:'9876543210', role:'farmer',   language:'mr' },
  { _id:'user_002', name:'Sunita', surname:'Sharma',  email:'sunita@test.com', password:'123456', mobile:'9123456780', role:'customer',  language:'hi' },
  { _id:'user_003', name:'Demo',   surname:'User',    email:'demo@test.com',   password:'demo123',mobile:'9000000000', role:'farmer',   language:'en' },
];

const fakeLogin = (email, password) => {
  const user = FAKE_USERS.find(u => u.email === email && u.password === password);
  if (!user) return null;
  const { password: _, ...safeUser } = user;
  return { jwt: `fake-jwt-${user._id}-${Date.now()}`, user: safeUser };
};

const fakeSignup = (formData, role, photo) => {
  // Check if email already exists
  const exists = FAKE_USERS.find(u => u.email === formData.email);
  if (exists) return { error: 'Email already registered. Please login.' };

  const newUser = {
    _id:      `user_${Date.now()}`,
    name:     formData.name,
    surname:  formData.surname,
    email:    formData.email,
    mobile:   formData.mobile,
    language: formData.language,
    role,
    photo:    photo ? photo.name : null,
  };
  // Push to fake DB so they can login again in the same session
  FAKE_USERS.push({ ...newUser, password: formData.password });
  return { jwt: `fake-jwt-${newUser._id}-${Date.now()}`, user: newUser };
};

/* ─── Styles (unchanged) ─────────────────────────────────── */
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
  logoGreen:  { color: '#15803d' },
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
  demoBox: { background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.65rem', padding: '0.6rem 1rem', color: '#92400e', fontSize: '0.78rem', fontFamily: "'Segoe UI', sans-serif", marginBottom: '0.5rem', lineHeight: 1.6 },
};

/* ─── Auth Component ─────────────────────────────────────── */
const Auth = () => {
  const navigate = useNavigate();
  const { toast, ToastContainer } = useToast();

  const [step,       setStep]       = useState('form');
  const [isLogin,    setIsLogin]    = useState(true);
  const [role,       setRole]       = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error,      setError]      = useState('');
  const [photo,      setPhoto]      = useState(null);

  const [formData, setFormData] = useState({
    name: '', surname: '', mobile: '',
    email: '', password: '', language: 'en',
  });

  const onFocus = (e) => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.15)'; };
  const onBlur  = (e) => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; };

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

  /* ── Submit ─────────────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate network delay
    await new Promise(res => setTimeout(res, 800));

    try {
      if (isLogin) {
        setLoadingMsg('Logging in...');

        const result = fakeLogin(formData.email, formData.password);
        if (!result) {
          setError('Invalid email or password. Try demo@test.com / demo123');
          return;
        }

        localStorage.setItem('jwt',  result.jwt);
        localStorage.setItem('user', JSON.stringify(result.user));
        toast.success('Login successful! Welcome back 👋');
        navigate('/');
        window.location.reload();

      } else {
        setLoadingMsg('Creating your account...');

        const result = fakeSignup(formData, role, photo);
        if (result.error) {
          setError(result.error);
          return;
        }

        await new Promise(res => setTimeout(res, 400)); // simulate role-set step
        setLoadingMsg(`Setting role as ${role}...`);

        localStorage.setItem('jwt',  result.jwt);
        localStorage.setItem('user', JSON.stringify(result.user));
        toast.success('Account created! Welcome to AgriConnect 🌾');
        navigate('/');
        window.location.reload();
      }

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMsg('');
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
            <span style={S.logoSub}>Create your account</span>
          </div>

          <p style={S.roleHeading}>Who are you?</p>
          <p style={S.roleSubheading}>Pick a role to get started</p>

          <div style={S.roleGrid}>
            <button style={S.roleCard(role === 'farmer', '#15803d')} onClick={() => setRole('farmer')}
              onMouseEnter={e => { if (role !== 'farmer') e.currentTarget.style.borderColor = '#15803d'; }}
              onMouseLeave={e => { if (role !== 'farmer') e.currentTarget.style.borderColor = '#e5e7eb'; }}>
              <span style={S.roleEmoji}>🌾</span>
              <span style={S.roleLabel('#15803d')}>Farmer</span>
              <span style={S.roleDesc}>I grow &amp; sell fresh produce</span>
            </button>
            <button style={S.roleCard(role === 'customer', '#ea580c')} onClick={() => setRole('customer')}
              onMouseEnter={e => { if (role !== 'customer') e.currentTarget.style.borderColor = '#ea580c'; }}
              onMouseLeave={e => { if (role !== 'customer') e.currentTarget.style.borderColor = '#e5e7eb'; }}>
              <span style={S.roleEmoji}>🛒</span>
              <span style={S.roleLabel('#ea580c')}>Customer</span>
              <span style={S.roleDesc}>I buy fresh local produce</span>
            </button>
          </div>

          <button style={S.continueBtn(!role)} disabled={!role} onClick={() => role && setStep('form')}>
            {role ? `Continue as ${role.charAt(0).toUpperCase() + role.slice(1)}` : 'Select a role to continue'}
          </button>
          <button style={S.roleBackBtn} onClick={goToLogin}>← Already have an account? Login</button>
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
          <span style={S.logoSub}>{isLogin ? 'Welcome back!' : 'Join our farming community'}</span>
        </div>

        {/* Demo credentials hint */}
        {isLogin && (
          <div style={S.demoBox}>
            🧪 <strong>Demo accounts:</strong><br />
            farmer → <code>ravi@test.com</code> / <code>123456</code><br />
            customer → <code>sunita@test.com</code> / <code>123456</code>
          </div>
        )}

        {!isLogin && role && (
          <div style={S.roleBadgeWrap}>
            <span style={S.roleBadge(roleAccent)}>
              {role === 'farmer' ? '🌾' : '🛒'}&nbsp;{role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
            <button style={S.changeBtn} onClick={() => setStep('role')}>Change</button>
          </div>
        )}

        {loading && loadingMsg && <div style={S.infoBox}>⏳ {loadingMsg}</div>}
        {error && <div style={S.errorBox}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit} style={S.form}>
          {!isLogin && (
            <>
              <div style={S.twoCol}>
                <div style={S.field}>
                  <label style={S.label}>First Name *</label>
                  <input style={S.input} type="text" name="name" value={formData.name}
                    onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required placeholder="First name" />
                </div>
                <div style={S.field}>
                  <label style={S.label}>Surname *</label>
                  <input style={S.input} type="text" name="surname" value={formData.surname}
                    onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required placeholder="Surname" />
                </div>
              </div>
              <div style={S.field}>
                <label style={S.label}>Mobile Number *</label>
                <input style={S.input} type="tel" name="mobile" value={formData.mobile}
                  onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required placeholder="Enter mobile number" />
              </div>
              <div style={S.field}>
                <label style={S.label}>Profile Photo (Optional)</label>
                <input style={S.input} type="file" accept="image/*" onChange={handlePhotoChange} />
                {photo && <p style={S.photoHint}>✓ {photo.name}</p>}
              </div>
              <div style={S.field}>
                <label style={S.label}>Language</label>
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
            <label style={S.label}>Email *</label>
            <input style={S.input} type="email" name="email" value={formData.email}
              onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required placeholder="Enter your email" />
          </div>
          <div style={S.field}>
            <label style={S.label}>Password *</label>
            <input style={S.input} type="password" name="password" value={formData.password}
              onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required minLength={6} placeholder="Enter your password" />
          </div>

          <button type="submit" style={S.submitBtn(loading)} disabled={loading}>
            {loading ? (
              <>
                <svg style={{ animation:'spin 1s linear infinite', height:'1.1rem', width:'1.1rem' }}
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" opacity="0.25" />
                  <path fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {loadingMsg || (isLogin ? 'Logging in...' : 'Creating account...')}
              </>
            ) : (
              isLogin ? 'Login' : 'Create Account'
            )}
          </button>
        </form>

        <hr style={S.divider} />

        <div style={S.footer}>
          {isLogin
            ? <button style={S.footerBtn} onClick={goToSignup}>Don't have an account? Sign Up</button>
            : <button style={S.footerBtn} onClick={goToLogin}>Already have an account? Login</button>
          }
        </div>

        {isLogin && (
          <button style={S.forgotBtn} onClick={() => navigate('/forgot-password')}>
            Forgot Password?
          </button>
        )}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Auth;