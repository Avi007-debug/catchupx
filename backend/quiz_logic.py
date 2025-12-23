"""
Quiz logic for analyzing student answers and identifying weak concepts
"""

# Question to concept mapping - updated for dynamic questions
QUESTION_CONCEPTS = {
    # Grade 6 Math
    "MATH_6_Q1": {"name": "Basic Addition", "correct_answer": "A"},
    "MATH_6_Q2": {"name": "Area Calculation", "correct_answer": "C"},
    "MATH_6_Q3": {"name": "Prime Numbers", "correct_answer": "C"},
    "MATH_6_Q4": {"name": "Division", "correct_answer": "B"},
    "MATH_6_Q5": {"name": "Perimeter", "correct_answer": "C"},
    
    # Grade 6 Science
    "SCI_6_Q1": {"name": "Photosynthesis", "correct_answer": "C"},
    "SCI_6_Q2": {"name": "Energy Sources", "correct_answer": "C"},
    "SCI_6_Q3": {"name": "Human Body", "correct_answer": "B"},
    "SCI_6_Q4": {"name": "States of Matter", "correct_answer": "C"},
    "SCI_6_Q5": {"name": "Earth's Rotation", "correct_answer": "A"},
    
    # Grade 8 Math
    "MATH_8_Q1": {"name": "Linear Equations", "correct_answer": "A"},
    "MATH_8_Q2": {"name": "Exponents", "correct_answer": "C"},
    "MATH_8_Q3": {"name": "Prime Numbers", "correct_answer": "B"},
    "MATH_8_Q4": {"name": "Triangle Area", "correct_answer": "B"},
    "MATH_8_Q5": {"name": "Algebraic Expressions", "correct_answer": "A"},
    
    # Grade 8 Science
    "SCI_8_Q1": {"name": "Chemical Formulas", "correct_answer": "A"},
    "SCI_8_Q2": {"name": "Cell Biology", "correct_answer": "B"},
    "SCI_8_Q3": {"name": "Energy Types", "correct_answer": "C"},
    "SCI_8_Q4": {"name": "Atmosphere", "correct_answer": "C"},
    "SCI_8_Q5": {"name": "Plant Processes", "correct_answer": "C"}
}

def analyze_answers(answers):
    """
    Analyze student answers to identify weak concepts
    
    Args:
        answers: List of answer objects with structure:
                [{"question_id": "MATH_Q1", "selected_option": "A"}, ...]
    
    Returns:
        List of weak concepts with metadata
    """
    if not answers:
        return []
    
    # Track concept performance
    concept_stats = {}
    
    for answer in answers:
        question_id = answer.get("question_id")
        selected_option = answer.get("selected_option")
        
        if question_id not in QUESTION_CONCEPTS:
            continue
            
        concept_info = QUESTION_CONCEPTS[question_id]
        concept_name = concept_info["name"]
        correct_answer = concept_info["correct_answer"]
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
    
    # Identify weak concepts (>50% incorrect or all questions wrong)
    weak_concepts = []
    
    for concept_name, stats in concept_stats.items():
        accuracy = (stats["total"] - stats["incorrect"]) / stats["total"]
        
        # Consider a concept weak if accuracy is below 60%
        if accuracy < 0.6:
            weak_concepts.append({
                "name": stats["name"],
                "accuracy": round(accuracy * 100, 1),
                "questionsAttempted": stats["total"],
                "questionsIncorrect": stats["incorrect"],
                "severity": get_severity(accuracy)
            })
    
    # Sort by severity (most critical first)
    weak_concepts.sort(key=lambda x: x["accuracy"])
    
    return weak_concepts


def get_severity(accuracy):
    """
    Determine severity level based on accuracy
    """
    if accuracy < 0.3:
        return "critical"
    elif accuracy < 0.5:
        return "high"
    elif accuracy < 0.6:
        return "moderate"
    else:
        return "low"


def calculate_overall_score(answers):
    """
    Calculate overall quiz score
    """
    if not answers:
        return 0
    
    correct = 0
    total = len(answers)
    
    for answer in answers:
        question_id = answer.get("question_id")
        selected_option = answer.get("selected_option")
        
        if question_id in QUESTION_CONCEPTS:
            correct_answer = QUESTION_CONCEPTS[question_id]["correct_answer"]
            if selected_option == correct_answer:
                correct += 1
    
    return round((correct / total) * 100, 1)
