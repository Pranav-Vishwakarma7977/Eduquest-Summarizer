import google.generativeai as genai
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS # Required for React/Python communication

# --- 1. AI Configuration ---
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found. Please check your .env file.")

genai.configure(api_key=GEMINI_API_KEY)
# Pick one of the working models
model = genai.GenerativeModel("gemini-2.0-flash")


# --- 2. Flask/Server Setup ---
app = Flask(__name__)
CORS(app) # Initialize CORS to allow requests from your React app


def generate_summary(transcript: str):
    """Generates a comprehensive summary using the Gemini API."""
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

    # Add safety measures here, like a timeout
    response = model.generate_content(prompt)
    return response.text


# --- 3. API Endpoint ---
@app.route('/api/summarize', methods=['POST'])
def summarize_text():
    # 1. Safely parse the JSON payload from the React frontend
    data = request.get_json(silent=True) 

    # Check for missing/invalid JSON body
    if data is None:
        print("Error: Request body is missing or invalid JSON.")
        return jsonify({"error": "Request body must be valid JSON."}), 400 

    # Check for the required 'text' field sent from the frontend
    transcript_to_summarize = data.get('text')
    
    if not transcript_to_summarize:
        print("Error: 'text' field is missing in JSON payload.")
        return jsonify({"error": "Missing 'text' field in request data."}), 400 

    # --- SUCCESSFUL DATA RECEIVED ---
    try:
        # 2. Pass the received text to your Gemini function
        summary_result = generate_summary(transcript_to_summarize)

        # 3. Send the complete summary text back to the React frontend
        return jsonify({'summary': summary_result}), 200 

    except Exception as e:
        # 4. Handle any exceptions during the AI call (e.g., API key failure, rate limit)
        print(f"Internal Gemini API processing error: {e}")
        return jsonify({"error": "An internal error occurred during summarization."}), 500


if __name__ == '__main__':
    # Flask is started on port 5000, ready to receive requests from React
    print("Starting Flask server on http://127.0.0.1:5000")
    app.run(port=5000)