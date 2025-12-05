// src/SummarizerPage.jsx
import React, { useState } from 'react';

function SummarizerPage() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  
  // ⬅️ NEW FUNCTION: Handles the Text-to-Speech process
  const speakSummary = (textToSpeak) => {
    // Check if the browser supports the Web Speech API
    if ('speechSynthesis' in window) {
        // Stop any currently speaking utterance before starting a new one
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
        // Set speech parameters (optional, adjust as needed)
        utterance.pitch = 1;      // Standard pitch
        utterance.rate = 1.1;     // Slightly faster than default
        
        window.speechSynthesis.speak(utterance);
    } else {
        console.error("Web Speech API not supported in this browser.");
        alert("Your browser does not support text-to-speech.");
    }
  };


const handleSummarize = async () => {
    console.log("Text being sent:", text);
    // 1. Frontend Validation Check: Prevent request if 'text' is empty or only whitespace
    if (!text || text.trim() === '') {
        alert("Please paste the lecture content into the text area first.");
        return; // Stops the function execution
    }

    // This is where you call your running Python backend server (e.g., on port 5000)
    try {
        const response = await fetch('http://127.0.0.1:5000/api/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Note: The backend expects the key 'transcript' now
            body: JSON.stringify({ transcript: text }), 
        });

        // Check if the HTTP status is NOT a success (e.g., 400, 500)
        if (!response.ok) {
            const errorData = await response.json();
            setSummary(`Error ${response.status}: ${errorData.error}`);
            console.error('API Error:', errorData.error);
            return;
        }

        const data = await response.json();
        const newSummary = data.summary; // Store the received summary

        setSummary(newSummary);
        
        // ⬅️ CALL THE SPEAK FUNCTION immediately after updating the summary
        speakSummary(newSummary); 
   
    } catch (error) {
        setSummary("Error connecting to backend server. Check if Python server is running.");
        console.error('Network Error:', error);
    }
};

  return (
    <div>
      <h1>Text Summarizer</h1>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows="10" cols="50" />
      <button onClick={handleSummarize}>Get Summary</button>
      <h2>Summary:</h2>
      <p>{summary}</p>
      
      {/* ⬅️ NEW: ADD THIS BUTTON that appears only when a summary exists */}
      {summary && (
          <button 
              onClick={() => speakSummary(summary)}
              style={{ marginTop: '10px', marginLeft: '20px', padding: '8px 15px' }}
          >
              🔊 Listen to Summary
          </button>
      )}
    </div>
  );
}

export default SummarizerPage;