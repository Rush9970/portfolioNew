import { useEffect, useState } from "react";

interface LoadingScreenProps {
  duration?: number;
  onComplete?: () => void;
}

const LoadingScreen = ({ duration = 1000, onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const increment = 100 / (duration / 50); // Update every 50ms
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Hide loading screen after completion
          setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 300);
          
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`loading-screen ${progress >= 100 ? 'fade-out' : ''}`}>
      {/* Animated Logo/Text */}
      <div className="loading-logo">
        RUSHIKESH
      </div>
      
      {/* Circular Progress Loader */}
      <div className="circular-loader">
        <svg viewBox="0 0 120 120">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'hsl(258, 90%, 66%)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(188, 96%, 43%)', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <circle className="bg-circle" cx="60" cy="60" r="54"></circle>
          <circle 
            className="progress-circle" 
            cx="60" 
            cy="60" 
            r="54"
            style={{
              strokeDashoffset: 339 - (339 * progress) / 100
            }}
          ></circle>
        </svg>
      </div>

      <div className="loading-text">LOADING</div>
      
      <div className="progress-container">
        <div 
          className="progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="percentage">{Math.round(progress)}%</div>
    </div>
  );
};

export default LoadingScreen;
