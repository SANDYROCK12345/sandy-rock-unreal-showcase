import { useEffect, useRef } from "react";
import { ChevronDown, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IntroSectionProps {
  onScrollToNext: () => void;
}

const IntroSection = ({ onScrollToNext }: IntroSectionProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-up");
        }
      });
    }, observerOptions);

    if (imageRef.current) observer.observe(imageRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="intro" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 hero-glow" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-2 h-2 bg-portfolio-primary rounded-full float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-3 h-3 bg-portfolio-secondary rounded-full float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-portfolio-accent rounded-full float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-portfolio-primary rounded-full float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Content */}
        <div ref={contentRef} className="space-y-8 opacity-0">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold">
              <span className="text-gradient">Sandy</span>
              <br />
              <span className="text-foreground">Rock</span>
            </h1>
            <div className="text-xl lg:text-2xl text-foreground/80 font-light">
              UE5 Game Developer & 3D Environment Artist
            </div>
          </div>

          <p className="text-lg text-foreground/70 leading-relaxed max-w-lg">
            Dedicated game development student with a strong foundation in Unreal Engine 5, 
            seeking opportunities to enhance skills and gain practical experience. Passionate 
            about creating immersive gaming experiences that engage and inspire players.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-portfolio-primary to-portfolio-secondary hover:from-portfolio-secondary hover:to-portfolio-accent text-white font-semibold px-8 py-6 rounded-xl hover-grow group"
            >
              <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Download Resume
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-portfolio-primary/30 text-portfolio-primary hover:bg-portfolio-primary/10 px-8 py-6 rounded-xl hover-grow group"
              onClick={() => window.open("https://www.linkedin.com/in/sandy-rock-69705a328/", "_blank")}
            >
              <ExternalLink className="mr-2 h-5 w-5 group-hover:rotate-45 transition-transform" />
              LinkedIn Profile
            </Button>
          </div>

          <div className="pt-8 text-sm text-foreground/60">
            📍 Sikar, Rajasthan | 📧 rocksandy9422@gmail.com | 📱 8058994052
          </div>
        </div>

        {/* Image */}
        <div ref={imageRef} className="relative opacity-0 flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-portfolio-primary/20 to-portfolio-secondary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <img
              src="/lovable-uploads/8b4f427d-ee9f-40ef-8ffa-e0acd69c4634.png"
              alt="Sandy Rock - UE5 Developer"
              className="relative w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={onScrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-portfolio-primary hover:text-portfolio-secondary transition-colors group"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Explore Projects</span>
          <ChevronDown className="h-6 w-6 animate-bounce group-hover:translate-y-1 transition-transform" />
        </div>
      </button>
    </section>
  );
};

export default IntroSection;