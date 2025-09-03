import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Shield, Users } from "lucide-react";
import heroImage from "@/assets/hero-mental-health.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Peaceful campus mental health support" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-glow animate-float">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Your Mental Health
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Matters
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            A comprehensive digital platform providing confidential, accessible, and culturally-sensitive mental health support for college students.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
            <a href="/ai-chat">
              <Button size="lg" variant="hero" className="min-w-[200px]">
                <MessageSquare className="h-5 w-5 mr-2" />
                Start AI Chat
              </Button>
            </a>
            <a href="/peer-support">
              <Button size="lg" variant="wellness" className="min-w-[200px]">
                <Users className="h-5 w-5 mr-2" />
                Join Peer Support
              </Button>
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Shield className="h-5 w-5 text-therapy" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Heart className="h-5 w-5 text-wellness" />
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Users className="h-5 w-5 text-calm" />
              <span>Peer Community</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};