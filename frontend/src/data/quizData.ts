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
    question_id: "MATH_Q1",
    question_text: "What is the value of x in the equation 2x + 5 = 15?",
    options: ["A) x = 5", "B) x = 10", "C) x = 7", "D) x = 3"],
  },
  {
    question_id: "MATH_Q2",
    question_text: "Which of these is a prime number?",
    options: ["A) 21", "B) 17", "C) 15", "D) 27"],
  },
  {
    question_id: "MATH_Q3",
    question_text: "What is the area of a rectangle with length 8cm and width 5cm?",
    options: ["A) 13 cm²", "B) 26 cm²", "C) 40 cm²", "D) 80 cm²"],
  },
  {
    question_id: "MATH_Q4",
    question_text: "Simplify: 3² + 4²",
    options: ["A) 7", "B) 12", "C) 25", "D) 49"],
  },
  {
    question_id: "MATH_Q5",
    question_text: "What is the perimeter of a square with side 6cm?",
    options: ["A) 12 cm", "B) 24 cm", "C) 36 cm", "D) 18 cm"],
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
  study_plan: {
    "Day 1": "Math – Linear Equations",
    "Day 2": "Science – Heat Transfer", 
    "Day 3": "Math – Practice",
    "Day 4": "Science – Practice",
    "Day 5": "Revision"
  }
};
