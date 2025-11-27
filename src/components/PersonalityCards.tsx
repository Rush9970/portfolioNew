import { Music, Coffee, Code2, Rocket, Book, Gamepad2 } from "lucide-react";

interface PersonalityCard {
  icon: React.ElementType;
  title: string;
  content: string;
}

const PersonalityCards = () => {
  const cards: PersonalityCard[] = [
    {
      icon: Music,
      title: "Currently Jamming",
      content: "Lo-fi beats while coding, Epic soundtracks for debugging"
    },
    {
      icon: Coffee,
      title: "Fuel of Choice",
      content: "Coffee in the morning, Green tea in the evening"
    },
    {
      icon: Code2,
      title: "Favorite Tools",
      content: "VS Code, Figma, Chrome DevTools, GitHub"
    },
    {
      icon: Rocket,
      title: "Currently Learning",
      content: "Machine Learning and AI integration"
    },
    {
      icon: Book,
      title: "Reading List",
      content: "Tech blogs, Design systems, AI research papers"
    },
    {
      icon: Gamepad2,
      title: "Fun Fact",
      content: "I hide easter eggs in all my projects 🎮"
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            More About Me
          </h2>
          <p className="text-lg text-muted-foreground">
            The little things that make me, me
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="personality-card group relative glass-panel p-8 rounded-2xl border border-primary/30 hover:border-primary/60 transition-all duration-300 overflow-hidden cursor-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer-effect" />
              
              <div className="relative z-10">
                <card.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {card.content}
                </p>
              </div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalityCards;
