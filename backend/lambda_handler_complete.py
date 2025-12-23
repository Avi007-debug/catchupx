"""
Complete AWS Lambda Handler for CatchUpX
Analyzes quiz results and generates personalized learning content using AWS Bedrock
"""

import json
import boto3
import os
from datetime import datetime

# Initialize Bedrock client
bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')

# ============================================================================
# QUESTION TO CONCEPT MAPPING
# ============================================================================
QUESTION_CONCEPTS = {
    # Grade 6
    "MATH_6_Q1": {"name": "Basic Addition", "correct": "A"},
    "MATH_6_Q2": {"name": "Area Calculation", "correct": "C"},
    "MATH_6_Q3": {"name": "Prime Numbers", "correct": "C"},
    "MATH_6_Q4": {"name": "Division", "correct": "B"},
    "MATH_6_Q5": {"name": "Perimeter", "correct": "C"},
    "SCI_6_Q1": {"name": "Photosynthesis", "correct": "C"},
    "SCI_6_Q2": {"name": "Energy Sources", "correct": "C"},
    "SCI_6_Q3": {"name": "Human Body", "correct": "B"},
    "SCI_6_Q4": {"name": "States of Matter", "correct": "C"},
    "SCI_6_Q5": {"name": "Earth's Rotation", "correct": "A"},
    "ENG_6_Q1": {"name": "Parts of Speech - Nouns", "correct": "C"},
    "ENG_6_Q2": {"name": "Verb Tenses", "correct": "B"},
    "ENG_6_Q3": {"name": "Subject-Verb Agreement", "correct": "C"},
    "ENG_6_Q4": {"name": "Irregular Plurals", "correct": "C"},
    "ENG_6_Q5": {"name": "Parts of Speech - Adjectives", "correct": "C"},
    
    # Grade 7
    "MATH_7_Q1": {"name": "Integer Operations", "correct": "A"},
    "MATH_7_Q2": {"name": "Fraction Addition", "correct": "C"},
    "MATH_7_Q3": {"name": "Percentages", "correct": "A"},
    "MATH_7_Q4": {"name": "Algebraic Expressions", "correct": "C"},
    "MATH_7_Q5": {"name": "Circle Circumference", "correct": "B"},
    "SCI_7_Q1": {"name": "Physics Constants", "correct": "A"},
    "SCI_7_Q2": {"name": "Blood Cells", "correct": "B"},
    "SCI_7_Q3": {"name": "States of Matter - Evaporation", "correct": "B"},
    "SCI_7_Q4": {"name": "Solar System", "correct": "C"},
    "SCI_7_Q5": {"name": "Atomic Structure", "correct": "B"},
    "ENG_7_Q1": {"name": "Parts of Speech - Verbs", "correct": "C"},
    "ENG_7_Q2": {"name": "Punctuation - Apostrophes", "correct": "B"},
    "ENG_7_Q3": {"name": "Vocabulary - Synonyms", "correct": "B"},
    "ENG_7_Q4": {"name": "Active and Passive Voice", "correct": "B"},
    "ENG_7_Q5": {"name": "Sentence Types", "correct": "C"},
    
    # Grade 8
    "MATH_8_Q1": {"name": "Linear Equations", "correct": "A"},
    "MATH_8_Q2": {"name": "Exponents", "correct": "C"},
    "MATH_8_Q3": {"name": "Prime Numbers", "correct": "B"},
    "MATH_8_Q4": {"name": "Triangle Area", "correct": "B"},
    "MATH_8_Q5": {"name": "Algebraic Expressions", "correct": "A"},
    "SCI_8_Q1": {"name": "Chemical Formulas", "correct": "A"},
    "SCI_8_Q2": {"name": "Cell Biology - Mitochondria", "correct": "B"},
    "SCI_8_Q3": {"name": "Energy Types", "correct": "C"},
    "SCI_8_Q4": {"name": "Atmosphere Composition", "correct": "C"},
    "SCI_8_Q5": {"name": "Plant Processes - Transpiration", "correct": "C"},
    "ENG_8_Q1": {"name": "Literary Devices - Personification", "correct": "C"},
    "ENG_8_Q2": {"name": "Verb Forms", "correct": "B"},
    "ENG_8_Q3": {"name": "Grammar - Prepositional Phrases", "correct": "B"},
    "ENG_8_Q4": {"name": "Vocabulary - Antonyms", "correct": "B"},
    "ENG_8_Q5": {"name": "Sentence Structure - Comma Splice", "correct": "A"},
    
    # Grade 9
    "MATH_9_Q1": {"name": "Quadratic Equations", "correct": "A"},
    "MATH_9_Q2": {"name": "Linear Functions - Slope", "correct": "B"},
    "MATH_9_Q3": {"name": "Square Roots", "correct": "C"},
    "MATH_9_Q4": {"name": "Geometry - Triangles", "correct": "B"},
    "MATH_9_Q5": {"name": "Exponent Rules", "correct": "C"},
    "SCI_9_Q1": {"name": "Newton's Laws", "correct": "A"},
    "SCI_9_Q2": {"name": "Chemistry - Elements", "correct": "B"},
    "SCI_9_Q3": {"name": "Chemical Bonding", "correct": "B"},
    "SCI_9_Q4": {"name": "Cell Biology", "correct": "C"},
    "SCI_9_Q5": {"name": "Acids and Bases - pH", "correct": "B"},
    "ENG_9_Q1": {"name": "Literary Devices - Oxymoron", "correct": "B"},
    "ENG_9_Q2": {"name": "Punctuation - Semicolon", "correct": "B"},
    "ENG_9_Q3": {"name": "Literary Analysis - Theme", "correct": "B"},
    "ENG_9_Q4": {"name": "Sentence Structure - Clauses", "correct": "B"},
    "ENG_9_Q5": {"name": "Point of View", "correct": "C"},
    
    # Grade 10
    "MATH_10_Q1": {"name": "Calculus - Derivatives", "correct": "B"},
    "MATH_10_Q2": {"name": "Trigonometry - Sine", "correct": "A"},
    "MATH_10_Q3": {"name": "Logarithms", "correct": "B"},
    "MATH_10_Q4": {"name": "Absolute Value", "correct": "C"},
    "MATH_10_Q5": {"name": "Sequences and Series", "correct": "C"},
    "SCI_10_Q1": {"name": "Ohm's Law", "correct": "A"},
    "SCI_10_Q2": {"name": "Photosynthesis", "correct": "C"},
    "SCI_10_Q3": {"name": "Biochemistry - Glucose", "correct": "A"},
    "SCI_10_Q4": {"name": "Wave Motion", "correct": "B"},
    "SCI_10_Q5": {"name": "Genetics", "correct": "B"},
    "ENG_10_Q1": {"name": "Poetry Forms - Sonnets", "correct": "B"},
    "ENG_10_Q2": {"name": "Essay Writing - Thesis", "correct": "B"},
    "ENG_10_Q3": {"name": "Rhetoric - Logos", "correct": "C"},
    "ENG_10_Q4": {"name": "Literary Devices - Simile", "correct": "B"},
    "ENG_10_Q5": {"name": "Citation - MLA Format", "correct": "B"},
    
    # Grade 11
    "MATH_11_Q1": {"name": "Calculus - Integration", "correct": "B"},
    "MATH_11_Q2": {"name": "Trigonometry - Cosine", "correct": "B"},
    "MATH_11_Q3": {"name": "Coordinate Geometry - Circles", "correct": "B"},
    "MATH_11_Q4": {"name": "Functions - Inverse", "correct": "A"},
    "MATH_11_Q5": {"name": "Series - Geometric", "correct": "B"},
    "SCI_11_Q1": {"name": "Thermodynamics", "correct": "A"},
    "SCI_11_Q2": {"name": "Molecular Geometry", "correct": "B"},
    "SCI_11_Q3": {"name": "Cell Biology", "correct": "C"},
    "SCI_11_Q4": {"name": "Avogadro's Number", "correct": "A"},
    "SCI_11_Q5": {"name": "Chemical Bonding - Polar", "correct": "C"},
    "ENG_11_Q1": {"name": "Literary Forms - Epic", "correct": "B"},
    "ENG_11_Q2": {"name": "Symbolism", "correct": "C"},
    "ENG_11_Q3": {"name": "Literary Techniques", "correct": "B"},
    "ENG_11_Q4": {"name": "Vocabulary - Denotation", "correct": "A"},
    "ENG_11_Q5": {"name": "Poetry Meter", "correct": "A"},
    
    # Grade 12
    "MATH_12_Q1": {"name": "Limits", "correct": "B"},
    "MATH_12_Q2": {"name": "Calculus - e^x", "correct": "A"},
    "MATH_12_Q3": {"name": "Linear Algebra - Determinants", "correct": "B"},
    "MATH_12_Q4": {"name": "Statistics - Mean", "correct": "B"},
    "MATH_12_Q5": {"name": "Integration", "correct": "A"},
    "SCI_12_Q1": {"name": "Speed of Light", "correct": "A"},
    "SCI_12_Q2": {"name": "Oxidation States", "correct": "B"},
    "SCI_12_Q3": {"name": "Cell Division - Meiosis", "correct": "B"},
    "SCI_12_Q4": {"name": "Chemical Equilibrium", "correct": "A"},
    "SCI_12_Q5": {"name": "Particle Physics", "correct": "B"},
    "ENG_12_Q1": {"name": "Postmodern Literature", "correct": "B"},
    "ENG_12_Q2": {"name": "Bildungsroman", "correct": "A"},
    "ENG_12_Q3": {"name": "Literary Theory - Gaze", "correct": "B"},
    "ENG_12_Q4": {"name": "Unreliable Narrator", "correct": "B"},
    "ENG_12_Q5": {"name": "Argumentative Writing", "correct": "B"},
}

# ============================================================================
# QUIZ ANALYSIS FUNCTIONS
# ============================================================================

def get_severity(accuracy):
    """Determine severity level based on accuracy"""
    if accuracy < 0.3:
        return "critical"
    elif accuracy < 0.5:
        return "high"
    elif accuracy < 0.6:
        return "moderate"
    else:
        return "low"


def analyze_answers(answers):
    """
    Analyze student answers to identify weak concepts
    
    Args:
        answers: List of answer objects [{"question_id": "MATH_6_Q1", "selected_option": "A"}, ...]
    
    Returns:
        List of weak concepts with metadata
    """
    if not answers:
        return []
    
    concept_stats = {}
    
    for answer in answers:
        question_id = answer.get("question_id")
        selected_option = answer.get("selected_option")
        
        if question_id not in QUESTION_CONCEPTS:
            continue
            
        concept_info = QUESTION_CONCEPTS[question_id]
        concept_name = concept_info["name"]
        correct_answer = concept_info["correct"]
        is_correct = selected_option == correct_answer
        
        if concept_name not in concept_stats:
            concept_stats[concept_name] = {
                "name": concept_name,
                "total": 0,
                "incorrect": 0,
                "questions": []
            }
        
        concept_stats[concept_name]["total"] += 1
        concept_stats[concept_name]["questions"].append(question_id)
        
        if not is_correct:
            concept_stats[concept_name]["incorrect"] += 1
    
    # Identify weak concepts (accuracy < 60%)
    weak_concepts = []
    
    for concept_name, stats in concept_stats.items():
        if stats["total"] == 0:
            continue
            
        accuracy = (stats["total"] - stats["incorrect"]) / stats["total"]
        
        if accuracy < 0.6:
            weak_concepts.append({
                "name": stats["name"],
                "accuracy": round(accuracy * 100, 1),
                "questionsAttempted": stats["total"],
                "questionsIncorrect": stats["incorrect"],
                "severity": get_severity(accuracy)
            })
    
    # Sort by accuracy (lowest first)
    weak_concepts.sort(key=lambda x: x["accuracy"])
    
    return weak_concepts


# ============================================================================
# BEDROCK AI FUNCTIONS
# ============================================================================

def call_bedrock(prompt, max_tokens=1000):
    """
    Correct schema for Amazon Titan Text Express
    """
    try:
        body = {
            "inputText": prompt,
            "textGenerationConfig": {
                "maxTokenCount": max_tokens,
                "temperature": 0.7,
                "topP": 0.9,
                "stopSequences": []
            }
        }

        response = bedrock_runtime.invoke_model(
            modelId="amazon.titan-text-express-v1",
            contentType="application/json",
            accept="application/json",
            body=json.dumps(body)
        )

        response_body = json.loads(response["body"].read())
        return response_body["results"][0]["outputText"]

    except Exception as e:
        print(f"Error calling Bedrock: {str(e)}")
        raise

def generate_full_ai_response(weak_concepts, grade, subject):
    concepts_list = "\n".join([
        f"- {c['name']} ({c['accuracy']}% accuracy, {c['severity']})"
        for c in weak_concepts
    ]) if weak_concepts else "No major weak concepts identified."

    prompt = f"""
You are an AI learning assistant.

Student Profile:
- Grade: {grade}
- Subject: {subject.title()}

Weak Concepts:
{concepts_list}

Generate the following sections clearly labeled:

=== WEAKNESS_REPORT ===
Give a concise analysis (max 150 words).

=== LESSON_EXPLANATION ===
Explain the most important weak concept simply.

=== WORKED_EXAMPLE ===
Provide one clear worked example.

=== PRACTICE_QUESTIONS ===
List exactly 4 practice questions (no answers).

=== STUDY_PLAN ===
Provide a 5-day study plan in this format:
Day 1: ...
Day 2: ...
Day 3: ...
Day 4: ...
Day 5: ...

Keep output concise but clear.
"""

    return call_bedrock(prompt, max_tokens=1500)

def generate_weakness_report(weak_concepts, grade, subject):
    """Generate comprehensive weakness analysis using Bedrock"""
    
    if not weak_concepts:
        return "Great job! You demonstrated strong understanding across all concepts tested."
    
    concepts_list = "\n".join([
        f"- {concept['name']}: {concept['accuracy']}% accuracy ({concept['severity']} severity)"
        for concept in weak_concepts
    ])
    
    prompt = f"""You are an educational expert analyzing a student's quiz performance.

Student Profile:
- Grade Level: {grade}
- Subject: {subject.title()}

Weak Concepts Identified:
{concepts_list}

Please provide a comprehensive weakness analysis report that includes:

1. **Overview**: Brief summary (2-3 sentences) of overall performance patterns
2. **Detailed Analysis**: For each weak concept:
   - Why this concept is challenging for grade {grade} students
   - Common misconceptions
   - How it connects to other concepts
3. **Root Causes**: Identify 2-3 potential underlying gaps in foundational knowledge
4. **Priority Recommendations**: Which 2 concepts should be addressed first and why

Format your response in clear, encouraging language appropriate for a grade {grade} student and their parents.
Keep the tone supportive and constructive, focusing on growth opportunities.
Be specific and actionable. Limit response to 300 words."""

    return call_bedrock(prompt, max_tokens=1500)


def generate_lesson(weak_concepts, grade, subject):
    """Generate personalized lesson using Bedrock"""
    
    if not weak_concepts:
        concepts_to_teach = ["review and advanced topics"]
    else:
        concepts_to_teach = [c['name'] for c in weak_concepts[:3]]
    
    concepts_list = "\n".join(concepts_to_teach)
    
    prompt = f"""You are an experienced educator creating a personalized lesson plan.

Student Profile:
- Grade Level: {grade}
- Subject: {subject.title()}

Concepts to Address:
{concepts_list}

Create a comprehensive, engaging lesson following this structure:

**Lesson Explanation** (Focus on the most critical concept):
- Clear definition and explanation
- Why this concept is important
- Step-by-step approach to understanding
- Real-world applications
- Use age-appropriate language for grade {grade}

**Worked Example**:
- Provide ONE detailed worked example
- Show each step clearly with explanations
- Include a final verification step

**Practice Questions** (List 4 questions):
- Provide exactly 4 practice problems
- Progress from easier to harder
- Format as simple question text only

Keep your response structured with clear headings. Be concise but comprehensive.
Total response should be around 400 words."""

    response = call_bedrock(prompt, max_tokens=3000)
    
    # Parse the response to extract sections
    # This is a simple parser - in production you might want more robust parsing
    sections = {
        "lesson_explanation": "",
        "worked_example": "",
        "practice_questions": [],
        "youtube_videos": generate_youtube_recommendations(subject, concepts_to_teach[0] if concepts_to_teach else subject)
    }
    
    current_section = "lesson_explanation"
    lines = response.split('\n')
    
    for line in lines:
        if '**Worked Example' in line or '**Example' in line:
            current_section = "worked_example"
            continue
        elif '**Practice' in line:
            current_section = "practice_questions"
            continue
        elif current_section == "practice_questions" and line.strip() and (line.strip()[0].isdigit() or line.strip().startswith('-')):
            # Extract practice question
            question = line.strip().lstrip('0123456789.-) ')
            if question:
                sections["practice_questions"].append(question)
        elif current_section in ["lesson_explanation", "worked_example"]:
            sections[current_section] += line + "\n"
    
    # Ensure we have at least 3 practice questions
    if len(sections["practice_questions"]) < 3:
        sections["practice_questions"] = [
            f"Practice problem 1 on {concepts_to_teach[0] if concepts_to_teach else subject}",
            f"Practice problem 2 on {concepts_to_teach[0] if concepts_to_teach else subject}",
            f"Practice problem 3 on {concepts_to_teach[0] if concepts_to_teach else subject}",
            f"Practice problem 4 on {concepts_to_teach[0] if concepts_to_teach else subject}"
        ]
    
    return sections


def generate_youtube_recommendations(subject, concept):
    """Generate YouTube video recommendations based on subject and concept"""
    
    # Mapping of subjects/concepts to real educational YouTube videos
    recommendations = {
        "mathematics": [
            {
                "title": "Algebra Basics - Solving Equations",
                "channel": "Khan Academy",
                "duration": "10:35",
                "url": "https://www.youtube.com/watch?v=kkGeOWYOFoA"
            },
            {
                "title": "Math Fundamentals - Complete Guide",
                "channel": "The Organic Chemistry Tutor",
                "duration": "15:20",
                "url": "https://www.youtube.com/watch?v=bAerID24QJ0"
            },
            {
                "title": "Math Antics - Understanding the Basics",
                "channel": "Math Antics",
                "duration": "8:45",
                "url": "https://www.youtube.com/watch?v=64dX7TjuCXw"
            }
        ],
        "science": [
            {
                "title": "Science Basics - Fundamental Concepts",
                "channel": "Crash Course",
                "duration": "12:30",
                "url": "https://www.youtube.com/watch?v=YM-uykVfq_E"
            },
            {
                "title": "Introduction to Scientific Method",
                "channel": "Khan Academy",
                "duration": "9:15",
                "url": "https://www.youtube.com/watch?v=N6IAzlugWw0"
            },
            {
                "title": "Science Explained Simply",
                "channel": "SciShow",
                "duration": "11:20",
                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            }
        ],
        "english": [
            {
                "title": "Grammar Basics - Parts of Speech",
                "channel": "English Lessons",
                "duration": "14:25",
                "url": "https://www.youtube.com/watch?v=lGSOWwUvJiU"
            },
            {
                "title": "Writing Skills - Essay Structure",
                "channel": "Khan Academy",
                "duration": "10:50",
                "url": "https://www.youtube.com/watch?v=8fTGE6KH_Ek"
            },
            {
                "title": "English Literature - Literary Devices",
                "channel": "Crash Course",
                "duration": "13:15",
                "url": "https://www.youtube.com/watch?v=UCPgBW0vO6Y"
            }
        ]
    }
    
    return recommendations.get(subject.lower(), recommendations["mathematics"])


def generate_study_plan(weak_concepts, grade, subject):
    """Generate 5-day study plan using Bedrock"""
    
    if not weak_concepts:
        concepts_list = "Review and reinforcement of all concepts"
    else:
        concepts_list = "\n".join([
            f"- {concept['name']} (Severity: {concept['severity']})"
            for concept in weak_concepts
        ])
    
    prompt = f"""You are an educational planner creating a personalized 5-day study plan.

Student Profile:
- Grade Level: {grade}
- Subject: {subject.title()}

Weak Concepts:
{concepts_list}

Create a structured 5-day study plan with this format:

Day 1: [Subject] - [Specific Topic] - [Brief description of activities (15 words max)]
Day 2: [Subject] - [Specific Topic] - [Brief description of activities (15 words max)]
Day 3: [Subject] - [Specific Topic] - [Brief description of activities (15 words max)]
Day 4: [Subject] - [Specific Topic] - [Brief description of activities (15 words max)]
Day 5: [Subject] - [Review/Assessment] - [Brief description of activities (15 words max)]

Guidelines:
- Each day should focus on 30-45 minutes of study
- Progress from foundational concepts to more complex ones
- Include practice, review, and assessment
- Make Day 5 a comprehensive review or self-assessment
- Be specific about what to study each day

Provide ONLY the 5-day plan in the exact format above. No additional text."""

    response = call_bedrock(prompt, max_tokens=800)
    
    # Parse response into dictionary
    plan = {}
    for line in response.strip().split('\n'):
        if line.startswith('Day '):
            parts = line.split(':', 1)
            if len(parts) == 2:
                day = parts[0].strip()
                content = parts[1].strip()
                plan[day] = content
    
    # Ensure we have all 5 days
    if len(plan) < 5:
        plan = {
            "Day 1": f"{subject.title()} - Foundational Review - Introduction and basic practice problems",
            "Day 2": f"{subject.title()} - Core Concepts - Detailed study with examples and explanations",
            "Day 3": f"{subject.title()} - Application Practice - Real-world problems and mixed exercises",
            "Day 4": f"{subject.title()} - Advanced Practice - Challenging problems and error analysis",
            "Day 5": f"{subject.title()} - Comprehensive Review - Self-assessment quiz and reflection"
        }
    
    return plan


# ============================================================================
# LAMBDA HANDLER
# ============================================================================

def lambda_handler(event, context):
    """
    Main Lambda handler for processing quiz results
    
    Expected Input:
    {
        "grade": "8",
        "subject": "mathematics",
        "answers": [
            {"question_id": "MATH_8_Q1", "selected_option": "A"},
            {"question_id": "MATH_8_Q2", "selected_option": "C"}
        ]
    }
    
    Returns:
    {
        "weakness_report": "...",
        "priority_concepts": ["concept1", "concept2"],
        "lesson_explanation": "...",
        "worked_example": "...",
        "practice_questions": ["q1", "q2", "q3", "q4"],
        "youtube_videos": [...],
        "study_plan": {"Day 1": "...", ...}
    }
    """
    
    try:
        # Handle CORS preflight
        if event.get('httpMethod') == 'OPTIONS':
            return {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "POST, OPTIONS"
                },
                "body": ""
            }
        
        # Parse request body
        body = json.loads(event["body"]) if isinstance(event.get("body"), str) else event.get("body", {})
        
        grade = body.get("grade")
        subject = body.get("subject", "mathematics").lower()
        answers = body.get("answers", [])
        
        # Validate input
        if not grade:
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": json.dumps({
                    "error": "Missing required field: grade"
                })
            }
        
        if not answers:
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": json.dumps({
                    "error": "Missing required field: answers"
                })
            }
        
        print(f"Processing quiz for Grade {grade}, Subject: {subject}, Answers: {len(answers)}")
        
        # Step 1: Analyze answers
        weak_concepts = analyze_answers(answers)
        print(f"Identified {len(weak_concepts)} weak concepts")
        
        # Step 2: Generate weakness report
        #weakness_report = generate_weakness_report(weak_concepts, grade, subject)
        
        # Step 3: Generate personalized lesson
        #lesson_data = generate_lesson(weak_concepts, grade, subject)
        
        # Step 4: Generate study plan
        #study_plan = generate_study_plan(weak_concepts, grade, subject)
         
        ai_output = generate_full_ai_response(weak_concepts, grade, subject)

        # Step 5: Extract priority concepts
        priority_concepts = [c["name"] for c in weak_concepts[:4]] if weak_concepts else []
        
        # Construct response
        response_data = {
           # "weakness_report": weakness_report,
           # "priority_concepts": priority_concepts,
            #"lesson_explanation": lesson_data["lesson_explanation"].strip(),
           # "worked_example": lesson_data["worked_example"].strip(),
           # "practice_questions": lesson_data["practice_questions"][:4],  # Ensure max 4
            #"youtube_videos": lesson_data["youtube_videos"],
           # "study_plan": study_plan
               "priority_concepts": [c["name"] for c in weak_concepts],
                "ai_response": ai_output
        }
        
        print(f"Successfully processed quiz. Returning response.")
        
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps(response_data)
        }
    
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {str(e)}")
        return {
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "error": "Invalid JSON in request body",
                "message": str(e)
            })
        }
    
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        import traceback
        traceback.print_exc()
        
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "error": "Internal server error",
                "message": str(e)
            })
        }
