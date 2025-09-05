import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Play, Pause, RotateCcw, Heart } from "lucide-react";

type BreathingPhase = "inhale" | "hold" | "exhale" | "rest";

const breathingPatterns = {
  beginner: { inhale: 4, hold: 2, exhale: 4, rest: 2 },
  intermediate: { inhale: 4, hold: 4, exhale: 6, rest: 2 },
  advanced: { inhale: 6, hold: 6, exhale: 8, rest: 4 }
};

export const BreathingGame = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>("inhale");
  const [timeLeft, setTimeLeft] = useState(4);
  const [totalCycles, setTotalCycles] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [pattern, setPattern] = useState<keyof typeof breathingPatterns>("beginner");
  const [scale, setScale] = useState(1);
  
  const intervalRef = useRef<NodeJS.Timeout>();
  const currentPattern = breathingPatterns[pattern];

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Move to next phase
            switch (currentPhase) {
              case "inhale":
                setCurrentPhase("hold");
                return currentPattern.hold;
              case "hold":
                setCurrentPhase("exhale");
                return currentPattern.exhale;
              case "exhale":
                setCurrentPhase("rest");
                return currentPattern.rest;
              case "rest":
                setCurrentPhase("inhale");
                setTotalCycles(cycles => cycles + 1);
                return currentPattern.inhale;
            }
          }
          return prev - 1;
        });
        setSessionTime(time => time + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, currentPhase, currentPattern]);

  // Visual breathing animation
  useEffect(() => {
    switch (currentPhase) {
      case "inhale":
        setScale(1.5);
        break;
      case "hold":
        setScale(1.5);
        break;
      case "exhale":
        setScale(1);
        break;
      case "rest":
        setScale(1);
        break;
    }
  }, [currentPhase]);

  const startSession = () => {
    setIsActive(true);
    setCurrentPhase("inhale");
    setTimeLeft(currentPattern.inhale);
  };

  const pauseSession = () => {
    setIsActive(false);
  };

  const resetSession = () => {
    setIsActive(false);
    setCurrentPhase("inhale");
    setTimeLeft(currentPattern.inhale);
    setTotalCycles(0);
    setSessionTime(0);
    setScale(1);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseInstruction = () => {
    switch (currentPhase) {
      case "inhale": return "Breathe In";
      case "hold": return "Hold";
      case "exhale": return "Breathe Out";
      case "rest": return "Rest";
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case "inhale": return "text-blue-500";
      case "hold": return "text-purple-500";
      case "exhale": return "text-green-500";
      case "rest": return "text-gray-500";
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-wellness rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Breathing Rhythm</CardTitle>
          <p className="text-muted-foreground">Guided breathing exercise to reduce stress and anxiety</p>
        </CardHeader>
        
        <CardContent>
          {/* Pattern Selection */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3">Choose Breathing Pattern:</p>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(breathingPatterns).map((patternKey) => (
                <Button
                  key={patternKey}
                  variant={pattern === patternKey ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setPattern(patternKey as keyof typeof breathingPatterns);
                    if (isActive) resetSession();
                  }}
                  className="capitalize"
                >
                  {patternKey}
                </Button>
              ))}
            </div>
          </div>

          {/* Breathing Circle */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-48 h-48 mb-6">
              <div 
                className={`
                  w-full h-full rounded-full border-4 border-primary/30 
                  bg-gradient-to-br from-primary/20 to-primary/40
                  transition-transform duration-1000 ease-in-out
                  flex items-center justify-center
                  ${currentPhase === "inhale" ? "animate-pulse" : ""}
                `}
                style={{ 
                  transform: `scale(${scale})`,
                  transitionDuration: `${timeLeft}s`
                }}
              >
                <div className="text-center">
                  <p className={`text-2xl font-bold ${getPhaseColor()}`}>
                    {timeLeft}
                  </p>
                  <p className="text-sm text-muted-foreground">seconds</p>
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <h3 className={`text-3xl font-bold ${getPhaseColor()} mb-2`}>
                {getPhaseInstruction()}
              </h3>
              <p className="text-muted-foreground">
                {currentPattern.inhale}-{currentPattern.hold}-{currentPattern.exhale}-{currentPattern.rest} pattern
              </p>
            </div>
          </div>

          {/* Session Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Cycles</p>
              <p className="text-xl font-bold text-therapy">{totalCycles}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Session Time</p>
              <p className="text-xl font-bold text-wellness">{formatTime(sessionTime)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Pattern</p>
              <p className="text-xl font-bold text-calm capitalize">{pattern}</p>
            </div>
          </div>

          {/* Session Complete Badge */}
          {totalCycles >= 5 && (
            <Card className="mb-6 bg-gradient-wellness text-white">
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-bold mb-2">Great Session! 🌟</h4>
                <p className="text-sm mb-3">You've completed 5+ breathing cycles</p>
                <Badge variant="secondary">
                  +25 Wellness Points Earned!
                </Badge>
              </CardContent>
            </Card>
          )}

          {/* Controls */}
          <div className="flex gap-3 mb-6">
            {!isActive ? (
              <Button 
                onClick={startSession}
                className="flex-1"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Session
              </Button>
            ) : (
              <Button 
                onClick={pauseSession}
                variant="outline"
                className="flex-1"
              >
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            <Button 
              onClick={resetSession}
              variant="outline"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Benefits */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <Heart className="h-4 w-4 mr-2 text-therapy" />
                Breathing Benefits
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Activates the parasympathetic nervous system</li>
                <li>• Reduces cortisol levels and stress hormones</li>
                <li>• Improves focus and emotional regulation</li>
                <li>• Lowers heart rate and blood pressure</li>
                <li>• Enhances mindfulness and present-moment awareness</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};