import ParticleBackground from "./ParticleBackground";

interface SkillCardWithParticlesProps {
  name: string;
  level: string;
  icon?: React.ReactNode;
  particleColor?: string;
}

const SkillCardWithParticles = ({ 
  name, 
  level, 
  icon,
  particleColor = "rgba(139, 92, 246, 0.6)" 
}: SkillCardWithParticlesProps) => {
  return (
    <div className="relative glass-panel p-6 rounded-xl border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:scale-105 overflow-hidden cursor-hover group">
      <ParticleBackground particleCount={15} color={particleColor} />
      
      <div className="relative z-10">
        {icon && (
          <div className="mb-3 text-primary group-hover:scale-110 transition-transform">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-bold text-foreground mb-2">{name}</h3>
        <p className="text-sm text-primary font-medium">{level}</p>
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default SkillCardWithParticles;
