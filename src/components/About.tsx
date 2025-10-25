import { Award, Code, Trophy, Target } from "lucide-react";

const About = () => {
  const stats = [
    { value: "99.38%", label: "JEE Rank", sublabel: "Top 0.62%", icon: Trophy },
    { value: "10+", label: "Projects", sublabel: "Full-Stack & AI", icon: Code },
    { value: "8.17", label: "CGPA", sublabel: "IIT Madras", icon: Award },
    { value: "8+", label: "Months", sublabel: "Professional Exp", icon: Target },
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass-panel rounded-2xl p-8 md:p-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-6">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
  Hi! I’m <span className="text-primary font-semibold">Rushikesh Kapale</span>, a Chemical Engineering undergraduate at 
  <span className="text-primary font-semibold"> IIT Madras (Batch of 2026)</span> with a strong passion for 
  software engineering, AI, and full-stack development. Over the past few years, I’ve transitioned from core engineering 
  into the world of technology — building scalable web applications, experimenting with LLMs and GenAI, and working on 
  products that blend AI with automation. I’ve interned at <span className="text-primary font-semibold">AI24C</span>, 
  an AI-driven SaaS startup, where I developed microservices in Spring Boot, integrated LLM-based workflows, and helped 
  enhance an automation platform from the ground up. Before that, I worked as a Frontend Developer at 
  <span className="text-primary font-semibold"> Shaastra, IIT Madras</span>, building and maintaining production-level 
  ReactJS applications visited by over a million users during IITM’s flagship tech fest. Beyond tech, I enjoy watching 
  documentaries, gardening, practicing yoga, and exploring new ideas that spark creativity and curiosity.
</p>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass-panel rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300 glow-primary"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-gradient-cyber mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
