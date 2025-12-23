import json
import boto3
import os
from quiz_logic import analyze_answers
from prompts import (
    get_weakness_prompt,
    get_lesson_prompt,
    get_plan_prompt
)

# Initialize Bedrock client
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

def call_bedrock(prompt, max_tokens=2000):
    """
    Call AWS Bedrock with Claude model
    """
    try:
        body = json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": max_tokens,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": 0.7
        })
        
        response = bedrock.invoke_model(
            modelId='anthropic.claude-3-sonnet-20240229-v1:0',
            body=body
        )
        
        response_body = json.loads(response['body'].read())
        return response_body['content'][0]['text']
    
    except Exception as e:
        print(f"Error calling Bedrock: {str(e)}")
        raise


def call_bedrock_weakness_prompt(weak_concepts, grade, subject):
    """
    Generate a weakness analysis report using Bedrock
    """
    # For local testing, return mock data
    if os.getenv('LOCAL_TEST', False):
        return f"Based on your {subject} quiz responses for grade {grade}, you show strong understanding in some areas but need additional practice with {', '.join([c['name'] for c in weak_concepts[:2]])}. Your problem-solving approach is logical, but there are gaps in applying formulas correctly."
    
    prompt = get_weakness_prompt(weak_concepts, grade, subject)
    return call_bedrock(prompt, max_tokens=1500)


def call_bedrock_lesson_prompt(weak_concepts, grade, subject):
    """
    Generate a personalized lesson using Bedrock
    """
    # For local testing, return mock data
    if os.getenv('LOCAL_TEST', False):
        return {
            "lesson_explanation": f"Grade {grade} {subject.title()} Fundamentals: Focus on {', '.join([c['name'] for c in weak_concepts[:2]])}. Step-by-step approach to mastering these concepts with clear explanations and examples.",
            "worked_example": f"Problem: Example from {subject}\nStep 1: Identify the concept\nStep 2: Apply the method\nStep 3: Verify the answer",
            "practice_questions": [
                f"Practice problem 1 for {subject}",
                f"Practice problem 2 for {subject}", 
                f"Practice problem 3 for {subject}"
            ]
        }
    
    prompt = get_lesson_prompt(weak_concepts, grade, subject)
    lesson_response = call_bedrock(prompt, max_tokens=3000)
    
    # Parse the lesson response to extract components
    # For now, return structured format
    return {
        "lesson_explanation": lesson_response[:1000] + "...",
        "worked_example": "Example: Solve 2x + 5 = 15\nStep 1: Subtract 5 from both sides\n2x = 10\nStep 2: Divide by 2\nx = 5",
        "practice_questions": [
            "Solve: 3x + 7 = 22",
            "Solve: 2x - 4 = 12", 
            "Solve: 5x + 10 = 35"
        ]
    }


def call_bedrock_plan_prompt(weak_concepts, grade, subject):
    """
    Generate a study plan using Bedrock
    """
    # For local testing, return mock data
    if os.getenv('LOCAL_TEST', False):
        return {
            "Day 1": f"{subject.title()} – {weak_concepts[0]['name'] if weak_concepts else 'Review'} - Introduction and basic practice",
            "Day 2": f"{subject.title()} – {weak_concepts[1]['name'] if len(weak_concepts) > 1 else 'Practice'} - Advanced problems and applications",
            "Day 3": f"{subject.title()} – Mixed Practice - Combining multiple concepts with real-world examples", 
            "Day 4": f"Review – {subject.title()} Concepts - Reinforcement and error analysis",
            "Day 5": f"Assessment – {subject.title()} Quiz - Self-evaluation and progress tracking"
        }
    
    prompt = get_plan_prompt(weak_concepts, grade, subject)
    plan_response = call_bedrock(prompt, max_tokens=2500)
    
    # Return structured study plan
    return {
        "Day 1": "Math – Linear Equations",
        "Day 2": "Science – Heat Transfer",
        "Day 3": "Math – Practice", 
        "Day 4": "Science – Practice",
        "Day 5": "Revision"
    }


def lambda_handler(event, context):
    """
    Main Lambda handler for processing quiz results
    """
    try:
        # Parse request body
        body = json.loads(event["body"])
        grade = body.get("grade")
        subject = body.get("subject", "mathematics")
        answers = body.get("answers")
        
        # Validate input
        if not grade or not answers:
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": json.dumps({
                    "error": "Missing required fields: grade and answers"
                })
            }
        
        # Analyze answers to identify weak concepts
        weak_concepts = analyze_answers(answers)
        
        # Generate weakness analysis report
        weakness_report = call_bedrock_weakness_prompt(weak_concepts, grade, subject)
        
        # Generate personalized lesson
        lesson_data = call_bedrock_lesson_prompt(weak_concepts, grade, subject)
        
        # Generate study plan
        study_plan = call_bedrock_plan_prompt(weak_concepts, grade, subject)
        
        # Extract priority concepts from weak_concepts
        priority_concepts = [concept.get("name", "Unknown Concept") for concept in weak_concepts[:4]]
        
        # Return response in exact format expected by frontend
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "weakness_report": weakness_report,
                "priority_concepts": priority_concepts,
                "lesson_explanation": lesson_data["lesson_explanation"],
                "worked_example": lesson_data["worked_example"],
                "practice_questions": lesson_data["practice_questions"],
                "study_plan": study_plan
            })
        }
    
    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "error": "Invalid JSON in request body"
            })
        }
    
    except Exception as e:
        print(f"Error processing request: {str(e)}")
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
