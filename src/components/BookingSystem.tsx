import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const BookingSystem = () => {
  const [isBooked, setIsBooked] = useState(false);
  const { toast } = useToast();

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    toast({
      title: "Appointment Booked Successfully",
      description: "You will receive a confirmation email shortly. All information is kept strictly confidential.",
    });
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-therapy rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Appointment Confirmed</h1>
            <p className="text-muted-foreground mb-8">
              Your confidential appointment has been scheduled. You'll receive a confirmation email with all the details.
            </p>
            <Link to="/">
              <Button variant="hero">Return to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-calm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Book Confidential Appointment</h1>
            <p className="text-muted-foreground">Schedule with our campus mental health professionals</p>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBooking} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email (for confirmation only)</Label>
                <Input type="email" id="email" required />
              </div>

              <div>
                <Label htmlFor="counselorType">Type of Support</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select counselor type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Counseling</SelectItem>
                    <SelectItem value="anxiety">Anxiety Support</SelectItem>
                    <SelectItem value="depression">Depression Support</SelectItem>
                    <SelectItem value="stress">Academic Stress</SelectItem>
                    <SelectItem value="relationship">Relationship Issues</SelectItem>
                    <SelectItem value="crisis">Crisis Intervention</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input type="date" id="date" required />
                </div>
                <div>
                  <Label htmlFor="time">Preferred Time</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="14:00">2:00 PM</SelectItem>
                      <SelectItem value="15:00">3:00 PM</SelectItem>
                      <SelectItem value="16:00">4:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="How urgent is your need?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine (within 1-2 weeks)</SelectItem>
                    <SelectItem value="priority">Priority (within 3-5 days)</SelectItem>
                    <SelectItem value="urgent">Urgent (within 24 hours)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="reason">Brief Description (Optional)</Label>
                <Textarea 
                  id="reason" 
                  placeholder="Briefly describe what you'd like to discuss (this helps us match you with the right counselor)"
                  className="min-h-[100px]"
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <User className="h-4 w-4 mr-2 text-therapy" />
                  Privacy & Confidentiality
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• All appointments are completely confidential</li>
                  <li>• Your information is protected by HIPAA</li>
                  <li>• Sessions can be conducted in-person or virtually</li>
                  <li>• No judgment zone - our counselors are here to help</li>
                </ul>
              </div>

              <Button type="submit" className="w-full" variant="calm" size="lg">
                <Calendar className="h-5 w-5 mr-2" />
                Book Confidential Appointment
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};