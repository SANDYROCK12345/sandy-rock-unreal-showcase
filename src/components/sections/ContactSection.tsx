import { useState, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "rocksandy9422@gmail.com",
      link: "mailto:rocksandy9422@gmail.com",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8058994052",
      link: "tel:+918058994052",
      color: "from-green-500 to-green-600",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Sikar, Rajasthan, India",
      link: "#",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "sandy-rock-69705a328",
      link: "https://www.linkedin.com/in/sandy-rock-69705a328/",
      color: "from-blue-600 to-blue-700",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.contact-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate-slide-up');
            }, index * 150);
          });
        }
      });
    }, observerOptions);

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={sectionRef}>
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-bold">
            <span className="text-foreground">Let's </span>
            <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Ready to collaborate on your next game development project? 
            Let's discuss how we can bring your ideas to life together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="contact-card opacity-0">
              <h3 className="text-3xl font-bold text-gradient-secondary mb-6">
                Get In Touch
              </h3>
              <p className="text-foreground/70 text-lg leading-relaxed mb-8">
                I'm always excited to discuss new opportunities, collaborate on innovative projects, 
                or simply chat about game development. Whether you're looking for a dedicated 
                team member or have questions about UE5 development, feel free to reach out!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.label}
                    className="contact-card opacity-0 group"
                  >
                    <a
                      href={info.link}
                      target={info.label === "LinkedIn" ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="block glass-card p-6 hover-grow"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${info.color}`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">
                            {info.label}
                          </h4>
                          <p className="text-sm text-foreground/70 group-hover:text-portfolio-primary transition-colors">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Call to Action */}
            <div className="contact-card opacity-0 glass-card p-6 text-center">
              <div className="mb-4">
                <MessageSquare className="h-12 w-12 text-portfolio-primary mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gradient mb-2">
                  Quick Response
                </h4>
                <p className="text-foreground/70">
                  I typically respond to emails within 24 hours and am available 
                  for calls during IST business hours.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-card opacity-0">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-gradient mb-6">
                Send Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      className="bg-portfolio-overlay/50 border-portfolio-primary/20 focus:border-portfolio-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="bg-portfolio-overlay/50 border-portfolio-primary/20 focus:border-portfolio-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project collaboration, Job opportunity, etc."
                    required
                    className="bg-portfolio-overlay/50 border-portfolio-primary/20 focus:border-portfolio-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project, requirements, or any questions you have..."
                    rows={6}
                    required
                    className="bg-portfolio-overlay/50 border-portfolio-primary/20 focus:border-portfolio-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-portfolio-primary to-portfolio-secondary hover:from-portfolio-secondary hover:to-portfolio-accent text-white font-semibold py-6 rounded-xl group"
                >
                  <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-portfolio-primary/20">
                <p className="text-sm text-foreground/60 text-center">
                  * All fields are required. Your information will be kept confidential.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-portfolio-primary/20">
          <p className="text-foreground/60">
            © 2024 Sandy Rock. Built with React, TypeScript & Lovable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;