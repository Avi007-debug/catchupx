import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, BookOpen, GraduationCap } from "lucide-react";
import LoginIndicator from "@/components/LoginIndicator";

const SetupPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [grade, setGrade] = useState<string>("");
  const [subject, setSubject] = useState<string>("");

  const subjects = [
    { value: "mathematics", label: "Mathematics" },
    { value: "science", label: "Science" },
    { value: "english", label: "English" },
    { value: "social_studies", label: "Social Studies" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "biology", label: "Biology" },
  ];

  const handleStartQuiz = () => {
    if (!grade || !subject) {
      toast({
        title: "Selection Required",
        description: "Please select both grade and subject before starting the quiz.",
        variant: "destructive",
      });
      return;
    }

    // Store selection in localStorage for the quiz
    localStorage.setItem('quiz_grade', grade);
    localStorage.setItem('quiz_subject', subject);
    
    navigate("/quiz");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative overflow-hidden">
      <LoginIndicator />
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(180_100%_50%_/_0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(320_100%_60%_/_0.08)_0%,_transparent_50%)]" />
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Quiz Setup
            </h1>
            <p className="text-muted-foreground mt-1">
              Select your grade and subject to get personalized questions
            </p>
          </div>
        </div>

        {/* Welcome Message */}
        <Card className="gradient-border bg-card/50 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Welcome, {user.user_metadata?.full_name || user.email}!
            </CardTitle>
            <CardDescription>
              Let's customize your learning experience based on your academic level and interests.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Grade Selection */}
        <Card className="gradient-border bg-card/50 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-secondary" />
              Select Your Grade
            </CardTitle>
            <CardDescription>
              Choose your current grade level for appropriate difficulty
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade Level *</Label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className={`w-full bg-input border-border/50 text-foreground ${!grade ? 'border-red-300' : ''}`}>
                  <SelectValue placeholder="Choose your grade" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {[6, 7, 8, 9, 10, 11, 12].map(g => (
                    <SelectItem key={g} value={g.toString()} className="text-foreground hover:bg-muted">
                      Grade {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Subject Selection */}
        <Card className="gradient-border bg-card/50 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              Select Subject
            </CardTitle>
            <CardDescription>
              Choose the subject you want to assess your knowledge in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className={`w-full bg-input border-border/50 text-foreground ${!subject ? 'border-red-300' : ''}`}>
                  <SelectValue placeholder="Choose a subject" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {subjects.map(subj => (
                    <SelectItem key={subj.value} value={subj.value} className="text-foreground hover:bg-muted">
                      {subj.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Selection Summary */}
        {grade && subject && (
          <Card className="gradient-border bg-primary/5 border-primary/30 mb-6">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  Quiz Configuration
                </h3>
                <p className="text-muted-foreground">
                  <span className="font-medium text-primary">Grade {grade}</span> • <span className="font-medium text-secondary">{subjects.find(s => s.value === subject)?.label}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  You'll receive 10-15 questions tailored to your level
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Start Quiz Button */}
        <div className="flex justify-center">
          <Button 
            size="lg" 
            onClick={handleStartQuiz}
            className="px-12"
            disabled={!grade || !subject}
          >
            Start Diagnostic Quiz
          </Button>
        </div>

        {/* Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            The quiz will take approximately 15-20 minutes to complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetupPage;