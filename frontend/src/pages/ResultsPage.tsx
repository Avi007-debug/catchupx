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
    const { grade, subject, answers } = quizData;
    
    // Calculate score and identify weak concepts
    let correctCount = 0;
    const conceptPerformance: Record<string, { correct: number; total: number; questions: string[] }> = {};
    const incorrectAnswers: any[] = [];

    answers.forEach((answer: any) => {
      const correctAnswer = correctAnswers[answer.question_id];
      const isCorrect = answer.selected_option === correctAnswer;
      
      if (isCorrect) {
        correctCount++;
      } else {
        incorrectAnswers.push({
          questionId: answer.question_id,
          selected: answer.selected_option,
          correct: correctAnswer
        });
      }

      // Extract concept from question ID (simplified)
      let concept = "General";
      if (answer.question_id.includes("MATH")) {
        if (answer.question_id.includes("Q1")) concept = "Linear Equations";
        else if (answer.question_id.includes("Q2")) concept = "Exponents";
        else if (answer.question_id.includes("Q3")) concept = "Prime Numbers";
        else if (answer.question_id.includes("Q4")) concept = "Area Calculation";
        else if (answer.question_id.includes("Q5")) concept = "Algebraic Expressions";
      } else if (answer.question_id.includes("SCI")) {
        if (answer.question_id.includes("Q1")) concept = "Chemical Formulas";
        else if (answer.question_id.includes("Q2")) concept = "Cell Biology";
        else if (answer.question_id.includes("Q3")) concept = "Energy Types";
        else if (answer.question_id.includes("Q4")) concept = "Atmosphere";
        else if (answer.question_id.includes("Q5")) concept = "Plant Processes";
      }

      if (!conceptPerformance[concept]) {
        conceptPerformance[concept] = { correct: 0, total: 0, questions: [] };
      }
      conceptPerformance[concept].total++;
      conceptPerformance[concept].questions.push(answer.question_id);
      if (isCorrect) {
        conceptPerformance[concept].correct++;
      }
    });

    const totalQuestions = answers.length;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    // Identify weak concepts (less than 60% accuracy)
    const weakConcepts = Object.entries(conceptPerformance)
      .filter(([_, performance]) => (performance.correct / performance.total) < 0.6)
      .map(([concept, performance]) => ({
        name: concept,
        accuracy: Math.round((performance.correct / performance.total) * 100),
        questionsAttempted: performance.total,
        questionsIncorrect: performance.total - performance.correct
      }))
      .sort((a, b) => a.accuracy - b.accuracy);

    // Generate weakness report
    const weaknessReport = `Based on the quiz (${totalQuestions} questions), you scored ${scorePercentage}% overall. ${
      weakConcepts.length > 0 
        ? `You need additional practice in ${weakConcepts.map(c => c.name).join(', ')}. Your performance shows gaps in understanding these fundamental concepts.`
        : 'You demonstrate strong understanding across all tested concepts. Great job!'
    } This assessment is based on your responses to grade ${grade} ${subject} questions.`;

    const priorityConcepts = weakConcepts.slice(0, 4).map(c => c.name);

    setAnalysis({
      score: scorePercentage,
      correctCount,
      totalQuestions,
      weaknessReport,
      priorityConcepts,
      weakConcepts,
      incorrectAnswers,
      grade,
      subject
    });

    setLoading(false);
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
              Learning Gap Analysis (Based on the Quiz)
            </h2>
          </div>
          <p className="text-foreground/85 leading-relaxed text-lg">
            {analysis.weaknessReport}
          </p>
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
