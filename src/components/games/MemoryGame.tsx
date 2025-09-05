import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, RotateCcw, Star, Trophy } from "lucide-react";

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const cardEmojis = ["🧠", "💚", "🌟", "🎯", "💡", "🎨", "🔮", "⭐"];

export const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);

      if (firstCard?.value === secondCard?.value) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isMatched: true }
              : card
          ));
          setMatches(prev => prev + 1);
          setFlippedCards([]);
          
          // Check if game is completed
          if (matches + 1 === cardEmojis.length) {
            setGameCompleted(true);
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards, matches]);

  const initializeGame = () => {
    const shuffledCards: Card[] = [...cardEmojis, ...cardEmojis]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameStarted(false);
    setGameCompleted(false);
    setTimeElapsed(0);
  };

  const handleCardClick = (cardId: number) => {
    if (!gameStarted) setGameStarted(true);
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length === 2) return;

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    setFlippedCards(prev => [...prev, cardId]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreRating = () => {
    if (moves <= 16) return { rating: "Excellent", stars: 3, color: "text-yellow-500" };
    if (moves <= 24) return { rating: "Good", stars: 2, color: "text-blue-500" };
    return { rating: "Keep Practicing", stars: 1, color: "text-green-500" };
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-therapy rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Memory Puzzle</CardTitle>
          <p className="text-muted-foreground">Find matching pairs to improve your memory and focus</p>
        </CardHeader>
        
        <CardContent>
          {/* Game Stats */}
          <div className="flex justify-between items-center mb-6 p-4 bg-muted/50 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Moves</p>
              <p className="text-xl font-bold text-therapy">{moves}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Matches</p>
              <p className="text-xl font-bold text-wellness">{matches}/{cardEmojis.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="text-xl font-bold text-calm">{formatTime(timeElapsed)}</p>
            </div>
          </div>

          {/* Game Board */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`
                  aspect-square rounded-lg border-2 flex items-center justify-center text-2xl cursor-pointer
                  transition-all duration-300 hover:scale-105
                  ${card.isFlipped || card.isMatched 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'bg-muted border-muted-foreground/20 hover:bg-muted/80'
                  }
                  ${card.isMatched ? 'ring-2 ring-green-500' : ''}
                `}
                onClick={() => handleCardClick(card.id)}
              >
                {(card.isFlipped || card.isMatched) ? card.value : '?'}
              </div>
            ))}
          </div>

          {/* Game Completed */}
          {gameCompleted && (
            <Card className="mb-6 bg-gradient-wellness text-white">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Congratulations! 🎉</h3>
                <p className="mb-4">You completed the memory puzzle!</p>
                
                <div className="flex justify-center mb-4">
                  {[...Array(getScoreRating().stars)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">Moves</p>
                    <p>{moves}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Time</p>
                    <p>{formatTime(timeElapsed)}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Rating</p>
                    <p>{getScoreRating().rating}</p>
                  </div>
                </div>
                
                <Badge variant="secondary" className="mt-4">
                  +50 Wellness Points Earned!
                </Badge>
              </CardContent>
            </Card>
          )}

          {/* Controls */}
          <div className="flex gap-3">
            <Button 
              onClick={initializeGame}
              variant="outline"
              className="flex-1"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              New Game
            </Button>
            {!gameStarted && (
              <Button 
                onClick={() => setGameStarted(true)}
                variant="default"
                className="flex-1"
              >
                Start Game
              </Button>
            )}
          </div>

          {/* Benefits */}
          <Card className="mt-6">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <Brain className="h-4 w-4 mr-2 text-therapy" />
                Cognitive Benefits
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Improves working memory and concentration</li>
                <li>• Enhances pattern recognition skills</li>
                <li>• Reduces stress through focused attention</li>
                <li>• Boosts cognitive flexibility and mental agility</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};