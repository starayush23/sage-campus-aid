import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Gift, 
  Coffee, 
  Book, 
  Utensils, 
  ShoppingBag, 
  Ticket, 
  Star,
  Trophy,
  ArrowLeft,
  Crown,
  Medal,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for demonstration
const mockRewards = [
  {
    id: 1,
    title: "Campus Café 20% Off",
    description: "Get 20% discount at any campus café",
    pointsRequired: 100,
    category: "Food & Beverage",
    icon: Coffee,
    color: "therapy",
    available: 5
  },
  {
    id: 2,
    title: "Library Late Fee Waiver",
    description: "Waive one library late fee",
    pointsRequired: 50,
    category: "Academic",
    icon: Book,
    color: "wellness",
    available: 10
  },
  {
    id: 3,
    title: "Campus Store 15% Off",
    description: "Discount on textbooks and supplies",
    pointsRequired: 150,
    category: "Academic",
    icon: ShoppingBag,
    color: "calm",
    available: 3
  },
  {
    id: 4,
    title: "Free Wellness Workshop",
    description: "Access to premium wellness workshops",
    pointsRequired: 200,
    category: "Wellness",
    icon: Star,
    color: "support",
    available: 8
  },
  {
    id: 5,
    title: "Dining Hall Premium Meal",
    description: "Upgrade to premium meal plan for a day",
    pointsRequired: 75,
    category: "Food & Beverage",
    icon: Utensils,
    color: "therapy",
    available: 12
  },
  {
    id: 6,
    title: "Event Priority Access",
    description: "Priority booking for campus events",
    pointsRequired: 300,
    category: "Entertainment",
    icon: Ticket,
    color: "wellness",
    available: 2
  }
];

const mockLeaderboard = [
  { rank: 1, name: "Alex Chen", points: 2450, level: "Wellness Champion", avatar: "👨‍🎓" },
  { rank: 2, name: "Sarah Johnson", points: 2380, level: "Mental Health Advocate", avatar: "👩‍🎓" },
  { rank: 3, name: "Mike Rodriguez", points: 2120, level: "Mindfulness Master", avatar: "👨‍💻" },
  { rank: 4, name: "Emma Wilson", points: 1950, level: "Stress Buster", avatar: "👩‍💼" },
  { rank: 5, name: "David Kim", points: 1820, level: "Wellness Warrior", avatar: "👨‍🔬" },
  { rank: 6, name: "Lisa Zhang", points: 1690, level: "Self-Care Specialist", avatar: "👩‍🎨" },
  { rank: 7, name: "You", points: 850, level: "Rising Star", avatar: "🧑‍🎓" },
  { rank: 8, name: "Tom Brown", points: 720, level: "Wellness Explorer", avatar: "👨‍⚕️" },
];

export const RewardsSystem = () => {
  const [activeTab, setActiveTab] = useState<"rewards" | "leaderboard">("rewards");
  const userPoints = 850; // Mock user points

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-sm font-bold">{rank}</span>;
    }
  };

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
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-support rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Gift className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Campus Rewards</h1>
            <p className="text-muted-foreground">Earn points for wellness activities and redeem exciting rewards</p>
          </div>

          {/* User Points Display */}
          <Card className="max-w-md mx-auto mb-8 bg-gradient-support text-white">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="h-6 w-6" />
                <span className="text-2xl font-bold">{userPoints}</span>
                <Star className="h-6 w-6" />
              </div>
              <p className="text-sm opacity-90">Wellness Points Available</p>
              <Badge variant="secondary" className="mt-2">Rising Star</Badge>
            </CardContent>
          </Card>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={activeTab === "rewards" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("rewards")}
                className="rounded-md"
              >
                <Gift className="h-4 w-4 mr-2" />
                Rewards
              </Button>
              <Button
                variant={activeTab === "leaderboard" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("leaderboard")}
                className="rounded-md"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Leaderboard
              </Button>
            </div>
          </div>
        </div>

        {activeTab === "rewards" ? (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRewards.map((reward) => {
                const IconComponent = reward.icon;
                const canAfford = userPoints >= reward.pointsRequired;
                
                return (
                  <Card 
                    key={reward.id} 
                    className={`group transition-all duration-300 hover:-translate-y-1 ${
                      canAfford ? 'hover:shadow-wellness cursor-pointer' : 'opacity-60'
                    }`}
                  >
                    <CardHeader>
                      <div className={`w-12 h-12 bg-${reward.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{reward.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{reward.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Points Required:</span>
                          <span className="font-medium text-therapy">{reward.pointsRequired}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Available:</span>
                          <span className="font-medium">{reward.available} left</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {reward.category}
                        </Badge>
                      </div>
                      <Button 
                        className="w-full mt-4"
                        disabled={!canAfford}
                        variant={canAfford ? "default" : "outline"}
                      >
                        {canAfford ? 'Redeem Now' : `Need ${reward.pointsRequired - userPoints} more points`}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-therapy" />
                  How to Earn Points
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <ul className="space-y-2">
                      <li>• Complete mind games: <strong>10-50 points</strong></li>
                      <li>• Daily wellness check-in: <strong>5 points</strong></li>
                      <li>• Attend peer support sessions: <strong>25 points</strong></li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      <li>• Book counseling sessions: <strong>15 points</strong></li>
                      <li>• Share wellness resources: <strong>20 points</strong></li>
                      <li>• Weekly wellness goals: <strong>100 points</strong></li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {mockLeaderboard.map((user, index) => (
                <Card 
                  key={index} 
                  className={`transition-all duration-300 ${
                    user.name === "You" 
                      ? 'ring-2 ring-therapy bg-therapy/5' 
                      : 'hover:shadow-wellness hover:-translate-y-1'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                          {getRankIcon(user.rank)}
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{user.avatar}</span>
                          <div>
                            <p className={`font-semibold ${user.name === "You" ? 'text-therapy' : ''}`}>
                              {user.name}
                            </p>
                            <p className="text-sm text-muted-foreground">{user.level}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-therapy">{user.points}</p>
                        <p className="text-sm text-muted-foreground">points</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 bg-gradient-wellness text-white">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Climb the Leaderboard!</h3>
                <p className="text-sm opacity-90 mb-4">
                  Complete wellness activities to earn points and move up the rankings.
                  Top performers get exclusive rewards and recognition!
                </p>
                <Button variant="secondary" size="sm">
                  View All Rankings
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};