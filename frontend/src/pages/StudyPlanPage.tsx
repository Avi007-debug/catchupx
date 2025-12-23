import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { mockStudyPlan } from "@/data/quizData";
import { ArrowLeft, Calendar, Clock, BookMarked, RotateCcw } from "lucide-react";

const StudyPlanPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(180_100%_50%_/_0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(150_100%_50%_/_0.06)_0%,_transparent_50%)]" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/lesson")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Your 5-Day Personalized Study Plan
            </h1>
            <p className="text-muted-foreground mt-1">
              Follow this plan to catch up on missed concepts
            </p>
          </div>
        </div>

        {/* Study Plan Cards */}
        <div className="space-y-4">
          {mockStudyPlan.study_plan.map((day, index) => {
            const colors = [
              { bg: 'bg-primary/20', text: 'text-primary', border: 'border-primary/30' },
              { bg: 'bg-secondary/20', text: 'text-secondary', border: 'border-secondary/30' },
              { bg: 'bg-accent/20', text: 'text-accent', border: 'border-accent/30' },
              { bg: 'bg-primary/20', text: 'text-primary', border: 'border-primary/30' },
              { bg: 'bg-secondary/20', text: 'text-secondary', border: 'border-secondary/30' },
            ];
            const color = colors[index];
            
            return (
              <div 
                key={index}
                className={`gradient-border p-6 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:translate-x-1`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Day badge */}
                  <div className={`flex items-center justify-center w-20 h-20 rounded-xl ${color.bg} ${color.border} border shrink-0`}>
                    <div className="text-center">
                      <Calendar className={`w-5 h-5 mx-auto mb-1 ${color.text}`} />
                      <span className={`font-heading font-bold ${color.text}`}>
                        {day.day}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {day.topic}
                    </h3>
                    
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <BookMarked className="w-4 h-4 mt-1 shrink-0" />
                      <span>{day.activities}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className={`w-4 h-4 ${color.text}`} />
                      <span className={`font-medium ${color.text}`}>{day.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Restart Button */}
        <div className="mt-10 flex justify-center">
          <Button 
            variant="outline"
            size="lg" 
            onClick={() => navigate("/")}
            className="px-12 gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Start New Assessment
          </Button>
        </div>

        {/* Encouragement */}
        <div className="mt-8 text-center">
          <div className="inline-block gradient-border p-4 bg-card/30">
            <p className="text-muted-foreground text-sm">
              🎯 Stay consistent and you'll master these concepts in no time!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanPage;
