import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, BookMarked, RotateCcw } from "lucide-react";
import LoginIndicator from "@/components/LoginIndicator";
import { useEffect, useState } from "react";

const StudyPlanPage = () => {
  const navigate = useNavigate();
  const [studyPlanData, setStudyPlanData] = useState<any>(null);
  
  useEffect(() => {
    const savedData = localStorage.getItem('lesson_data');
    if (!savedData) {
      navigate('/setup');
      return;
    }
    const data = JSON.parse(savedData);
    setStudyPlanData(data.studyPlanDetails || {});
  }, [navigate]);
  
  if (!studyPlanData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading study plan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative overflow-hidden">
      <LoginIndicator />
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
          {Object.entries(studyPlanData).map(([day, details]: [string, any], index: number) => {
            const colors = [
              { bg: 'bg-primary/20', text: 'text-primary', border: 'border-primary/30' },
              { bg: 'bg-secondary/20', text: 'text-secondary', border: 'border-secondary/30' },
              { bg: 'bg-accent/20', text: 'text-accent', border: 'border-accent/30' },
              { bg: 'bg-primary/20', text: 'text-primary', border: 'border-primary/30' },
              { bg: 'bg-secondary/20', text: 'text-secondary', border: 'border-secondary/30' },
            ];
            const color = colors[index];
            
            // Parse the detailed study plan
            const [topic, description] = details.split(' - ');
            
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
                        {day}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {topic}
                    </h3>
                    
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <BookMarked className="w-4 h-4 mt-1 shrink-0" />
                      <span>{description}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className={`w-4 h-4 ${color.text}`} />
                      <span className={`font-medium ${color.text}`}>45-60 minutes</span>
                    </div>

                    {/* Study activities */}
                    <div className="mt-4 p-3 rounded-lg bg-muted/20 border border-border/20">
                      <h4 className="font-medium text-foreground mb-2">Recommended Activities:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {index === 0 && (
                          <>
                            <li>• Review basic equation solving steps</li>
                            <li>• Practice 10-15 simple linear equations</li>
                            <li>• Watch Khan Academy video on linear equations</li>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <li>• Solve equations with variables on both sides</li>
                            <li>• Work through 5-8 word problems</li>
                            <li>• Complete practice worksheet</li>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <li>• Memorize area formulas for basic shapes</li>
                            <li>• Calculate areas for 10 different problems</li>
                            <li>• Create formula reference sheet</li>
                          </>
                        )}
                        {index === 3 && (
                          <>
                            <li>• Learn prime vs composite number definitions</li>
                            <li>• Practice identifying prime numbers 1-100</li>
                            <li>• Complete prime factorization exercises</li>
                          </>
                        )}
                        {index === 4 && (
                          <>
                            <li>• Take practice quiz covering all concepts</li>
                            <li>• Review incorrect answers from original quiz</li>
                            <li>• Self-assess progress and identify remaining gaps</li>
                          </>
                        )}
                      </ul>
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
