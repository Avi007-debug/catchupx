import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Lightbulb, PenTool, Youtube } from "lucide-react";
import LoginIndicator from "@/components/LoginIndicator";
import { useEffect, useState } from "react";

const LessonPage = () => {
  const navigate = useNavigate();
  const [lessonData, setLessonData] = useState<any>(null);
  
  useEffect(() => {
    const savedData = localStorage.getItem('lesson_data');
    console.log('Saved lesson data from localStorage:', savedData);
    if (!savedData) {
      navigate('/setup');
      return;
    }
    const parsedData = JSON.parse(savedData);
    console.log('Parsed lesson data:', parsedData);
    console.log('Lesson explanation:', parsedData.lessonExplanation);
    console.log('Worked example:', parsedData.workedExample);
    console.log('Practice questions:', parsedData.practiceQuestions);
    setLessonData(parsedData);
  }, [navigate]);
  
  if (!lessonData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading lesson...</p>
        </div>
      </div>
    );
  }

  // Simple markdown-like parsing for bold text
  const parseText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h3 key={i} className="font-heading font-semibold text-primary mt-4 mb-2">{line.replace(/\*\*/g, '')}</h3>;
      }
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className="mb-2">
          {parts.map((part, j) => 
            part.startsWith('**') && part.endsWith('**') 
              ? <strong key={j} className="text-primary">{part.replace(/\*\*/g, '')}</strong>
              : part
          )}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative overflow-hidden">
      <LoginIndicator />
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(150_100%_50%_/_0.06)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(180_100%_50%_/_0.08)_0%,_transparent_50%)]" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/results")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Catch-Up Lesson
            </h1>
            <p className="text-muted-foreground mt-1">
              Master the concepts you need to catch up
            </p>
          </div>
        </div>

        {/* Concept Explanation */}
        <div className="gradient-border p-6 md:p-8 bg-card/50 backdrop-blur-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/20">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Concept Explanation
            </h2>
          </div>
          <div className="text-foreground/85 leading-relaxed">
            {parseText(lessonData.lessonExplanation || lessonData.lessonContent || 'No lesson content available.')}
          </div>
        </div>

        {/* YouTube Recommendations */}
        {lessonData.youtubeVideos && lessonData.youtubeVideos.length > 0 && (
          <div className="gradient-border p-6 md:p-8 bg-card/50 backdrop-blur-sm mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-500/20">
                <Youtube className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Recommended Videos
              </h2>
            </div>
            <div className="space-y-3">
              {lessonData.youtubeVideos.map((video: any, index: number) => (
                <a
                  key={index}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border/30 hover:border-red-500/50 hover:bg-red-500/5 transition-all duration-200 group"
                >
                  <div className="p-2 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-colors">
                    <Youtube className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground group-hover:text-red-500 transition-colors mb-1">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{video.channel}</p>
                    <p className="text-xs text-muted-foreground mt-1">{video.duration}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Worked Example */}
        <div className="gradient-border p-6 md:p-8 bg-card/50 backdrop-blur-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-secondary/20">
              <Lightbulb className="w-5 h-5 text-secondary" />
            </div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Worked Example
            </h2>
          </div>
          <div className="text-foreground/85 leading-relaxed font-mono text-sm bg-muted/30 p-4 rounded-lg border border-border/30">
            {parseText(lessonData.workedExample || 'No worked example available.')}
          </div>
        </div>

        {/* Practice Questions */}
        <div className="gradient-border p-6 md:p-8 bg-card/50 backdrop-blur-sm mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/20">
              <PenTool className="w-5 h-5 text-accent" />
            </div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Practice Questions
            </h2>
          </div>
          <ul className="space-y-3">
            {(lessonData.practiceQuestions || []).map((question: string, index: number) => (
              <li 
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/30"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent font-heading font-bold text-sm shrink-0">
                  {index + 1}
                </span>
                <span className="text-foreground/90">{question}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button 
            size="lg" 
            onClick={() => navigate("/study-plan")}
            className="px-12"
          >
            View 5-Day Study Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
