import { useState } from "react";
import { Briefcase, Award, Calendar, MapPin, ChevronRight, Zap } from "lucide-react";
import { Badge } from "./ui/badge";

interface ExperienceItem {
  type: "work" | "achievement";
  title: string;
  company: string;
  date: string;
  location?: string;
  color: string;
  description: string;
  highlights: string[];
  tags: string[];
}

interface TimelineItemProps {
  item: ExperienceItem;
  index: number;
}

const TimelineItem = ({ item, index }: TimelineItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const icons = {
    work: Briefcase,
    achievement: Award,
  };

  const Icon = icons[item.type];

  return (
    <div
      className="transition-all duration-700 animate-slide-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex gap-8 relative">
        {/* Timeline Line */}
        <div className="flex flex-col items-center">
          <div className={`relative z-10 p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg hover:scale-110 transition-transform duration-300 glow-primary`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {index < 3 && <div className="w-0.5 flex-1 bg-gradient-to-b from-primary to-transparent mt-4" />}
        </div>

        {/* Content */}
        <div className="flex-1 pb-16">
          <div
            className={`glass-panel rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer ${
              expanded ? "border-primary bg-card" : "border-primary/20 hover:border-primary/50"
            }`}
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                <div className="text-primary font-semibold mb-2">{item.company}</div>
              </div>
              <div className={`transform transition-transform duration-300 ${expanded ? "rotate-90" : ""}`}>
                <ChevronRight className="w-6 h-6 text-primary" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {item.date}
              </div>
              {item.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {item.location}
                </div>
              )}
            </div>

            <p className="text-muted-foreground mb-4">{item.description}</p>

            {/* Expandable Highlights */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-3 mt-4 pt-4 border-t border-border">
                {item.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className="mt-1 p-1 bg-secondary/20 rounded group-hover:bg-secondary/30 transition-colors">
                      <Zap className="w-4 h-4 text-secondary" />
                    </div>
                    <p className="text-foreground text-sm leading-relaxed flex-1">{highlight}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {!expanded && (
              <div className="text-sm text-primary mt-2 flex items-center gap-2">
                Click to see {item.highlights.length} key achievements
                <ChevronRight className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const experiences: ExperienceItem[] = [
    {
      type: "work",
      title: "Software Developer",
      company: "AI To Foresee",
      date: "Jun 2025 - Jul 2025",
      location: "Remote",
      color: "from-secondary to-primary",
      description: "Built AI-driven SaaS automation platform with microservices architecture",
      highlights: [
        "Developed Spring Boot microservice achieving 10x faster transaction processing through automated queue management",
        "Designed AI-powered workflow builder transforming complex requirements into executable workflows without code",
        "Implemented expense analytics platform with monthly insights and intelligent chatbot support",
        "Automated loan document validator saving thousands of staff-hours in processing time",
      ],
      tags: ["Spring Boot", "Java", "AI", "Microservices", "Automation"],
    },
    {
      type: "work",
      title: "Software Developer",
      company: "AI Gurukul",
      date: "Nov 2024 - Jun 2025",
      location: "Remote",
      color: "from-primary to-accent",
      description: "Designed full-stack solutions to automate diverse business processes",
      highlights: [
        "Built end-to-end recruitment platform managing complete lifecycle from submission to certification",
        "Enhanced workflows to handle larger applicant volumes without additional resource allocation",
        "Developed LLM-based validation system auto-generating candidate summaries, reducing review time to minutes",
        "Delivered scalable solutions enabling efficient processing of high-volume applications",
      ],
      tags: ["Full-Stack", "LLM", "Node.js", "React", "Automation"],
    },
    {
      type: "achievement",
      title: "Hackathon Excellence",
      company: "Multiple Competitions",
      date: "2024 - 2025",
      color: "from-accent to-secondary",
      description: "Consistent performance in competitive hackathons",
      highlights: [
        "2nd Place in Frontend Fiesta Hackathon by WebOps Team, IIT Madras (150+ participants)",
        "Finalist at AIgnite Hackathon by Appian Corporation (150+ teams)",
        "Recognized for innovative solutions and rapid prototyping skills",
        "Demonstrated ability to deliver production-ready code under time constraints",
      ],
      tags: ["Hackathons", "Innovation", "Team Leadership", "Rapid Development"],
    },
    {
  type: "achievement",
  title: "Academic Excellence",
  company: "IIT Madras & Competitive Exams",
  date: "2019 - Present",
  color: "from-primary to-secondary",
  description: "Outstanding academic achievements and competitive exam performance",
  highlights: [
    "JEE Main: 99.38 percentile (Top 0.62% among ~1M candidates)",
    "MHT-CET: 99.28 percentile (Top 0.72% among ~7L candidates)",
    "Current CGPA: 8.17/10 in Chemical Engineering at IIT Madras",
    "Received Reliance Scholarship for academic excellence and dedication",
    "XII (MH State Board) – Dawale Jr. College: 93.67% (2021)",
    "X (MH State Board) – Sitabai Sangai High School: 93.20% (2019)"
  ],
  tags: ["Academic Excellence", "IIT Madras", "Competitive Exams", "Scholarship", "MH State Board"],
},

  ];

  return (
    <section id="experience" className="py-24 px-6 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20 animate-fade-in">
          <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4">My Journey</h2>
          <p className="text-lg text-muted-foreground">Experience, achievements, and milestones</p>
        </div>

        <div className="relative">
          {experiences.map((exp, index) => (
            <TimelineItem key={`${exp.company}-${index}`} item={exp} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center animate-scale-in" style={{ animationDelay: "0.6s" }}>
          <div className="glass-panel rounded-2xl p-8 inline-flex items-center gap-4 glow-primary">
            <Award className="w-8 h-8 text-primary" />
            <div className="text-left">
              <div className="text-3xl font-bold text-gradient-cyber">8+ Months</div>
              <div className="text-muted-foreground">Professional Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
