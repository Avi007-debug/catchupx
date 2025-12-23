import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Target } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(180_100%_50%_/_0.1)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(320_100%_60%_/_0.1)_0%,_transparent_50%)]" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <main className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/30">
            <Zap className="w-8 h-8 text-primary" />
          </div>
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
        
        {/* Description Card */}
        <div className="gradient-border p-6 md:p-8 bg-card/50 backdrop-blur-sm">
          <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
            CatchUpX helps you identify learning gaps and creates a{" "}
            <span className="text-primary font-semibold">personalized catch-up plan</span> using AI.
          </p>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-card/30 border border-border/50">
            <Target className="w-5 h-5 text-primary shrink-0" />
            <span className="text-sm text-muted-foreground">Identify Gaps</span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-card/30 border border-border/50">
            <Sparkles className="w-5 h-5 text-secondary shrink-0" />
            <span className="text-sm text-muted-foreground">AI-Powered</span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-card/30 border border-border/50">
            <Zap className="w-5 h-5 text-accent shrink-0" />
            <span className="text-sm text-muted-foreground">Custom Plan</span>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="pt-6">
          <Button 
            size="lg" 
            onClick={() => navigate("/quiz")}
            className="text-lg px-12 animate-pulse-glow"
          >
            Start Diagnostic Quiz
          </Button>
        </div>
        
        {/* Grade info */}
        <p className="text-sm text-muted-foreground/70 pt-4">
          For students in Grades 6–10
        </p>
      </main>
    </div>
  );
};

export default HomePage;
