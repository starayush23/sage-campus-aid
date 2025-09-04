import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, MapPin, Phone, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SOSButton = () => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const { toast } = useToast();

  const getLocationAndShare = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive",
      });
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
        const message = `🆘 EMERGENCY: I need help! My current location is: ${locationUrl}. Please assist me or contact emergency services. - Sent from MindWell Campus`;
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        setIsGettingLocation(false);
        toast({
          title: "SOS Alert Sent",
          description: "Your location has been shared via WhatsApp. Help is on the way.",
        });
      },
      (error) => {
        console.error('Error getting location:', error);
        
        // Fallback - send SOS without location
        const message = `🆘 EMERGENCY: I need help! I cannot share my exact location, but please assist me or contact emergency services. - Sent from MindWell Campus`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        setIsGettingLocation(false);
        toast({
          title: "SOS Alert Sent",
          description: "Emergency message sent via WhatsApp (location unavailable).",
        });
      }
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="bg-destructive border-destructive shadow-2xl animate-pulse">
        <CardContent className="p-4">
          <Button
            onClick={getLocationAndShare}
            disabled={isGettingLocation}
            className="bg-white text-destructive hover:bg-red-50 font-bold text-lg px-6 py-6 h-auto rounded-full shadow-lg"
            size="lg"
          >
            {isGettingLocation ? (
              <>
                <MapPin className="h-6 w-6 mr-2 animate-spin" />
                Getting Location...
              </>
            ) : (
              <>
                <AlertTriangle className="h-6 w-6 mr-2" />
                SOS EMERGENCY
              </>
            )}
          </Button>
          
          <div className="mt-2 text-center">
            <p className="text-white text-xs font-semibold">
              Tap to share location via WhatsApp
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Emergency Numbers Quick Access */}
      <div className="mt-4 space-y-2">
        <Button
          onClick={() => window.open('tel:988', '_self')}
          variant="secondary"
          size="sm"
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          <Phone className="h-4 w-4 mr-2" />
          Call 988
        </Button>
        <Button
          onClick={() => window.open('sms:741741?body=HOME', '_self')}
          variant="secondary"
          size="sm"
          className="w-full bg-green-600 text-white hover:bg-green-700"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Text 741741
        </Button>
      </div>
    </div>
  );
};