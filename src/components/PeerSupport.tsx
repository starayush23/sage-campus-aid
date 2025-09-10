import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, ArrowLeft, Heart, Clock, User, X } from "lucide-react";
import { Link } from "react-router-dom";

const forumPosts = [
  {
    id: 1,
    title: "Dealing with exam anxiety - tips that worked for me",
    author: "Anonymous Student",
    time: "2 hours ago",
    replies: 12,
    category: "Anxiety",
    preview: "I wanted to share some breathing techniques that really helped me during finals...",
    content: `I wanted to share some breathing techniques that really helped me during finals week. I used to get so anxious before exams that I couldn't even think straight.

Here's what worked for me:

*4-7-8 Breathing:*
- Breathe in for 4 counts
- Hold for 7 counts  
- Exhale slowly for 8 counts
- Repeat 3-4 times

*Progressive muscle relaxation:*
Start from your toes and work your way up, tensing and then relaxing each muscle group for 5 seconds.

*Preparation routine:*
- Study in the same place where you'll take the exam if possible
- Practice deep breathing before each study session
- Take regular breaks every 45 minutes

I went from panic attacks during exams to actually feeling calm and focused. It takes practice but it really works! Anyone else have techniques that helped them?`
  },
  {
    id: 2,
    title: "Finding motivation when everything feels overwhelming",
    author: "Anonymous Peer",
    time: "5 hours ago", 
    replies: 8,
    category: "Motivation",
    preview: "Sometimes it feels like everything is too much. Here's what helped me...",
    content: `Sometimes it feels like everything is too much. Between assignments, work, social life, and just trying to take care of myself - I was drowning. Here's what helped me get back on track:

*Start ridiculously small:*
Instead of "I need to write this entire essay," I'd tell myself "I just need to open the document." Once I started, momentum carried me.

*The 2-minute rule:*
If something takes less than 2 minutes, do it now. This stopped small tasks from piling up into an overwhelming mountain.

*Energy management over time management:*
I stopped scheduling important work during my low-energy times. I'm most alert in the morning, so that's when I tackle the hardest stuff.

*Celebration ritual:*
After completing anything - even small tasks - I do a little victory dance or treat myself to something nice. It sounds silly but positive reinforcement really works.

*Permission to rest:*
I had to learn that rest isn't laziness. Sometimes the most productive thing you can do is take a nap or watch a movie.

The overwhelm hasn't completely gone away, but now I have tools to deal with it. What helps you when everything feels like too much?`
  },
  {
    id: 3,
    title: "Healthy sleep schedule for night owls",
    author: "Anonymous Helper",
    time: "1 day ago",
    replies: 15,
    category: "Sleep",
    preview: "As someone who naturally stays up late, I found these strategies helpful...",
    content: `As someone who naturally stays up late, I found these strategies helpful for getting better sleep without fighting my natural rhythm too much:

*Gradual shifting:*
Instead of trying to go to bed 3 hours earlier immediately, I shifted my bedtime by 15 minutes earlier each night. Took about a week but my body adjusted.

*Light management:*
- Blue light blocking glasses 2 hours before desired bedtime
- Blackout curtains or eye mask
- Bright light exposure immediately upon waking (even if it's artificial)

*The wind-down routine:*
Starting 1 hour before bed:
- Dim all lights
- No screens (I know, I know, but it really helps)
- Reading, journaling, or gentle stretching
- Herbal tea (chamomile or passionflower)

*Weekend flexibility:*
I don't stress about staying up later on weekends, but I try not to shift more than 1-2 hours from my weekday schedule.

*Exercise timing:*
Working out too close to bedtime kept me wired. I moved my workouts to morning or early afternoon.

*The game changer - consistent wake time:*
Even if I went to bed late, I'd wake up at the same time. Was tired for a few days but then my body started getting sleepy earlier naturally.

I still prefer staying up late, but now I can function on a more "normal" schedule when needed. Anyone else struggle with this?`
  }
];

export const PeerSupport = () => {
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

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
            <div className="w-16 h-16 bg-gradient-support rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Peer Support Community</h1>
            <p className="text-muted-foreground">Anonymous, moderated, and safe space for students</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-therapy border-therapy">
                <Heart className="h-3 w-3 mr-1" />
                24 Online Now
              </Badge>
              <Badge variant="outline" className="text-wellness border-wellness">
                <Users className="h-3 w-3 mr-1" />
                156 Active Members
              </Badge>
            </div>
            <Button 
              variant="support" 
              onClick={() => setShowNewPost(!showNewPost)}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>

          {showNewPost && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Share with the Community</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Post title (keep it supportive)" />
                <Textarea 
                  placeholder="Share your thoughts, experiences, or ask for support. Remember, this is a safe space for everyone."
                  className="min-h-[120px]"
                />
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Posted anonymously</Badge>
                  <div className="space-x-2">
                    <Button variant="ghost" onClick={() => setShowNewPost(false)}>
                      Cancel
                    </Button>
                    <Button variant="support">
                      Post Anonymously
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {forumPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-soft transition-all duration-300 cursor-pointer">
                <CardContent className="p-6" onClick={() => setSelectedPost(post.id)}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center space-x-1 text-muted-foreground text-sm">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{post.replies}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm">{post.preview}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-muted/50 rounded-xl">
            <h3 className="font-semibold mb-3 flex items-center">
              <Users className="h-5 w-5 mr-2 text-support" />
              Community Guidelines
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Be kind, respectful, and supportive to all members</li>
              <li>• All posts are anonymous and moderated by trained volunteers</li>
              <li>• Share experiences, not medical advice</li>
              <li>• Crisis situations should use the emergency resources</li>
              <li>• Report any inappropriate content immediately</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Post Detail Dialog */}
      <Dialog open={selectedPost !== null} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      {forumPosts.find(p => p.id === selectedPost)?.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-muted-foreground text-sm">
                      <User className="h-3 w-3" />
                      <span>{forumPosts.find(p => p.id === selectedPost)?.author}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{forumPosts.find(p => p.id === selectedPost)?.replies}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{forumPosts.find(p => p.id === selectedPost)?.time}</span>
                    </div>
                  </div>
                </div>
                <DialogTitle className="text-left mt-4">
                  {forumPosts.find(p => p.id === selectedPost)?.title}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-6">
                <div className="prose prose-sm max-w-none text-foreground">
                  {forumPosts.find(p => p.id === selectedPost)?.content.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                      return (
                        <h4 key={index} className="font-semibold text-foreground mt-4 mb-2">
                          {paragraph.slice(1, -1)}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith('- ')) {
                      return (
                        <li key={index} className="text-muted-foreground ml-4 mb-1">
                          {paragraph.slice(2)}
                        </li>
                      );
                    }
                    if (paragraph.trim() === '') {
                      return <br key={index} />;
                    }
                    return (
                      <p key={index} className="text-foreground mb-3">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        Helpful
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                    <Badge variant="outline" className="text-support border-support">
                      Anonymous & Moderated
                    </Badge>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};