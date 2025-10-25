import { useState, useEffect, useRef } from "react";
import { Mail, Github, Linkedin, MapPin, Send, Terminal, Copy, Check } from "lucide-react";
import { Button } from "./ui/button";

const Contact = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copied, setCopied] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, { description: string; action: () => string[] | null }> = {
    help: {
      description: "Show available commands",
      action: () => [
        "Available commands:",
        "  help       - Show this help message",
        "  about      - Learn about Rushikesh",
        "  contact    - Show contact information",
        "  skills     - List technical skills",
        "  projects   - View recent projects",
        "  social     - Show social media links",
        "  email      - Open email client",
        "  clear      - Clear terminal",
        "",
        "Tip: Use ↑↓ arrows to navigate command history",
      ],
    },
    about: {
      description: "Learn about Rushikesh",
      action: () => [
        "╔════════════════════════════════════════════╗",
        "║  Rushikesh Shankarrao Kapale               ║",
        "║  AI/ML Engineer & Full-Stack Developer     ║",
        "╚════════════════════════════════════════════╝",
        "",
        "📍 Location: IIT Madras, Chennai",
        "🎓 Education: B.Tech Chemical Engineering",
        "📊 CGPA: 8.17/10",
        "🏆 JEE Main: 99.38 percentile",
        "",
        "Passionate about building intelligent systems",
        "that solve real-world problems.",
      ],
    },
    contact: {
      description: "Show contact information",
      action: () => [
        "📧 Email: ch22b023@smail.iitm.ac.in",
        "🔗 GitHub: github.com/rushikesh-kapale",
        "💼 LinkedIn: linkedin.com/in/rushikesh-kapale",
        "📍 Location: Chennai, Tamil Nadu, India",
        "",
        'Type "email" to compose a message!',
      ],
    },
    skills: {
      description: "List technical skills",
      action: () => [
        "🤖 AI/ML: TensorFlow, LangChain, Scikit-learn, RAG",
        "⚛️  Frontend: React, TypeScript, Tailwind CSS",
        "🔧 Backend: Node.js, Spring Boot, FastAPI, Express",
        "💾 Database: PostgreSQL, MongoDB, ChromaDB",
        "☁️  Tools: Docker, Git, Postman, IntelliJ IDEA",
        "💻 Languages: Python, JavaScript, Java, C++, SQL",
      ],
    },
    projects: {
      description: "View recent projects",
      action: () => [
        "1. 🧠 AI Document Intelligence (RAG + LangChain)",
        "   → 2x retrieval boost, processes 2000+ pages",
        "",
        "2. 🛍️  Shop Smarter (Multimodal AI Search)",
        "   → CLIP-powered, 27% better recommendations",
        "",
        "3. 🔒 Fraud Detection ML Pipeline",
        "   → 0.9767 AUC-ROC, handles 0.173% fraud rate",
        "",
        "4. 🛡️  DDoS Attack Classifier",
        "   → 97.6% accuracy on 20M+ records",
        "",
        "View full projects at the portfolio!",
      ],
    },
    social: {
      description: "Show social media links",
      action: () => [
        "🔗 Social Links:",
        "",
        "  GitHub    → https://github.com/Rush9970",
        "  LinkedIn  → https://www.linkedin.com/in/rushikesh-k/",
        "  Email     → rushikeshkapale999@gmail.com",
        "",
        "Click the icons below to connect!",
      ],
    },
    email: {
      description: "Open email client",
      action: () => {
        window.location.href = "mailto:ch22b023@smail.iitm.ac.in";
        return ["Opening email client..."];
      },
    },
    clear: {
      description: "Clear terminal",
      action: () => {
        setOutput([]);
        return null;
      },
    },
  };

useEffect(() => {
  setOutput([
    "╔══════════════════════════════════════════════════════════════╗",
    "║                                                              ║",
    "║       Welcome to Rushikesh's Terminal Portfolio              ║",
    "║                                                              ║",
    "╚══════════════════════════════════════════════════════════════╝",
    "",
    'Type "help" to see available commands.',
    'Type "contact" to get in touch!',
    "",
  ]);
}, []);


  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newOutput = [...output, `$ ${input}`];

    if (commands[cmd]) {
      const result = commands[cmd].action();
      if (result) {
        newOutput.push(...result, "");
      }
    } else {
      newOutput.push(`Command not found: ${cmd}`, 'Type "help" for available commands.', "");
    }

    setOutput(newOutput);
    setCommandHistory([...commandHistory, input]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("rushikeshkapale999@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "rushikeshkapale999@gmail.com",
      href: "mailto:rushikeshkapale999@gmail.com",
      description: "Primary Contact",
      gradient: "from-primary to-accent",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "Rush9970",
      href: "https://github.com/Rush9970",
      description: "View my code",
      gradient: "from-secondary to-primary",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "rushikesh-k",
      href: "https://www.linkedin.com/in/rushikesh-k/",
      description: "Connect professionally",
      gradient: "from-accent to-secondary",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Chennai, Tamil Nadu, India",
      href: null,
      description: "IIT Madras",
      gradient: "from-primary to-secondary",
    },
  ];

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4 flex items-center justify-center gap-3">
            <Terminal className="w-12 h-12 text-secondary" />
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground">Try the interactive terminal below!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Terminal */}
          <div className="glass-panel rounded-2xl overflow-hidden border-2 border-secondary/30 shadow-2xl hover:border-secondary/50 transition-colors animate-scale-in">
            <div className="bg-muted px-4 py-3 flex items-center gap-2 border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-muted-foreground text-sm ml-4 font-mono">rushikesh@portfolio:~$</span>
            </div>

            <div
  ref={terminalRef}
  className="p-6 h-96 overflow-y-auto font-mono text-sm text-secondary bg-card/50 whitespace-pre"
>
  {output.map((line, i) => (
    <div
      key={i}
      className={line.startsWith("$") ? "text-secondary mb-2 font-semibold" : "text-foreground"}
    >
      {line}
    </div>
              ))}

              <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
                <span className="text-secondary">$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-secondary"
                  placeholder="Type a command..."
                  autoFocus
                />
              </form>
            </div>
          </div>

          {/* Contact Cards */}
          <div className="space-y-4">
            {contactLinks.map((link, index) => (
              <div
                key={link.label}
                className="glass-panel rounded-2xl p-6 border-2 border-border hover:border-primary/50 transition-all hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 bg-gradient-to-br ${link.gradient} rounded-xl glow-primary`}>
                      <link.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-foreground font-semibold">{link.label}</div>
                      <div className="text-muted-foreground text-sm">{link.description}</div>
                    </div>
                  </div>
                  {link.label === "Email" && (
                    <Button size="sm" variant="ghost" onClick={copyEmail} className="hover:bg-muted">
                      {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-muted-foreground" />}
                    </Button>
                  )}
                </div>
                {link.href ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary transition-colors flex items-center gap-2 group break-all"
                  >
                    {link.value}
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <span className="text-foreground">{link.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
