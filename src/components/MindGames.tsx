import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GamepadIcon, Brain, Puzzle, Target, ArrowLeft, Play, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const games = [
  {
    id: 1,
    title: "Memory Puzzle",
    description: "Improve concentration and memory with pattern matching",
    difficulty: "Easy",
    duration: "5-10 min",
    benefits: "Enhances focus and cognitive function",
    color: "therapy",
    icon: Brain
  },
  {
    id: 2,
    title: "Breathing Rhythm",
    description: "Interactive breathing exercise with visual guides",
    difficulty: "Beginner",
    duration: "3-5 min",
    benefits: "Reduces anxiety and promotes relaxation",
    color: "wellness",
    icon: Target
  },
  {
    id: 3,
    title: "Word Association",
    description: "Creative word games to shift negative thought patterns",
    difficulty: "Medium",
    duration: "10-15 min",
    benefits: "Improves mood and creative thinking",
    color: "calm",
    icon: Puzzle
  },
  {
    id: 4,
    title: "Mindful Maze",
    description: "Navigate mazes while practicing mindfulness",
    difficulty: "Medium",
    duration: "8-12 min",
    benefits: "Enhances mindfulness and problem-solving",
    color: "support",
    icon: GamepadIcon
  }
];

export const MindGames = () => {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  if (selectedGame) {
    const game = games.find(g => g.id === selectedGame);
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => setSelectedGame(null)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
          
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className={`w-16 h-16 bg-${game?.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                {game?.icon && <game.icon className="h-8 w-8 text-white" />}
              </div>
              <CardTitle className="text-2xl">{game?.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-8 p-8 bg-muted/50 rounded-xl">
                <p className="text-muted-foreground mb-4">Game will load here</p>
                <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                  <Play className="h-16 w-16 text-muted-foreground" />
                </div>
              </div>
              <Button variant="hero" size="lg" className="w-full">
                Start Playing
              </Button>
            </CardContent>
          </Card>
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
            <div className="w-16 h-16 bg-gradient-wellness rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GamepadIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Mind Refresher Games</h1>
            <p className="text-muted-foreground">Interactive games designed to reduce stress and improve mental well-being</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center space-x-6 mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-therapy" />
                <span className="text-sm text-muted-foreground">Games Completed: 0</span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-wellness" />
                <span className="text-sm text-muted-foreground">Wellness Points: 0</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map((game) => {
              const IconComponent = game.icon;
              return (
                <Card 
                  key={game.id} 
                  className="group hover:shadow-wellness transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => setSelectedGame(game.id)}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 bg-${game.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{game.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{game.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Difficulty:</span>
                        <span className="font-medium">{game.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{game.duration}</span>
                      </div>
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          <strong>Benefits:</strong> {game.benefits}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant={game.color as any} 
                      className="w-full mt-4"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Play Now
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-therapy" />
                Why Mental Health Games?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Cognitive Benefits</h4>
                  <ul className="space-y-1">
                    <li>• Improves focus and concentration</li>
                    <li>• Enhances memory and problem-solving</li>
                    <li>• Reduces racing thoughts</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Emotional Benefits</h4>
                  <ul className="space-y-1">
                    <li>• Reduces stress and anxiety</li>
                    <li>• Provides healthy distraction</li>
                    <li>• Boosts mood and confidence</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};