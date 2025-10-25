import { useState } from "react";
import { Button } from "./ui/button";
import { Sparkles, Zap, Rocket } from "lucide-react";

const PlayfulButtons = () => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now(),
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <section className="py-24 px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            Interactive Buttons
          </h2>
          <p className="text-lg text-muted-foreground">
            Hover and click to see the magic ✨
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {/* Glow Button */}
          <Button
            size="lg"
            className="btn-glow bg-gradient-to-r from-primary to-accent text-white font-bold px-8 py-6 text-lg rounded-full hover:scale-110 transition-all duration-300 glow-primary"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Glow Effect
          </Button>

          {/* Ripple Button */}
          <Button
            size="lg"
            variant="outline"
            className="btn-ripple relative overflow-hidden border-2 border-primary text-primary font-bold px-8 py-6 text-lg rounded-full hover:bg-primary/10 transition-all duration-300"
            onClick={createRipple}
          >
            <Zap className="w-5 h-5 mr-2" />
            Ripple Effect
            {ripples.map(ripple => (
              <span
                key={ripple.id}
                className="ripple-effect"
                style={{
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                }}
              />
            ))}
          </Button>

          {/* Shake Button */}
          <Button
            size="lg"
            className="btn-shake bg-gradient-to-r from-accent to-secondary text-white font-bold px-8 py-6 text-lg rounded-full hover:animate-shake transition-all duration-300 glow-accent"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Shake on Hover
          </Button>
        </div>

        {/* Loading Demo */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gradient-cyber mb-8">
            Loading Animation
          </h3>
          <div className="flex justify-center">
            <div className="loader-dots">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayfulButtons;
