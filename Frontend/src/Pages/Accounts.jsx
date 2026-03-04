import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile, getUserProfile } from '../States/Auth/Action';

function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = ({ title, description, type = 'success' }) => {
    const id = Date.now();
    setToasts(p => [...p, { id, title, description, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  };
  const Toast = () => (
    <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          padding: '1rem 1.25rem', borderRadius: '1rem',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
          background: t.type === 'error' ? '#fff5f5' : '#f0fdf4',
          borderLeft: `5px solid ${t.type === 'error' ? '#e53e3e' : '#2d7d32'}`,
          minWidth: '280px', fontFamily: "'Lato', sans-serif",
          animation: 'slideIn 0.3s ease',
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: t.type === 'error' ? '#c53030' : '#2d7d32' }}>{t.title}</div>
          <div style={{ fontSize: '0.8rem', color: '#718096', marginTop: '0.2rem' }}>{t.description}</div>
        </div>
      ))}
    </div>
  );
  return { show, Toast };
}

const inputStyle = {
  width: '100%', padding: '0.75rem 1rem',
  border: '1.5px solid #e2e8e2', borderRadius: '0.75rem',
  fontSize: '0.9rem', color: '#2d3748', background: '#fafff8',
  outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: "'Lato', sans-serif",
};

const labelStyle = {
  display: 'block', fontSize: '0.8rem', fontWeight: 600,
  color: '#4a5568', marginBottom: '0.4rem', letterSpacing: '0.02em',
};

const Accounts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { show: showToast, Toast } = useToast();
  const fileInputRef = useRef(null);

  const reduxUser = useSelector(s => s.auth?.user ?? s.Auth?.user ?? null);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  const [formData, setFormData] = useState({
    name: '', surname: '', mobile: '', email: '',
    address: '', farm_name: '', farm_location: '',
  });

  useEffect(() => {
    if (!reduxUser) { navigate('/Auth'); return; }
    setUser(reduxUser);
    setFormData({
      name: reduxUser.name || '',
      surname: reduxUser.surname || '',
      mobile: reduxUser.mobile || reduxUser.phone || '',
      email: reduxUser.email || '',
      address: reduxUser.address || '',
      farm_name: reduxUser.farm_name || '',
      farm_location: reduxUser.farm_location || '',
    });
    if (reduxUser.photo) setPhotoPreview(reduxUser.photo);
  }, [reduxUser, navigate]);

  // ✅ Only two roles: ADMIN (the farmer) and CUSTOMER
  const isAdmin = (user?.role || '').toUpperCase() === 'ADMIN';

  const displayName = user ? `${user.name || ''} ${user.surname || ''}`.trim() || user.email?.split('@')[0] || 'User' : 'User';
  const firstName = user?.name || displayName.split(' ')[0];
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const avatarSrc = photoPreview || user?.photo || null;

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handlePhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast({ title: 'Invalid file', description: 'Please select an image.', type: 'error' });
      return;
    }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = ev => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('surname', formData.surname);
      form.append('mobile', formData.mobile);
      form.append('address', formData.address);
      if (isAdmin) {
        form.append('farm_name', formData.farm_name);
        form.append('farm_location', formData.farm_location);
      }
      if (photoFile) form.append('photo', photoFile);

      await dispatch(updateUserProfile(form));
      await dispatch(getUserProfile());
      setPhotoFile(null);
      showToast({ title: 'Profile saved! 🌿', description: 'Your changes have been updated.' });
    } catch {
      showToast({ title: 'Save failed', description: 'Something went wrong.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf7f2' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: '4px solid #e8f5e9', borderTop: '4px solid #2d7d32', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
        <p style={{ color: '#7d8c75', fontFamily: "'Lato', sans-serif" }}>Loading your profile…</p>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', fontFamily: "'Lato', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Lato:wght@300;400;600;700&display=swap" rel="stylesheet" />
      <Toast />

      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%)',
        minHeight: '260px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 2rem 6rem', position: 'relative' }}>
          <button onClick={() => navigate(-1)} style={{
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '2rem', color: '#fff', padding: '0.5rem 1.2rem',
            fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            marginBottom: '1.5rem', fontFamily: "'Lato', sans-serif",
          }}>← Back</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* ✅ Admin = farmer emoji, Customer = cart */}
            <span style={{ fontSize: '2.5rem' }}>{isAdmin ? '🌾' : '🛒'}</span>
            <div>
              <h1 style={{
                color: '#fff', fontSize: '2.2rem', fontWeight: 700, margin: 0,
                fontFamily: "'Playfair Display', serif", letterSpacing: '-0.5px', lineHeight: 1.1,
              }}>Hey, {firstName}!</h1>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', margin: '0.3rem 0 0' }}>
                {/* ✅ Subtitle based on role */}
                {isAdmin ? 'Admin · Manage your farm profile' : 'Customer · Manage your profile'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Card ── */}
      <div style={{ maxWidth: '900px', margin: '-4rem auto 3rem', padding: '0 1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: '1.75rem', boxShadow: '0 25px 80px rgba(0,0,0,0.1)', overflow: 'hidden' }}>

          {/* ── Profile Header ── */}
          <div style={{
            background: 'linear-gradient(to right, #f0fdf4, #fafff8)',
            padding: '2rem 2.5rem', borderBottom: '1px solid #e8f5e9',
            display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap',
          }}>
            {/* Avatar */}
            <div
              onClick={handlePhotoClick}
              style={{
                width: '100px', height: '100px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #2d7d32, #40916c)',
                border: '4px solid #fff', boxShadow: '0 8px 30px rgba(45,125,50,0.3)',
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
                flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.querySelector('.ov').style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { e.currentTarget.querySelector('.ov').style.opacity = '0'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {avatarSrc
                ? <img src={avatarSrc} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                : <span style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 800, fontFamily: "'Playfair Display', serif" }}>{avatarLetter}</span>
              }
              <div className="ov" style={{
                position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                opacity: 0, transition: 'opacity 0.2s', gap: '0.25rem',
              }}>
                <span style={{ fontSize: '1.3rem' }}>📷</span>
                <span style={{ color: '#fff', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em' }}>CHANGE</span>
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />

            {/* Info */}
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#1a2e1a', fontFamily: "'Playfair Display', serif" }}>{displayName}</h2>
              <p style={{ margin: '0.25rem 0 0.75rem', color: '#7d8c75', fontSize: '0.875rem' }}>{user.email}</p>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {/* ✅ Role badge */}
                <span style={{
                  background: isAdmin ? '#e8f5e9' : '#fff3e0',
                  color: isAdmin ? '#2d7d32' : '#e65100',
                  border: `1px solid ${isAdmin ? '#a5d6a7' : '#ffcc80'}`,
                  borderRadius: '2rem', padding: '0.3rem 0.9rem',
                  fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em',
                }}>{isAdmin ? '🌾 ADMIN' : '🛒 CUSTOMER'}</span>
                {photoFile && (
                  <span style={{ background: '#e3f2fd', color: '#1565c0', border: '1px solid #90caf9', borderRadius: '2rem', padding: '0.3rem 0.9rem', fontSize: '0.75rem', fontWeight: 700 }}>
                    📷 New photo ready
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '2rem' }}>
              {[
                { label: 'Status', value: 'Active' },
                // ✅ Role label
                { label: 'Role', value: isAdmin ? 'Farmer' : 'Buyer' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#2d7d32', fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                  <div style={{ fontSize: '0.72rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tabs ── */}
          <div style={{ borderBottom: '1px solid #f0f4f0', padding: '0 2.5rem', display: 'flex' }}>
            {[
              { id: 'profile', label: '👤 Profile' },
              // ✅ Farm tab label based on role
              { id: 'farm', label: isAdmin ? '🌾 Farm Details' : '🌱 Farm' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                background: 'none', border: 'none',
                borderBottom: `3px solid ${activeTab === tab.id ? '#2d7d32' : 'transparent'}`,
                color: activeTab === tab.id ? '#2d7d32' : '#9ca3af',
                padding: '1rem 1.5rem', fontSize: '0.875rem',
                fontWeight: activeTab === tab.id ? 700 : 500,
                cursor: 'pointer', fontFamily: "'Lato', sans-serif",
                transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}>{tab.label}</button>
            ))}
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} style={{ padding: '2.5rem' }}>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem', marginTop: 0 }}>Personal Information</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  {[{ label: '👤 First Name', name: 'name', placeholder: 'Your first name' }, { label: '👤 Surname', name: 'surname', placeholder: 'Your surname' }].map(f => (
                    <div key={f.name}>
                      <label style={labelStyle}>{f.label}</label>
                      <input name={f.name} value={formData[f.name]} onChange={handleChange} placeholder={f.placeholder} style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = '#2d7d32'; e.target.style.boxShadow = '0 0 0 3px rgba(45,125,50,0.12)'; }}
                        onBlur={e => { e.target.style.borderColor = '#e2e8e2'; e.target.style.boxShadow = 'none'; }} />
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>✉️ Email Address</label>
                  <input value={formData.email} disabled style={{ ...inputStyle, background: '#f7f9f7', color: '#a0adb0', cursor: 'not-allowed' }} />
                  <p style={{ fontSize: '0.72rem', color: '#a0adb0', marginTop: '0.3rem', marginBottom: 0 }}>Email address cannot be changed</p>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>📱 Mobile Number</label>
                  <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Your mobile number" style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#2d7d32'; e.target.style.boxShadow = '0 0 0 3px rgba(45,125,50,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = '#e2e8e2'; e.target.style.boxShadow = 'none'; }} />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={labelStyle}>📍 Address</label>
                  <input name="address" value={formData.address} onChange={handleChange} placeholder="Your address" style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#2d7d32'; e.target.style.boxShadow = '0 0 0 3px rgba(45,125,50,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = '#e2e8e2'; e.target.style.boxShadow = 'none'; }} />
                </div>
              </div>
            )}

            {/* Farm Tab */}
            {activeTab === 'farm' && (
              <div>
                {isAdmin ? (
                  // ✅ Admin sees farm details form
                  <>
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem', marginTop: 0 }}>Farm Details</p>
                    <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #e8f5e9)', border: '1.5px solid #a5d6a7', borderRadius: '1.25rem', padding: '1.75rem', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '2rem' }}>🌾</span>
                        <div>
                          <h3 style={{ margin: 0, fontFamily: "'Playfair Display', serif", color: '#1b4332', fontSize: '1.1rem' }}>Your Farm</h3>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: '#52796f' }}>Tell buyers about your farm</p>
                        </div>
                      </div>
                      <div style={{ marginBottom: '1.25rem' }}>
                        <label style={labelStyle}>🏡 Farm Name</label>
                        <input name="farm_name" value={formData.farm_name} onChange={handleChange} placeholder="e.g. Green Valley Farm" style={inputStyle}
                          onFocus={e => { e.target.style.borderColor = '#2d7d32'; e.target.style.boxShadow = '0 0 0 3px rgba(45,125,50,0.12)'; }}
                          onBlur={e => { e.target.style.borderColor = '#e2e8e2'; e.target.style.boxShadow = 'none'; }} />
                      </div>
                      <div>
                        <label style={labelStyle}>📍 Farm Location</label>
                        <input name="farm_location" value={formData.farm_location} onChange={handleChange} placeholder="Village / District / State" style={inputStyle}
                          onFocus={e => { e.target.style.borderColor = '#2d7d32'; e.target.style.boxShadow = '0 0 0 3px rgba(45,125,50,0.12)'; }}
                          onBlur={e => { e.target.style.borderColor = '#e2e8e2'; e.target.style.boxShadow = 'none'; }} />
                      </div>
                    </div>
                  </>
                ) : (
                  // ✅ Customer sees a locked message — no upgrade option
                  <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🔒</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: '#4a5568', margin: '0 0 0.5rem' }}>Admin Only</h3>
                    <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '320px', margin: '0 auto' }}>
                      Farm details are only available to the platform admin.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ✅ Save button only shows on profile tab, or farm tab if admin */}
            {(activeTab === 'profile' || (activeTab === 'farm' && isAdmin)) && (
              <button type="submit" disabled={loading} style={{
                width: '100%', padding: '1rem',
                background: loading ? '#a5d6a7' : 'linear-gradient(135deg, #2d7d32 0%, #1b5e20 100%)',
                color: '#fff', border: 'none', borderRadius: '1rem',
                fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                fontFamily: "'Lato', sans-serif", letterSpacing: '0.03em',
                boxShadow: loading ? 'none' : '0 8px 24px rgba(45,125,50,0.35)',
                transition: 'all 0.3s ease', marginTop: '0.5rem',
              }}>
                {loading ? (
                  <>
                    <svg style={{ animation: 'spin 0.8s linear infinite', width: '1.1rem', height: '1.1rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" opacity="0.25" />
                      <path fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving changes…
                  </>
                ) : '🌿 Save Changes'}
              </button>
            )}
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        input::placeholder { color: #b0bdb0; }
      `}</style>
    </div>
  );
};

export default Accounts;