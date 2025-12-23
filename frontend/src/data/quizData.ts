export interface Question {
  question_id: string;
  question_text: string;
  options: string[];
}

export interface Answer {
  question_id: string;
  selected_option: string;
}

export const quizQuestions: Question[] = [
  {
    question_id: "q1",
    question_text: "What is the value of x in the equation 2x + 5 = 15?",
    options: ["x = 5", "x = 10", "x = 7", "x = 3"],
  },
  {
    question_id: "q2",
    question_text: "Which of these is a prime number?",
    options: ["21", "17", "15", "27"],
  },
  {
    question_id: "q3",
    question_text: "What is the area of a rectangle with length 8cm and width 5cm?",
    options: ["13 cm²", "26 cm²", "40 cm²", "80 cm²"],
  },
  {
    question_id: "q4",
    question_text: "Simplify: 3² + 4²",
    options: ["7", "12", "25", "49"],
  },
  {
    question_id: "q5",
    question_text: "What is the perimeter of a square with side 6cm?",
    options: ["12 cm", "24 cm", "36 cm", "18 cm"],
  },
];

export const mockResults = {
  weakness_report: "Based on your quiz responses, you show strong understanding in basic arithmetic but need additional practice with algebraic equations and geometric calculations. Your problem-solving approach is logical, but there are gaps in applying formulas correctly.",
  priority_concepts: [
    "Linear Equations - Solving for unknown variables",
    "Geometry - Area and perimeter calculations",
    "Number Theory - Prime numbers and factors",
    "Exponents - Simplifying expressions with powers",
  ],
};

export const mockLesson = {
  lesson_explanation: `**Linear Equations Fundamentals**

A linear equation is an equation where the highest power of the variable is 1. To solve for x:

1. **Isolate the variable** - Move all terms with x to one side
2. **Combine like terms** - Simplify both sides
3. **Divide or multiply** - Get x alone

For example: 2x + 5 = 15
- Subtract 5 from both sides: 2x = 10
- Divide both sides by 2: x = 5

Remember: Whatever you do to one side, you must do to the other!`,
  
  worked_example: `**Problem:** Solve for x: 3x - 7 = 14

**Step 1:** Add 7 to both sides
3x - 7 + 7 = 14 + 7
3x = 21

**Step 2:** Divide both sides by 3
3x ÷ 3 = 21 ÷ 3
x = 7

**Check:** 3(7) - 7 = 21 - 7 = 14 ✓`,
  
  practice_questions: [
    "Solve: 4x + 3 = 19",
    "Solve: 2x - 8 = 12",
    "Solve: 5x + 10 = 35",
    "Solve: x/2 + 4 = 10",
  ],
};

export const mockStudyPlan = {
  study_plan: [
    {
      day: "Day 1",
      topic: "Linear Equations Basics",
      activities: "Review lesson notes, practice 10 simple equations",
      duration: "45 minutes",
    },
    {
      day: "Day 2",
      topic: "Multi-step Equations",
      activities: "Watch tutorial video, solve 15 practice problems",
      duration: "60 minutes",
    },
    {
      day: "Day 3",
      topic: "Geometry - Area Formulas",
      activities: "Memorize formulas, calculate areas for 10 shapes",
      duration: "50 minutes",
    },
    {
      day: "Day 4",
      topic: "Geometry - Perimeter & Mixed Problems",
      activities: "Practice worksheet, quiz yourself",
      duration: "45 minutes",
    },
    {
      day: "Day 5",
      topic: "Review & Self-Assessment",
      activities: "Complete practice test, review mistakes",
      duration: "60 minutes",
    },
  ],
};
