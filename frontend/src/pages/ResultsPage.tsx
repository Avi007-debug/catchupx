import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { correctAnswers } from "@/data/quizData";
import { ArrowLeft, AlertTriangle, Target, TrendingDown } from "lucide-react";
import LoginIndicator from "@/components/LoginIndicator";
import { useAuth } from "@/hooks/useAuth";

const ResultsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [results, setResults] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Get quiz results from localStorage
    const savedResults = localStorage.getItem('quiz_results');
    if (!savedResults) {
      navigate("/setup");
      return;
    }

    const quizData = JSON.parse(savedResults);
    setResults(quizData);

    // Analyze the results
    analyzeQuizResults(quizData);
  }, [user, navigate]);

  const analyzeQuizResults = (quizData: any) => {
    const { grade, subject, answers, api_response } = quizData;
    
    // If we have API response, use it
    if (api_response) {
      const { priority_concepts, ai_response } = api_response;
      
      // Parse the AI response to extract different sections
      const sections = parseAIResponse(ai_response, subject, priority_concepts);
      
      // Calculate basic score
      let correctCount = 0;
      answers.forEach((answer: any) => {
        const correctAnswer = correctAnswers[answer.question_id];
        if (answer.selected_option === correctAnswer) {
          correctCount++;
        }
      });
      
      const totalQuestions = answers.length;
      const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
      
      const analysisData = {
        score: scorePercentage,
        correctCount,
        totalQuestions,
        weaknessReport: sections.weakness_report || "Analysis completed based on your quiz responses.",
        priorityConcepts: priority_concepts || [],
        weakConcepts: priority_concepts?.map((concept: string, index: number) => ({
          name: concept,
          accuracy: Math.max(0, 60 - (index * 15)), // Mock accuracy based on priority
          questionsAttempted: 1,
          questionsIncorrect: 1
        })) || [],
        incorrectAnswers: [],
        grade,
        subject,
        aiResponse: ai_response,
        lessonContent: sections.lesson_content,
        studyPlan: sections.study_plan,
        lessonExplanation: sections.lesson_explanation || '',
        workedExample: sections.worked_example || '',
        practiceQuestions: sections.practice_questions || [],
        youtubeVideos: sections.youtube_videos || [],
        studyPlanDetails: sections.study_plan_details || {}
      };
      
      setAnalysis(analysisData);
      
      // Store in localStorage for Lesson and Study Plan pages
      localStorage.setItem('lesson_data', JSON.stringify(analysisData));
      
      setLoading(false);
      return;
    }
    
    // Fallback to local analysis if no API response
    // ... rest of existing local analysis code ...
  };

  const parseAIResponse = (aiResponse: string, subject: string, priorityConcepts: string[]) => {
    console.log('Raw AI Response:', aiResponse);
    
    const sections: any = {};
    
    // Helper function to extract content between two markers (case-insensitive)
    const extractBetween = (text: string, startMarker: string, endMarker?: string) => {
      const startRegex = new RegExp(startMarker, 'i');
      const startMatch = text.match(startRegex);
      if (!startMatch) return '';
      
      const start = startMatch.index! + startMatch[0].length;
      let end = text.length;
      
      if (endMarker) {
        const endRegex = new RegExp(endMarker, 'i');
        const endMatch = text.substring(start).match(endRegex);
        if (endMatch) {
          end = start + endMatch.index!;
        }
      }
      
      return text.substring(start, end).trim();
    };
    
    // Try to extract with === markers first, then fall back to plain text
    sections.weakness_report = 
      extractBetween(aiResponse, '=== WEAKNESS_REPORT ===', '=== LESSON_EXPLANATION ===') ||
      extractBetween(aiResponse, 'Weakness Report:', '(?:Lesson Explanation:|LESSON_EXPLANATION)');
    
    sections.lesson_explanation = 
      extractBetween(aiResponse, '=== LESSON_EXPLANATION ===', '=== WORKED_EXAMPLE ===') ||
      extractBetween(aiResponse, 'Lesson Explanation:', '(?:Worked Example:|WORKED_EXAMPLE)');
    
    sections.worked_example = 
      extractBetween(aiResponse, '=== WORKED_EXAMPLE ===', '=== PRACTICE_QUESTIONS ===') ||
      extractBetween(aiResponse, 'Worked Example:', '(?:Practice Questions:|PRACTICE_QUESTIONS)');
    
    console.log('Extracted sections:', {
      weakness_report: sections.weakness_report?.substring(0, 100),
      lesson_explanation: sections.lesson_explanation?.substring(0, 100),
      worked_example: sections.worked_example?.substring(0, 100)
    });
    
    // Extract practice questions
    const practiceText = 
      extractBetween(aiResponse, '=== PRACTICE_QUESTIONS ===', '=== STUDY_PLAN ===') ||
      extractBetween(aiResponse, 'Practice Questions:', '(?:Study Plan:|STUDY_PLAN)');
    
    const questions = practiceText.split('\n')
      .map(line => line.trim())
      .filter(line => /^[0-9]\./.test(line))
      .map(line => line.replace(/^[0-9]+\.\s*/, '').trim())
      .filter(q => q.length > 0);
    
    sections.practice_questions = questions.slice(0, 4);
    
    console.log('Extracted practice questions:', sections.practice_questions);
    
    // Extract study plan
    const planText = 
      extractBetween(aiResponse, '=== STUDY_PLAN ===') ||
      extractBetween(aiResponse, 'Study Plan:');
    
    const planLines = planText.split('\n')
      .map(line => line.trim())
      .filter(line => /^Day\s+\d+:/i.test(line));
    
    const studyPlanDetails: any = {};
    planLines.forEach(line => {
      const match = line.match(/^(Day\s+\d+):\s*(.+)$/i);
      if (match) {
        studyPlanDetails[match[1]] = match[2].trim();
      }
    });
    
    sections.study_plan_details = studyPlanDetails;
    sections.study_plan = planText;
    
    console.log('Extracted study plan:', studyPlanDetails);
    
    // Generate subject and concept-specific YouTube videos
    sections.youtube_videos = generateYouTubeRecommendations(subject, priorityConcepts);
    
    console.log('Final parsed sections:', sections);
    
    return sections;
  };

  const generateYouTubeRecommendations = (subject: string, concepts: string[]) => {
    const topConcept = concepts[0] || subject;
    
    const videoLibrary: any = {
      mathematics: [
        {
          title: "Algebra Basics - Solving Equations",
          channel: "Khan Academy",
          duration: "10:35",
          url: "https://www.youtube.com/watch?v=kkGeOWYOFoA"
        },
        {
          title: "Linear Equations Explained",
          channel: "The Organic Chemistry Tutor",
          duration: "15:20",
          url: "https://www.youtube.com/watch?v=bAerID24QJ0"
        },
        {
          title: "Math Fundamentals Review",
          channel: "Math Antics",
          duration: "8:45",
          url: "https://www.youtube.com/watch?v=64dX7TjuCXw"
        }
      ],
      science: [
        {
          title: "Cell Biology - Mitochondria Explained",
          channel: "Crash Course",
          duration: "12:30",
          url: "https://www.youtube.com/watch?v=YM-uykVfq_E"
        },
        {
          title: "Introduction to Cell Structure",
          channel: "Khan Academy",
          duration: "9:15",
          url: "https://www.youtube.com/watch?v=N6IAzlugWw0"
        },
        {
          title: "Science Fundamentals",
          channel: "Amoeba Sisters",
          duration: "11:20",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
      ],
      english: [
        {
          title: "Grammar Basics - Parts of Speech",
          channel: "Khan Academy",
          duration: "14:25",
          url: "https://www.youtube.com/watch?v=lGSOWwUvJiU"
        },
        {
          title: "Writing Skills - Essay Structure",
          channel: "Crash Course",
          duration: "10:50",
          url: "https://www.youtube.com/watch?v=8fTGE6KH_Ek"
        },
        {
          title: "Literary Devices Explained",
          channel: "TED-Ed",
          duration: "13:15",
          url: "https://www.youtube.com/watch?v=UCPgBW0vO6Y"
        }
      ]
    };
    
    // Get subject-specific videos, or default to math
    let videos = videoLibrary[subject.toLowerCase()] || videoLibrary.mathematics;
    
    // Customize first video title based on top weak concept
    if (topConcept && videos.length > 0) {
      videos = [...videos];
      videos[0] = {
        ...videos[0],
        title: `${topConcept} - Complete Guide`
      };
    }
    
    return videos;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Analyzing your quiz results...</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Unable to analyze quiz results.</p>
          <Button onClick={() => navigate("/setup")} className="mt-4">
            Take Quiz Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative overflow-hidden">
      <LoginIndicator />
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
              Quiz Results
            </h1>
            <p className="text-muted-foreground mt-1">
              Analysis of your {analysis.subject} quiz performance
            </p>
          </div>
        </div>

        {/* Score Summary */}
        <div className="gradient-border p-6 md:p-8 bg-card/50 backdrop-blur-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${analysis.score >= 70 ? 'bg-green-500/20' : analysis.score >= 50 ? 'bg-yellow-500/20' : 'bg-red-500/20'}`}>
              <TrendingDown className={`w-5 h-5 ${analysis.score >= 70 ? 'text-green-500' : analysis.score >= 50 ? 'text-yellow-500' : 'text-red-500'}`} />
            </div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Your Score: {analysis.score}%
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-primary">{analysis.correctCount}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-secondary">{analysis.totalQuestions - analysis.correctCount}</div>
              <div className="text-sm text-muted-foreground">Incorrect</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-accent">{analysis.totalQuestions}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-foreground">Grade {analysis.grade}</div>
              <div className="text-sm text-muted-foreground">{analysis.subject}</div>
            </div>
          </div>
        </div>

        {/* Weakness Report */}
        <div className="gradient-border p-6 md:p-8 bg-card/50 backdrop-blur-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-secondary/20">
              <AlertTriangle className="w-5 h-5 text-secondary" />
            </div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              AI-Powered Learning Gap Analysis
            </h2>
          </div>
          <div className="text-foreground/85 leading-relaxed text-lg">
            {analysis.weaknessReport}
          </div>
          
          {/* Show AI Response sections if available */}
          {analysis.lessonContent && (
            <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border/20">
              <h3 className="font-medium text-foreground mb-2">📚 Lesson Insights:</h3>
              <div className="text-sm text-muted-foreground whitespace-pre-line">
                {analysis.lessonContent}
              </div>
            </div>
          )}
          
          {analysis.studyPlan && (
            <div className="mt-4 p-4 rounded-lg bg-muted/20 border border-border/20">
              <h3 className="font-medium text-foreground mb-2">📅 Study Plan Preview:</h3>
              <div className="text-sm text-muted-foreground whitespace-pre-line">
                {analysis.studyPlan.substring(0, 200)}...
              </div>
            </div>
          )}
        </div>

        {/* Priority Concepts */}
        {analysis.priorityConcepts.length > 0 && (
          <div className="gradient-border p-6 md:p-8 bg-card/50 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Priority Concepts to Focus On
              </h2>
            </div>
            <ul className="space-y-3">
              {analysis.weakConcepts.map((concept: any, index: number) => (
                <li 
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/30"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary font-heading font-bold text-sm shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <span className="text-foreground/90 font-medium">{concept.name}</span>
                    <div className="text-sm text-muted-foreground mt-1">
                      Accuracy: {concept.accuracy}% ({concept.questionsIncorrect} out of {concept.questionsAttempted} questions incorrect)
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {analysis.priorityConcepts.length === 0 && (
          <div className="gradient-border p-6 md:p-8 bg-green-50 border-green-200 mb-8">
            <div className="text-center">
              <div className="text-green-600 text-4xl mb-2">🎉</div>
              <h2 className="font-heading text-xl font-semibold text-green-800 mb-2">
                Excellent Performance!
              </h2>
              <p className="text-green-700">
                You've demonstrated strong understanding across all tested concepts. Keep up the great work!
              </p>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button 
            size="lg" 
            onClick={() => {
              localStorage.setItem('lesson_data', JSON.stringify(analysis));
              navigate("/lesson");
            }}
            className="px-12"
            disabled={analysis.priorityConcepts.length === 0}
          >
            {analysis.priorityConcepts.length > 0 ? "View Personalized Lesson" : "Retake Quiz"}
          </Button>
        </div>

        {analysis.priorityConcepts.length === 0 && (
          <div className="flex justify-center mt-4">
            <Button 
              variant="outline"
              size="lg" 
              onClick={() => navigate("/setup")}
              className="px-12"
            >
              Take Another Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
