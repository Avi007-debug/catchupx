import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { quizQuestions, Answer } from "@/data/quizData";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const QuizPage = () => {
  const navigate = useNavigate();
  const [grade, setGrade] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([]);

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

  const handleSubmit = () => {
    if (isComplete) {
      // In real app, this would send to API
      console.log({ grade, answers });
      navigate("/results");
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(180_100%_50%_/_0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(320_100%_60%_/_0.08)_0%,_transparent_50%)]" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Diagnostic Quiz
            </h1>
            <p className="text-muted-foreground mt-1">
              Answer the questions to identify your learning gaps
            </p>
          </div>
        </div>

        {/* Grade Selection */}
        <div className="gradient-border p-6 bg-card/50 backdrop-blur-sm mb-6">
          <Label htmlFor="grade" className="text-lg font-heading text-foreground mb-3 block">
            Select Grade
          </Label>
          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger className="w-full md:w-64 bg-input border-border/50 text-foreground">
              <SelectValue placeholder="Choose your grade" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {[6, 7, 8, 9, 10].map(g => (
                <SelectItem key={g} value={g.toString()} className="text-foreground hover:bg-muted">
                  Grade {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {quizQuestions.map((question, index) => {
            const selectedAnswer = answers.find(a => a.question_id === question.question_id);
            const isAnswered = !!selectedAnswer;
            
            return (
              <div 
                key={question.question_id} 
                className={`gradient-border p-6 bg-card/50 backdrop-blur-sm transition-all duration-300 ${isAnswered ? 'border-primary/30' : ''}`}
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
                
                <RadioGroup
                  value={selectedAnswer?.selected_option || ""}
                  onValueChange={(value) => handleAnswerChange(question.question_id, value)}
                  className="space-y-3 ml-11"
                >
                  {question.options.map((option, optIndex) => (
                    <div 
                      key={optIndex}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                        selectedAnswer?.selected_option === option 
                          ? 'border-primary/50 bg-primary/10' 
                          : 'border-border/30 hover:border-border/60 hover:bg-muted/30'
                      }`}
                    >
                      <RadioGroupItem 
                        value={option} 
                        id={`${question.question_id}-${optIndex}`}
                        className="border-primary/50 text-primary"
                      />
                      <Label 
                        htmlFor={`${question.question_id}-${optIndex}`}
                        className="text-foreground/90 cursor-pointer flex-1"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <Button 
            size="lg" 
            onClick={handleSubmit}
            disabled={!isComplete}
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
