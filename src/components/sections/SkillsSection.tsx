import { useRef, useEffect } from "react";
import { Code, Palette, Gamepad2, Brain, MessageCircle, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      id: "technical",
      title: "Technical Skills",
      icon: Code,
      color: "from-portfolio-primary to-blue-500",
      skills: [
        { name: "Unreal Engine 5", level: 85, description: "Game development, blueprints, lighting" },
        { name: "C++", level: 75, description: "Game programming, optimization" },
        { name: "Python", level: 80, description: "Scripting, automation, tools" },
        { name: "Game Design", level: 90, description: "Mechanics, level design, balancing" },
      ],
    },
    {
      id: "creative",
      title: "Creative Skills",
      icon: Palette,
      color: "from-portfolio-secondary to-purple-500",
      skills: [
        { name: "3D Environment Art", level: 88, description: "World building, asset creation" },
        { name: "Photo Editing", level: 85, description: "Photoshop, texture work" },
        { name: "Video Editing", level: 80, description: "Premiere, post-production" },
        { name: "AI Prompting", level: 90, description: "Content generation, workflows" },
      ],
    },
    {
      id: "soft",
      title: "Professional Skills",
      icon: Brain,
      color: "from-portfolio-accent to-pink-500",
      skills: [
        { name: "Problem Solving", level: 92, description: "Debug, optimize, innovate" },
        { name: "Critical Thinking", level: 88, description: "Analysis, decision making" },
        { name: "English Communication", level: 85, description: "Documentation, collaboration" },
        { name: "Project Management", level: 78, description: "Planning, execution, delivery" },
      ],
    },
  ];

  const tools = [
    { name: "Unreal Engine 5", category: "Game Engine" },
    { name: "Visual Studio", category: "IDE" },
    { name: "Blender", category: "3D Software" },
    { name: "Photoshop", category: "Image Editor" },
    { name: "Premiere Pro", category: "Video Editor" },
    { name: "Git", category: "Version Control" },
    { name: "Perforce", category: "Version Control" },
    { name: "Substance Designer", category: "Texturing" },
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate skill bars
          const skillBars = entry.target.querySelectorAll('.skill-bar');
          skillBars.forEach((bar, index) => {
            setTimeout(() => {
              const level = bar.getAttribute('data-level');
              if (bar instanceof HTMLElement && level) {
                bar.style.width = `${level}%`;
              }
            }, index * 100);
          });

          // Animate cards
          const cards = entry.target.querySelectorAll('.skill-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate-slide-up');
            }, index * 200);
          });
        }
      });
    }, observerOptions);

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={sectionRef}>
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-bold">
            <span className="text-foreground">Skills & </span>
            <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            A comprehensive toolkit for creating immersive gaming experiences, 
            from concept to final product delivery.
          </p>
        </div>

        {/* Skills Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="skill-card opacity-0 glass-card p-6 hover-grow"
              >
                <div className="text-center mb-6">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color} mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gradient-secondary">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-sm text-portfolio-primary font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-portfolio-overlay rounded-full overflow-hidden">
                        <div
                          className={`skill-bar h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 ease-out`}
                          data-level={skill.level}
                          style={{ width: '0%' }}
                        />
                      </div>
                      <p className="text-sm text-foreground/60">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tools & Technologies */}
        <div className="glass-card p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gradient mb-4">
              Tools & Technologies
            </h3>
            <p className="text-foreground/70">
              Professional software and platforms I work with daily
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool, index) => (
              <div
                key={tool.name}
                className="group p-4 rounded-xl bg-portfolio-overlay/50 hover:bg-portfolio-overlay transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🛠️</div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {tool.name}
                  </h4>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-portfolio-primary/10 text-portfolio-primary"
                  >
                    {tool.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="glass-card p-6 hover-grow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-portfolio-primary to-portfolio-secondary">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gradient">
                  Current Education
                </h3>
                <p className="text-foreground/70">B.Tech in Computer Science</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Bhartiya Institute of Engineering and Technology</p>
              <p className="text-foreground/60">Sikar, Rajasthan</p>
              <p className="text-portfolio-primary font-semibold">Sept 2022 – June 2026</p>
            </div>
          </div>

          <div className="glass-card p-6 hover-grow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-portfolio-secondary to-portfolio-accent">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gradient">
                  Previous Education
                </h3>
                <p className="text-foreground/70">Secondary Education</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Lord's International School</p>
              <p className="text-foreground/60">Sadulpur</p>
              <p className="text-portfolio-primary font-semibold">10th (2020) • 12th (2022)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;