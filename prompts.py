# prompts.py
# All GenAI prompts for CatchUpX
# DO NOT MODIFY STRUCTURE DURING HACKATHON


def weakness_report_prompt(student_grade, subject, weak_concepts):
    """
    Generates a diagnostic weakness report.
    """
    return f"""
You are an academic diagnostic engine.

Student details:
- Grade: {student_grade}
- Subject: {subject}
- Weak concepts: {", ".join(weak_concepts)}

Your task:
1. Clearly explain what the student is weak in.
2. Explain WHY these gaps matter for future learning.
3. Prioritize which concept should be fixed first and why.

Rules:
- Use simple, student-friendly language.
- Do NOT teach the topic yet.
- Do NOT include solutions or examples.
- Keep the explanation concise and structured.

Output format:
- Weakness Summary
- Why This Matters
- Priority Recommendation
"""


def catchup_lesson_prompt(student_grade, subject, concept):
    """
    Generates a personalized catch-up lesson for one weak concept.
    """
    return f"""
You are an expert teacher helping a weak student catch up.

Student details:
- Grade: {student_grade}
- Subject: {subject}
- Concept: {concept}
- Student level: Weak / Needs foundational clarity

Your task:
Create a short catch-up lesson that includes:

1. Simple concept explanation (use plain language)
2. One worked example (step-by-step)
3. Three practice questions (no solutions)
4. A short summary of key points

Rules:
- Assume the student is struggling.
- Avoid jargon.
- Do NOT go beyond this single concept.
- Do NOT include extra topics.

Output format:
- Concept Explanation
- Worked Example
- Practice Questions
- Key Takeaway
"""


def study_plan_prompt(student_grade, weak_concepts_by_subject, hours_per_day=2):
    """
    Generates a realistic 5-day personalized study plan.
    """
    return f"""
You are an academic planner creating a recovery study schedule.

Student details:
- Grade: {student_grade}
- Weak concepts by subject: {weak_concepts_by_subject}
- Available study time: {hours_per_day} hours per day

Your task:
Create a realistic 5-day study plan that:
1. Focuses on weak concepts first.
2. Limits to a maximum of 2 subjects per day.
3. Includes revision on Day 5.
4. Balances cognitive load (do not overload).

Rules:
- Keep plan simple and practical.
- Do NOT include motivational text.
- Do NOT add extra subjects.

Output format:
Day 1:
Day 2:
Day 3:
Day 4:
Day 5:
"""
