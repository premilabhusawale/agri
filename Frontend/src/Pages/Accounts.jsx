import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── tiny toast hook ─── */
function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = ({ title, description, type = 'success' }) => {
    const id = Date.now();
    setToasts(p => [...p, { id, title, description, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  };
  const Toast = () => (
    <div style={{ position:'fixed', top:'1.25rem', right:'1.25rem', zIndex:9999, display:'flex', flexDirection:'column', gap:'0.5rem' }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          padding:'0.9rem 1.2rem', borderRadius:'0.875rem',
          boxShadow:'0 8px 30px rgba(0,0,0,0.14)',
          background: t.type === 'error' ? '#fef2f2' : '#f0fdf4',
          borderLeft:`4px solid ${t.type === 'error' ? '#ef4444' : '#16a34a'}`,
          minWidth:'260px', maxWidth:'320px',
          fontFamily:"'Segoe UI', sans-serif",
        }}>
          <div style={{ fontWeight:700, fontSize:'0.875rem', color: t.type === 'error' ? '#dc2626' : '#15803d', marginBottom:'0.2rem' }}>{t.title}</div>
          <div style={{ fontSize:'0.8rem', color:'#6b7280' }}>{t.description}</div>
        </div>
      ))}
    </div>
  );
  return { show, Toast };
}

/* ─── styles (unchanged) ─── */
const S = {
  page: {
    minHeight:'100vh',
    background:'linear-gradient(160deg, #f8fafc 0%, #f0fdf4 100%)',
    fontFamily:"'Segoe UI', system-ui, sans-serif",
    paddingBottom:'3rem',
  },
  hero: {
    background:'linear-gradient(135deg, #15803d 0%, #166534 100%)',
    padding:'2.5rem 1.5rem 4.5rem',
    position:'relative', overflow:'hidden',
  },
  heroPattern: {
    position:'absolute', inset:0,
    backgroundImage:`radial-gradient(circle at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 60%),
                     radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 50%)`,
  },
  heroBack: {
    background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.25)',
    borderRadius:'0.6rem', color:'#fff', padding:'0.4rem 0.9rem',
    fontSize:'0.82rem', fontWeight:600, cursor:'pointer',
    display:'inline-flex', alignItems:'center', gap:'0.4rem',
    marginBottom:'1.5rem', backdropFilter:'blur(4px)',
  },
  heroTitle: { color:'#fff', fontSize:'1.75rem', fontWeight:800, margin:0, letterSpacing:'-0.5px' },
  heroSub: { color:'rgba(255,255,255,0.75)', fontSize:'0.9rem', marginTop:'0.3rem' },
  avatarWrap: {
    position:'relative', width:'100%', maxWidth:'680px',
    margin:'-3.5rem auto 0', padding:'0 1.25rem', boxSizing:'border-box',
  },
  card: { background:'#fff', borderRadius:'1.5rem', boxShadow:'0 20px 60px rgba(0,0,0,0.1)', overflow:'hidden' },
  avatarSection: {
    display:'flex', alignItems:'flex-end', gap:'1.25rem',
    padding:'1.5rem 1.75rem 1.25rem', borderBottom:'1px solid #f3f4f6', flexWrap:'wrap',
  },
  avatarRing: {
    width:'88px', height:'88px', borderRadius:'50%',
    border:'3px solid #fff', boxShadow:'0 4px 20px rgba(0,0,0,0.15)',
    background:'#15803d', flexShrink:0, position:'relative', overflow:'hidden',
    display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
  },
  avatarInitial: { color:'#fff', fontSize:'2rem', fontWeight:800, userSelect:'none', pointerEvents:'none' },
  avatarOverlay: {
    position:'absolute', inset:0, background:'rgba(0,0,0,0.45)',
    display:'flex', alignItems:'center', justifyContent:'center',
    opacity:0, transition:'opacity 0.2s', flexDirection:'column', gap:'0.2rem',
  },
  avatarOverlayText: { color:'#fff', fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.05em' },
  nameBlock: { flex:1 },
  displayName: { fontSize:'1.35rem', fontWeight:800, color:'#111827', margin:0, letterSpacing:'-0.3px' },
  emailSmall: { fontSize:'0.83rem', color:'#9ca3af', marginTop:'0.1rem' },
  rolePill: (role) => ({
    display:'inline-flex', alignItems:'center', gap:'0.3rem',
    padding:'0.2rem 0.7rem', borderRadius:'2rem', fontSize:'0.75rem', fontWeight:700,
    background: role === 'farmer' ? '#f0fdf4' : '#fff7ed',
    color: role === 'farmer' ? '#15803d' : '#ea580c',
    border: `1px solid ${role === 'farmer' ? '#bbf7d0' : '#fed7aa'}`,
    marginTop:'0.4rem',
  }),
  formBody: { padding:'1.75rem' },
  sectionTitle: {
    fontSize:'0.72rem', fontWeight:700, color:'#9ca3af',
    letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'1rem', marginTop:0,
  },
  grid2: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.85rem' },
  field: { display:'flex', flexDirection:'column', gap:'0.3rem', marginBottom:'0.85rem' },
  label: { fontSize:'0.8rem', fontWeight:600, color:'#374151', display:'flex', alignItems:'center', gap:'0.35rem' },
  input: {
    width:'100%', padding:'0.6rem 0.85rem', border:'1.5px solid #e5e7eb',
    borderRadius:'0.65rem', fontSize:'0.9rem', color:'#111827', background:'#fafafa',
    outline:'none', boxSizing:'border-box', transition:'border-color 0.2s, box-shadow 0.2s',
    fontFamily:"'Segoe UI', sans-serif",
  },
  inputDisabled: { background:'#f3f4f6', color:'#9ca3af', cursor:'not-allowed', border:'1.5px solid #e5e7eb' },
  hint: { fontSize:'0.72rem', color:'#9ca3af', marginTop:'0.15rem' },
  divider: { border:'none', borderTop:'1px solid #f3f4f6', margin:'1.5rem 0' },
  upgradeBox: {
    background:'linear-gradient(135deg, #fff7ed, #fef3c7)', border:'2px dashed #f59e0b',
    borderRadius:'1rem', padding:'1.5rem', textAlign:'center', marginBottom:'1.5rem',
  },
  upgradeEmoji: { fontSize:'2rem', display:'block', marginBottom:'0.5rem' },
  upgradeTitle: { fontWeight:800, color:'#92400e', fontSize:'1rem', marginBottom:'0.3rem' },
  upgradeDesc: { fontSize:'0.82rem', color:'#b45309', marginBottom:'1rem', lineHeight:1.5 },
  upgradeBtn: {
    background:'linear-gradient(135deg, #f59e0b, #d97706)', color:'#fff', border:'none',
    borderRadius:'0.75rem', padding:'0.65rem 1.5rem', fontWeight:700, fontSize:'0.875rem',
    cursor:'pointer', fontFamily:"'Segoe UI', sans-serif", transition:'opacity 0.2s',
  },
  farmerSection: {
    background:'#f0fdf4', border:'1px solid #bbf7d0',
    borderRadius:'1rem', padding:'1.25rem', marginBottom:'1rem',
  },
  farmerHeader: { display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1rem' },
  farmerTitle: { fontWeight:700, color:'#15803d', fontSize:'0.9rem' },
  saveBtn: (loading) => ({
    width:'100%', padding:'0.8rem',
    background: loading ? '#86efac' : 'linear-gradient(135deg, #16a34a, #15803d)',
    color:'#fff', border:'none', borderRadius:'0.85rem', fontSize:'0.95rem', fontWeight:700,
    cursor: loading ? 'not-allowed' : 'pointer',
    display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
    fontFamily:"'Segoe UI', sans-serif", letterSpacing:'0.03em', transition:'opacity 0.2s',
  }),
  loadingScreen: {
    minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
    background:'#f8fafc', flexDirection:'column', gap:'1rem',
  },
  spinner: {
    width:'44px', height:'44px', border:'4px solid #dcfce7',
    borderTop:'4px solid #16a34a', borderRadius:'50%',
    animation:'spin 0.8s linear infinite',
  },
};

/* ─── svg icons ─── */
const Icon = ({ d, size=16 }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const ICONS = {
  user:   "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  mail:   "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  phone:  "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  pin:    "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
  barn:   "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  camera: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z",
  back:   "M15 19l-7-7 7-7",
  save:   "M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4",
};

/* ══════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════ */
const Accounts = () => {
  const navigate = useNavigate();
  const { show: showToast, Toast } = useToast();
  const fileInputRef = useRef(null);

  const [loading,         setLoading]         = useState(false);
  const [upgrading,       setUpgrading]       = useState(false);
  const [user,            setUser]            = useState(null);
  const [photoPreview,    setPhotoPreview]    = useState(null);
  const [photoFile,       setPhotoFile]       = useState(null);
  const [showUpgradeForm, setShowUpgradeForm] = useState(false);

  const [formData, setFormData] = useState({
    name:'', surname:'', mobile:'', email:'',
    address:'', farm_name:'', farm_location:'',
  });

  /* ── load user from localStorage ── */
  useEffect(() => {
    const jwt     = localStorage.getItem('jwt');
    const userStr = localStorage.getItem('user');
    if (!jwt || !userStr) { navigate('/Auth'); return; }
    try {
      const u = JSON.parse(userStr);
      setUser(u);
      setFormData({
        name:          u.name          || '',
        surname:       u.surname       || '',
        mobile:        u.mobile        || u.phone || '',
        email:         u.email         || '',
        address:       u.address       || '',
        farm_name:     u.farm_name     || '',
        farm_location: u.farm_location || '',
      });
      // restore saved photo preview if exists
      if (u.photoPreview) setPhotoPreview(u.photoPreview);
    } catch {
      navigate('/Auth');
    }
  }, [navigate]);

  /* ── helpers ── */
  const isFarmer     = user?.role === 'farmer';
  const isCustomer   = user?.role === 'customer' || user?.role === 'buyer' || (!user?.role);
  const displayName  = user ? `${user.name || ''} ${user.surname || ''}`.trim() || user.email?.split('@')[0] || 'User' : 'User';
  const firstName    = user?.name || displayName.split(' ')[0];
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const avatarSrc    = photoPreview || user?.photo || user?.avatar_url || null;

  const onFocus = e => { e.target.style.borderColor='#16a34a'; e.target.style.boxShadow='0 0 0 3px rgba(22,163,74,0.15)'; };
  const onBlur  = e => { e.target.style.borderColor='#e5e7eb'; e.target.style.boxShadow='none'; };
  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  /* ── photo pick ── */
  const handlePhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast({ title:'Invalid file', description:'Please select an image file.', type:'error' });
      return;
    }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = ev => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  /* ── save profile → only updates localStorage ── */
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    // simulate save delay
    await new Promise(res => setTimeout(res, 700));

    try {
      const updated = {
        ...user,
        name:          formData.name,
        surname:       formData.surname,
        mobile:        formData.mobile,
        address:       formData.address,
        ...(isFarmer && {
          farm_name:     formData.farm_name,
          farm_location: formData.farm_location,
        }),
        // store base64 preview so photo persists across page reloads
        ...(photoPreview && { photoPreview }),
      };

      localStorage.setItem('user', JSON.stringify(updated));
      setUser(updated);
      setPhotoFile(null);

      showToast({ title:'Profile saved!', description:'Your changes have been updated.' });
    } catch {
      showToast({ title:'Save failed', description:'Something went wrong.', type:'error' });
    } finally {
      setLoading(false);
    }
  };

  /* ── upgrade customer → farmer (local only) ── */
  const handleUpgrade = async () => {
    setUpgrading(true);
    await new Promise(res => setTimeout(res, 600));

    try {
      const updated = { ...user, role:'farmer' };
      localStorage.setItem('user', JSON.stringify(updated));
      setUser(updated);
      setShowUpgradeForm(false);
      showToast({ title:'Welcome, Farmer! 🌾', description:'Your account has been upgraded. Farm fields are now unlocked.' });
    } catch {
      showToast({ title:'Upgrade failed', description:'Try again later.', type:'error' });
    } finally {
      setUpgrading(false);
    }
  };

  /* ── loading screen ── */
  if (!user) return (
    <div style={S.loadingScreen}>
      <div style={S.spinner} />
      <p style={{ color:'#6b7280', fontFamily:"'Segoe UI', sans-serif" }}>Loading your profile…</p>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  /* ══════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════ */
  return (
    <div style={S.page}>
      <Toast />

      {/* Hero */}
      <div style={S.hero}>
        <div style={S.heroPattern} />
        <div style={{ maxWidth:'680px', margin:'0 auto', padding:'0 1.25rem', position:'relative' }}>
          <button style={S.heroBack} onClick={() => navigate(-1)}>
            <Icon d={ICONS.back} size={14} /> Back
          </button>
          <h1 style={S.heroTitle}>
            Hey, <span style={{ color:'#bbf7d0' }}>{firstName}!</span>
          </h1>
          <p style={S.heroSub}>Manage your account settings below</p>
        </div>
      </div>

      {/* Card */}
      <div style={S.avatarWrap}>
        <div style={S.card}>

          {/* Avatar + name row */}
          <div style={S.avatarSection}>
            <div
              style={S.avatarRing}
              onClick={handlePhotoClick}
              onMouseEnter={e => e.currentTarget.querySelector('.ov').style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.querySelector('.ov').style.opacity = '0'}
              title="Click to change photo"
            >
              {avatarSrc
                ? <img src={avatarSrc} alt="avatar" style={{ width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset:0 }} />
                : <span style={S.avatarInitial}>{avatarLetter}</span>
              }
              <div className="ov" style={S.avatarOverlay}>
                <Icon d={ICONS.camera} size={20} />
                <span style={S.avatarOverlayText}>CHANGE</span>
              </div>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handlePhotoChange} />

            <div style={S.nameBlock}>
              <p style={S.displayName}>{displayName}</p>
              <p style={S.emailSmall}>{user.email}</p>
              <div style={S.rolePill(isFarmer ? 'farmer' : 'customer')}>
                {isFarmer ? '🌾 Farmer' : '🛒 Customer'}
              </div>
            </div>

            {photoFile && (
              <div style={{ fontSize:'0.75rem', color:'#16a34a', fontWeight:600, alignSelf:'center' }}>
                📷 New photo ready — save to apply
              </div>
            )}
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} style={S.formBody}>
            <p style={S.sectionTitle}>Personal Information</p>

            <div style={S.grid2}>
              <div style={S.field}>
                <label style={S.label}><Icon d={ICONS.user} /> First Name</label>
                <input style={S.input} name="name" value={formData.name}
                  onChange={handleChange} onFocus={onFocus} onBlur={onBlur} placeholder="First name" />
              </div>
              <div style={S.field}>
                <label style={S.label}><Icon d={ICONS.user} /> Surname</label>
                <input style={S.input} name="surname" value={formData.surname}
                  onChange={handleChange} onFocus={onFocus} onBlur={onBlur} placeholder="Surname" />
              </div>
            </div>

            <div style={S.field}>
              <label style={S.label}><Icon d={ICONS.mail} /> Email</label>
              <input style={{ ...S.input, ...S.inputDisabled }} type="email" value={formData.email} disabled />
              <span style={S.hint}>Email cannot be changed</span>
            </div>

            <div style={S.field}>
              <label style={S.label}><Icon d={ICONS.phone} /> Mobile Number</label>
              <input style={S.input} name="mobile" value={formData.mobile}
                onChange={handleChange} onFocus={onFocus} onBlur={onBlur} placeholder="Enter mobile number" />
            </div>

            <div style={S.field}>
              <label style={S.label}><Icon d={ICONS.pin} /> Address</label>
              <input style={S.input} name="address" value={formData.address}
                onChange={handleChange} onFocus={onFocus} onBlur={onBlur} placeholder="Enter your address" />
            </div>

            <hr style={S.divider} />

            {/* Farmer: farm fields */}
            {isFarmer && (
              <>
                <p style={S.sectionTitle}>Farm Details</p>
                <div style={S.farmerSection}>
                  <div style={S.farmerHeader}>
                    <span style={{ fontSize:'1.25rem' }}>🌾</span>
                    <span style={S.farmerTitle}>Your Farm Information</span>
                  </div>
                  <div style={S.field}>
                    <label style={S.label}><Icon d={ICONS.barn} /> Farm Name</label>
                    <input style={S.input} name="farm_name" value={formData.farm_name}
                      onChange={handleChange} onFocus={onFocus} onBlur={onBlur} placeholder="Enter your farm name" />
                  </div>
                  <div style={{ ...S.field, marginBottom:0 }}>
                    <label style={S.label}><Icon d={ICONS.pin} /> Farm Location</label>
                    <input style={S.input} name="farm_location" value={formData.farm_location}
                      onChange={handleChange} onFocus={onFocus} onBlur={onBlur} placeholder="Village / District / State" />
                  </div>
                </div>
              </>
            )}

            {/* Customer: upgrade CTA */}
            {isCustomer && (
              <>
                <p style={S.sectionTitle}>Sell on AgriConnect</p>
                {!showUpgradeForm ? (
                  <div style={S.upgradeBox}>
                    <span style={S.upgradeEmoji}>🌱</span>
                    <p style={S.upgradeTitle}>Want to become a Farmer?</p>
                    <p style={S.upgradeDesc}>
                      Upgrade your account to start selling your fresh produce directly to customers.
                      It's free and takes just one click!
                    </p>
                    <button type="button" style={S.upgradeBtn} onClick={() => setShowUpgradeForm(true)}>
                      Upgrade to Farmer Account 🚀
                    </button>
                  </div>
                ) : (
                  <div style={{ ...S.upgradeBox, background:'linear-gradient(135deg, #f0fdf4, #dcfce7)', border:'2px solid #86efac', textAlign:'left' }}>
                    <p style={{ ...S.upgradeTitle, color:'#15803d', marginBottom:'0.75rem' }}>
                      🌾 Confirm Upgrade to Farmer
                    </p>
                    <p style={{ ...S.upgradeDesc, color:'#166534', marginBottom:'1.25rem' }}>
                      You'll be able to list your produce, manage orders, and reach customers directly.
                      Your existing data won't be affected.
                    </p>
                    <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
                      <button type="button"
                        style={{ ...S.upgradeBtn, background:'linear-gradient(135deg,#16a34a,#15803d)', flex:1 }}
                        onClick={handleUpgrade} disabled={upgrading}>
                        {upgrading ? 'Upgrading…' : 'Yes, make me a Farmer!'}
                      </button>
                      <button type="button"
                        style={{ ...S.upgradeBtn, background:'#e5e7eb', color:'#374151', flex:1 }}
                        onClick={() => setShowUpgradeForm(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Save */}
            <button type="submit" style={S.saveBtn(loading)} disabled={loading}>
              {loading ? (
                <>
                  <svg style={{ animation:'spin 0.8s linear infinite', width:'1rem', height:'1rem' }}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" opacity="0.25"/>
                    <path fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Saving…
                </>
              ) : (
                <><Icon d={ICONS.save} size={16} /> Save Changes</>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Accounts;