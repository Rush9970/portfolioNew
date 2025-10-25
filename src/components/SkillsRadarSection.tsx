import SkillsRadarChart from "./SkillsRadarChart";

const SkillsRadarSection = () => {
  const skills = [
    { name: 'AI/ML', level: 90 },
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 95 },
    { name: 'Design', level: 75 }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            Skills Visualization
          </h2>
          <p className="text-lg text-muted-foreground">
            A radar chart showing my proficiency across different domains
          </p>
        </div>

        <div className="flex justify-center">
          <SkillsRadarChart skills={skills} width={600} height={600} />
        </div>
      </div>
    </section>
  );
};

export default SkillsRadarSection;
