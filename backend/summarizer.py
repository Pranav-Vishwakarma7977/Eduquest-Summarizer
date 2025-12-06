import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.0-flash")

def summarize_lecture(transcript: str):
    prompt = f"""
    You are EduQuest's lecture summarizer.
    Summarize the following lecture content using:
    1. High level summary (one paragraph)
    2. Bullet point key ideas
    3. Important definitions
    4. Example explanations
    5. 5 MCQ practice questions with answers
    Lecture:
    {transcript}
    """
    response = model.generate_content(prompt)
    return response.text
