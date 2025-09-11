import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageSquare, 
  Phone, 
  Calendar, 
  BookOpen,
  AlertCircle,
  ArrowRight
} from "lucide-react";

export const QuickActions = () => {
  return (
    <section className="py-16" id="quick-actions">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Need Immediate Support?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quick access to the support you need, when you need it most.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1 bg-gradient-hero border-0">
            <CardContent className="p-6 text-center text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">AI Chat Now</h3>
              <p className="text-white/80 text-sm mb-4">
                Instant support available 24/7
              </p>
              <a href="/ai-chat">
                <Button variant="secondary" size="sm" className="w-full">
                  Start Chat <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-wellness transition-all duration-300 hover:-translate-y-1 bg-gradient-wellness border-0">
            <CardContent className="p-6 text-center text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Crisis Helpline</h3>
              <p className="text-white/80 text-sm mb-4">
                Immediate professional help
              </p>
              <Button variant="secondary" size="sm" className="w-full">
                Call Now <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-soft transition-all duration-300 hover:-translate-y-1 bg-gradient-calm border-0">
            <CardContent className="p-6 text-center text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Book Counselor</h3>
              <p className="text-white/80 text-sm mb-4">
                Schedule appointments with professionals
              </p>
              <a href="/booking">
                <Button variant="secondary" size="sm" className="w-full">
                  Book Now <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1 bg-gradient-support border-0">
            <CardContent className="p-6 text-center text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Self Help</h3>
              <p className="text-white/80 text-sm mb-4">
                Guided exercises and resources
              </p>
              <a href="/resources">
                <Button variant="secondary" size="sm" className="w-full">
                  Explore <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 p-6 bg-destructive/10 border border-destructive/20 rounded-xl max-w-2xl mx-auto">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-destructive mb-2">Emergency Resources</h4>
              <p className="text-destructive/80 text-sm mb-3">
                If you're experiencing a mental health emergency or having thoughts of self-harm, please reach out immediately:
              </p>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>National Suicide Prevention Lifeline:</strong> 988
                </div>
                <div>
                  <strong>Crisis Text Line:</strong> Text HOME to 741741
                </div>
                <div>
                  <strong>Campus Security:</strong> Extension 911
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};