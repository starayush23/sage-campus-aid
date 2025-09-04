import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare, Heart, User } from "lucide-react";
import { AuthSystem } from "./AuthSystem";

const AuthButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="hero">
          <User className="h-4 w-4 mr-2" />
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <AuthSystem />
      </DialogContent>
    </Dialog>
  );
};

export const Header = () => {
  return (
    <header className="w-full bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-foreground">MindWell Campus</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/ai-chat" className="text-muted-foreground hover:text-primary transition-colors">AI Support</a>
          <a href="/resources" className="text-muted-foreground hover:text-primary transition-colors">Resources</a>
          <a href="/peer-support" className="text-muted-foreground hover:text-primary transition-colors">Peer Support</a>
          <a href="/games" className="text-muted-foreground hover:text-primary transition-colors">Mind Games</a>
          <a href="/booking" className="text-muted-foreground hover:text-primary transition-colors">Book Counselor</a>
        </nav>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => window.location.href = '/ai-chat'}>
            <MessageSquare className="h-5 w-5" />
          </Button>
          <AuthButton />
        </div>
      </div>
    </header>
  );
};