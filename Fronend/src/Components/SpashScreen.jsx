import { useState, useEffect } from "react";

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading, reveal, complete
  const [particles] = useState([...Array(20)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 3,
    duration: Math.random() * 10 + 15,
  })));

  useEffect(() => {
    // Smooth progress animation with easing
    const startTime = Date.now();
    const duration = 3000; // 3 seconds to complete

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);
      
      // Easing function for smoother progress
      const easedProgress = rawProgress < 50
        ? 2 * rawProgress * rawProgress / 100
        : 100 - Math.pow(-2 * rawProgress / 100 + 2, 2) * 50;

      setProgress(easedProgress);

      if (rawProgress >= 100) {
        clearInterval(progressInterval);
        setPhase("reveal");
        setTimeout(() => {
          setPhase("complete");
          setTimeout(onComplete, 1000);
        }, 1800);
      }
    }, 16); // ~60fps

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap');
        
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg);
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-20px) rotate(5deg);
            opacity: 0.7;
          }
        }

        @keyframes float-emoji {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          33% {
            transform: translateY(-30px) rotate(8deg) scale(1.1);
          }
          66% {
            transform: translateY(-15px) rotate(-8deg) scale(0.95);
          }
        }

        @keyframes smooth-scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }

        @keyframes text-reveal-smooth {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 overflow-hidden">
        {/* Grain texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            animation: 'grain 8s steps(10) infinite',
          }}
        />

        {/* Enhanced glowing ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl" 
             style={{ animation: 'float 20s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-300/30 rounded-full blur-3xl" 
             style={{ animation: 'float 25s ease-in-out infinite 5s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-lime-300/20 rounded-full blur-3xl" 
             style={{ animation: 'float 30s ease-in-out infinite 10s' }} />

        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-emerald-400/40"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}

        {/* Floating produce emojis - enhanced */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { emoji: '🍅', left: '8%', top: '12%', delay: 0, size: 1 },
            { emoji: '🥕', left: '88%', top: '18%', delay: 1.2, size: 1.1 },
            { emoji: '🌽', left: '12%', top: '75%', delay: 2.1, size: 0.9 },
            { emoji: '🍎', left: '85%', top: '78%', delay: 3.3, size: 1 },
            { emoji: '🥬', left: '18%', top: '42%', delay: 1.7, size: 0.95 },
            { emoji: '🫑', left: '78%', top: '48%', delay: 2.8, size: 1.05 },
          ].map((item, i) => (
            <div
              key={i}
              className="absolute text-5xl opacity-20"
              style={{
                left: item.left,
                top: item.top,
                animation: `float-emoji 8s ease-in-out infinite`,
                animationDelay: `${item.delay}s`,
                transform: `scale(${item.size})`,
              }}
            >
              {item.emoji}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
          {/* Logo Section */}
          <div className="relative w-full max-w-2xl h-64 mb-12">
            {/* Logo appears from the start */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{
                animation: progress > 0 ? 'smooth-scale-in 1.2s cubic-bezier(0.34, 1.26, 0.64, 1)' : 'none',
                zIndex: 3,
              }}
            >
              <div className="flex flex-row items-center space-x-8">
                {/* Professional Wheat Logo */}
                <div className="w-40 h-40 text-[#1A5D1A] relative">
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl" />
                  
                  {/* Pulsing outer glow on reveal */}
                  {phase === "reveal" && (
                    <div 
                      className="absolute -inset-4 bg-emerald-400/30 rounded-full blur-2xl"
                      style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}
                    />
                  )}
                  
                  <svg 
                    viewBox="0 0 200 200" 
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10"
                  >
                    <defs>
                      {/* Gradient for wheat */}
                      <linearGradient id="wheatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#F4D03F" />
                        <stop offset="100%" stopColor="#D4AF37" />
                      </linearGradient>
                      
                      {/* Gradient for leaves */}
                      <linearGradient id="leafGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2D5016" />
                        <stop offset="100%" stopColor="#1A5D1A" />
                      </linearGradient>
                    </defs>
                    
                    {/* Circle background - subtle */}
                    <circle cx="100" cy="100" r="85" fill="currentColor" opacity="0.05"/>
                    <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
                    
                    {/* Central wheat bundle - 5 stalks */}
                    
                    {/* Left wheat stalk */}
                    <g transform="translate(65, 40)">
                      {/* Stem */}
                      <path d="M 15 140 Q 10 100 8 60 Q 7 30 10 0" 
                            stroke="url(#leafGradient)" 
                            strokeWidth="3" 
                            fill="none"
                            strokeLinecap="round"/>
                      
                      {/* Wheat grains */}
                      <ellipse cx="6" cy="15" rx="5" ry="8" fill="url(#wheatGradient)" opacity="0.95"/>
                      <ellipse cx="11" cy="22" rx="5" ry="8" fill="url(#wheatGradient)" opacity="0.95"/>
                      <ellipse cx="5" cy="30" rx="5" ry="8" fill="url(#wheatGradient)" opacity="0.9"/>
                      <ellipse cx="10" cy="38" rx="5" ry="8" fill="url(#wheatGradient)" opacity="0.9"/>
                      <ellipse cx="6" cy="46" rx="5" ry="7" fill="url(#wheatGradient)" opacity="0.85"/>
                      <ellipse cx="9" cy="54" rx="4.5" ry="7" fill="url(#wheatGradient)" opacity="0.85"/>
                      
                      {/* Awns (whiskers) */}
                      <line x1="11" y1="15" x2="16" y2="8" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7"/>
                      <line x1="16" y1="22" x2="22" y2="16" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7"/>
                      <line x1="10" y1="30" x2="15" y2="24" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6"/>
                    </g>
                    
                    {/* Left-center wheat stalk */}
                    <g transform="translate(80, 30)">
                      <path d="M 10 150 Q 8 110 7 70 Q 6 35 8 0" 
                            stroke="url(#leafGradient)" 
                            strokeWidth="3.5" 
                            fill="none"
                            strokeLinecap="round"/>
                      
                      <ellipse cx="5" cy="10" rx="5.5" ry="9" fill="url(#wheatGradient)"/>
                      <ellipse cx="10" cy="18" rx="5.5" ry="9" fill="url(#wheatGradient)"/>
                      <ellipse cx="5" cy="27" rx="5.5" ry="9" fill="url(#wheatGradient)"/>
                      <ellipse cx="9" cy="36" rx="5.5" ry="9" fill="url(#wheatGradient)"/>
                      <ellipse cx="6" cy="45" rx="5" ry="8" fill="url(#wheatGradient)" opacity="0.95"/>
                      <ellipse cx="8" cy="54" rx="5" ry="8" fill="url(#wheatGradient)" opacity="0.95"/>
                      <ellipse cx="7" cy="63" rx="4.5" ry="7" fill="url(#wheatGradient)" opacity="0.9"/>
                      
                      <line x1="10" y1="10" x2="16" y2="3" stroke="#D4AF37" strokeWidth="1" opacity="0.8"/>
                      <line x1="15" y1="18" x2="21" y2="12" stroke="#D4AF37" strokeWidth="1" opacity="0.8"/>
                      <line x1="10" y1="27" x2="16" y2="21" stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
                      <line x1="14" y1="36" x2="20" y2="30" stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
                    </g>
                    
                    {/* Center wheat stalk - tallest and most prominent */}
                    <g transform="translate(95, 20)">
                      <path d="M 5 160 Q 4 115 3 70 Q 2 30 5 0" 
                            stroke="url(#leafGradient)" 
                            strokeWidth="4" 
                            fill="none"
                            strokeLinecap="round"/>
                      
                      <ellipse cx="2" cy="8" rx="6" ry="10" fill="url(#wheatGradient)"/>
                      <ellipse cx="7" cy="17" rx="6" ry="10" fill="url(#wheatGradient)"/>
                      <ellipse cx="2" cy="27" rx="6" ry="10" fill="url(#wheatGradient)"/>
                      <ellipse cx="6" cy="37" rx="6" ry="10" fill="url(#wheatGradient)"/>
                      <ellipse cx="3" cy="47" rx="5.5" ry="9" fill="url(#wheatGradient)"/>
                      <ellipse cx="5" cy="57" rx="5.5" ry="9" fill="url(#wheatGradient)"/>
                      <ellipse cx="4" cy="67" rx="5" ry="8" fill="url(#wheatGradient)" opacity="0.95"/>
                      <ellipse cx="5" cy="77" rx="5" ry="8" fill="url(#wheatGradient)" opacity="0.95"/>
                      
                      <line x1="8" y1="8" x2="15" y2="0" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8"/>
                      <line x1="13" y1="17" x2="20" y2="10" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8"/>
                      <line x1="8" y1="27" x2="15" y2="20" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8"/>
                      <line x1="12" y1="37" x2="19" y2="30" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8"/>
                      <line x1="9" y1="47" x2="16" y2="40" stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
                    </g>
                    
                    {/* Right-center wheat stalk */}
                    <g transform="translate(110, 30)">
                      <path d="M 0 150 Q 2 110 3 70 Q 4 35 2 0" 
                            stroke="url(#leafGradient)" 
                            strokeWidth="3.5" 
                            fill="none"
                            strokeLinecap="round"/>
                      
                      <ellipse cx="5" cy="10" rx="5.5" ry="9" fill="url(#wheatGradient)"/>
                      <ellipse cx="0" cy="18" rx="5.5" ry="9" fill="url(#wheatGradient)"/>
                      <ellipse cx="5" cy="27" rx="5.5" ry="9" fill="url(#wheatGradient)"/>
                      <ellipse cx="1" cy="36" rx="5.5" ry="9" fill="url(#wheatGradient)"/>
                      <ellipse cx="4" cy="45" rx="5" ry="8" fill="url(#wheatGradient)" opacity="0.95"/>
                      <ellipse cx="2" cy="54" rx="5" ry="8" fill="url(#wheatGradient)" opacity="0.95"/>
                      <ellipse cx="3" cy="63" rx="4.5" ry="7" fill="url(#wheatGradient)" opacity="0.9"/>
                      
                      <line x1="0" y1="10" x2="-6" y2="3" stroke="#D4AF37" strokeWidth="1" opacity="0.8"/>
                      <line x1="-5" y1="18" x2="-11" y2="12" stroke="#D4AF37" strokeWidth="1" opacity="0.8"/>
                      <line x1="0" y1="27" x2="-6" y2="21" stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
                      <line x1="-4" y1="36" x2="-10" y2="30" stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
                    </g>
                    
                    {/* Right wheat stalk */}
                    <g transform="translate(125, 40)">
                      <path d="M -5 140 Q 0 100 2 60 Q 3 30 0 0" 
                            stroke="url(#leafGradient)" 
                            strokeWidth="3" 
                            fill="none"
                            strokeLinecap="round"/>
                      
                      <ellipse cx="4" cy="15" rx="5" ry="8" fill="url(#wheatGradient)" opacity="0.95"/>
                      <ellipse cx="-1" cy="22" rx="5" ry="8" fill="url(#wheatGradient)" opacity="0.95"/>
                      <ellipse cx="5" cy="30" rx="5" ry="8" fill="url(#wheatGradient)" opacity="0.9"/>
                      <ellipse cx="0" cy="38" rx="5" ry="8" fill="url(#wheatGradient)" opacity="0.9"/>
                      <ellipse cx="4" cy="46" rx="5" ry="7" fill="url(#wheatGradient)" opacity="0.85"/>
                      <ellipse cx="1" cy="54" rx="4.5" ry="7" fill="url(#wheatGradient)" opacity="0.85"/>
                      
                      <line x1="-1" y1="15" x2="-6" y2="8" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7"/>
                      <line x1="-6" y1="22" x2="-12" y2="16" stroke="#D4AF37" strokeWidth="0.8" opacity="0.7"/>
                      <line x1="0" y1="30" x2="-5" y2="24" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6"/>
                    </g>
                    
                    {/* Decorative leaves at the base */}
                    <g opacity="0.7">
                      <path d="M 70 170 Q 60 165 55 155" 
                            stroke="url(#leafGradient)" 
                            strokeWidth="2.5" 
                            fill="none"
                            strokeLinecap="round"/>
                      <path d="M 130 170 Q 140 165 145 155" 
                            stroke="url(#leafGradient)" 
                            strokeWidth="2.5" 
                            fill="none"
                            strokeLinecap="round"/>
                    </g>
                  </svg>
                </div>

                {/* Text Content - Smooth reveal */}
                <div 
                  className="flex flex-col text-[#1A5D1A]"
                  style={{
                    animation: phase === "reveal" ? 'text-reveal-smooth 1s ease-out 0.4s backwards' : 'none'
                  }}
                >
                  <h1 
                    className="text-5xl md:text-6xl font-black tracking-tight leading-none"
                    style={{ 
                      fontFamily: "'Inter', sans-serif", 
                      letterSpacing: '-0.02em',
                    }}
                  >
                    AGRICONNECT
                  </h1>
                  <p 
                    className="text-lg md:text-xl font-bold mt-2 text-center"
                    style={{ 
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: '0.4em',
                    }}
                  >
                    FARM TO FUTURE
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar - Enhanced */}
          {phase === "loading" && (
            <div className="w-full max-w-md">
              <div className="relative h-3 bg-white/40 backdrop-blur-sm rounded-full overflow-hidden shadow-lg border border-white/60">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 rounded-full transition-all duration-300 ease-out shadow-lg"
                  style={{ width: `${progress}%` }}
                >
                  {/* Progress bar glow tip */}
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/40" />
                </div>
              </div>
              
              {/* Progress percentage - enhanced */}
              <div className="text-center mt-4 text-emerald-800 font-bold text-lg tracking-wider">
                {Math.round(progress)}%
              </div>
            </div>
          )}

          {/* Loading Status Messages - Enhanced */}
          {phase === "loading" && (
            <div className="mt-8 text-center text-emerald-700 font-medium text-lg tracking-wide min-h-[2rem]">
              {progress < 20 && "🌱 Connecting to farmers..."}
              {progress >= 20 && progress < 40 && "🚜 Loading marketplace..."}
              {progress >= 40 && progress < 60 && "🍅 Fetching fresh produce..."}
              {progress >= 60 && progress < 80 && "📊 Updating live prices..."}
              {progress >= 80 && progress < 95 && "🌾 Preparing dashboard..."}
              {progress >= 95 && "✨ Almost ready..."}
            </div>
          )}
        </div>

        {/* Bottom gradient fade - enhanced */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-emerald-100/60 to-transparent pointer-events-none" />
        
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-emerald-100/60 to-transparent pointer-events-none" />
      </div>
    </>
  );
};

export default SplashScreen;