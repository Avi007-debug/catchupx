#!/usr/bin/env python3
"""
Simple local testing script for CatchUpX backend logic (without AWS dependencies)
"""

import json
import sys
import os

# Add current directory to path so we can import our modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from quiz_logic import analyze_answers

def test_quiz_logic():
    """
    Test the quiz analysis logic locally
    """
    
    # Test payload matching the frontend contract
    test_answers = [
        {
            "question_id": "MATH_8_Q1",
            "selected_option": "B"  # Wrong answer (correct is A)
        },
        {
            "question_id": "MATH_8_Q2", 
            "selected_option": "A"  # Wrong answer (correct is C)
        },
        {
            "question_id": "MATH_8_Q3",
            "selected_option": "B"  # Correct answer
        },
        {
            "question_id": "MATH_8_Q4",
            "selected_option": "A"  # Wrong answer (correct is B)
        },
        {
            "question_id": "MATH_8_Q5",
            "selected_option": "B"  # Wrong answer (correct is A)
        }
    ]
    
    print("🧪 Testing CatchUpX Quiz Logic Locally")
    print("=" * 50)
    
    print("\n📤 INPUT ANSWERS:")
    print(json.dumps(test_answers, indent=2))
    
    try:
        # Test the quiz analysis
        weak_concepts = analyze_answers(test_answers)
        
        print(f"\n📊 WEAK CONCEPTS IDENTIFIED:")
        print(json.dumps(weak_concepts, indent=2))
        
        # Mock the full response structure
        mock_response = {
            "weakness_report": "Based on your quiz responses, you show strong understanding in some areas but need additional practice with Linear Equations and Number Theory. Your problem-solving approach is logical, but there are gaps in applying formulas correctly.",
            "priority_concepts": [concept.get("name", "Unknown Concept") for concept in weak_concepts[:4]],
            "lesson_explanation": "Linear Equations Fundamentals: A linear equation is an equation where the highest power of the variable is 1. To solve for x: 1. Isolate the variable, 2. Combine like terms, 3. Divide or multiply to get x alone.",
            "worked_example": "Problem: Solve for x: 3x - 7 = 14\nStep 1: Add 7 to both sides\n3x - 7 + 7 = 14 + 7\n3x = 21\nStep 2: Divide both sides by 3\n3x ÷ 3 = 21 ÷ 3\nx = 7",
            "practice_questions": [
                "Solve: 4x + 3 = 19",
                "Solve: 2x - 8 = 12", 
                "Solve: 5x + 10 = 35"
            ],
            "study_plan": {
                "Day 1": "Math – Linear Equations",
                "Day 2": "Number Theory – Prime Numbers",
                "Day 3": "Math – Practice Problems", 
                "Day 4": "Review – Mixed Concepts",
                "Day 5": "Assessment & Revision"
            }
        }
        
        print(f"\n📥 MOCK FULL RESPONSE:")
        print(json.dumps(mock_response, indent=2))
        
        # Validate response structure
        print("\n✅ VALIDATION:")
        required_keys = [
            "weakness_report", 
            "priority_concepts", 
            "lesson_explanation", 
            "worked_example", 
            "practice_questions", 
            "study_plan"
        ]
        
        for key in required_keys:
            if key in mock_response:
                print(f"✓ {key}: Present")
            else:
                print(f"✗ {key}: MISSING")
        
        # Check data types
        if isinstance(mock_response.get("priority_concepts"), list):
            print("✓ priority_concepts: Is array")
        else:
            print("✗ priority_concepts: Should be array")
            
        if isinstance(mock_response.get("practice_questions"), list):
            print("✓ practice_questions: Is array")
        else:
            print("✗ practice_questions: Should be array")
            
        if isinstance(mock_response.get("study_plan"), dict):
            print("✓ study_plan: Is object")
        else:
            print("✗ study_plan: Should be object")
        
        print("\n🎉 LOCAL TEST COMPLETED!")
        print("\n📋 SUMMARY:")
        print(f"   • Questions analyzed: {len(test_answers)}")
        print(f"   • Weak concepts found: {len(weak_concepts)}")
        print(f"   • Priority concepts: {len(mock_response['priority_concepts'])}")
        print(f"   • Practice questions: {len(mock_response['practice_questions'])}")
        print(f"   • Study plan days: {len(mock_response['study_plan'])}")
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_quiz_logic()