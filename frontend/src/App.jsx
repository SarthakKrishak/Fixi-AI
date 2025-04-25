import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { RiGithubFill } from "react-icons/ri";
import { motion } from "framer-motion";
import "./App.css";
import { FaLinkedinIn } from "react-icons/fa";
import { PiXLogoFill } from "react-icons/pi";
import { FaRegCopy } from "react-icons/fa";

// Import Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const response = await axios.post(
        "https://ai-code-reviewer-omega.vercel.app/ai/get-review",
        {
          code,
          language: "javascript", // Default language set to JavaScript
        }
      );

      setReview(response.data);

      // Check if code already exists in history
      const newHistory = [
        ...history.filter((item) => item.code !== code), // Remove duplicates
        { code, review: response.data, time: new Date() }, // Add new review
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

  // Function to copy code to clipboard with a toast notification
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Code copied to clipboard!"); // Show toast notification
    });
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className="navbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="logo" onClick={() => (window.location.href = "/")}>
          Fixi AI
        </div>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://github.com/SarthakKrishak/AI-code-reviewer"
              className="github-link"
            >
              GitHub <RiGithubFill />
            </a>
          </li>
        </ul>
      </motion.nav>

      <main>
        {/* Left Section - Code Editor */}
        <motion.div
          className="left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
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
                overflow: "auto",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">
            Review Code
          </div>
        </motion.div>

        {/* Right Section - Review Output */}
        <motion.div
          className="right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
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

                    {/* Copy icon button for the code snippet */}
                    <FaRegCopy
                      onClick={() => copyToClipboard(item.code)}
                      className="copy-icon"
                    />
                  </div>
                ))}
              </div>
            )}
            <button onClick={clearHistory} className="clear-history">
              Clear History
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        className="footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="footer-content">
          {/* Quick Links Section */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://github.com/SarthakKrishak/AI-code-reviewer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-links">
              <li>
                <a href="mailto:sarthakkrishak1234@gmail.com">Email</a>
              </li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div className="footer-section">
            <h4 className="footer-title">Follow</h4>
            <div className="social-links">
              <a
                href="https://x.com/krishak_sarthak"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <PiXLogoFill />
              </a>
              <a
                href="https://www.linkedin.com/in/sarthakkrishak/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaLinkedinIn /> {/* LinkedIn Icon */}
              </a>
              <a
                href="https://github.com/SarthakKrishak"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <RiGithubFill /> {/* GitHub Icon */}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="copyright">
          <p>
            Developed by{" "}
            <a
              className="copy"
              href="https://linktr.ee/SarthakKrishak?fbclid=PAZXh0bgNhZW0CMTEAAacw4D3VKUhHLQsVV0pSJvGK9-sYk3Qt2MtkswWAi5MBGvPn9BpJ0RT3L5RhYQ_aem_dXM-0LP0Qn223fEpYhzerQ"
              target="_blank"
            >
              Sarthak Krishak
            </a>
          </p>
          <p>&copy; 2025 Fixi AI. All Rights Reserved.</p>
        </div>
      </motion.footer>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
