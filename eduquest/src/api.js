import axios from "axios";

// Sends lecture text to Flask backend and returns summary
export async function summarizeLecture(text) {
  const response = await axios.post("http://127.0.0.1:5000/summarize", {
    transcript: text
  });

  return response.data.summary;
}
