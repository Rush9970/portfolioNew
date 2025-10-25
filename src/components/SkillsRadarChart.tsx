import { useEffect, useRef } from "react";

interface Skill {
  name: string;
  level: number;
}

interface SkillsRadarChartProps {
  skills?: Skill[];
  width?: number;
  height?: number;
}

const SkillsRadarChart = ({ 
  skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'Node.js', level: 75 },
    { name: 'Python', level: 85 },
    { name: 'AI/ML', level: 80 }
  ],
  width = 500,
  height = 500
}: SkillsRadarChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.36;
    const angleStep = (Math.PI * 2) / skills.length;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid circles
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (maxRadius / 5) * i, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
    skills.forEach((skill, i) => {
      const angle = angleStep * i - Math.PI / 2;
      const x = centerX + Math.cos(angle) * maxRadius;
      const y = centerY + Math.sin(angle) * maxRadius;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Draw labels
      const labelX = centerX + Math.cos(angle) * (maxRadius + 30);
      const labelY = centerY + Math.sin(angle) * (maxRadius + 30);
      ctx.fillStyle = 'hsl(258, 90%, 66%)';
      ctx.font = 'bold 14px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(skill.name, labelX, labelY);
    });

    // Draw skill polygon
    ctx.beginPath();
    ctx.fillStyle = 'rgba(139, 92, 246, 0.2)';
    ctx.strokeStyle = 'hsl(258, 90%, 66%)';
    ctx.lineWidth = 2;

    skills.forEach((skill, i) => {
      const angle = angleStep * i - Math.PI / 2;
      const radius = (skill.level / 100) * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw points
    skills.forEach((skill, i) => {
      const angle = angleStep * i - Math.PI / 2;
      const radius = (skill.level / 100) * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(258, 90%, 66%)';
      ctx.fill();
      
      // Add glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'hsl(258, 90%, 66%)';
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }, [skills, width, height]);

  return (
    <div className="flex justify-center items-center animate-fade-in">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="radar-chart-canvas"
        style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))' }}
      />
    </div>
  );
};

export default SkillsRadarChart;
