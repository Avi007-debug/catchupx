# CatchUpX API Contract

## ✅ LOCKED API CONTRACT

This document defines the **EXACT** API contract between the CatchUpX frontend and backend.

### 📤 REQUEST FORMAT

**Endpoint:** `POST /analyze`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "grade": "8",
  "answers": [
    {
      "question_id": "MATH_Q1",
      "selected_option": "A"
    },
    {
      "question_id": "MATH_Q2", 
      "selected_option": "C"
    }
  ]
}
```

**Field Specifications:**
- `grade`: String representing the student's grade level (6-10)
- `answers`: Array of answer objects
  - `question_id`: String in format "MATH_Q1", "MATH_Q2", etc.
  - `selected_option`: String representing the selected answer ("A", "B", "C", "D")

### 📥 RESPONSE FORMAT

**Success Response (200):**
```json
{
  "weakness_report": "You are weak in Linear Equations...",
  "priority_concepts": [
    "Linear Equations", 
    "Heat Transfer"
  ],
  "lesson_explanation": "...",
  "worked_example": "...",
  "practice_questions": [
    "Question 1",
    "Question 2", 
    "Question 3"
  ],
  "study_plan": {
    "Day 1": "Math – Linear Equations",
    "Day 2": "Science – Heat Transfer",
    "Day 3": "Math – Practice",
    "Day 4": "Science – Practice", 
    "Day 5": "Revision"
  }
}
```

**Field Specifications:**
- `weakness_report`: String containing detailed analysis
- `priority_concepts`: Array of strings (concept names)
- `lesson_explanation`: String with lesson content
- `worked_example`: String with step-by-step example
- `practice_questions`: Array of strings (practice problems)
- `study_plan`: Object with day keys and topic values

**Error Response (400/500):**
```json
{
  "error": "Error message"
}
```

## 🔧 BACKEND IMPLEMENTATION

### Question-to-Concept Mapping
```python
QUESTION_CONCEPTS = {
    "MATH_Q1": {"name": "Linear Equations", "correct_answer": "A"},
    "MATH_Q2": {"name": "Number Theory", "correct_answer": "B"}, 
    "MATH_Q3": {"name": "Geometry - Area", "correct_answer": "C"},
    "MATH_Q4": {"name": "Exponents", "correct_answer": "C"},
    "MATH_Q5": {"name": "Geometry - Perimeter", "correct_answer": "B"}
}
```

### Lambda Handler Structure
```python
def lambda_handler(event, context):
    body = json.loads(event["body"])
    grade = body["grade"]
    answers = body["answers"]
    
    weak_concepts = analyze_answers(answers)
    weakness_report = call_bedrock_weakness_prompt(...)
    lesson = call_bedrock_lesson_prompt(...)
    plan = call_bedrock_plan_prompt(...)
    
    return {
        "statusCode": 200,
        "body": json.dumps({
            "weakness_report": weakness_report,
            "priority_concepts": [...],
            "lesson_explanation": lesson["lesson_explanation"],
            "worked_example": lesson["worked_example"], 
            "practice_questions": lesson["practice_questions"],
            "study_plan": plan
        })
    }
```

## 🧪 TESTING

### Local Testing
```bash
cd catchupx/backend
python test_local_simple.py
```

### API Server Testing
```bash
cd catchupx/backend
python test_api.py
```

### cURL Testing
```bash
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"grade": "8", "answers": [{"question_id": "MATH_Q1", "selected_option": "B"}]}'
```

## ✅ VALIDATION CHECKLIST

- [x] Frontend sends correct request format
- [x] Backend processes answers correctly
- [x] Response matches exact format expected by frontend
- [x] All required fields present in response
- [x] Data types match specifications
- [x] Local testing passes
- [x] API contract locked and documented

## 🚀 DEPLOYMENT READY

The API contract is now **LOCKED** and ready for AWS Lambda deployment. Both frontend and backend are aligned to this exact specification.