import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import SummarizerPage from "./SummarizerPage"; // ⬅️ The correct import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Change the element name to match the import */}
        <Route path="/summarizer" element={<SummarizerPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;