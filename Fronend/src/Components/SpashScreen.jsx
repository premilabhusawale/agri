import { useState, useEffect } from "react";
import { Leaf } from "lucide-react";

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading, reveal, complete
  const [mounted] = useState(true);
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

  // Reduced produce images - only 4 for clean crisscross
  const produceImages = [
    { url: 'https://i.pinimg.com/1200x/1b/68/e6/1b68e67e68f729cd06180e53cb89814c.jpg', name: 'Tomatoes', direction: 'tl-br' },
    { url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&h=200&fit=crop', name: 'Carrots', direction: 'tr-bl' },
    { url: 'https://i.pinimg.com/736x/34/ec/4b/34ec4b5bd89e459c2367013568a62455.jpg', name: 'Broccoli', direction: 'bl-tr' },
    { url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=200&fit=crop', name: 'Apples', direction: 'br-tl' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes float-smooth {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.02); }
        }
        
        @keyframes leaf-grow {
          0% { 
            opacity: 0; 
            transform: scale(0.3) rotate(-30deg);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.15) rotate(8deg);
          }
          100% { 
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        /* Crisscross hop: Top-Left to Bottom-Right */
        @keyframes hop-tl-br {
          0% { 
            opacity: 0; 
            transform: translate(-300px, -300px) scale(0.3) rotate(-180deg);
          }
          50% { 
            transform: translate(140px, 140px) scale(1.2) rotate(20deg);
          }
          75% {
            transform: translate(125px, 125px) scale(0.95) rotate(-5deg);
          }
          100% { 
            opacity: 1; 
            transform: translate(130px, 130px) scale(1) rotate(0deg);
          }
        }
        
        /* Crisscross hop: Top-Right to Bottom-Left */
        @keyframes hop-tr-bl {
          0% { 
            opacity: 0; 
            transform: translate(300px, -300px) scale(0.3) rotate(180deg);
          }
          50% { 
            transform: translate(-140px, 140px) scale(1.2) rotate(-20deg);
          }
          75% {
            transform: translate(-125px, 125px) scale(0.95) rotate(5deg);
          }
          100% { 
            opacity: 1; 
            transform: translate(-130px, 130px) scale(1) rotate(0deg);
          }
        }
        
        /* Crisscross hop: Bottom-Left to Top-Right */
        @keyframes hop-bl-tr {
          0% { 
            opacity: 0; 
            transform: translate(-300px, 300px) scale(0.3) rotate(180deg);
          }
          50% { 
            transform: translate(140px, -140px) scale(1.2) rotate(20deg);
          }
          75% {
            transform: translate(125px, -125px) scale(0.95) rotate(-5deg);
          }
          100% { 
            opacity: 1; 
            transform: translate(130px, -130px) scale(1) rotate(0deg);
          }
        }
        
        /* Crisscross hop: Bottom-Right to Top-Left */
        @keyframes hop-br-tl {
          0% { 
            opacity: 0; 
            transform: translate(300px, 300px) scale(0.3) rotate(-180deg);
          }
          50% { 
            transform: translate(-140px, -140px) scale(1.2) rotate(-20deg);
          }
          75% {
            transform: translate(-125px, -125px) scale(0.95) rotate(5deg);
          }
          100% { 
            opacity: 1; 
            transform: translate(-130px, -130px) scale(1) rotate(0deg);
          }
        }
        
        @keyframes fade-out-scale {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.3);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.4;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.08);
          }
        }
        
        @keyframes slide-up {
          0% { 
            opacity: 0; 
            transform: translateY(40px);
            filter: blur(4px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0);
            filter: blur(0);
          }
        }
        
        @keyframes produce-float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.4;
          }
          25% { 
            transform: translateY(-15px) translateX(8px) rotate(8deg);
            opacity: 0.5;
          }
          50% { 
            transform: translateY(-8px) translateX(-8px) rotate(-8deg);
            opacity: 0.45;
          }
          75% { 
            transform: translateY(-20px) translateX(5px) rotate(5deg);
            opacity: 0.48;
          }
        }
        
        @keyframes particle-float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes text-glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(251, 146, 60, 0.3),
                         0 0 40px rgba(251, 146, 60, 0.2);
          }
          50% {
            text-shadow: 0 0 30px rgba(251, 146, 60, 0.5),
                         0 0 60px rgba(251, 146, 60, 0.3),
                         0 0 80px rgba(251, 146, 60, 0.2);
          }
        }
        
        .splash-container {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, 
            #0f2818 0%, 
            #1a4d2e 20%,
            #245a3a 40%, 
            #2d6e45 60%, 
            #245a3a 80%,
            #1a4d2e 100%);
          background-size: 200% 200%;
          animation: gradient-shift 10s ease infinite;
          overflow: hidden;
        }
        
        .grain-texture {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
          opacity: 0.7;
          pointer-events: none;
          mix-blend-mode: overlay;
        }
        
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.2;
          animation: float-smooth 10s ease-in-out infinite;
        }
        
        .produce-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      `}</style>

      <div className="splash-container" style={{ zIndex: 99999 }}>
        {/* Grain texture overlay */}
        <div className="grain-texture" />
        
        {/* Enhanced glowing ambient orbs */}
        <div 
          className="glow-orb"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(251, 146, 60, 0.5), rgba(249, 115, 22, 0.3), transparent)',
            top: '-250px',
            right: '-250px',
            animationDelay: '0s',
            animationDuration: '12s',
          }}
        />
        <div 
          className="glow-orb"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4), rgba(22, 163, 74, 0.2), transparent)',
            bottom: '-200px',
            left: '-200px',
            animationDelay: '3s',
            animationDuration: '15s',
          }}
        />
        <div 
          className="glow-orb"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3), transparent)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animationDelay: '5s',
            animationDuration: '18s',
          }}
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            style={{
              position: "absolute",
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: "rgba(251, 146, 60, 0.6)",
              borderRadius: "50%",
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `particle-float ${particle.duration}s linear infinite`,
              animationDelay: `${particle.delay}s`,
              boxShadow: "0 0 10px rgba(251, 146, 60, 0.4)",
            }}
          />
        ))}

        {/* Floating produce emojis - enhanced */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
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
              style={{
                position: "absolute",
                fontSize: `clamp(${20 * item.size}px, ${2.5 * item.size}vw, ${36 * item.size}px)`,
                left: item.left,
                top: item.top,
                animation: `produce-float ${7 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${item.delay}s`,
                filter: 'blur(0.3px)',
              }}
            >
              {item.emoji}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {/* Logo Section - TRUE Crisscross hopping */}
          <div
            style={{
              position: "relative",
              marginBottom: "60px",
              width: "280px",
              height: "280px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* 4 Produce images hop in CRISSCROSS pattern */}
            {produceImages.map((produce, index) => {
              const threshold = 20 + (index * 15);
              const shouldShow = progress > threshold && progress < 85;
              
              if (!shouldShow) return null;
              
              // Get the animation based on direction
              const animationName = `hop-${produce.direction}`;
              
              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    width: "80px",
                    height: "80px",
                    animation: progress > 80 
                      ? "fade-out-scale 0.5s ease-out forwards" 
                      : `${animationName} 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                    filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5))",
                    zIndex: 2,
                  }}
                >
                  <img 
                    src={produce.url} 
                    alt={produce.name}
                    className="produce-img"
                  />
                </div>
              );
            })}

            {/* Logo appears with BOOM after crisscross */}
            {progress > 85 && (
              <div
                style={{
                  position: "relative",
                  width: "160px",
                  height: "160px",
                  background: "linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%)",
                  borderRadius: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `
                    0 25px 60px rgba(251, 146, 60, 0.5),
                    0 10px 30px rgba(251, 146, 60, 0.3),
                    0 0 100px rgba(251, 146, 60, 0.25),
                    inset 0 1px 1px rgba(255, 255, 255, 0.3),
                    inset 0 -2px 3px rgba(0, 0, 0, 0.2)
                  `,
                  animation: "leaf-grow 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: "translateZ(0)",
                  zIndex: 3,
                }}
              >
                {/* Lucide Leaf icon */}
                <Leaf
                  size={90}
                  strokeWidth={2}
                  style={{
                    color: "#ffffff",
                    filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))",
                    animation: phase === "reveal" ? "pulse-glow 2.5s ease-in-out infinite" : "none",
                  }}
                />

                {/* Inner glow */}
                <div
                  style={{
                    position: "absolute",
                    inset: "12px",
                    borderRadius: "24px",
                    background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.25), transparent 60%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Pulsing outer glow on reveal */}
                {phase === "reveal" && (
                  <div
                    style={{
                      position: "absolute",
                      inset: "-25px",
                      borderRadius: "40px",
                      background: "radial-gradient(circle, rgba(251, 146, 60, 0.5), transparent 70%)",
                      animation: "pulse-glow 2.5s ease-in-out infinite",
                    }}
                  />
                )}
              </div>
            )}
          </div>

          {/* Brand Name - Enhanced typography */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "50px",
              animation: mounted ? "slide-up 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both" : "none",
            }}
          >
            <h1
              style={{
                fontFamily: "'Inter', -apple-system, sans-serif",
                fontSize: "clamp(44px, 7vw, 72px)",
                fontWeight: 900,
                margin: 0,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                animation: phase === "reveal" ? "text-glow 2s ease-in-out infinite" : "none",
              }}
            >
              <span style={{ 
                color: "#ffffff",
                textShadow: "0 2px 20px rgba(0, 0, 0, 0.3)",
              }}>
                Agri
              </span>
              <span style={{ 
                color: "#fb923c",
                textShadow: "0 0 30px rgba(251, 146, 60, 0.4), 0 2px 20px rgba(0, 0, 0, 0.3)",
              }}>
                Connect
              </span>
            </h1>
            <p
              style={{
                fontFamily: "'Inter', -apple-system, sans-serif",
                fontSize: "clamp(12px, 1.6vw, 15px)",
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.65)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginTop: "14px",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              Farm to Future
            </p>
          </div>

          {/* Progress Bar - Enhanced */}
          {phase === "loading" && (
            <div
              style={{
                width: "min(460px, 85%)",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  background: "rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #fb923c 0%, #f97316 25%, #fb923c 50%, #f97316 75%, #fb923c 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s linear infinite",
                    width: `${progress}%`,
                    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: `
                      0 0 25px rgba(251, 146, 60, 0.7),
                      0 0 40px rgba(251, 146, 60, 0.4),
                      inset 0 1px 1px rgba(255, 255, 255, 0.3)
                    `,
                    borderRadius: "12px",
                    position: "relative",
                  }}
                >
                  {/* Progress bar glow tip */}
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "20px",
                      height: "12px",
                      background: "radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent)",
                      borderRadius: "50%",
                      filter: "blur(3px)",
                    }}
                  />
                </div>
              </div>
              
              {/* Progress percentage - enhanced */}
              <div
                style={{
                  textAlign: "center",
                  marginTop: "14px",
                  fontFamily: "'Inter', -apple-system, sans-serif",
                  fontSize: "13px",
                  color: "rgba(255, 255, 255, 0.5)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
                }}
              >
                {Math.round(progress)}%
              </div>
            </div>
          )}

          {/* Loading Status Messages - Enhanced */}
          {phase === "loading" && (
            <div
              style={{
                fontFamily: "'Inter', -apple-system, sans-serif",
                fontSize: "15px",
                color: "rgba(255, 255, 255, 0.85)",
                letterSpacing: "0.02em",
                textAlign: "center",
                fontWeight: 600,
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
                minHeight: "24px",
                transition: "all 0.3s ease",
              }}
            >
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
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "140px",
            background: "linear-gradient(to top, rgba(15, 40, 24, 0.95), rgba(26, 77, 46, 0.5), transparent)",
            pointerEvents: "none",
          }}
        />

        {/* Top gradient fade */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100px",
            background: "linear-gradient(to bottom, rgba(15, 40, 24, 0.8), transparent)",
            pointerEvents: "none",
          }}
        />
      </div>
    </>
  );
};

export default SplashScreen;