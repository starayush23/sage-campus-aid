import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CalendarDays, 
  Upload, 
  Bell, 
  Heart, 
  Brain, 
  BookOpen, 
  Clock, 
  Star,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Settings,
  FileText,
  Smile,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { format, addDays, isSameDay, isAfter, isBefore } from "date-fns";

interface AcademicEvent {
  id: string;
  title: string;
  type: 'exam' | 'assignment' | 'project' | 'break' | 'deadline' | 'class';
  date: Date;
  description: string;
  priority: 'low' | 'medium' | 'high';
  completed?: boolean;
  stressLevel?: number;
  reflection?: string;
}

interface NotificationPreferences {
  enableMotivational: boolean;
  enableRelaxation: boolean;
  enableCheckIns: boolean;
  reminderDays: number;
  notificationTimes: string[];
}

const defaultPreferences: NotificationPreferences = {
  enableMotivational: true,
  enableRelaxation: true,
  enableCheckIns: true,
  reminderDays: 3,
  notificationTimes: ['09:00', '18:00']
};

const emotionalMessages = {
  exam: {
    motivational: [
      "You've got this! 🌟 Your preparation will pay off.",
      "Every expert was once a beginner. Trust your journey! 💪",
      "You're stronger than you think. One question at a time! ✨"
    ],
    relaxation: [
      "Take deep breaths. Your worth isn't defined by one exam. 🌸",
      "Remember to stretch and hydrate. Your body supports your mind! 💧",
      "It's okay to feel nervous. Channel that energy into focus! 🧘‍♀️"
    ],
    checkIn: [
      "How are you feeling about your upcoming exam? 💙",
      "Remember, it's okay to ask for help if you need it. 🤝",
      "You're doing your best, and that's enough. How can I support you? 💚"
    ]
  },
  assignment: {
    motivational: [
      "Progress over perfection! Every word counts. 📝",
      "You have unique insights to share. Trust your voice! 🎯",
      "Break it down into small steps. You've got momentum! ⚡"
    ],
    relaxation: [
      "Take breaks when needed. Rest is part of productivity! ☕",
      "It doesn't have to be perfect on the first try. 🌱",
      "You're learning and growing with every assignment! 🌿"
    ],
    checkIn: [
      "How's your assignment coming along? Need any support? 💜",
      "Remember to be kind to yourself during this process. 🤗",
      "What's one thing you're proud of in your work so far? ⭐"
    ]
  },
  break: {
    motivational: [
      "You've earned this break! Time to recharge. 🔋",
      "Rest is productive too. Enjoy your well-deserved time off! 🌈",
      "Celebrate how far you've come. You deserve this break! 🎉"
    ]
  }
};

export const AcademicCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<AcademicEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<AcademicEvent | null>(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>(defaultPreferences);
  const [activeTab, setActiveTab] = useState("calendar");
  const { toast } = useToast();

  // Sample events for demonstration
  useEffect(() => {
    const sampleEvents: AcademicEvent[] = [
      {
        id: '1',
        title: 'Psychology Final Exam',
        type: 'exam',
        date: addDays(new Date(), 5),
        description: 'Comprehensive final covering chapters 12-20',
        priority: 'high'
      },
      {
        id: '2',
        title: 'History Essay Due',
        type: 'assignment',
        date: addDays(new Date(), 2),
        description: 'Research paper on Renaissance art',
        priority: 'medium'
      },
      {
        id: '3',
        title: 'Spring Break',
        type: 'break',
        date: addDays(new Date(), 10),
        description: 'Well-deserved break time!',
        priority: 'low'
      }
    ];
    setEvents(sampleEvents);
  }, []);

  const getEventTypeIcon = (type: AcademicEvent['type']) => {
    const iconMap = {
      exam: BookOpen,
      assignment: FileText,
      project: Zap,
      break: Smile,
      deadline: AlertCircle,
      class: Clock
    };
    const Icon = iconMap[type];
    return <Icon className="h-4 w-4" />;
  };

  const getEventTypeColor = (type: AcademicEvent['type']) => {
    const colorMap = {
      exam: 'bg-destructive',
      assignment: 'bg-primary',
      project: 'bg-warning',
      break: 'bg-success',
      deadline: 'bg-destructive',
      class: 'bg-secondary'
    };
    return colorMap[type];
  };

  const getPriorityBadge = (priority: AcademicEvent['priority']) => {
    const variants = {
      low: 'secondary',
      medium: 'default',
      high: 'destructive'
    } as const;
    return <Badge variant={variants[priority]}>{priority.toUpperCase()}</Badge>;
  };

  const getEmotionalMessage = (event: AcademicEvent, type: 'motivational' | 'relaxation' | 'checkIn') => {
    const messages = emotionalMessages[event.type]?.[type] || emotionalMessages.assignment[type];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Calendar Import",
        description: "File uploaded successfully! Processing events...",
      });
      // Here you would implement actual file parsing logic
    }
  };

  const handleAddEvent = (eventData: Partial<AcademicEvent>) => {
    const newEvent: AcademicEvent = {
      id: Date.now().toString(),
      title: eventData.title || '',
      type: eventData.type || 'assignment',
      date: eventData.date || new Date(),
      description: eventData.description || '',
      priority: eventData.priority || 'medium'
    };
    setEvents([...events, newEvent]);
    setShowAddEvent(false);
    toast({
      title: "Event Added",
      description: "Your academic event has been added to the calendar.",
    });
  };

  const handleEventReflection = (eventId: string, reflection: string, stressLevel: number) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, reflection, stressLevel, completed: true }
        : event
    ));
    toast({
      title: "Reflection Saved",
      description: "Thank you for sharing your experience. This helps us provide better support!",
    });
  };

  const getUpcomingEvents = () => {
    return events
      .filter(event => isAfter(event.date, new Date()))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 5);
  };

  const getTodayEvents = () => {
    return events.filter(event => isSameDay(event.date, new Date()));
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
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CalendarDays className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Academic Calendar</h1>
            <p className="text-muted-foreground">Emotion-aware planning with personalized support</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Academic Calendar</CardTitle>
                      <div className="space-x-2">
                        <Dialog open={showAddEvent} onOpenChange={setShowAddEvent}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">Add Event</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Academic Event</DialogTitle>
                            </DialogHeader>
                            <AddEventForm onSubmit={handleAddEvent} />
                          </DialogContent>
                        </Dialog>
                        <Label htmlFor="calendar-upload" className="cursor-pointer">
                          <Button variant="outline" size="sm" asChild>
                            <span>
                              <Upload className="h-4 w-4 mr-2" />
                              Import
                            </span>
                          </Button>
                        </Label>
                        <Input
                          id="calendar-upload"
                          type="file"
                          accept=".ics,.csv"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      components={{
                        Day: ({ date, ...props }) => {
                          const dayEvents = events.filter(event => isSameDay(event.date, date));
                          return (
                            <div className="relative" {...props}>
                              <div>{date.getDate()}</div>
                              {dayEvents.length > 0 && (
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1">
                                  {dayEvents.slice(0, 3).map((event, i) => (
                                    <div
                                      key={i}
                                      className={`w-1.5 h-1.5 rounded-full ${getEventTypeColor(event.type)}`}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        }
                      }}
                    />
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Today's Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {getTodayEvents().length > 0 ? (
                        <div className="space-y-3">
                          {getTodayEvents().map(event => (
                            <div key={event.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                              {getEventTypeIcon(event.type)}
                              <div className="flex-1">
                                <p className="font-medium text-sm">{event.title}</p>
                                <p className="text-xs text-muted-foreground">{event.description}</p>
                              </div>
                              {getPriorityBadge(event.priority)}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">No events today. Time to relax! 😊</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Heart className="h-4 w-4 mr-2 text-therapy" />
                        Daily Motivation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        "You're exactly where you need to be. Trust your journey and celebrate small wins! ✨"
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getUpcomingEvents().map(event => (
                  <Card key={event.id} className="hover:shadow-soft transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getEventTypeIcon(event.type)}
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                        </div>
                        {getPriorityBadge(event.priority)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {format(event.date, 'MMM dd, yyyy')}
                        </span>
                        <Badge variant="outline">
                          {Math.ceil((event.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                        </Badge>
                      </div>
                      
                      <div className="space-y-3 pt-3 border-t border-border">
                        <div className="bg-therapy/10 p-3 rounded-lg">
                          <p className="text-sm font-medium text-therapy mb-1">💪 Motivation</p>
                          <p className="text-xs text-muted-foreground">
                            {getEmotionalMessage(event, 'motivational')}
                          </p>
                        </div>
                        
                        <div className="bg-wellness/10 p-3 rounded-lg">
                          <p className="text-sm font-medium text-wellness mb-1">🧘 Relaxation Tip</p>
                          <p className="text-xs text-muted-foreground">
                            {getEmotionalMessage(event, 'relaxation')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-primary" />
                      Stress Patterns
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Exams</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-muted rounded-full">
                            <div className="w-3/4 h-2 bg-destructive rounded-full"></div>
                          </div>
                          <span className="text-xs text-muted-foreground">75%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Assignments</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-muted rounded-full">
                            <div className="w-1/2 h-2 bg-warning rounded-full"></div>
                          </div>
                          <span className="text-xs text-muted-foreground">50%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-success" />
                      Completion Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-success">85%</div>
                      <p className="text-sm text-muted-foreground">This semester</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="h-5 w-5 mr-2 text-warning" />
                      Reflection Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-warning">4.2</div>
                      <p className="text-sm text-muted-foreground">Average satisfaction</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Reflections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events
                      .filter(event => event.completed && event.reflection)
                      .slice(0, 3)
                      .map(event => (
                        <div key={event.id} className="p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{event.title}</h4>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < (event.stressLevel || 0) ? 'text-warning fill-current' : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.reflection}</p>
                        </div>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Motivational Messages</Label>
                        <p className="text-sm text-muted-foreground">Receive encouraging messages before events</p>
                      </div>
                      <Switch
                        checked={preferences.enableMotivational}
                        onCheckedChange={(checked) =>
                          setPreferences(prev => ({ ...prev, enableMotivational: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Relaxation Tips</Label>
                        <p className="text-sm text-muted-foreground">Get stress management suggestions</p>
                      </div>
                      <Switch
                        checked={preferences.enableRelaxation}
                        onCheckedChange={(checked) =>
                          setPreferences(prev => ({ ...prev, enableRelaxation: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Emotional Check-ins</Label>
                        <p className="text-sm text-muted-foreground">Receive caring check-in messages</p>
                      </div>
                      <Switch
                        checked={preferences.enableCheckIns}
                        onCheckedChange={(checked) =>
                          setPreferences(prev => ({ ...prev, enableCheckIns: checked }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Reminder Days in Advance</Label>
                      <Select
                        value={preferences.reminderDays.toString()}
                        onValueChange={(value) =>
                          setPreferences(prev => ({ ...prev, reminderDays: parseInt(value) }))
                        }
                      >
                        <SelectTrigger className="w-full mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 day</SelectItem>
                          <SelectItem value="2">2 days</SelectItem>
                          <SelectItem value="3">3 days</SelectItem>
                          <SelectItem value="5">5 days</SelectItem>
                          <SelectItem value="7">1 week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const AddEventForm = ({ onSubmit }: { onSubmit: (data: Partial<AcademicEvent>) => void }) => {
  const [formData, setFormData] = useState<Partial<AcademicEvent>>({
    type: 'assignment',
    priority: 'medium',
    date: new Date()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Event Title</Label>
        <Input
          value={formData.title || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter event title"
          required
        />
      </div>

      <div>
        <Label>Event Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value: AcademicEvent['type']) =>
            setFormData(prev => ({ ...prev, type: value }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="exam">Exam</SelectItem>
            <SelectItem value="assignment">Assignment</SelectItem>
            <SelectItem value="project">Project</SelectItem>
            <SelectItem value="deadline">Deadline</SelectItem>
            <SelectItem value="class">Class</SelectItem>
            <SelectItem value="break">Break</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Priority</Label>
        <Select
          value={formData.priority}
          onValueChange={(value: AcademicEvent['priority']) =>
            setFormData(prev => ({ ...prev, priority: value }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          value={formData.description || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Event description"
        />
      </div>

      <Button type="submit" className="w-full">Add Event</Button>
    </form>
  );
};