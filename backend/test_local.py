#!/usr/bin/env python3
"""
Local testing script for CatchUpX backend Lambda function
"""

import json
import sys
import os

# Set environment variable for local testing
os.environ['LOCAL_TEST'] = 'true'

# Add current directory to path so we can import our modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from lambda_handler import lambda_handler

def test_lambda_locally():
    """
    Test the Lambda function locally with dummy data
    """
    
    # Test payload matching the frontend contract
    test_event = {
        "body": json.dumps({
            "grade": "8",
            "answers": [
                {
                    "question_id": "MATH_Q1",
                    "selected_option": "B"  # Wrong answer (correct is A)
                },
                {
                    "question_id": "MATH_Q2", 
                    "selected_option": "A"  # Wrong answer (correct is B)
                },
                {
                    "question_id": "MATH_Q3",
                    "selected_option": "C"  # Correct answer
                },
                {
                    "question_id": "MATH_Q4",
                    "selected_option": "A"  # Wrong answer (correct is C)
                },
                {
                    "question_id": "MATH_Q5",
                    "selected_option": "B"  # Correct answer
                }
            ]
        })
    }
    
    test_context = {}
    
    print("🧪 Testing CatchUpX Lambda Function Locally")
    print("=" * 50)
    
    print("\n📤 REQUEST PAYLOAD:")
    print(json.dumps(json.loads(test_event["body"]), indent=2))
    
    try:
        # Call the lambda handler (without Bedrock calls for local testing)
        response = lambda_handler(test_event, test_context)
        
        print(f"\n📥 RESPONSE STATUS: {response['statusCode']}")
        print("\n📥 RESPONSE HEADERS:")
        print(json.dumps(response['headers'], indent=2))
        
        print("\n📥 RESPONSE BODY:")
        response_body = json.loads(response['body'])
        print(json.dumps(response_body, indent=2))
        
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
            if key in response_body:
                print(f"✓ {key}: Present")
            else:
                print(f"✗ {key}: MISSING")
        
        # Check data types
        if isinstance(response_body.get("priority_concepts"), list):
            print("✓ priority_concepts: Is array")
        else:
            print("✗ priority_concepts: Should be array")
            
        if isinstance(response_body.get("practice_questions"), list):
            print("✓ practice_questions: Is array")
        else:
            print("✗ practice_questions: Should be array")
            
        if isinstance(response_body.get("study_plan"), dict):
            print("✓ study_plan: Is object")
        else:
            print("✗ study_plan: Should be object")
        
        print("\n🎉 LOCAL TEST COMPLETED!")
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_lambda_locally()