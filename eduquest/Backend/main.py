from flask import Flask, request, jsonify
from flask import send_from_directory
from dotenv import load_dotenv
import google.generativeai as genai
import os
from flask_cors import CORS


load_dotenv()

app = Flask(__name__)

CORS(app)

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")

def summarize_lecture(transcript):
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

# Home route
@app.route("/")
def home():
    return "EduQuest Flask Backend Running"

@app.route("/")
def home_page():
    return send_from_directory(".", "index.html")

# Summarize route
@app.route("/api/summarize", methods=["POST"])
def summarize_api():
    data = request.get_json()
    transcript = data.get("transcript", "")
    if not transcript:
        return jsonify({"error": "Transcript is required"}), 400
    summary = summarize_lecture(transcript)
    return jsonify({"summary": summary})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)