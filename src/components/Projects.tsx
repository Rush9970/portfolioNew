import { Brain, ShoppingBag, Shield, Activity, ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const projects = [
  {
    title: "AI Document Intelligence",
    description:
      "Advanced RAG system with LangChain for intelligent document processing and retrieval",
    metrics: "2x retrieval boost • Processes 2000+ pages",
    tags: ["RAG", "LangChain", "Python", "AI"],
    icon: Brain,
    gradient: "from-primary to-accent",
    github: "https://github.com/Rush9970/Ragapplication",
    demo: "*",
  },
  {
    title: "Shop Smarter",
    description:
      "Multimodal AI search engine using CLIP for enhanced product recommendations",
    metrics: "27% better recommendations • CLIP-powered",
    tags: ["CLIP", "AI", "React", "Python"],
    icon: ShoppingBag,
    gradient: "from-secondary to-primary",
    github: "https://github.com/Rush9970/shopsmarter",
    demo: "*",
  },
  {
    title: "Fraud Detection Pipeline",
    description:
      "ML pipeline for detecting fraudulent transactions with high accuracy",
    metrics: "0.9767 AUC-ROC • Handles 0.173% fraud rate",
    tags: ["ML", "Python", "Scikit-learn", "FastAPI"],
    icon: Shield,
    gradient: "from-accent to-secondary",
    github: "https://github.com/Rush9970/credicardFrod",
    demo: "*",
  },
  {
    title: "DDoS Attack Classifier",
    description:
      "High-performance classifier for network traffic analysis and attack detection",
    metrics: "97.6% accuracy • 20M+ records analyzed",
    tags: ["ML", "TensorFlow", "Python", "Analytics"],
    icon: Activity,
    gradient: "from-primary to-secondary",
    github: "https://github.com/Rush9970/Cyber-Attack-Pretdictor",
    demo: "*",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground">
            Transforming ideas into impactful solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group glass-panel rounded-2xl p-8 hover:scale-[1.03] transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${project.gradient} mb-4 glow-primary`}
              >
                <project.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-gradient-primary transition-all">
                {project.title}
              </h3>

              <p className="text-muted-foreground mb-4">{project.description}</p>

              <div className="flex items-center gap-2 text-sm font-semibold text-secondary mb-6">
                <Activity className="w-4 h-4" />
                {project.metrics}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-primary/50">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-primary/50 hover:bg-primary/10"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                </a>
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-secondary/50 hover:bg-secondary/10"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
