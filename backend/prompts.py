"""
Prompt templates for AWS Bedrock AI generation
"""

def get_weakness_prompt(weak_concepts, grade, subject):
    """
    Generate prompt for weakness analysis
    """
    concepts_list = "\n".join([
        f"- {concept['name']}: {concept['accuracy']}% accuracy ({concept['severity']} severity)"
        for concept in weak_concepts
    ])
    
    prompt = f"""You are an educational expert analyzing a student's quiz performance.

Student Profile:
- Grade Level: {grade}
- Subject: {subject}

Weak Concepts Identified:
{concepts_list}

Please provide a comprehensive weakness analysis report that includes:

1. **Overview**: Brief summary of the student's performance patterns
2. **Detailed Analysis**: For each weak concept, explain:
   - Why this concept is challenging
   - Common misconceptions students face
   - How it connects to other concepts
3. **Root Causes**: Identify potential underlying gaps in foundational knowledge
4. **Priority Recommendations**: Which concepts should be addressed first and why

Format your response in clear, encouraging language appropriate for a {grade} grade student and their parents.
Keep the tone supportive and constructive, focusing on growth opportunities."""

    return prompt


def get_lesson_prompt(weak_concepts, grade, subject):
    """
    Generate prompt for personalized lesson creation
    """
    concepts_list = "\n".join([concept['name'] for concept in weak_concepts])
    
    prompt = f"""You are an experienced educator creating a personalized lesson plan.

Student Profile:
- Grade Level: {grade}
- Subject: {subject}

Concepts to Address:
{concepts_list}

Create a comprehensive, engaging lesson that:

1. **Introduction** (5 min)
   - Hook to capture interest
   - Learning objectives clearly stated

2. **Foundational Review** (10 min)
   - Quick review of prerequisite concepts
   - Connect to what students already know

3. **Core Instruction** (20 min)
   - Clear explanations with examples
   - Step-by-step breakdowns
   - Visual/concrete representations
   - Real-world applications

4. **Guided Practice** (15 min)
   - Worked examples
   - Practice problems with varying difficulty
   - Common mistakes to avoid

5. **Summary & Next Steps** (5 min)
   - Key takeaways
   - Preview of upcoming concepts

Use age-appropriate language for {grade} grade students.
Include specific examples, analogies, and practice problems.
Make it interactive and engaging."""

    return prompt


def get_plan_prompt(weak_concepts, grade, subject):
    """
    Generate prompt for study plan creation
    """
    concepts_list = "\n".join([
        f"- {concept['name']} (Severity: {concept['severity']})"
        for concept in weak_concepts
    ])
    
    prompt = f"""You are an educational planner creating a personalized study plan.

Student Profile:
- Grade Level: {grade}
- Subject: {subject}

Weak Concepts:
{concepts_list}

Create a structured 5-day study plan that:

1. **Day-by-day breakdown**
   - Specific topics and activities
   - Time allocation (30-45 min per day)
   - Practice resources

2. **Progressive difficulty**
   - Review and reinforcement
   - Mixed practice
   - Self-assessment checkpoints

3. **Daily Structure**
   - Warm-up (5 min)
   - Main study (25-30 min)
   - Practice (10 min)
   - Reflection (5 min)

4. **Resources & Tools**
   - Recommended materials
   - Online resources
   - Practice strategies

5. **Success Metrics**
   - Progress indicators
   - Mini-assessments
   - Achievement goals

Make the plan realistic, achievable, and motivating for a {grade} grade student.
Include variety to maintain engagement."""

    return prompt
