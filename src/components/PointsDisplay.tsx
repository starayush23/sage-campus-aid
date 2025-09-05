import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Trophy, Zap, TrendingUp, Gift } from "lucide-react";
import { Link } from "react-router-dom";

export const PointsDisplay = () => {
  const [points, setPoints] = useState(850);
  const [level, setLevel] = useState("Rising Star");
  const [todayPoints, setTodayPoints] = useState(45);
  const [streak, setStreak] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);

  const animatePointsIncrease = (newPoints: number) => {
    setIsAnimating(true);
    setPoints(newPoints);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getNextLevelPoints = () => {
    if (points < 500) return 500;
    if (points < 1000) return 1000;
    if (points < 2000) return 2000;
    return 5000;
  };

  const getProgressPercentage = () => {
    const nextLevel = getNextLevelPoints();
    const prevLevel = nextLevel === 500 ? 0 : nextLevel === 1000 ? 500 : nextLevel === 2000 ? 1000 : 2000;
    return ((points - prevLevel) / (nextLevel - prevLevel)) * 100;
  };

  return (
    <div className="fixed top-20 right-4 z-40 space-y-2">
      {/* Main Points Card */}
      <Card className="bg-gradient-to-br from-therapy/90 to-primary/90 text-white border-0 shadow-lg backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Star className={`h-5 w-5 ${isAnimating ? 'animate-spin' : ''}`} />
              <span className="font-bold text-lg">{points.toLocaleString()}</span>
            </div>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/rewards">
                <Gift className="h-3 w-3 mr-1" />
                Rewards
              </Link>
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs opacity-90">
              <span>Level: {level}</span>
              <span>{getNextLevelPoints() - points} to next level</span>
            </div>
            
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Stats Card */}
      <Card className="bg-card/90 backdrop-blur-sm border-border/50">
        <CardContent className="p-3">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center space-x-1">
              <Zap className="h-3 w-3 text-yellow-500" />
              <span className="text-muted-foreground">Today:</span>
              <span className="font-semibold text-therapy">+{todayPoints}</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-muted-foreground">Streak:</span>
              <span className="font-semibold text-wellness">{streak} days</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Achievements */}
      <div className="space-y-1">
        <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300">
          🎯 Daily Goal: 50pts
        </Badge>
        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 border-blue-300">
          🔥 Hot Streak!
        </Badge>
      </div>
    </div>
  );
};