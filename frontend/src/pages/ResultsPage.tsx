import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { mockResults } from "@/data/quizData";
import { ArrowLeft, AlertTriangle, Target } from "lucide-react";

const ResultsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(320_100%_60%_/_0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(180_100%_50%_/_0.08)_0%,_transparent_50%)]" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/quiz")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Your Results
            </h1>
            <p className="text-muted-foreground mt-1">
              Analysis of your diagnostic quiz
            </p>
          </div>
        </div>

        {/* Weakness Report */}
        <div className="gradient-border p-6 md:p-8 bg-card/50 backdrop-blur-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-secondary/20">
              <AlertTriangle className="w-5 h-5 text-secondary" />
            </div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Your Learning Gaps
            </h2>
          </div>
          <p className="text-foreground/85 leading-relaxed text-lg">
            {mockResults.weakness_report}
          </p>
        </div>

        {/* Priority Concepts */}
        <div className="gradient-border p-6 md:p-8 bg-card/50 backdrop-blur-sm mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/20">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Priority Concepts to Fix
            </h2>
          </div>
          <ul className="space-y-3">
            {mockResults.priority_concepts.map((concept, index) => (
              <li 
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/30"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary font-heading font-bold text-sm shrink-0">
                  {index + 1}
                </span>
                <span className="text-foreground/90">{concept}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button 
            size="lg" 
            onClick={() => navigate("/lesson")}
            className="px-12"
          >
            View Catch-Up Lesson
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
