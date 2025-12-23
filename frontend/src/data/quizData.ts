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
    ],
    "english": [
      {
        question_id: "ENG_6_Q1",
        question_text: "Which word is a noun?",
        options: ["A) quickly", "B) run", "C) book", "D) happy"],
        grade: "6",
        subject: "english",
        concept: "Parts of Speech",
        difficulty: "easy"
      },
      {
        question_id: "ENG_6_Q2",
        question_text: "What is the past tense of 'go'?",
        options: ["A) goed", "B) went", "C) gone", "D) going"],
        grade: "6",
        subject: "english",
        concept: "Verb Tenses",
        difficulty: "easy"
      },
      {
        question_id: "ENG_6_Q3",
        question_text: "Which sentence is correct?",
        options: ["A) She don't like pizza", "B) She doesn't likes pizza", "C) She doesn't like pizza", "D) She not like pizza"],
        grade: "6",
        subject: "english",
        concept: "Subject-Verb Agreement",
        difficulty: "medium"
      },
      {
        question_id: "ENG_6_Q4",
        question_text: "What is the plural of 'child'?",
        options: ["A) childs", "B) childes", "C) children", "D) child's"],
        grade: "6",
        subject: "english",
        concept: "Irregular Plurals",
        difficulty: "medium"
      },
      {
        question_id: "ENG_6_Q5",
        question_text: "Which word is an adjective?",
        options: ["A) slowly", "B) run", "C) beautiful", "D) happiness"],
        grade: "6",
        subject: "english",
        concept: "Parts of Speech",
        difficulty: "easy"
      }
    ]
  },
  "7": {
    "mathematics": [
      {
        question_id: "MATH_7_Q1",
        question_text: "What is -5 + 12?",
        options: ["A) 7", "B) -7", "C) 17", "D) -17"],
        grade: "7",
        subject: "mathematics",
        concept: "Integer Operations",
        difficulty: "easy"
      },
      {
        question_id: "MATH_7_Q2",
        question_text: "What is 3/4 + 1/2?",
        options: ["A) 4/6", "B) 1/4", "C) 5/4", "D) 7/8"],
        grade: "7",
        subject: "mathematics",
        concept: "Fraction Addition",
        difficulty: "medium"
      },
      {
        question_id: "MATH_7_Q3",
        question_text: "What is 20% of 80?",
        options: ["A) 16", "B) 20", "C) 12", "D) 18"],
        grade: "7",
        subject: "mathematics",
        concept: "Percentages",
        difficulty: "medium"
      },
      {
        question_id: "MATH_7_Q4",
        question_text: "If a = 3 and b = 4, what is a² + b²?",
        options: ["A) 7", "B) 12", "C) 25", "D) 49"],
        grade: "7",
        subject: "mathematics",
        concept: "Algebraic Expressions",
        difficulty: "medium"
      },
      {
        question_id: "MATH_7_Q5",
        question_text: "What is the circumference of a circle with radius 7 cm? (Use π ≈ 22/7)",
        options: ["A) 22 cm", "B) 44 cm", "C) 14 cm", "D) 28 cm"],
        grade: "7",
        subject: "mathematics",
        concept: "Circle Circumference",
        difficulty: "hard"
      }
    ],
    "science": [
      {
        question_id: "SCI_7_Q1",
        question_text: "What is the speed of light approximately?",
        options: ["A) 300,000 km/s", "B) 150,000 km/s", "C) 500,000 km/s", "D) 100,000 km/s"],
        grade: "7",
        subject: "science",
        concept: "Physics Constants",
        difficulty: "medium"
      },
      {
        question_id: "SCI_7_Q2",
        question_text: "Which blood cells help fight infections?",
        options: ["A) Red blood cells", "B) White blood cells", "C) Platelets", "D) Plasma"],
        grade: "7",
        subject: "science",
        concept: "Human Body",
        difficulty: "easy"
      },
      {
        question_id: "SCI_7_Q3",
        question_text: "What is the process of water changing from liquid to gas called?",
        options: ["A) Condensation", "B) Evaporation", "C) Precipitation", "D) Sublimation"],
        grade: "7",
        subject: "science",
        concept: "States of Matter",
        difficulty: "easy"
      },
      {
        question_id: "SCI_7_Q4",
        question_text: "Which planet is known as the Red Planet?",
        options: ["A) Venus", "B) Jupiter", "C) Mars", "D) Saturn"],
        grade: "7",
        subject: "science",
        concept: "Solar System",
        difficulty: "easy"
      },
      {
        question_id: "SCI_7_Q5",
        question_text: "What is the atomic number of Carbon?",
        options: ["A) 12", "B) 6", "C) 14", "D) 8"],
        grade: "7",
        subject: "science",
        concept: "Atomic Structure",
        difficulty: "medium"
      }
    ],
    "english": [
      {
        question_id: "ENG_7_Q1",
        question_text: "Identify the verb in this sentence: 'The cat quickly ran across the street.'",
        options: ["A) cat", "B) quickly", "C) ran", "D) street"],
        grade: "7",
        subject: "english",
        concept: "Parts of Speech",
        difficulty: "easy"
      },
      {
        question_id: "ENG_7_Q2",
        question_text: "Which sentence uses the correct punctuation?",
        options: ["A) Lets go to the park", "B) Let's go to the park.", "C) Lets go to the park.", "D) Let's go to the park"],
        grade: "7",
        subject: "english",
        concept: "Punctuation",
        difficulty: "medium"
      },
      {
        question_id: "ENG_7_Q3",
        question_text: "What is a synonym for 'happy'?",
        options: ["A) sad", "B) joyful", "C) angry", "D) tired"],
        grade: "7",
        subject: "english",
        concept: "Vocabulary",
        difficulty: "easy"
      },
      {
        question_id: "ENG_7_Q4",
        question_text: "Which sentence is in passive voice?",
        options: ["A) The dog ate the bone", "B) The bone was eaten by the dog", "C) I am eating dinner", "D) She will sing a song"],
        grade: "7",
        subject: "english",
        concept: "Active and Passive Voice",
        difficulty: "hard"
      },
      {
        question_id: "ENG_7_Q5",
        question_text: "What type of sentence is this: 'What time is it?'",
        options: ["A) Declarative", "B) Imperative", "C) Interrogative", "D) Exclamatory"],
        grade: "7",
        subject: "english",
        concept: "Sentence Types",
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
    ],
    "english": [
      {
        question_id: "ENG_8_Q1",
        question_text: "Which literary device is used: 'The stars danced in the sky'?",
        options: ["A) Simile", "B) Metaphor", "C) Personification", "D) Alliteration"],
        grade: "8",
        subject: "english",
        concept: "Literary Devices",
        difficulty: "medium"
      },
      {
        question_id: "ENG_8_Q2",
        question_text: "What is the correct form: 'She has ____ to the store.'",
        options: ["A) went", "B) gone", "C) go", "D) going"],
        grade: "8",
        subject: "english",
        concept: "Verb Forms",
        difficulty: "medium"
      },
      {
        question_id: "ENG_8_Q3",
        question_text: "Identify the prepositional phrase: 'The book on the table is mine.'",
        options: ["A) The book", "B) on the table", "C) is mine", "D) book on"],
        grade: "8",
        subject: "english",
        concept: "Grammar",
        difficulty: "hard"
      },
      {
        question_id: "ENG_8_Q4",
        question_text: "What is an antonym for 'generous'?",
        options: ["A) kind", "B) selfish", "C) giving", "D) helpful"],
        grade: "8",
        subject: "english",
        concept: "Vocabulary",
        difficulty: "easy"
      },
      {
        question_id: "ENG_8_Q5",
        question_text: "Which sentence contains a comma splice?",
        options: ["A) I love pizza, it's my favorite food", "B) I love pizza. It's my favorite food.", "C) I love pizza, and it's my favorite food.", "D) I love pizza; it's my favorite food."],
        grade: "8",
        subject: "english",
        concept: "Sentence Structure",
        difficulty: "hard"
      }
    ]
  },
  "9": {
    "mathematics": [
      {
        question_id: "MATH_9_Q1",
        question_text: "Solve: x² - 5x + 6 = 0. What are the solutions?",
        options: ["A) x = 2, 3", "B) x = -2, -3", "C) x = 1, 6", "D) x = -1, -6"],
        grade: "9",
        subject: "mathematics",
        concept: "Quadratic Equations",
        difficulty: "hard"
      },
      {
        question_id: "MATH_9_Q2",
        question_text: "What is the slope of the line y = 3x + 2?",
        options: ["A) 2", "B) 3", "C) 5", "D) -3"],
        grade: "9",
        subject: "mathematics",
        concept: "Linear Functions",
        difficulty: "medium"
      },
      {
        question_id: "MATH_9_Q3",
        question_text: "What is √64?",
        options: ["A) 6", "B) 7", "C) 8", "D) 9"],
        grade: "9",
        subject: "mathematics",
        concept: "Square Roots",
        difficulty: "easy"
      },
      {
        question_id: "MATH_9_Q4",
        question_text: "In a right triangle, if one angle is 30°, what is the other acute angle?",
        options: ["A) 45°", "B) 60°", "C) 90°", "D) 120°"],
        grade: "9",
        subject: "mathematics",
        concept: "Geometry",
        difficulty: "easy"
      },
      {
        question_id: "MATH_9_Q5",
        question_text: "What is the value of (2³)²?",
        options: ["A) 16", "B) 32", "C) 64", "D) 128"],
        grade: "9",
        subject: "mathematics",
        concept: "Exponent Rules",
        difficulty: "medium"
      }
    ],
    "science": [
      {
        question_id: "SCI_9_Q1",
        question_text: "What is Newton's Second Law of Motion?",
        options: ["A) F = ma", "B) E = mc²", "C) V = IR", "D) PV = nRT"],
        grade: "9",
        subject: "science",
        concept: "Physics Laws",
        difficulty: "medium"
      },
      {
        question_id: "SCI_9_Q2",
        question_text: "Which element has the chemical symbol 'Fe'?",
        options: ["A) Fluorine", "B) Iron", "C) Francium", "D) Fermium"],
        grade: "9",
        subject: "science",
        concept: "Chemistry",
        difficulty: "easy"
      },
      {
        question_id: "SCI_9_Q3",
        question_text: "What type of bond involves sharing of electrons?",
        options: ["A) Ionic bond", "B) Covalent bond", "C) Metallic bond", "D) Hydrogen bond"],
        grade: "9",
        subject: "science",
        concept: "Chemical Bonding",
        difficulty: "medium"
      },
      {
        question_id: "SCI_9_Q4",
        question_text: "What is the powerhouse of the cell?",
        options: ["A) Nucleus", "B) Ribosome", "C) Mitochondria", "D) Golgi apparatus"],
        grade: "9",
        subject: "science",
        concept: "Cell Biology",
        difficulty: "easy"
      },
      {
        question_id: "SCI_9_Q5",
        question_text: "What is the pH of a neutral solution?",
        options: ["A) 0", "B) 7", "C) 14", "D) 1"],
        grade: "9",
        subject: "science",
        concept: "Acids and Bases",
        difficulty: "easy"
      }
    ],
    "english": [
      {
        question_id: "ENG_9_Q1",
        question_text: "In 'Romeo and Juliet', what literary term describes the phrase 'parting is such sweet sorrow'?",
        options: ["A) Hyperbole", "B) Oxymoron", "C) Metaphor", "D) Irony"],
        grade: "9",
        subject: "english",
        concept: "Literary Devices",
        difficulty: "hard"
      },
      {
        question_id: "ENG_9_Q2",
        question_text: "Which is the correct use of a semicolon?",
        options: ["A) I have a test; tomorrow", "B) I have a test tomorrow; I must study", "C) I; have a test tomorrow", "D) I have; a test tomorrow"],
        grade: "9",
        subject: "english",
        concept: "Punctuation",
        difficulty: "medium"
      },
      {
        question_id: "ENG_9_Q3",
        question_text: "What is the main theme of a story?",
        options: ["A) The setting", "B) The central idea or message", "C) The plot", "D) The characters"],
        grade: "9",
        subject: "english",
        concept: "Literary Analysis",
        difficulty: "easy"
      },
      {
        question_id: "ENG_9_Q4",
        question_text: "Identify the independent clause: 'Although it was raining, we went to the park.'",
        options: ["A) Although it was raining", "B) we went to the park", "C) it was raining", "D) to the park"],
        grade: "9",
        subject: "english",
        concept: "Sentence Structure",
        difficulty: "medium"
      },
      {
        question_id: "ENG_9_Q5",
        question_text: "What point of view uses 'I' and 'me'?",
        options: ["A) Third person", "B) Second person", "C) First person", "D) Omniscient"],
        grade: "9",
        subject: "english",
        concept: "Point of View",
        difficulty: "easy"
      }
    ]
  },
  "10": {
    "mathematics": [
      {
        question_id: "MATH_10_Q1",
        question_text: "What is the derivative of x²?",
        options: ["A) x", "B) 2x", "C) x²", "D) 2"],
        grade: "10",
        subject: "mathematics",
        concept: "Calculus Basics",
        difficulty: "medium"
      },
      {
        question_id: "MATH_10_Q2",
        question_text: "If sin(θ) = 1/2, what is the value of θ in degrees (0° to 90°)?",
        options: ["A) 30°", "B) 45°", "C) 60°", "D) 90°"],
        grade: "10",
        subject: "mathematics",
        concept: "Trigonometry",
        difficulty: "medium"
      },
      {
        question_id: "MATH_10_Q3",
        question_text: "What is log₁₀(100)?",
        options: ["A) 1", "B) 2", "C) 10", "D) 100"],
        grade: "10",
        subject: "mathematics",
        concept: "Logarithms",
        difficulty: "medium"
      },
      {
        question_id: "MATH_10_Q4",
        question_text: "What is the solution set for |x| = 5?",
        options: ["A) {5}", "B) {-5}", "C) {5, -5}", "D) {0, 5}"],
        grade: "10",
        subject: "mathematics",
        concept: "Absolute Value",
        difficulty: "medium"
      },
      {
        question_id: "MATH_10_Q5",
        question_text: "What is the sum of the first 10 natural numbers?",
        options: ["A) 45", "B) 50", "C) 55", "D) 60"],
        grade: "10",
        subject: "mathematics",
        concept: "Sequences and Series",
        difficulty: "hard"
      }
    ],
    "science": [
      {
        question_id: "SCI_10_Q1",
        question_text: "What is Ohm's Law?",
        options: ["A) V = IR", "B) F = ma", "C) E = mc²", "D) PV = nRT"],
        grade: "10",
        subject: "science",
        concept: "Electricity",
        difficulty: "easy"
      },
      {
        question_id: "SCI_10_Q2",
        question_text: "Which gas is produced during photosynthesis?",
        options: ["A) Carbon dioxide", "B) Nitrogen", "C) Oxygen", "D) Hydrogen"],
        grade: "10",
        subject: "science",
        concept: "Plant Biology",
        difficulty: "easy"
      },
      {
        question_id: "SCI_10_Q3",
        question_text: "What is the molecular formula of glucose?",
        options: ["A) C₆H₁₂O₆", "B) CH₄", "C) H₂O", "D) CO₂"],
        grade: "10",
        subject: "science",
        concept: "Biochemistry",
        difficulty: "medium"
      },
      {
        question_id: "SCI_10_Q4",
        question_text: "What type of wave is sound?",
        options: ["A) Transverse wave", "B) Longitudinal wave", "C) Electromagnetic wave", "D) Standing wave"],
        grade: "10",
        subject: "science",
        concept: "Wave Motion",
        difficulty: "medium"
      },
      {
        question_id: "SCI_10_Q5",
        question_text: "What is the study of heredity called?",
        options: ["A) Ecology", "B) Genetics", "C) Anatomy", "D) Physiology"],
        grade: "10",
        subject: "science",
        concept: "Biology",
        difficulty: "easy"
      }
    ],
    "english": [
      {
        question_id: "ENG_10_Q1",
        question_text: "In Shakespearean sonnets, how many lines are there?",
        options: ["A) 12", "B) 14", "C) 16", "D) 18"],
        grade: "10",
        subject: "english",
        concept: "Poetry Forms",
        difficulty: "medium"
      },
      {
        question_id: "ENG_10_Q2",
        question_text: "What is a thesis statement?",
        options: ["A) The conclusion of an essay", "B) The main argument or claim", "C) A supporting detail", "D) The introduction"],
        grade: "10",
        subject: "english",
        concept: "Essay Writing",
        difficulty: "easy"
      },
      {
        question_id: "ENG_10_Q3",
        question_text: "Which rhetorical appeal uses logic and reasoning?",
        options: ["A) Ethos", "B) Pathos", "C) Logos", "D) Kairos"],
        grade: "10",
        subject: "english",
        concept: "Rhetoric",
        difficulty: "medium"
      },
      {
        question_id: "ENG_10_Q4",
        question_text: "What is the term for a comparison using 'like' or 'as'?",
        options: ["A) Metaphor", "B) Simile", "C) Personification", "D) Hyperbole"],
        grade: "10",
        subject: "english",
        concept: "Literary Devices",
        difficulty: "easy"
      },
      {
        question_id: "ENG_10_Q5",
        question_text: "In MLA format, how should you cite a direct quote?",
        options: ["A) (Author, Year)", "B) (Author Page)", "C) [Author, Year]", "D) Author: Page"],
        grade: "10",
        subject: "english",
        concept: "Citation",
        difficulty: "hard"
      }
    ]
  },
  "11": {
    "mathematics": [
      {
        question_id: "MATH_11_Q1",
        question_text: "What is the integral of 2x?",
        options: ["A) x", "B) x² + C", "C) 2", "D) 2x² + C"],
        grade: "11",
        subject: "mathematics",
        concept: "Calculus - Integration",
        difficulty: "medium"
      },
      {
        question_id: "MATH_11_Q2",
        question_text: "What is cos(0°)?",
        options: ["A) 0", "B) 1", "C) -1", "D) 1/2"],
        grade: "11",
        subject: "mathematics",
        concept: "Trigonometry",
        difficulty: "easy"
      },
      {
        question_id: "MATH_11_Q3",
        question_text: "What is the equation of a circle with center (0,0) and radius 5?",
        options: ["A) x² + y² = 5", "B) x² + y² = 25", "C) x + y = 5", "D) x² + y = 25"],
        grade: "11",
        subject: "mathematics",
        concept: "Coordinate Geometry",
        difficulty: "medium"
      },
      {
        question_id: "MATH_11_Q4",
        question_text: "If f(x) = 3x + 2, what is f⁻¹(x)?",
        options: ["A) (x-2)/3", "B) 3x - 2", "C) x/3 + 2", "D) -3x - 2"],
        grade: "11",
        subject: "mathematics",
        concept: "Functions",
        difficulty: "hard"
      },
      {
        question_id: "MATH_11_Q5",
        question_text: "What is the sum of an infinite geometric series with first term 1 and ratio 1/2?",
        options: ["A) 1", "B) 2", "C) 3", "D) Infinite"],
        grade: "11",
        subject: "mathematics",
        concept: "Series",
        difficulty: "hard"
      }
    ],
    "science": [
      {
        question_id: "SCI_11_Q1",
        question_text: "What is the first law of thermodynamics?",
        options: ["A) Energy cannot be created or destroyed", "B) Entropy always increases", "C) Force equals mass times acceleration", "D) Every action has an equal and opposite reaction"],
        grade: "11",
        subject: "science",
        concept: "Thermodynamics",
        difficulty: "medium"
      },
      {
        question_id: "SCI_11_Q2",
        question_text: "What is the molecular shape of water (H₂O)?",
        options: ["A) Linear", "B) Bent", "C) Trigonal planar", "D) Tetrahedral"],
        grade: "11",
        subject: "science",
        concept: "Molecular Geometry",
        difficulty: "medium"
      },
      {
        question_id: "SCI_11_Q3",
        question_text: "What is the powerhouse of the cell?",
        options: ["A) Nucleus", "B) Ribosome", "C) Mitochondria", "D) Chloroplast"],
        grade: "11",
        subject: "science",
        concept: "Cell Biology",
        difficulty: "easy"
      },
      {
        question_id: "SCI_11_Q4",
        question_text: "What is Avogadro's number approximately?",
        options: ["A) 6.02 × 10²³", "B) 3.14 × 10⁸", "C) 9.8 × 10¹⁰", "D) 1.6 × 10⁻¹⁹"],
        grade: "11",
        subject: "science",
        concept: "Chemistry Constants",
        difficulty: "medium"
      },
      {
        question_id: "SCI_11_Q5",
        question_text: "What type of bond is formed when electrons are shared unequally?",
        options: ["A) Ionic bond", "B) Nonpolar covalent bond", "C) Polar covalent bond", "D) Metallic bond"],
        grade: "11",
        subject: "science",
        concept: "Chemical Bonding",
        difficulty: "hard"
      }
    ],
    "english": [
      {
        question_id: "ENG_11_Q1",
        question_text: "What is the term for a long narrative poem about heroic deeds?",
        options: ["A) Sonnet", "B) Epic", "C) Haiku", "D) Limerick"],
        grade: "11",
        subject: "english",
        concept: "Literary Forms",
        difficulty: "medium"
      },
      {
        question_id: "ENG_11_Q2",
        question_text: "In 'The Great Gatsby', what color symbolizes Gatsby's hope and dreams?",
        options: ["A) Red", "B) White", "C) Green", "D) Yellow"],
        grade: "11",
        subject: "english",
        concept: "Symbolism",
        difficulty: "medium"
      },
      {
        question_id: "ENG_11_Q3",
        question_text: "What is stream of consciousness in literature?",
        options: ["A) A type of rhyme scheme", "B) A narrative technique showing thoughts", "C) A poetic form", "D) A type of conflict"],
        grade: "11",
        subject: "english",
        concept: "Literary Techniques",
        difficulty: "hard"
      },
      {
        question_id: "ENG_11_Q4",
        question_text: "What is the difference between denotation and connotation?",
        options: ["A) Literal vs emotional meaning", "B) Verb vs noun", "C) Past vs present tense", "D) Formal vs informal"],
        grade: "11",
        subject: "english",
        concept: "Vocabulary",
        difficulty: "medium"
      },
      {
        question_id: "ENG_11_Q5",
        question_text: "What is iambic pentameter?",
        options: ["A) Five feet of unstressed-stressed syllables", "B) Ten lines in a poem", "C) A type of rhyme", "D) Five stanzas"],
        grade: "11",
        subject: "english",
        concept: "Poetry Meter",
        difficulty: "hard"
      }
    ]
  },
  "12": {
    "mathematics": [
      {
        question_id: "MATH_12_Q1",
        question_text: "What is lim(x→0) (sin x)/x?",
        options: ["A) 0", "B) 1", "C) ∞", "D) Undefined"],
        grade: "12",
        subject: "mathematics",
        concept: "Limits",
        difficulty: "hard"
      },
      {
        question_id: "MATH_12_Q2",
        question_text: "What is the derivative of eˣ?",
        options: ["A) eˣ", "B) xeˣ⁻¹", "C) ln(x)", "D) 1/eˣ"],
        grade: "12",
        subject: "mathematics",
        concept: "Calculus - Differentiation",
        difficulty: "medium"
      },
      {
        question_id: "MATH_12_Q3",
        question_text: "What is the determinant of a 2x2 identity matrix?",
        options: ["A) 0", "B) 1", "C) 2", "D) 4"],
        grade: "12",
        subject: "mathematics",
        concept: "Linear Algebra",
        difficulty: "medium"
      },
      {
        question_id: "MATH_12_Q4",
        question_text: "In statistics, what does μ represent?",
        options: ["A) Standard deviation", "B) Population mean", "C) Sample size", "D) Variance"],
        grade: "12",
        subject: "mathematics",
        concept: "Statistics",
        difficulty: "easy"
      },
      {
        question_id: "MATH_12_Q5",
        question_text: "What is ∫ 1/x dx?",
        options: ["A) ln|x| + C", "B) x² + C", "C) 1/x² + C", "D) e^x + C"],
        grade: "12",
        subject: "mathematics",
        concept: "Integration",
        difficulty: "medium"
      }
    ],
    "science": [
      {
        question_id: "SCI_12_Q1",
        question_text: "What is the speed of light in a vacuum?",
        options: ["A) 3 × 10⁸ m/s", "B) 3 × 10⁶ m/s", "C) 9.8 m/s²", "D) 6.67 × 10⁻¹¹ Nm²/kg²"],
        grade: "12",
        subject: "science",
        concept: "Physics Constants",
        difficulty: "easy"
      },
      {
        question_id: "SCI_12_Q2",
        question_text: "What is the oxidation state of oxygen in H₂O₂?",
        options: ["A) -2", "B) -1", "C) 0", "D) +2"],
        grade: "12",
        subject: "science",
        concept: "Oxidation States",
        difficulty: "hard"
      },
      {
        question_id: "SCI_12_Q3",
        question_text: "What is the process of cell division that produces gametes?",
        options: ["A) Mitosis", "B) Meiosis", "C) Binary fission", "D) Budding"],
        grade: "12",
        subject: "science",
        concept: "Cell Division",
        difficulty: "medium"
      },
      {
        question_id: "SCI_12_Q4",
        question_text: "According to Le Chatelier's principle, what happens when pressure increases?",
        options: ["A) Equilibrium shifts to fewer moles of gas", "B) Equilibrium shifts to more moles of gas", "C) No change", "D) Reaction stops"],
        grade: "12",
        subject: "science",
        concept: "Chemical Equilibrium",
        difficulty: "hard"
      },
      {
        question_id: "SCI_12_Q5",
        question_text: "What particle is exchanged in electromagnetic interactions?",
        options: ["A) Gluon", "B) Photon", "C) W boson", "D) Higgs boson"],
        grade: "12",
        subject: "science",
        concept: "Particle Physics",
        difficulty: "hard"
      }
    ],
    "english": [
      {
        question_id: "ENG_12_Q1",
        question_text: "What is postmodern literature characterized by?",
        options: ["A) Linear narratives", "B) Fragmentation and irony", "C) Heroic characters", "D) Clear moral lessons"],
        grade: "12",
        subject: "english",
        concept: "Literary Movements",
        difficulty: "hard"
      },
      {
        question_id: "ENG_12_Q2",
        question_text: "What is a bildungsroman?",
        options: ["A) A coming-of-age story", "B) A war novel", "C) A romance novel", "D) A mystery novel"],
        grade: "12",
        subject: "english",
        concept: "Literary Genres",
        difficulty: "medium"
      },
      {
        question_id: "ENG_12_Q3",
        question_text: "In critical theory, what is the 'gaze'?",
        options: ["A) A literary device", "B) A way of looking/perspective", "C) A type of narrator", "D) A poetic form"],
        grade: "12",
        subject: "english",
        concept: "Literary Theory",
        difficulty: "hard"
      },
      {
        question_id: "ENG_12_Q4",
        question_text: "What is an unreliable narrator?",
        options: ["A) A narrator who tells the truth", "B) A narrator whose credibility is compromised", "C) A third-person narrator", "D) An omniscient narrator"],
        grade: "12",
        subject: "english",
        concept: "Narrative Techniques",
        difficulty: "medium"
      },
      {
        question_id: "ENG_12_Q5",
        question_text: "What is the purpose of a counter-argument in an essay?",
        options: ["A) To confuse readers", "B) To acknowledge and refute opposing views", "C) To end the essay", "D) To introduce the topic"],
        grade: "12",
        subject: "english",
        concept: "Argumentative Writing",
        difficulty: "medium"
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
  // Grade 6
  "MATH_6_Q1": "A", "MATH_6_Q2": "C", "MATH_6_Q3": "C", "MATH_6_Q4": "B", "MATH_6_Q5": "C",
  "SCI_6_Q1": "C", "SCI_6_Q2": "C", "SCI_6_Q3": "B", "SCI_6_Q4": "C", "SCI_6_Q5": "A",
  "ENG_6_Q1": "C", "ENG_6_Q2": "B", "ENG_6_Q3": "C", "ENG_6_Q4": "C", "ENG_6_Q5": "C",
  
  // Grade 7
  "MATH_7_Q1": "A", "MATH_7_Q2": "C", "MATH_7_Q3": "A", "MATH_7_Q4": "C", "MATH_7_Q5": "B",
  "SCI_7_Q1": "A", "SCI_7_Q2": "B", "SCI_7_Q3": "B", "SCI_7_Q4": "C", "SCI_7_Q5": "B",
  "ENG_7_Q1": "C", "ENG_7_Q2": "B", "ENG_7_Q3": "B", "ENG_7_Q4": "B", "ENG_7_Q5": "C",
  
  // Grade 8
  "MATH_8_Q1": "A", "MATH_8_Q2": "C", "MATH_8_Q3": "B", "MATH_8_Q4": "B", "MATH_8_Q5": "A",
  "SCI_8_Q1": "A", "SCI_8_Q2": "B", "SCI_8_Q3": "C", "SCI_8_Q4": "C", "SCI_8_Q5": "C",
  "ENG_8_Q1": "C", "ENG_8_Q2": "B", "ENG_8_Q3": "B", "ENG_8_Q4": "B", "ENG_8_Q5": "A",
  
  // Grade 9
  "MATH_9_Q1": "A", "MATH_9_Q2": "B", "MATH_9_Q3": "C", "MATH_9_Q4": "B", "MATH_9_Q5": "C",
  "SCI_9_Q1": "A", "SCI_9_Q2": "B", "SCI_9_Q3": "B", "SCI_9_Q4": "C", "SCI_9_Q5": "B",
  "ENG_9_Q1": "B", "ENG_9_Q2": "B", "ENG_9_Q3": "B", "ENG_9_Q4": "B", "ENG_9_Q5": "C",
  
  // Grade 10
  "MATH_10_Q1": "B", "MATH_10_Q2": "A", "MATH_10_Q3": "B", "MATH_10_Q4": "C", "MATH_10_Q5": "C",
  "SCI_10_Q1": "A", "SCI_10_Q2": "C", "SCI_10_Q3": "A", "SCI_10_Q4": "B", "SCI_10_Q5": "B",
  "ENG_10_Q1": "B", "ENG_10_Q2": "B", "ENG_10_Q3": "C", "ENG_10_Q4": "B", "ENG_10_Q5": "B",
  
  // Grade 11
  "MATH_11_Q1": "B", "MATH_11_Q2": "B", "MATH_11_Q3": "B", "MATH_11_Q4": "A", "MATH_11_Q5": "B",
  "SCI_11_Q1": "A", "SCI_11_Q2": "B", "SCI_11_Q3": "C", "SCI_11_Q4": "A", "SCI_11_Q5": "C",
  "ENG_11_Q1": "B", "ENG_11_Q2": "C", "ENG_11_Q3": "B", "ENG_11_Q4": "A", "ENG_11_Q5": "A",
  
  // Grade 12
  "MATH_12_Q1": "B", "MATH_12_Q2": "A", "MATH_12_Q3": "B", "MATH_12_Q4": "B", "MATH_12_Q5": "A",
  "SCI_12_Q1": "A", "SCI_12_Q2": "B", "SCI_12_Q3": "B", "SCI_12_Q4": "A", "SCI_12_Q5": "B",
  "ENG_12_Q1": "B", "ENG_12_Q2": "A", "ENG_12_Q3": "B", "ENG_12_Q4": "B", "ENG_12_Q5": "B"
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
  
  youtube_videos: [
    {
      title: "Solving Linear Equations - Step by Step",
      channel: "Khan Academy",
      duration: "8:45",
      url: "https://www.youtube.com/watch?v=64dX7TjuCXw"
    },
    {
      title: "Linear Equations in One Variable - Complete Guide",
      channel: "The Organic Chemistry Tutor",
      duration: "12:30",
      url: "https://www.youtube.com/watch?v=kkGeOWYOFoA"
    },
    {
      title: "Algebra Basics: Solving Basic Equations Part 1",
      channel: "Math Antics",
      duration: "10:15",
      url: "https://www.youtube.com/watch?v=bAerID24QJ0"
    }
  ],
  
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