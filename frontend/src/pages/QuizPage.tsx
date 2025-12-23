import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { generateQuizQuestions, Answer, Question } from "@/data/quizData";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import LoginIndicator from "@/components/LoginIndicator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const QuizPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [grade, setGrade] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    if (!user) {
      navigate("/login");
      return;
    }

    // Get grade and subject from localStorage (set in SetupPage)
    const savedGrade = localStorage.getItem('quiz_grade');
    const savedSubject = localStorage.getItem('quiz_subject');

    if (!savedGrade || !savedSubject) {
      navigate("/setup");
      return;
    }

    setGrade(savedGrade);
    setSubject(savedSubject);

    // Generate questions based on grade and subject
    const questions = generateQuizQuestions(savedGrade, savedSubject);
    setQuizQuestions(questions);
    setLoading(false);
  }, [user, navigate]);

  const handleAnswerChange = (questionId: string, selectedOption: string) => {
    setAnswers(prev => {
      const existing = prev.findIndex(a => a.question_id === questionId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { question_id: questionId, selected_option: selectedOption };
        return updated;
      }
      return [...prev, { question_id: questionId, selected_option: selectedOption }];
    });
  };

  const isComplete = grade && answers.length === quizQuestions.length;

  const handleSubmit = async () => {
    if (answers.length !== quizQuestions.length) {
      toast({
        title: "Incomplete Quiz",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    // Prepare payload for API
    const payload = {
      grade: grade,
      subject: subject,
      answers: answers
    };
    
    console.log("📤 Sending to API:", JSON.stringify(payload, null, 2));
    
    try {
      // Call the real Lambda API
      const response = await fetch('https://jnmw6jyz8f.execute-api.us-east-1.amazonaws.com/prod/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const results = await response.json();
      console.log("📥 Received from API:", results);
      
      // Store results for the results page
      localStorage.setItem('quiz_results', JSON.stringify({
        ...payload,
        api_response: results
      }));
      
      navigate("/results");
    } catch (error) {
      console.error("API Error:", error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze your quiz results. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No questions available for this grade and subject.</p>
          <Button onClick={() => navigate("/setup")} className="mt-4">
            Go Back to Setup
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative overflow-hidden">
      <LoginIndicator />
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(180_100%_50%_/_0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(320_100%_60%_/_0.08)_0%,_transparent_50%)]" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/setup")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              {subject.charAt(0).toUpperCase() + subject.slice(1)} Quiz - Grade {grade}
            </h1>
            <p className="text-muted-foreground mt-1">
              Answer all questions to identify your learning gaps
            </p>
          </div>
        </div>

        {/* Quiz Info */}
        <div className="gradient-border p-4 bg-card/50 backdrop-blur-sm mb-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Subject: <span className="font-medium text-foreground">{subject.charAt(0).toUpperCase() + subject.slice(1)}</span></span>
            <span>Grade: <span className="font-medium text-foreground">{grade}</span></span>
            <span>Questions: <span className="font-medium text-foreground">{quizQuestions.length}</span></span>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {quizQuestions.map((question, index) => {
            const selectedAnswer = answers.find(a => a.question_id === question.question_id);
            const isAnswered = !!selectedAnswer;
            
            return (
              <div 
                key={question.question_id} 
                className={`gradient-border p-6 bg-card/50 backdrop-blur-sm transition-all duration-300 relative ${isAnswered ? 'border-primary/30' : ''}`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-lg font-heading font-bold text-sm shrink-0 ${
                    isAnswered ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {isAnswered ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                  </span>
                  <h3 className="text-lg font-medium text-foreground leading-relaxed">
                    {question.question_text}
                  </h3>
                </div>
                
                <div className="space-y-3 ml-11">
                  {question.options.map((option, optIndex) => {
                    const optionLetter = option.charAt(0); // Extract A, B, C, D
                    const isSelected = selectedAnswer?.selected_option === optionLetter;
                    
                    return (
                      <label 
                        key={optIndex}
                        className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer relative z-10 ${
                          isSelected 
                            ? 'border-primary/50 bg-primary/10' 
                            : 'border-border/30 hover:border-border/60 hover:bg-muted/30'
                        }`}
                        htmlFor={`${question.question_id}-${optionLetter}`}
                      >
                        <input
                          type="radio"
                          id={`${question.question_id}-${optionLetter}`}
                          name={`question-${question.question_id}`}
                          value={optionLetter}
                          checked={isSelected}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleAnswerChange(question.question_id, optionLetter);
                          }}
                          className="w-4 h-4 text-primary border-primary/50 focus:ring-primary cursor-pointer accent-primary"
                        />
                        <span className="text-foreground/90 flex-1 cursor-pointer select-none">
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <Button 
            size="lg" 
            onClick={handleSubmit}
            className="px-12"
          >
            Submit Quiz
          </Button>
        </div>

        {/* Progress indicator */}
        <p className="text-center text-muted-foreground mt-4 text-sm">
          {answers.length} of {quizQuestions.length} questions answered
        </p>
      </div>
    </div>
  );
};

export default QuizPage;
