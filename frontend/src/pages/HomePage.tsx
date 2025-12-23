import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Target, LogIn, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();

  const handleStartQuiz = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/setup");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Login/User Button - Top Right */}
      <div className="fixed top-4 right-4 z-50">
        {loading ? (
          <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
        ) : user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.user_metadata?.full_name || user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90 gap-2"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/login")}
            className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90 gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span className="hidden sm:inline">Login</span>
          </Button>
        )}
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(180_100%_50%_/_0.1)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(320_100%_60%_/_0.1)_0%,_transparent_50%)]" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <main className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src="/image.png" alt="CatchUpX" className="w-16 h-16" />
        </div>
        
        {/* Title */}
        <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground tracking-tight">
          <span className="text-primary text-glow-primary">Catch</span>
          <span className="text-secondary text-glow-secondary">Up</span>
          <span className="text-accent">X</span>
        </h1>
        
        <p className="font-heading text-xl md:text-2xl text-muted-foreground tracking-wide">
          Learn What You Missed
        </p>
        
        {/* Description Cards - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="gradient-border p-6 bg-card/50 backdrop-blur-sm">
            <div className="flex justify-center mb-4">
              <Target className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
              Identify Learning Gaps
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Take our diagnostic quiz to pinpoint exactly where you need help. Our AI analyzes your answers to identify specific concepts you're struggling with.
            </p>
          </div>
          
          <div className="gradient-border p-6 bg-card/50 backdrop-blur-sm">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-10 h-10 text-secondary" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
              AI-Powered Lessons
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Get personalized lessons tailored to your unique learning needs. Our AI creates custom explanations, examples, and practice problems just for you.
            </p>
          </div>
          
          <div className="gradient-border p-6 bg-card/50 backdrop-blur-sm">
            <div className="flex justify-center mb-4">
              <Zap className="w-10 h-10 text-accent" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
              Custom Study Plan
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Receive a structured 2-week study plan designed to help you catch up quickly and efficiently. Track your progress and achieve your learning goals.
            </p>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="pt-6 space-y-4">
          <Button 
            size="lg" 
            onClick={handleStartQuiz}
            className="text-lg px-12 animate-pulse-glow gap-2 w-full md:w-auto"
          >
            <Zap className="w-5 h-5" />
            {user ? "Start Diagnostic Quiz" : "Login to Start Quiz"}
          </Button>
          
          {!user && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Please login to access personalized learning features
              </p>
            </div>
          )}
        </div>
        
        {/* Grade info */}
        <p className="text-sm text-muted-foreground/70 pt-4">
          For students in Grades 6–12
        </p>
      </main>
    </div>
  );
};

export default HomePage;
