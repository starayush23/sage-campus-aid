import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Lock, UserPlus, LogIn, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AuthSystem = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { toast } = useToast();

  const handleSignIn = (email: string, password: string) => {
    // Simulate authentication
    setUserEmail(email);
    setIsSignedIn(true);
    toast({
      title: "Welcome back!",
      description: "You've successfully signed in to MindWell Campus.",
    });
  };

  const handleSignUp = (email: string, password: string, name: string) => {
    // Simulate registration
    setUserEmail(email);
    setIsSignedIn(true);
    toast({
      title: "Account created!",
      description: "Welcome to MindWell Campus. Your mental health journey starts here.",
    });
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserEmail("");
    toast({
      title: "Signed out",
      description: "You've been safely signed out.",
    });
  };

  if (isSignedIn) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm text-muted-foreground">
            {userEmail.split('@')[0]}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-border/50">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <CardTitle>Join MindWell Campus</CardTitle>
          <CardDescription>
            Secure access to your mental health support platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
              <SignInForm onSignIn={handleSignIn} />
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <SignUpForm onSignUp={handleSignUp} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const SignInForm = ({ onSignIn }: { onSignIn: (email: string, password: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signin-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="signin-email"
            type="email"
            placeholder="your.email@college.edu"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="signin-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            className="pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full" variant="hero">
        <LogIn className="h-4 w-4 mr-2" />
        Sign In
      </Button>
    </form>
  );
};

const SignUpForm = ({ onSignUp }: { onSignUp: (email: string, password: string, name: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp(email, password, name);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="signup-name"
            placeholder="Your full name"
            className="pl-10"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email">College Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="signup-email"
            type="email"
            placeholder="your.email@college.edu"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="signup-password"
            type="password"
            placeholder="Create a secure password"
            className="pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full" variant="hero">
        <UserPlus className="h-4 w-4 mr-2" />
        Create Account
      </Button>
    </form>
  );
};