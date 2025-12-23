export interface Question {
  question_id: string;
  question_text: string;
  options: string[];
  grade: string;
  subject: string;
  concept: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Answer {
  question_id: string;
  selected_option: string;
}

// Question bank organized by grade and subject
export const questionBank: Record<string, Record<string, Question[]>> = {
  "6": {
    "mathematics": [
      {
        question_id: "MATH_6_Q1",
        question_text: "What is 15 + 28?",
        options: ["A) 43", "B) 42", "C) 44", "D) 41"],
        grade: "6",
        subject: "mathematics",
        concept: "Basic Addition",
        difficulty: "easy"
      },
      {
        question_id: "MATH_6_Q2",
        question_text: "What is the area of a rectangle with length 6 cm and width 4 cm?",
        options: ["A) 10 cm²", "B) 20 cm²", "C) 24 cm²", "D) 26 cm²"],
        grade: "6",
        subject: "mathematics",
        concept: "Area Calculation",
        difficulty: "medium"
      },
      {
        question_id: "MATH_6_Q3",
        question_text: "Which number is a prime number?",
        options: ["A) 9", "B) 15", "C) 17", "D) 21"],
        grade: "6",
        subject: "mathematics",
        concept: "Prime Numbers",
        difficulty: "medium"
      },
      {
        question_id: "MATH_6_Q4",
        question_text: "What is 144 ÷ 12?",
        options: ["A) 11", "B) 12", "C) 13", "D) 14"],
        grade: "6",
        subject: "mathematics",
        concept: "Division",
        difficulty: "easy"
      },
      {
        question_id: "MATH_6_Q5",
        question_text: "What is the perimeter of a square with side 8 cm?",
        options: ["A) 16 cm", "B) 24 cm", "C) 32 cm", "D) 64 cm"],
        grade: "6",
        subject: "mathematics",
        concept: "Perimeter",
        difficulty: "easy"
      }
    ],
    "science": [
      {
        question_id: "SCI_6_Q1",
        question_text: "What do plants need to make their own food?",
        options: ["A) Water only", "B) Sunlight only", "C) Water, sunlight, and carbon dioxide", "D) Soil only"],
        grade: "6",
        subject: "science",
        concept: "Photosynthesis",
        difficulty: "easy"
      },
      {
        question_id: "SCI_6_Q2",
        question_text: "Which of these is a renewable source of energy?",
        options: ["A) Coal", "B) Oil", "C) Solar energy", "D) Natural gas"],
        grade: "6",
        subject: "science",
        concept: "Energy Sources",
        difficulty: "medium"
      },
      {
        question_id: "SCI_6_Q3",
        question_text: "What is the main function of the heart?",
        options: ["A) To digest food", "B) To pump blood", "C) To breathe", "D) To think"],
        grade: "6",
        subject: "science",
        concept: "Human Body",
        difficulty: "easy"
      },
      {
        question_id: "SCI_6_Q4",
        question_text: "Which state of matter has a fixed shape and volume?",
        options: ["A) Gas", "B) Liquid", "C) Solid", "D) Plasma"],
        grade: "6",
        subject: "science",
        concept: "States of Matter",
        difficulty: "easy"
      },
      {
        question_id: "SCI_6_Q5",
        question_text: "What causes day and night on Earth?",
        options: ["A) Earth's rotation", "B) Earth's revolution", "C) Moon's phases", "D) Sun's movement"],
        grade: "6",
        subject: "science",
        concept: "Earth's Rotation",
        difficulty: "medium"
      }
    ]
  },
  "8": {
    "mathematics": [
      {
        question_id: "MATH_8_Q1",
        question_text: "Solve for x: 2x + 5 = 15",
        options: ["A) x = 5", "B) x = 10", "C) x = 7", "D) x = 3"],
        grade: "8",
        subject: "mathematics",
        concept: "Linear Equations",
        difficulty: "medium"
      },
      {
        question_id: "MATH_8_Q2",
        question_text: "What is the value of 3² + 4²?",
        options: ["A) 7", "B) 12", "C) 25", "D) 49"],
        grade: "8",
        subject: "mathematics",
        concept: "Exponents",
        difficulty: "medium"
      },
      {
        question_id: "MATH_8_Q3",
        question_text: "Which of these is a prime number?",
        options: ["A) 21", "B) 17", "C) 15", "D) 27"],
        grade: "8",
        subject: "mathematics",
        concept: "Prime Numbers",
        difficulty: "easy"
      },
      {
        question_id: "MATH_8_Q4",
        question_text: "What is the area of a triangle with base 10 cm and height 6 cm?",
        options: ["A) 60 cm²", "B) 30 cm²", "C) 16 cm²", "D) 32 cm²"],
        grade: "8",
        subject: "mathematics",
        concept: "Triangle Area",
        difficulty: "medium"
      },
      {
        question_id: "MATH_8_Q5",
        question_text: "Simplify: 2(x + 3) - 4",
        options: ["A) 2x + 2", "B) 2x + 6", "C) 2x - 1", "D) 2x + 10"],
        grade: "8",
        subject: "mathematics",
        concept: "Algebraic Expressions",
        difficulty: "hard"
      }
    ],
    "science": [
      {
        question_id: "SCI_8_Q1",
        question_text: "What is the chemical formula for water?",
        options: ["A) H2O", "B) CO2", "C) NaCl", "D) CH4"],
        grade: "8",
        subject: "science",
        concept: "Chemical Formulas",
        difficulty: "easy"
      },
      {
        question_id: "SCI_8_Q2",
        question_text: "Which organelle is known as the powerhouse of the cell?",
        options: ["A) Nucleus", "B) Mitochondria", "C) Ribosome", "D) Vacuole"],
        grade: "8",
        subject: "science",
        concept: "Cell Biology",
        difficulty: "medium"
      },
      {
        question_id: "SCI_8_Q3",
        question_text: "What type of energy is stored in food?",
        options: ["A) Kinetic energy", "B) Potential energy", "C) Chemical energy", "D) Thermal energy"],
        grade: "8",
        subject: "science",
        concept: "Energy Types",
        difficulty: "medium"
      },
      {
        question_id: "SCI_8_Q4",
        question_text: "Which gas makes up about 78% of Earth's atmosphere?",
        options: ["A) Oxygen", "B) Carbon dioxide", "C) Nitrogen", "D) Argon"],
        grade: "8",
        subject: "science",
        concept: "Atmosphere",
        difficulty: "medium"
      },
      {
        question_id: "SCI_8_Q5",
        question_text: "What is the process by which plants lose water through their leaves?",
        options: ["A) Photosynthesis", "B) Respiration", "C) Transpiration", "D) Germination"],
        grade: "8",
        subject: "science",
        concept: "Plant Processes",
        difficulty: "hard"
      }
    ]
  }
};

// Function to generate quiz questions based on grade and subject
export const generateQuizQuestions = (grade: string, subject: string): Question[] => {
  const questions = questionBank[grade]?.[subject] || [];
  
  // For now, return all available questions for the grade/subject
  // In a real app, you might want to randomly select a subset
  return questions;
};

// Correct answers mapping
export const correctAnswers: Record<string, string> = {
  // Grade 6 Math
  "MATH_6_Q1": "A",
  "MATH_6_Q2": "C", 
  "MATH_6_Q3": "C",
  "MATH_6_Q4": "B",
  "MATH_6_Q5": "C",
  
  // Grade 6 Science
  "SCI_6_Q1": "C",
  "SCI_6_Q2": "C",
  "SCI_6_Q3": "B", 
  "SCI_6_Q4": "C",
  "SCI_6_Q5": "A",
  
  // Grade 8 Math
  "MATH_8_Q1": "A",
  "MATH_8_Q2": "C",
  "MATH_8_Q3": "B",
  "MATH_8_Q4": "B", 
  "MATH_8_Q5": "A",
  
  // Grade 8 Science
  "SCI_8_Q1": "A",
  "SCI_8_Q2": "B",
  "SCI_8_Q3": "C",
  "SCI_8_Q4": "C",
  "SCI_8_Q5": "C"
};

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
    "Day 1": "Math – Linear Equations - Introduction to solving basic linear equations with step-by-step practice",
    "Day 2": "Math – Linear Equations - Advanced problems with variables on both sides and word problems",
    "Day 3": "Geometry – Area Calculations - Review formulas for rectangles, triangles, and circles with practice problems",
    "Day 4": "Number Theory – Prime Numbers - Understanding prime vs composite numbers with identification exercises",
    "Day 5": "Mixed Review – Assessment and reinforcement of all weak concepts with practice quiz"
  }
};