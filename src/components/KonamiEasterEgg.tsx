import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const KonamiEasterEgg = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [foundEggs, setFoundEggs] = useState<Set<number>>(new Set());
  const [secretMessage, setSecretMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showDiscoBall, setShowDiscoBall] = useState(false);
  const [ghostCursors, setGhostCursors] = useState<Array<{ x: number; y: number; delay: number }>>([]);
  const [device, setDevice] = useState<"pc" | "mobile">("pc");

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  const [konamiIndex, setKonamiIndex] = useState(0);

  const foundEgg = (eggNumber: number, message: string) => {
    if (!foundEggs.has(eggNumber)) {
      const newFoundEggs = new Set(foundEggs);
      newFoundEggs.add(eggNumber);
      setFoundEggs(newFoundEggs);
      
      setSecretMessage(`🎉 Easter Egg #${eggNumber}: ${message} 🎉`);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);

      if (newFoundEggs.size === 10) {
        setTimeout(() => {
          alert('🏆 AMAZING! You found all 10 Easter Eggs! 🏆\n\nYou are a true explorer!');
        }, 3500);
      }
    }
  };


useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    setDevice(isMobile ? "mobile" : "pc");
  }, []);


  useEffect(() => {
    const hintsPC = [
      "💡 Try typing 'matrix' for a cool effect!",
      "🎶 Type 'dance' for a party mode!",
      "✨ Type 'disco' and see the magic!",
      "🎯 Hold 'C' for 3 seconds for confetti!",
      "🌀 Try typing 'gravity' to defy physics!",
      "👻 Type 'ghost' to see something spooky!",
      "🔄 Press Ctrl + Shift + F to flip the world!",
      "🎮 Try the Konami Code ↑↑↓↓←→←→BA",
    ];

    const hintsMobile = [
      "📱 Try typing 'dance' for mobile fun!",
      "💫 Type 'disco' for a shiny surprise!",
      "🌈 Type 'matrix' for a digital rain!",
      "🔥 Long press anywhere for a quick animation!",
      "👻 Type 'ghost' for some spooky fun!",
      "🌀 Type 'gravity' for chaos!",
    ];

    const hints = device === "pc" ? hintsPC : hintsMobile;

    // 🕒 Show hint after 60s
    const timeTimer = setTimeout(() => {
      const hint = hints[Math.floor(Math.random() * hints.length)];
      setSecretMessage(hint);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 6000);
    }, 60000);


    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      if (scrollPercent >= 95) {
        const hint = hints[Math.floor(Math.random() * hints.length)];
        setSecretMessage(hint);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 6000);
        window.removeEventListener("scroll", handleScroll);
      }
    };


      window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timeTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [device]);
  
  useEffect(() => {
    let typedText = '';
    let cHoldTimer: NodeJS.Timeout | null = null;
    let flipActive = false;
    let clickCount = 0;
    let clickTimer: NodeJS.Timeout | null = null;

    // Triple Click Handler
    const handleTripleClick = () => {
      clickCount++;
      if (clickTimer) clearTimeout(clickTimer);
      
      if (clickCount === 3) {
        foundEgg(10, "Triple Click Secret!");
        const elements = document.querySelectorAll('.glass-panel, section');
        elements.forEach((el) => {
          (el as HTMLElement).style.background = 'linear-gradient(135deg, hsl(258, 90%, 66%), hsl(188, 96%, 43%))';
          (el as HTMLElement).style.transform = 'scale(1.05)';
          setTimeout(() => {
            (el as HTMLElement).style.background = '';
            (el as HTMLElement).style.transform = '';
          }, 1000);
        });
        clickCount = 0;
      }
      
      clickTimer = setTimeout(() => clickCount = 0, 500);
    };

    document.addEventListener('click', handleTripleClick);

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const expectedKey = konamiCode[konamiIndex].toLowerCase();

      // Konami Code
      if (key === expectedKey) {
        const newIndex = konamiIndex + 1;
        setKonamiIndex(newIndex);

        if (newIndex === konamiCode.length) {
          setIsVisible(true);
          foundEgg(1, "Konami Code!");
          setKonamiIndex(0);
        }
      } else {
        setKonamiIndex(0);
      }

      // Hold C for Confetti
      if (key === 'c' && !cHoldTimer) {
        cHoldTimer = setTimeout(() => {
          createConfetti();
          foundEgg(2, "Confetti!");
        }, 3000);
      }

      // Flip Mode (Ctrl+Shift+F)
      if (e.ctrlKey && e.shiftKey && key === 'f') {
        e.preventDefault();
        flipActive = !flipActive;
        document.body.style.transform = flipActive ? 'rotate(180deg)' : '';
        document.body.style.transition = 'transform 1s ease';
        if (!foundEggs.has(3)) foundEgg(3, "Flip Mode!");
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'c' && cHoldTimer) {
        clearTimeout(cHoldTimer);
        cHoldTimer = null;
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      typedText += e.key;
      typedText = typedText.slice(-10);

      if (typedText.includes('matrix')) {
        toggleMatrix();
        foundEgg(4, "Matrix Mode!");
        typedText = '';
      }
      if (typedText.includes('dance')) {
        toggleDance();
        foundEgg(5, "Dance Party!");
        typedText = '';
      }
      if (typedText.includes('shake')) {
        shakeScreen();
        foundEgg(6, "Shake!");
        typedText = '';
      }
      if (typedText.includes('gravity')) {
        activateGravity();
        foundEgg(7, "Gravity Mode!");
        typedText = '';
      }
      if (typedText.includes('ghost')) {
        activateGhostCursors();
        foundEgg(8, "Ghost Cursors!");
        typedText = '';
      }
      if (typedText.includes('disco')) {
        toggleDisco();
        foundEgg(9, "Disco Ball!");
        typedText = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keypress', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keypress', handleKeyPress);
      document.removeEventListener('click', handleTripleClick);
      if (cHoldTimer) clearTimeout(cHoldTimer);
      if (clickTimer) clearTimeout(clickTimer);
    };
  }, [konamiIndex, foundEggs]);

  // Ghost Cursors Effect
  useEffect(() => {
    if (ghostCursors.length === 0) return;

    const handleMouseMove = (e: MouseEvent) => {
      setGhostCursors((prev) =>
        prev.map((ghost) => ({ ...ghost, x: e.clientX, y: e.clientY }))
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [ghostCursors.length]);

  const createConfetti = () => {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.borderRadius = '50%';
        document.body.appendChild(confetti);
        
        const duration = 2000 + Math.random() * 1000;
        confetti.animate([
          { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          { transform: `translateY(${window.innerHeight}px) rotate(${360 + Math.random() * 360}deg)`, opacity: '0' }
        ], { duration, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }).onfinish = () => confetti.remove();
      }, i * 20);
    }
  };

  const toggleMatrix = () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '9998';
    canvas.style.pointerEvents = 'none';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);
    
    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'hsl(258, 90%, 66%)';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 33);
    
    setTimeout(() => {
      clearInterval(interval);
      canvas.remove();
    }, 5000);
  };

  const toggleDance = () => {
    document.body.style.animation = 'rainbowBg 2s linear infinite, dance 0.5s ease-in-out infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  };

  const shakeScreen = () => {
    document.body.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 500);
  };

  const activateGravity = () => {
    const elements = document.querySelectorAll('section, .glass-panel, h1, h2');
    elements.forEach((el, index) => {
      setTimeout(() => {
        (el as HTMLElement).style.transition = 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        (el as HTMLElement).style.transform = 'translateY(1000px) rotate(20deg)';
        
        setTimeout(() => {
          (el as HTMLElement).style.transform = '';
          setTimeout(() => {
            (el as HTMLElement).style.transition = '';
          }, 100);
        }, 2000);
      }, index * 200);
    });
  };

  const activateGhostCursors = () => {
    const ghosts = [];
    for (let i = 0; i < 5; i++) {
      ghosts.push({ x: 0, y: 0, delay: i * 100 });
    }
    setGhostCursors(ghosts);
    
    setTimeout(() => {
      setGhostCursors([]);
    }, 5000);
  };

  const toggleDisco = () => {
    setShowDiscoBall(true);
    setTimeout(() => {
      setShowDiscoBall(false);
    }, 5000);
  };

  if (!isVisible && !showMessage && !showDiscoBall && ghostCursors.length === 0) return null;

  return (
    <>
      {/* Secret Message Toast */}
      {showMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] animate-fade-in">
          <div className="bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl glow-primary">
            {secretMessage}
          </div>
        </div>
      )}

      {/* Easter Egg Counter */}
      {foundEggs.size > 0 && (
        <div className="fixed top-4 right-4 z-[9999] glass-panel px-4 py-2 rounded-xl border border-primary/30">
          <span className="text-sm text-muted-foreground">Easter Eggs: </span>
          <span className="text-primary font-bold">{foundEggs.size}/10</span>
        </div>
      )}

      {/* Ghost Cursors */}
      {ghostCursors.map((ghost, i) => (
        <div
          key={i}
          className="fixed w-5 h-5 rounded-full pointer-events-none z-[9997] transition-all duration-100"
          style={{
            left: `${ghost.x}px`,
            top: `${ghost.y}px`,
            background: 'rgba(168, 85, 247, 0.5)',
            transitionDelay: `${ghost.delay}ms`,
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.8)',
          }}
        />
      ))}

      {/* Disco Ball */}
      {showDiscoBall && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full z-[9999] animate-spin-slow"
          style={{
            background: `
              linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.5) 70%, transparent 70%),
              linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.3) 70%, transparent 70%)
            `,
            backgroundSize: '40px 40px',
            boxShadow: '0 0 50px rgba(255, 255, 255, 0.5), inset 0 0 50px rgba(255, 255, 255, 0.3)',
          }}
        />
      )}

      {/* Konami Overlay */}
      {isVisible && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in">
          <div className="text-center animate-scale-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-pulse-glow">
              <span className="text-gradient-cyber">🎮 LEGENDARY! 🎮</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary mb-4">
              You unlocked the Konami Code!
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              🏆 Achievement Unlocked: Master Developer 🏆
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              ↑ ↑ ↓ ↓ ← → ← → B A
            </p>
            <Button
              onClick={() => setIsVisible(false)}
              className="bg-gradient-to-r from-primary to-accent glow-primary"
              size="lg"
            >
              Continue
            </Button>
            <div className="mt-8 text-xs text-muted-foreground">
              <p>💡 Hint: There are 10 easter eggs hidden. Keep exploring!</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KonamiEasterEgg;
