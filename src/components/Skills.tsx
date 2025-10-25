import { useState, useEffect, useRef } from "react";
import { Brain, Layout, Server, Database, Code, Cloud } from "lucide-react";
import { Button } from "./ui/button";

interface SkillCategory {
  category: string;
  count: number;
  gradient: string;
}

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillIconProps {
  skill: SkillCategory;
  index: number;
  mousePos: { x: number; y: number } | null;
  onFilter: (category: string) => void;
}

const SkillIcon = ({ skill, index, mousePos, onFilter }: SkillIconProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!iconRef.current || !mousePos) return;

    const rect = iconRef.current.getBoundingClientRect();
    const iconX = rect.left + rect.width / 2;
    const iconY = rect.top + rect.height / 2;

    const distX = mousePos.x - iconX;
    const distY = mousePos.y - iconY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    const maxDistance = 200;
    const pullStrength = Math.max(0, 1 - distance / maxDistance);

    setPosition({
      x: distX * pullStrength * 0.3,
      y: distY * pullStrength * 0.3,
    });
  }, [mousePos]);

  const icons: Record<string, typeof Brain> = {
    "AI/ML": Brain,
    Frontend: Layout,
    Backend: Server,
    Database: Database,
    Languages: Code,
    "Cloud & Tools": Cloud,
  };

  const Icon = icons[skill.category] || Code;

  return (
    <div
      ref={iconRef}
      className="relative group cursor-pointer animate-fade-in"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.15s ease-out",
        animationDelay: `${index * 100}ms`,
      }}
      onClick={() => onFilter(skill.category)}
    >
      <div className={`glass-panel p-6 rounded-2xl bg-gradient-to-br ${skill.gradient} hover:scale-110 transition-all duration-300 glow-primary`}>
        <Icon className="w-8 h-8 text-white mb-3" />
        <div className="text-white font-semibold text-sm mb-1">{skill.category}</div>
        <div className="text-white/70 text-xs">{skill.count} skills</div>
      </div>

      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs whitespace-nowrap">
          Click to filter
        </div>
      </div>
    </div>
  );
};

interface SkillTagProps {
  name: string;
  level: number;
  category: string;
}

const SkillTag = ({ name, level, category }: SkillTagProps) => {
  return (
    <div className="animate-fade-in" data-category={category}>
      <div className="group relative glass-panel px-4 py-3 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer">
        <div className="flex items-center justify-between gap-3">
          <span className="text-foreground font-medium">{name}</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  i < level ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
      </div>
    </div>
  );
};

const Skills = () => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const skillCategories: SkillCategory[] = [
    { category: "AI/ML", count: 8, gradient: "from-primary to-accent" },
    { category: "Frontend", count: 5, gradient: "from-secondary to-primary" },
    { category: "Backend", count: 6, gradient: "from-accent to-secondary" },
    { category: "Database", count: 3, gradient: "from-primary to-secondary" },
    { category: "Languages", count: 6, gradient: "from-secondary to-accent" },
    { category: "Cloud & Tools", count: 4, gradient: "from-accent to-primary" },
  ];

  const skills: Skill[] = [
    { name: "TensorFlow", level: 4, category: "AI/ML" },
    { name: "LangChain", level: 5, category: "AI/ML" },
    { name: "Scikit-learn", level: 5, category: "AI/ML" },
   
    { name: "GenAI/LLMs", level: 5, category: "AI/ML" },
    { name: "Pandas", level: 5, category: "AI/ML" },
    { name: "NumPy", level: 5, category: "AI/ML" },
    { name: "RAG Systems", level: 5, category: "AI/ML" },
    { name: "React.js", level: 5, category: "Frontend" },
    { name: "TypeScript", level: 4, category: "Frontend" },
    { name: "Tailwind CSS", level: 5, category: "Frontend" },
    { name: "JavaScript", level: 5, category: "Frontend" },
    { name: "Figma", level: 4, category: "Frontend" },
    { name: "Node.js", level: 4, category: "Backend" },
    { name: "Express.js", level: 4, category: "Backend" },
    { name: "Spring Boot", level: 3, category: "Backend" },
    { name: "FastAPI", level: 5, category: "Backend" },
    { name: "Java", level: 3, category: "Backend" },
    { name: "Python", level: 5, category: "Backend" },
    { name: "PostgreSQL", level: 4, category: "Database" },
    { name: "MongoDB", level: 4, category: "Database" },
    { name: "ChromaDB", level: 4, category: "Database" },
    { name: "Python", level: 5, category: "Languages" },
    { name: "JavaScript", level: 5, category: "Languages" },
    { name: "TypeScript", level: 4, category: "Languages" },
   
    { name: "C++", level: 4, category: "Languages" },
    { name: "SQL", level: 4, category: "Languages" },
    { name: "Docker", level: 4, category: "Cloud & Tools" },
    { name: "Git", level: 5, category: "Cloud & Tools" },
    { name: "Postman", level: 5, category: "Cloud & Tools" },
    { name: "IntelliJ IDEA", level: 4, category: "Cloud & Tools" },
  ];

  const filteredSkills = activeFilter === "All" ? skills : skills.filter((s) => s.category === activeFilter);

  return (
    <section id="skills" className="py-24 px-6 bg-muted/20" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground">
            Hover over categories to see the magnetic effect
          </p>
        </div>

        {/* Magnetic Skill Icons */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {skillCategories.map((cat, index) => (
            <SkillIcon key={cat.category} skill={cat} index={index} mousePos={mousePos} onFilter={setActiveFilter} />
          ))}
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          <Button
            onClick={() => setActiveFilter("All")}
            variant={activeFilter === "All" ? "default" : "outline"}
            className={activeFilter === "All" ? "bg-gradient-to-r from-primary to-accent glow-primary" : "border-primary/50"}
          >
            All Skills
          </Button>
          {skillCategories.map((cat) => (
            <Button
              key={cat.category}
              onClick={() => setActiveFilter(cat.category)}
              variant={activeFilter === cat.category ? "default" : "outline"}
              className={
                activeFilter === cat.category
                  ? "bg-gradient-to-r from-primary to-accent glow-primary"
                  : "border-primary/50"
              }
            >
              {cat.category}
            </Button>
          ))}
        </div>

        {/* Skill Tags Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <SkillTag key={`${skill.name}-${skill.category}`} name={skill.name} level={skill.level} category={skill.category} />
          ))}
        </div>

        {/* Stats */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="glass-panel rounded-2xl p-8 inline-block glow-primary">
            <div className="text-5xl font-bold text-gradient-cyber mb-2">{skills.length}+</div>
            <div className="text-muted-foreground">Worked used across all Projects</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
