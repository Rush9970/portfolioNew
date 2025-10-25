import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import PersonalityCards from "@/components/PersonalityCards";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {isLoading && <LoadingScreen duration={3000} onComplete={() => setIsLoading(false)} />}
      <CustomCursor />
      <KonamiEasterEgg />
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <PersonalityCards />
      <Contact />
      
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Rushikesh Kapale. Built with React, TypeScript & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
