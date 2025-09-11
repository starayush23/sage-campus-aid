import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Calendar, 
  BookOpen, 
  Users, 
  GamepadIcon, 
  ClipboardList,
  Gift,
  UserCheck,
  BarChart3,
  Heart
} from "lucide-react";
import aiSupportImage from "@/assets/ai-support.jpg";
import peerSupportImage from "@/assets/peer-support.jpg";
import resourcesImage from "@/assets/resources.jpg";
import wellnessMeditation from "@/assets/wellness-meditation.jpg";
import counselingSession from "@/assets/counseling-session.jpg";
import brainGames from "@/assets/brain-games.jpg";

const features = [
  {
    id: "ai-chat",
    title: "AI-Guided Support",
    description: "24/7 intelligent chat support providing coping strategies and professional referrals",
    icon: MessageSquare,
    image: aiSupportImage,
    color: "therapy",
    gradient: "gradient-hero"
  },
  {
    id: "booking",
    title: "Confidential Booking",
    description: "Schedule appointments with campus counselors and mental health professionals",
    icon: Calendar,
    image: counselingSession,
    color: "calm",
    gradient: "gradient-calm"
  },
  {
    id: "resources",
    title: "Resource Hub",
    description: "Videos, audio guides, and wellness materials in multiple regional languages",
    icon: BookOpen,
    image: resourcesImage,
    color: "wellness",
    gradient: "gradient-wellness"
  },
  {
    id: "peer-support",
    title: "Peer Support",
    description: "Connect with trained student volunteers in moderated support forums",
    icon: Users,
    image: peerSupportImage,
    color: "support",
    gradient: "gradient-support"
  },
  {
    id: "games",
    title: "Mind Refresher Games",
    description: "Engaging puzzles and games designed to reduce stress and improve focus",
    icon: GamepadIcon,
    image: brainGames,
    color: "therapy",
    gradient: "gradient-wellness"
  },
  {
    id: "calendar",
    title: "Academic Calendar",
    description: "Upload and manage your academic schedule with stress-level tracking",
    icon: Calendar,
    color: "calm",
    gradient: "gradient-calm"
  },
  {
    id: "assessment",
    title: "Self Assessment",
    description: "Evidence-based psychological screening tools (PHQ-9, GAD-7, GHQ)",
    icon: ClipboardList,
    image: wellnessMeditation,
    color: "wellness",
    gradient: "gradient-wellness"
  },
  {
    id: "rewards",
    title: "Campus Rewards",
    description: "Wellness milestones unlock discounts and benefits from campus partners",
    icon: Gift,
    color: "support",
    gradient: "gradient-support"
  },
  {
    id: "admin",
    title: "Admin Dashboard",
    description: "Anonymous analytics helping authorities recognize trends and plan interventions",
    icon: BarChart3,
    color: "calm",
    gradient: "gradient-calm"
  }
];

export const FeatureCards = () => {
  return (
    <section className="py-16 bg-muted/30" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-wellness rounded-xl flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Mental Health Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for mental wellness, from AI support to peer connections, 
            all in one secure platform designed for college students.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.id} 
                className="group hover:shadow-wellness transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center pb-2">
                  {feature.image ? (
                    <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className={`w-12 h-12 bg-${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  )}
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-muted-foreground mb-4">
                    {feature.description}
                  </CardDescription>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
                    onClick={() => {
                      const routes = {
                        'ai-chat': '/ai-chat',
                        'booking': '/booking',
                        'resources': '/resources',
                        'peer-support': '/peer-support',
                        'games': '/games',
                        'rewards': '/rewards',
                        'calendar': '/academic-calendar'
                      };
                      const route = routes[feature.id as keyof typeof routes];
                      if (route) {
                        window.location.href = route;
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};