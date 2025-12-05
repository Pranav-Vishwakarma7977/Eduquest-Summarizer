import { useState } from "react";
import { summarizeLecture } from "../api";

export default function Summarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) {
      alert("Please enter lecture text first!");
      return;
    }

    setLoading(true);
    try {
      const result = await summarizeLecture(text);
      setSummary(result);
    } catch (err) {
      console.error("API error:", err);
      alert("Error connecting to backend. Make sure it is running.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lecture Summarizer</h1>

      <textarea
        placeholder="Paste lecture text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", height: "180px", marginBottom: "10px" }}
      />

      <br />

      <button onClick={handleSummarize} disabled={loading}>
        {loading ? "Summarizing…" : "Summarize"}
      </button>

      <pre style={{ background: "#f0f0f0", padding: "10px", marginTop: "20px", whiteSpace: "pre-wrap" }}>
        {summary}
      </pre>
    </div>
  );
}
