import { useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'http://localhost:8585/api/v1';

/* ─── Inline Toast ───────────────────────────────────────── */
const TOAST_COLORS = {
  success: { bg:'#f0fdf4', border:'#86efac', text:'#15803d', bar:'#16a34a', icon:'✅' },
  error:   { bg:'#fef2f2', border:'#fecaca', text:'#dc2626', bar:'#ef4444', icon:'❌' },
  info:    { bg:'#eff6ff', border:'#bfdbfe', text:'#1d4ed8', bar:'#3b82f6', icon:'ℹ️' },
};
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  }, []);
  const toast = {
    success: (m) => show(m, 'success'),
    error:   (m) => show(m, 'error'),
    info:    (m) => show(m, 'info'),
  };
  const ToastContainer = () => (
    <div style={{ position:'fixed', top:'1.25rem', right:'1.25rem', zIndex:99999, display:'flex', flexDirection:'column', gap:'0.6rem', pointerEvents:'none' }}>
      {toasts.map(t => {
        const c = TOAST_COLORS[t.type];
        return (
          <div key={t.id} style={{ background:c.bg, border:`1px solid ${c.border}`, borderLeft:`4px solid ${c.bar}`, borderRadius:'0.875rem', padding:'0.85rem 1.1rem', minWidth:'280px', maxWidth:'340px', boxShadow:'0 8px 30px rgba(0,0,0,0.12)', display:'flex', alignItems:'center', gap:'0.6rem', animation:'toastIn 0.25s ease', fontFamily:"'Segoe UI',sans-serif" }}>
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

/* ─── Styles ─────────────────────────────────────────────── */
const S = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(145deg, #f0fdf4 0%, #dcfce7 60%, #bbf7d0 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '1.5rem',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  card: {
    background: '#fff', borderRadius: '1.75rem',
    boxShadow: '0 25px 70px rgba(0,0,0,0.13)',
    width: '100%', maxWidth: '440px',
    padding: '2.5rem', boxSizing: 'border-box',
  },
  logo: { textAlign: 'center', marginBottom: '1.75rem' },
  logoText: { fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1, display: 'block', marginBottom: '0.35rem' },
  logoGreen:  { color: '#15803d' },
  logoOrange: { color: '#ea580c' },
  logoSub: { color: '#6b7280', fontSize: '0.88rem' },

  stepIcon: {
    width: '56px', height: '56px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
    border: '2px solid #86efac',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 1rem', fontSize: '1.5rem',
  },
  title: { textAlign: 'center', fontWeight: 800, fontSize: '1.2rem', color: '#111827', marginBottom: '0.4rem' },
  desc:  { textAlign: 'center', color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.6 },

  field: { display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '0.9rem' },
  label: { fontSize: '0.8rem', fontWeight: 600, color: '#374151' },
  input: {
    width: '100%', padding: '0.65rem 0.9rem',
    border: '1.5px solid #e5e7eb', borderRadius: '0.65rem',
    fontSize: '0.9rem', color: '#111827', background: '#fafafa',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  btn: (loading) => ({
    width: '100%', padding: '0.75rem',
    background: loading ? '#86efac' : 'linear-gradient(135deg, #16a34a, #15803d)',
    color: '#fff', border: 'none', borderRadius: '0.85rem',
    fontSize: '0.95rem', fontWeight: 700,
    cursor: loading ? 'not-allowed' : 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
    marginTop: '0.25rem', transition: 'opacity 0.2s',
    fontFamily: "'Segoe UI', sans-serif",
  }),
  backBtn: {
    width: '100%', background: 'none', border: 'none',
    color: '#9ca3af', fontSize: '0.85rem', cursor: 'pointer',
    marginTop: '1rem', textAlign: 'center',
    fontFamily: "'Segoe UI', sans-serif",
  },
  successBox: {
    textAlign: 'center', padding: '1.5rem',
    background: '#f0fdf4', borderRadius: '1rem',
    border: '1px solid #86efac',
  },
  successIcon: { fontSize: '3rem', display: 'block', marginBottom: '0.75rem' },
  successTitle: { fontWeight: 800, color: '#15803d', fontSize: '1.1rem', marginBottom: '0.4rem' },
  successDesc: { color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.6 },

  // password strength bar
  strengthWrap: { marginTop: '0.4rem' },
  strengthBar: (pct, color) => ({
    height: '4px', borderRadius: '2px',
    background: '#e5e7eb', overflow: 'hidden', marginBottom: '0.25rem',
  }),
  strengthFill: (pct, color) => ({
    height: '100%', width: `${pct}%`,
    background: color, borderRadius: '2px',
    transition: 'width 0.3s, background 0.3s',
  }),
  strengthLabel: (color) => ({
    fontSize: '0.7rem', color, fontWeight: 600,
  }),
};

/* ─── Password strength checker ─────────────────────────── */
const getStrength = (pwd) => {
  if (!pwd) return { pct: 0, color: '#e5e7eb', label: '' };
  let score = 0;
  if (pwd.length >= 8)          score++;
  if (/[A-Z]/.test(pwd))        score++;
  if (/[0-9]/.test(pwd))        score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const map = [
    { pct: 0,   color: '#e5e7eb', label: '' },
    { pct: 25,  color: '#ef4444', label: 'Weak' },
    { pct: 50,  color: '#f59e0b', label: 'Fair' },
    { pct: 75,  color: '#3b82f6', label: 'Good' },
    { pct: 100, color: '#16a34a', label: 'Strong' },
  ];
  return map[score];
};

/* ══════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════ */
const ForgotPassword = () => {
  const navigate       = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast, ToastContainer } = useToast();

  // If URL has ?token=xxx we're on reset step, otherwise forgot step
  const tokenFromUrl = searchParams.get('token');

  // ── Step: 'forgot' | 'sent' | 'reset' | 'done' ──
  const [step,     setStep]     = useState(tokenFromUrl ? 'reset' : 'forgot');
  const [email,    setEmail]    = useState('');
  const [token,    setToken]    = useState(tokenFromUrl || '');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [loading,  setLoading]  = useState(false);
  const [showPwd,  setShowPwd]  = useState(false);

  const strength = getStrength(password);

  const onFocus = e => { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.15)'; };
  const onBlur  = e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; };

  /* ── Step 1: Send reset email ── */
  const handleForgot = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/auth/forgot-password`, { email });
      setStep('sent');
      toast.success('Reset link sent to your email!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Email not found. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Step 2: Reset with token ── */
  const handleReset = async (e) => {
    e.preventDefault();
    if (!password)               return toast.error('Please enter a new password');
    if (password.length < 6)     return toast.error('Password must be at least 6 characters');
    if (password !== confirm)    return toast.error('Passwords do not match');
    if (strength.pct < 50)       return toast.error('Please use a stronger password');

    setLoading(true);
    try {
      await axios.post(`${API_BASE}/auth/reset-password`, { token, password });
      setStep('done');
      toast.success('Password reset successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset link expired. Please request a new one.');
    } finally {
      setLoading(false);
    }
  };

  /* ══════════════════════════════
     RENDER
  ══════════════════════════════ */
  return (
    <div style={S.page}>
      <ToastContainer />
      <div style={S.card}>

        {/* Logo */}
        <div style={S.logo}>
          <span style={S.logoText}>
            <span style={S.logoGreen}>Agri</span>
            <span style={S.logoOrange}>Connect</span>
          </span>
          <span style={S.logoSub}>Account Recovery</span>
        </div>

        {/* ── STEP: forgot ── */}
        {step === 'forgot' && (
          <>
            <div style={S.stepIcon}>🔑</div>
            <p style={S.title}>Forgot your password?</p>
            <p style={S.desc}>
              Enter the email address linked to your account and we'll send you a reset link.
            </p>
            <form onSubmit={handleForgot}>
              <div style={S.field}>
                <label style={S.label}>Email Address</label>
                <input
                  style={S.input}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={onFocus} onBlur={onBlur}
                  required
                />
              </div>
              <button type="submit" style={S.btn(loading)} disabled={loading}>
                {loading ? (
                  <>
                    <svg style={{ animation:'spin 0.8s linear infinite', width:'1rem', height:'1rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" opacity="0.25"/>
                      <path fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Sending...
                  </>
                ) : '📧 Send Reset Link'}
              </button>
            </form>
            <button style={S.backBtn} onClick={() => navigate('/auth')}>
              ← Back to Login
            </button>
          </>
        )}

        {/* ── STEP: sent ── */}
        {step === 'sent' && (
          <>
            <div style={S.successBox}>
              <span style={S.successIcon}>📬</span>
              <p style={S.successTitle}>Check your inbox!</p>
              <p style={S.successDesc}>
                We sent a password reset link to <strong>{email}</strong>.
                <br /><br />
                Check your <strong>inbox and spam folder</strong>. The link expires in <strong>15 minutes</strong>.
              </p>
            </div>
            <button
              style={{ ...S.btn(false), marginTop: '1.25rem' }}
              onClick={() => { setStep('forgot'); setEmail(''); }}
            >
              Try a different email
            </button>
            <button style={S.backBtn} onClick={() => navigate('/auth')}>
              ← Back to Login
            </button>
          </>
        )}

        {/* ── STEP: reset (came from email link with ?token=) ── */}
        {step === 'reset' && (
          <>
            <div style={S.stepIcon}>🔒</div>
            <p style={S.title}>Create new password</p>
            <p style={S.desc}>Choose a strong password you haven't used before.</p>
            <form onSubmit={handleReset}>
              <div style={S.field}>
                <label style={S.label}>New Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    style={S.input}
                    type={showPwd ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={onFocus} onBlur={onBlur}
                    required minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    style={{ position:'absolute', right:'0.75rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:'1rem', color:'#9ca3af' }}
                  >
                    {showPwd ? '🙈' : '👁️'}
                  </button>
                </div>
                {/* Password strength bar */}
                {password && (
                  <div style={S.strengthWrap}>
                    <div style={S.strengthBar()}>
                      <div style={S.strengthFill(strength.pct, strength.color)} />
                    </div>
                    <span style={S.strengthLabel(strength.color)}>{strength.label}</span>
                  </div>
                )}
              </div>

              <div style={S.field}>
                <label style={S.label}>Confirm Password</label>
                <input
                  style={{
                    ...S.input,
                    borderColor: confirm && confirm !== password ? '#fca5a5' : '#e5e7eb',
                  }}
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Repeat your password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  onFocus={onFocus} onBlur={onBlur}
                  required
                />
                {confirm && confirm !== password && (
                  <span style={{ fontSize:'0.72rem', color:'#dc2626' }}>Passwords don't match</span>
                )}
              </div>

              <button type="submit" style={S.btn(loading)} disabled={loading}>
                {loading ? (
                  <>
                    <svg style={{ animation:'spin 0.8s linear infinite', width:'1rem', height:'1rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" opacity="0.25"/>
                      <path fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Resetting...
                  </>
                ) : '🔒 Reset Password'}
              </button>
            </form>
          </>
        )}

        {/* ── STEP: done ── */}
        {step === 'done' && (
          <>
            <div style={S.successBox}>
              <span style={S.successIcon}>🎉</span>
              <p style={S.successTitle}>Password reset successfully!</p>
              <p style={S.successDesc}>
                Your password has been updated. You can now log in with your new password.
              </p>
            </div>
            <button
              style={{ ...S.btn(false), marginTop: '1.25rem' }}
              onClick={() => navigate('/auth')}
            >
              Go to Login
            </button>
          </>
        )}

      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
};

export default ForgotPassword;