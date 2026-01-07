import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';


const Auth = () => {
    const [mode, setMode] = useState('login');
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [farmName, setFarmName] = useState('');
    const [farmLocation, setFarmLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    // Simple toast notification
    const toast = ({ variant, title, description }) => {
        alert(`${variant === 'destructive' ? '❌' : '✅'} ${title}: ${description}`);
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            if (mode === 'login') {
                // Mock login
                if (email && password) {
                    toast({
                        title: 'Welcome back!',
                        description: 'You have successfully logged in.',
                    });
                    setUser({ email });
                    setTimeout(() => navigate('/'), 500);
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Login Failed',
                        description: 'Please enter email and password.',
                    });
                    setIsLoading(false);
                }
            } else {
                if (!role) {
                    toast({
                        variant: 'destructive',
                        title: 'Select Role',
                        description: 'Please select whether you are a farmer or buyer.',
                    });
                    setIsLoading(false);
                    return;
                }

                // Mock signup
                if (email && password && fullName) {
                    toast({
                        title: 'Account Created!',
                        description: 'Welcome to AgriConnect!',
                    });
                    setUser({ email, fullName, role });
                    setTimeout(() => navigate('/'), 500);
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Sign Up Failed',
                        description: 'Please fill in all required fields.',
                    });
                    setIsLoading(false);
                }
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message || 'Something went wrong',
            });
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', position: 'relative', zIndex: 100 }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                    {/* Header */}
                    <div style={{ backgroundColor: '#467660', padding: '24px', textAlign: 'center' }}>

                        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '8px', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <span style={{ padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Leaf color="white" size={24} />
                            </span>
                            AgriConnect</h1>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', margin: 0 }}>
                            {mode === 'login' ? 'Welcome back!' : 'Join the farm-to-table revolution'}
                        </p>
                    </div>

                    <div style={{ padding: '24px' }}>
                        {/* Mode Toggle */}
                        <div style={{ display: 'flex', backgroundColor: '#f0f0f0', borderRadius: '8px', padding: '4px', marginBottom: '24px', gap: '4px' }}>
                            <button
                                onClick={() => { setMode('login'); setRole(null); }}
                                style={{
                                    flex: 1,
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    border: 'none',
                                    cursor: 'pointer',
                                    backgroundColor: mode === 'login' ? '#fff' : 'transparent',
                                    color: '#467660',
                                    transition: 'all 0.3s'
                                }}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setMode('signup')}
                                style={{
                                    flex: 1,
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    border: 'none',
                                    cursor: 'pointer',
                                    backgroundColor: mode === 'signup' ? '#fff' : 'transparent',
                                    color: mode === 'signup' ? '#000' : '#666',
                                    transition: 'all 0.3s'
                                }}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Role Selection for Signup */}
                        {mode === 'signup' && !role && (
                            <div style={{ marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: '600', textAlign: 'center', marginBottom: '16px' }}>I am a...</h3>

                                <button
                                    onClick={() => setRole('farmer')}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        border: '2px solid #ddd',
                                        borderRadius: '12px',
                                        backgroundColor: '#fff',
                                        cursor: 'pointer',
                                        marginBottom: '12px',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseOver={(e) => { e.target.style.borderColor = '#2ecc71'; e.target.style.backgroundColor = '#f0fdf4' }}
                                    onMouseOut={(e) => { e.target.style.borderColor = '#ddd'; e.target.style.backgroundColor = '#fff' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ fontSize: '28px' }}>🌾</div>
                                        <div style={{ textAlign: 'left' }}>
                                            <h4 style={{ fontWeight: '600', margin: '0', color: '#000' }}>Farmer</h4>
                                            <p style={{ fontSize: '14px', color: '#666', margin: '4px 0 0 0' }}>Sell your fresh produce</p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setRole('buyer')}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        border: '2px solid #ddd',
                                        borderRadius: '12px',
                                        backgroundColor: '#fff',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseOver={(e) => { e.target.style.borderColor = '#3498db'; e.target.style.backgroundColor = '#f0f9ff' }}
                                    onMouseOut={(e) => { e.target.style.borderColor = '#ddd'; e.target.style.backgroundColor = '#fff' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ fontSize: '28px' }}>🛒</div>
                                        <div style={{ textAlign: 'left' }}>
                                            <h4 style={{ fontWeight: '600', margin: '0', color: '#000' }}>Buyer</h4>
                                            <p style={{ fontSize: '14px', color: '#666', margin: '4px 0 0 0' }}>Buy fresh produce</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        )}

                        {/* Form */}
                        {(mode === 'login' || (mode === 'signup' && role)) && (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {mode === 'signup' && role && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => setRole(null)}
                                            style={{
                                                fontSize: '14px',
                                                color: '#467660',
                                                border: 'none',
                                                backgroundColor: 'transparent',
                                                cursor: 'pointer',
                                                marginBottom: '8px',
                                                padding: 0,
                                                textAlign: 'left'
                                            }}
                                        >
                                            ← Change role
                                        </button>

                                        <div style={{ padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '8px', fontSize: '14px', fontWeight: '500' }}>
                                            Signing up as <strong>{role}</strong>
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Full Name</label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px 12px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    boxSizing: 'border-box',
                                                    fontFamily: 'inherit'
                                                }}
                                                required
                                            />
                                        </div>

                                        {role === 'farmer' && (
                                            <>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Farm Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Green Valley Farm"
                                                        value={farmName}
                                                        onChange={(e) => setFarmName(e.target.value)}
                                                        style={{
                                                            width: '100%',
                                                            padding: '10px 12px',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '8px',
                                                            fontSize: '14px',
                                                            boxSizing: 'border-box',
                                                            fontFamily: 'inherit'
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Farm Location</label>
                                                    <input
                                                        type="text"
                                                        placeholder="California, USA"
                                                        value={farmLocation}
                                                        onChange={(e) => setFarmLocation(e.target.value)}
                                                        style={{
                                                            width: '100%',
                                                            padding: '10px 12px',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '8px',
                                                            fontSize: '14px',
                                                            boxSizing: 'border-box',
                                                            fontFamily: 'inherit'
                                                        }}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}

                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Email</label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            boxSizing: 'border-box',
                                            fontFamily: 'inherit'
                                        }}
                                        required
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            boxSizing: 'border-box',
                                            fontFamily: 'inherit'
                                        }}
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor: '#467660',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        opacity: isLoading ? 0.6 : 1,
                                        transition: 'opacity 0.3s'
                                    }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <p style={{ textAlign: 'center', fontSize: '14px', color: '#666', marginTop: '16px' }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: '#467660',
                            cursor: 'pointer',
                            textDecoration: 'none'
                        }}
                    >
                        ← Back to Home
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Auth;
