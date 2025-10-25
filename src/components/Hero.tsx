import { useEffect, useRef, useState } from "react";
import { Code2, Sparkles, Github, Linkedin, Mail, Instagram } from "lucide-react";

import { Button } from "./ui/button";

const Hero = () => {
  const [text, setText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fullText = "Rushikesh Kapale";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);

    const cursor = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);

    return () => {
      clearInterval(typing);
      clearInterval(cursor);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
        ctx.fill();

        particles.forEach((p2, idx2) => {
          if (idx2 <= idx) return;
          const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
          <Code2 className="w-6 h-6 text-primary animate-pulse" />
          <span className="text-muted-foreground font-mono">Portfolio</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-slide-up">
          <span className="text-gradient-cyber">
            {text}
            <span className={`${cursorVisible ? "opacity-100" : "opacity-0"}`}>|</span>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-secondary font-semibold mb-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          AI/ML Engineer & Full-Stack Developer
        </p>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          Building intelligent systems that transform complex problems into elegant solutions.
          Specialized in AI/ML, full-stack development, and creating impactful user experiences.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-scale-in" style={{ animationDelay: "0.6s" }}>
          <Button
            size="lg"
            className="group bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary"
            onClick={() => scrollToSection("projects")}
          >
            View My Work
            <Sparkles className="inline ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/50 hover:bg-primary/10"
            onClick={() => scrollToSection("contact")}
          >
            Get In Touch
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <a
            href="https://github.com/Rush9970"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/rushikesh-k"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-secondary transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:rushikeshkapale999@gmail.com"
            className="text-muted-foreground hover:text-accent transition-colors"
            aria-label="Email Contact"
          >
            <Mail className="w-6 h-6" />
          </a>
          <a
    href="https://www.instagram.com/rushi_kesh_k/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-pink-500 transition-colors"
    aria-label="Instagram Profile"
  >
    <Instagram className="w-6 h-6" />
  </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
