import { useState, useRef, useEffect } from "react";
import { ExternalLink, Play, Image as ImageIcon, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import jungleGuardImage from "@/assets/jungle-guard.jpg";
import bloodSmellsImage from "@/assets/blood-smells.jpg";
import closedRuinsImage from "@/assets/closed-ruins.png";
import voidCenturyImage from "@/assets/void-century.jpg";

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", label: "All Projects", icon: null },
    { id: "games", label: "Game Projects", icon: Play },
    { id: "environment", label: "Environment", icon: ImageIcon },
    { id: "animation", label: "Animation/Films", icon: Film },
  ];

  const projects = [
    {
      id: 1,
      title: "JUNGLE GUARD",
      description: "An immersive environment showcase featuring lush tropical landscapes, dynamic lighting, and realistic foliage systems built in UE5.",
      category: "environment",
      tags: ["UE5", "Environment Design", "Lighting", "Foliage"],
      image: jungleGuardImage,
      featured: true,
    },
    {
      id: 2,
      title: "BLOOD SMELLS",
      description: "An action RPG featuring hack and slash combat mechanics in a dark fantasy setting with third-person perspective gameplay.",
      category: "games",
      tags: ["UE5", "C++", "Combat System", "RPG"],
      image: bloodSmellsImage,
      featured: true,
    },
    {
      id: 3,
      title: "CLOSED RUINS",
      description: "An ancient cave environment with a majestic dragon protecting a mystical throne, showcasing advanced lighting and atmospheric effects.",
      category: "environment",
      tags: ["UE5", "Environment Art", "VFX", "Atmosphere"],
      image: closedRuinsImage,
      featured: false,
    },
    {
      id: 4,
      title: "VOID CENTURY",
      description: "A 2D action-adventure platformer with unique gameplay mechanics and engaging storyline set in a mysterious world.",
      category: "games",
      tags: ["2D Platformer", "Game Design", "Adventure"],
      image: voidCenturyImage,
      featured: false,
    },
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.project-card');
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
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={sectionRef}>
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-bold">
            <span className="text-gradient">Featured</span>
            <span className="text-foreground"> Projects</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Explore my game development journey through immersive environments, 
            engaging gameplay mechanics, and innovative design solutions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-portfolio-primary to-portfolio-secondary text-white shadow-lg"
                    : "glass-card hover:bg-white/10"
                }`}
              >
                {Icon && <Icon size={18} />}
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card opacity-0 group ${
                project.featured ? "lg:col-span-2" : ""
              }`}
            >
              <div className="glass-card p-6 hover-grow">
                <div className={`grid gap-6 ${
                  project.featured ? "lg:grid-cols-2" : "grid-cols-1"
                }`}>
                  {/* Project Image */}
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Button
                      size="sm"
                      className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ExternalLink size={16} />
                    </Button>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gradient-secondary mb-2">
                        {project.title}
                      </h3>
                      <p className="text-foreground/70 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-portfolio-primary/10 text-portfolio-primary border-portfolio-primary/20"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-portfolio-primary to-portfolio-secondary hover:from-portfolio-secondary hover:to-portfolio-accent"
                      >
                        <Play size={16} className="mr-2" />
                        View Project
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-portfolio-primary/30 text-portfolio-primary hover:bg-portfolio-primary/10"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Source Code
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-portfolio-primary/30 text-portfolio-primary hover:bg-portfolio-primary/10 px-8 py-6 rounded-xl"
          >
            View All Projects on GitHub
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;