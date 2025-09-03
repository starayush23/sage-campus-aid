import { Heart, Mail, Phone, MapPin, Shield, Users, BookOpen } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">MindWell Campus</h3>
            </div>
            <p className="text-background/80 mb-4">
              Comprehensive mental health support designed specifically for college students, ensuring accessible and stigma-free care.
            </p>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-background/10 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-therapy" />
              </div>
              <div className="w-8 h-8 bg-background/10 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-wellness" />
              </div>
              <div className="w-8 h-8 bg-background/10 rounded-lg flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-calm" />
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#ai-chat" className="hover:text-white transition-colors">AI-Guided Support</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">Counselor Booking</a></li>
              <li><a href="#resources" className="hover:text-white transition-colors">Resource Hub</a></li>
              <li><a href="#peer-support" className="hover:text-white transition-colors">Peer Support</a></li>
              <li><a href="#games" className="hover:text-white transition-colors">Mind Games</a></li>
              <li><a href="#assessment" className="hover:text-white transition-colors">Self Assessment</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Crisis Resources</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Campus Counseling</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-background/80">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Crisis Line: 988</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@mindwellcampus.edu</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Student Welfare Center</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-background/10 rounded-lg">
              <p className="text-sm text-background/80">
                <strong>24/7 Support Available</strong><br />
                All conversations are confidential and secured with end-to-end encryption.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/60">
            © 2024 MindWell Campus. Built with care for student mental health. 
            <span className="block mt-1">
              Department of Student Welfare | Internal Quality Assurance Cell (IQAC)
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};