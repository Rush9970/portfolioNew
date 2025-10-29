import { useEffect, useState, useRef } from "react";

interface LoadingScreenProps {
  duration?: number;
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  fadeSpeed: number;
}

const LoadingScreen = ({ duration = 3500, onComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [showSubtext, setShowSubtext] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  const words = ["WELCOME", "TO", "MY", "PORTFOLIO"];

  useEffect(() => {
    // Progress bar animation
    const progressDuration = duration - 800;
    const progressInterval = 20;
    const progressIncrement = (100 / progressDuration) * progressInterval;

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const next = prev + progressIncrement;
        if (next >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return next;
      });
    }, progressInterval);

    // Word animation timing
    const wordTimings = [0, 300, 600, 900];
    const wordTimers = wordTimings.map((delay, index) => 
      setTimeout(() => setCurrentWord(index + 1), delay)
    );

    setTimeout(() => setShowSubtext(true), 1400);

    // Particle system
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    for (let i = 0; i < 60; i++) {
      particlesRef.current.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.opacity -= particle.fadeSpeed;

        if (particle.opacity <= 0) {
          particlesRef.current[index] = createParticle();
          return;
        }

        // Gradient particles
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, `rgba(99, 102, 241, ${particle.opacity})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${particle.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(167, 139, 250, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Complete animation
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 800);
    }, duration);

    return () => {
      clearInterval(progressTimer);
      wordTimers.forEach(timer => clearTimeout(timer));
      clearTimeout(completeTimer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [duration, onComplete]);

  const createParticle = (): Particle => {
    const side = Math.floor(Math.random() * 4);
    let x, y;
    
    switch(side) {
      case 0: x = Math.random() * window.innerWidth; y = 0; break;
      case 1: x = window.innerWidth; y = Math.random() * window.innerHeight; break;
      case 2: x = Math.random() * window.innerWidth; y = window.innerHeight; break;
      default: x = 0; y = Math.random() * window.innerHeight;
    }

    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 3 + 2,
      opacity: Math.random() * 0.6 + 0.3,
      fadeSpeed: Math.random() * 0.003 + 0.001
    };
  };

  if (!isVisible) return null;

  return (
    <div className={`loading-screen ${isComplete ? 'fade-out' : ''}`}>
      <canvas ref={canvasRef} className="particle-canvas" />
      
      <div className="content-wrapper">
        <div className="logo-container">
          <div className="logo-circle">
            <svg viewBox="0 0 100 100" className="logo-svg">
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                className="logo-ring"
                style={{
                  strokeDashoffset: 283 - (283 * Math.min(progress, 100)) / 100
                }}
              />
            </svg>
            <div className="logo-initial">RK</div>
          </div>
        </div>

        <div className="words-container">
          {words.map((word, index) => (
            <div 
              key={word}
              className={`word ${index < currentWord ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {word}
            </div>
          ))}
        </div>

        <div className={`subtext ${showSubtext ? 'visible' : ''}`}>
          <div className="subtext-line"></div>
          <div className="separator"></div>
          <div className="subtext-line small"></div>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="progress-text">{Math.round(progress)}%</div>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .loading-screen.fade-out {
          opacity: 0;
        }

        .particle-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .content-wrapper {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 90%;
        }

        .logo-container {
          margin-bottom: 3rem;
          animation: fade-scale-in 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo-circle {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto;
        }

        .logo-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .logo-ring {
          fill: none;
          stroke: url(#logo-gradient);
          stroke-width: 3;
          stroke-linecap: round;
          stroke-dasharray: 283;
          transition: stroke-dashoffset 0.3s ease-out;
          filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.6));
        }

        .logo-initial {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: glow-pulse 2s ease-in-out infinite;
        }

        .words-container {
          display: flex;
          gap: clamp(0.8rem, 2vw, 1.5rem);
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 2rem;
          padding: 0 1rem;
        }

        .word {
          font-size: clamp(1.8rem, 5vw, 3.5rem);
          font-weight: 300;
          letter-spacing: 0.08em;
          color: #ffffff;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .word.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .subtext {
          opacity: 0;
          transform: translateY(15px);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
          margin-bottom: 3rem;
        }

        .subtext.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .subtext-line {
          font-size: clamp(1rem, 2vw, 1.3rem);
          font-weight: 500;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.9);
          margin: 0.3rem 0;
        }

        .subtext-line.small {
          font-size: clamp(0.75rem, 1.5vw, 0.95rem);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 0.15em;
        }

        .separator {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #8b5cf6, transparent);
          margin: 1rem auto;
        }

        .progress-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .progress-bar {
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 0.8rem;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa);
          border-radius: 10px;
          transition: width 0.3s ease-out;
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.6);
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 30px;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4));
          animation: shimmer 1.5s infinite;
        }

        .progress-text {
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.1em;
        }

        @keyframes fade-scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 5px rgba(139, 92, 246, 0.8));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(139, 92, 246, 1));
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }

        @media (max-width: 768px) {
          .words-container {
            gap: 0.5rem;
          }
          
          .logo-circle {
            width: 100px;
            height: 100px;
          }

          .logo-initial {
            font-size: 2.5rem;
          }
        }
      `}</style>

      <svg width="0" height="0">
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default LoadingScreen;