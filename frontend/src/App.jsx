import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";
import { RiGithubFill } from "react-icons/ri";

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // Load past history from local storage
  useEffect(() => {
    const savedHistory = localStorage.getItem("reviewHistory");
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post("https://fixi-ai-back.vercel.app/ai/get-review", {
        code,
        language: "javascript", // Default language set to JavaScript
      });

      setReview(response.data);
      const newHistory = [
        ...history,
        { code, review: response.data, time: new Date() },
      ];
      setHistory(newHistory);
      localStorage.setItem("reviewHistory", JSON.stringify(newHistory));
    } catch (error) {
      setReview("Error fetching review. Please try again.");
    }
    setLoading(false);
  }

  function clearHistory() {
    setHistory([]);
    localStorage.removeItem("reviewHistory");
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Fixi AI</div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a target="_blank" href="https://github.com/SarthakKrishak/AI-code-reviewer">
            GitHub <RiGithubFill />
          </a></li>
        </ul>
      </nav>

      <main>
        {/* Left Section - Code Editor */}
        <div className="left">
          {/* Code Editor */}
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">Review Code</div>
        </div>

        {/* Right Section - Review Output */}
        <div className="right">
          {loading ? (
            <div className="loader">Reviewing ...</div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}

          {/* Review History Section */}
          <div className="history-section">
            <h3>Review History</h3>
            {history.length === 0 ? (
              <p>No previous reviews</p>
            ) : (
              <div className="history-list">
                {history.map((item, index) => (
                  <div key={index} className="history-item">
                    <code>{item.code.substring(0, 50)}...</code>
                    <p>{item.review.substring(0, 100)}...</p>
                    <small>{new Date(item.time).toLocaleString()}</small>
                  </div>
                ))}
              </div>
            )}
            <button onClick={clearHistory} className="clear-history">Clear History</button>
          </div>
        </div>
      </main>
      <footer className="footer">
        Developed by Sarthak Krishak
      </footer>
    </>
  );
}

export default App;
