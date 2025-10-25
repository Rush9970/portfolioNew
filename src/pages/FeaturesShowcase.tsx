import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CustomCursor from "@/components/CustomCursor";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import SkillsRadarSection from "@/components/SkillsRadarSection";
import PersonalityCards from "@/components/PersonalityCards";
import PlayfulButtons from "@/components/PlayfulButtons";
import ParticleBackground from "@/components/ParticleBackground";

const FeaturesShowcase = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <KonamiEasterEgg />
      
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gradient-primary">
            Interactive Features Showcase
          </h1>
          <div className="w-32" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <ParticleBackground particleCount={30} />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient-cyber mb-6 animate-fade-in">
            ✨ Interactive Features ✨
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            A collection of engaging UI components and animations
          </p>
          <div className="glass-panel inline-block px-6 py-3 rounded-full animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-primary">
              💡 Tip: Try the Konami code - ↑ ↑ ↓ ↓ ← → ← → B A
            </p>
          </div>
        </div>
      </section>

      {/* Custom Cursor Demo */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gradient-primary mb-4">
              Custom Cursor
            </h2>
            <p className="text-lg text-muted-foreground">
              Move your mouse around to see the glowing cursor effect
            </p>
          </div>
          <div className="glass-panel p-12 rounded-2xl text-center">
            <p className="text-2xl mb-6">👆 Hover over interactive elements</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button className="cursor-hover">Hover Me</Button>
              <Button variant="outline" className="cursor-hover">And Me</Button>
              <Button variant="secondary" className="cursor-hover">Me Too!</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Radar Chart */}
      <SkillsRadarSection />

      {/* Particle Background Demo */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gradient-primary mb-4">
              Particle Background
            </h2>
            <p className="text-lg text-muted-foreground">
              Animated floating particles for visual interest
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative glass-panel p-8 rounded-2xl min-h-[300px] overflow-hidden">
              <ParticleBackground particleCount={25} color="rgba(139, 92, 246, 0.6)" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Purple Particles</h3>
                <p className="text-muted-foreground">
                  Particles bounce around the container creating a dynamic background effect.
                </p>
              </div>
            </div>
            <div className="relative glass-panel p-8 rounded-2xl min-h-[300px] overflow-hidden">
              <ParticleBackground particleCount={25} color="rgba(6, 182, 212, 0.6)" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Cyan Particles</h3>
                <p className="text-muted-foreground">
                  Customize the color and particle count to match your design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personality Cards */}
      <PersonalityCards />

      {/* Playful Buttons */}
      <PlayfulButtons />

      {/* Easter Egg Hint */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-panel p-8 rounded-2xl glow-primary">
            <h3 className="text-2xl font-bold mb-4">🎮 Hidden Easter Egg</h3>
            <p className="text-muted-foreground mb-4">
              There's a secret hidden on this page. Can you find it?
            </p>
            <p className="text-sm text-primary">
              Hint: It involves a classic gaming code...
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Built with React, TypeScript, Tailwind CSS & Canvas API</p>
          <p className="mt-2">All components are modular and reusable 🚀</p>
        </div>
      </footer>
    </div>
  );
};

export default FeaturesShowcase;
