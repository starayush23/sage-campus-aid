import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, ArrowLeft, Heart, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

const forumPosts = [
  {
    id: 1,
    title: "Dealing with exam anxiety - tips that worked for me",
    author: "Anonymous Student",
    time: "2 hours ago",
    replies: 12,
    category: "Anxiety",
    preview: "I wanted to share some breathing techniques that really helped me during finals..."
  },
  {
    id: 2,
    title: "Finding motivation when everything feels overwhelming",
    author: "Anonymous Peer",
    time: "5 hours ago", 
    replies: 8,
    category: "Motivation",
    preview: "Sometimes it feels like everything is too much. Here's what helped me..."
  },
  {
    id: 3,
    title: "Healthy sleep schedule for night owls",
    author: "Anonymous Helper",
    time: "1 day ago",
    replies: 15,
    category: "Sleep",
    preview: "As someone who naturally stays up late, I found these strategies helpful..."
  }
];

export const PeerSupport = () => {
  const [showNewPost, setShowNewPost] = useState(false);

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
                <CardContent className="p-6">
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
    </div>
  );
};