import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, Headphones, Download, ArrowLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";

const resources = {
  videos: [
    {
      title: "Breathing Techniques for Anxiety",
      duration: "8 min",
      language: "English/Hindi",
      category: "Anxiety",
      rating: 4.8,
      description: "Learn simple breathing exercises to manage anxiety attacks"
    },
    {
      title: "Sleep Hygiene for Students",
      duration: "12 min", 
      language: "English/Tamil",
      category: "Sleep",
      rating: 4.9,
      description: "Improve your sleep quality with evidence-based techniques"
    },
    {
      title: "Managing Academic Stress",
      duration: "15 min",
      language: "English/Telugu",
      category: "Stress",
      rating: 4.7,
      description: "Practical strategies for handling academic pressure"
    }
  ],
  audio: [
    {
      title: "Progressive Muscle Relaxation",
      duration: "20 min",
      language: "English/Hindi",
      category: "Relaxation",
      rating: 4.9,
      description: "Guided relaxation to release physical tension"
    },
    {
      title: "Mindfulness Meditation",
      duration: "10 min",
      language: "English/Bengali",
      category: "Mindfulness",
      rating: 4.8,
      description: "Daily mindfulness practice for mental clarity"
    },
    {
      title: "Study Focus Soundscape",
      duration: "45 min",
      language: "Instrumental",
      category: "Focus",
      rating: 4.6,
      description: "Background sounds to enhance concentration"
    }
  ],
  guides: [
    {
      title: "Understanding Depression",
      pages: "24 pages",
      language: "English/Hindi/Tamil",
      category: "Depression",
      rating: 4.9,
      description: "Comprehensive guide to recognizing and managing depression"
    },
    {
      title: "Building Healthy Relationships",
      pages: "18 pages",
      language: "English/Telugu",
      category: "Relationships",
      rating: 4.7,
      description: "Tips for maintaining healthy relationships in college"
    },
    {
      title: "Time Management & Self-Care",
      pages: "32 pages",
      language: "English/Hindi",
      category: "Self-Care",
      rating: 4.8,
      description: "Balance academics with personal well-being"
    }
  ]
};

export const ResourceHub = () => {
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
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Mental Wellness Resources</h1>
            <p className="text-muted-foreground">Expert-curated content in multiple regional languages</p>
          </div>
        </div>

        <Tabs defaultValue="videos" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="videos" className="flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Videos</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center space-x-2">
              <Headphones className="h-4 w-4" />
              <span>Audio</span>
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Guides</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.videos.map((video, index) => (
                <Card key={index} className="group hover:shadow-wellness transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary">{video.category}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">{video.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{video.description}</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
                      <span>{video.duration}</span>
                      <span>{video.language}</span>
                    </div>
                    <Button variant="wellness" className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="audio" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.audio.map((audio, index) => (
                <Card key={index} className="group hover:shadow-wellness transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary">{audio.category}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">{audio.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{audio.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{audio.description}</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
                      <span>{audio.duration}</span>
                      <span>{audio.language}</span>
                    </div>
                    <Button variant="calm" className="w-full">
                      <Headphones className="h-4 w-4 mr-2" />
                      Listen Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guides" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.guides.map((guide, index) => (
                <Card key={index} className="group hover:shadow-wellness transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary">{guide.category}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">{guide.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{guide.description}</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
                      <span>{guide.pages}</span>
                      <span>{guide.language}</span>
                    </div>
                    <Button variant="support" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};